var express = require('express');
var router = express.Router();
const tintuc = require('../models/tintuc');
const taikhoan = require('../models/account/taikhoan');
const food = require('../models/food/food');
const hoadon = require('../models/food/hoadon');
const phim = require('../models/movie/phim');
const phongchieu = require('../models/room/phongchieu');
// Lấy số lượng tài khoản
router.get('/soluong/taikhoan', async (req, res) => {
    try {
        const totalTaikhoan = await taikhoan.countDocuments();
        res.json({ totalTaikhoan });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy số lượng tin tức
router.get('/soluong/tintuc', async (req, res) => {
    try {
        const totalTintuc = await tintuc.countDocuments();
        res.json({ totalTintuc });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy số lượng món ăn
router.get('/soluong/food', async (req, res) => {
    try {
        const totalFood = await food.countDocuments();
        res.json({ totalFood });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy số lượng phim
router.get('/soluong/phim', async (req, res) => {
    try {
        const totalPhim = await phim.countDocuments();
        res.json({ totalPhim });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Lấy số lượng phòng chiếu
router.get('/soluong/phongchieu', async (req, res) => {
    try {
        const totalPhongchieu = await phongchieu.countDocuments();
        res.json({ totalPhongchieu });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Tổng tiền hóa đơn có trạng thái = 2
router.get('/tong-tien-hoadon', async (req, res) => {
    try {
        const totalRevenue = await hoadon.aggregate([
            { $match: { trangthai: '2' } },
            { $group: { _id: null, total: { $sum: '$tongtien' } } }
        ]);

        const total = totalRevenue[0]?.total || 0; // Tránh lỗi nếu không có hóa đơn nào
        res.json({ total });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Router lấy 5 tài khoản đăng ký mới nhất
router.get('/taikhoan-moi-nhat', async (req, res) => {
    try {
        const latestTaikhoan = await taikhoan.find().sort({ createdAt: -1 }).limit(5);
        res.json(latestTaikhoan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Router lấy 5 hóa đơn mới nhất
router.get('/hoadon-moi-nhat', async (req, res) => {
    try {
        const latestHoadon = await hoadon.find().sort({ createdAt: -1 }).limit(5);
        res.json(latestHoadon);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Router thống kê đơn trong ngày và 6 ngày trước (1 tuần)
router.get('/don-trong-ngay', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(23, 59, 59, 999); // Đặt giờ cuối ngày hôm nay

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - 6); // Tính ngày bắt đầu của tuần

        // Tạo một truy vấn để lấy số liệu trong tuần và bao gồm cả ngày hôm nay
        const ordersWeek = await hoadon.aggregate([
            {
                $match: {
                    ngaylap: { $gte: startOfWeek, $lte: today }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$ngaylap' } },
                    count: { $sum: 1 },
                    total: { $sum: '$tongtien' }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Kiểm tra xem liệu ngày hôm nay có trong dữ liệu không và thêm nếu cần
        const todayData = ordersWeek.find(order => order._id === today.toISOString().split('T')[0]);

        if (!todayData) {
            ordersWeek.push({
                _id: today.toISOString().split('T')[0],
                count: 0,
                total: 0
            });
        }

        res.json(ordersWeek);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//Số lượng đơn trong 6 tháng vửa qua
router.get('/don-trong-thang', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Đảm bảo ngày hiện tại là ngày bắt đầu

        // Tính ngày bắt đầu của 6 tháng trước
        const startOfSixMonthsAgo = new Date(today);
        startOfSixMonthsAgo.setMonth(today.getMonth() - 5); // 6 tháng trước

        // Tạo mảng các tháng từ 6 tháng trước đến tháng hiện tại
        const monthsArray = [];
        for (let i = 0; i < 6; i++) {
            const month = new Date(today);
            month.setMonth(today.getMonth() - i);
            monthsArray.push(month.toISOString().slice(0, 7)); // Lưu dạng YYYY-MM
        }

        // Thực hiện truy vấn Aggregate để lấy dữ liệu đơn hàng
        const ordersInMonths = await hoadon.aggregate([
            {
                $match: {
                    ngaylap: { $gte: startOfSixMonthsAgo, $lte: today }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m', date: '$ngaylap' } }, // Nhóm theo tháng (YYYY-MM)
                    count: { $sum: 1 }, // Đếm số đơn hàng
                    total: { $sum: '$tongtien' } // Tổng số tiền
                }
            },
            { $sort: { _id: 1 } } // Sắp xếp theo tháng theo thứ tự tăng dần
        ]);

        // Tạo kết quả bao gồm tất cả các tháng, nếu không có dữ liệu thì mặc định là 0
        const result = monthsArray.map(month => {
            const monthData = ordersInMonths.find(order => order._id === month);
            return {
                _id: month,
                count: monthData ? monthData.count : 0, // Nếu không có dữ liệu cho tháng này thì gán count = 0
                total: monthData ? monthData.total : 0 // Nếu không có dữ liệu cho tháng này thì gán total = 0
            };
        });

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/doanh-thu-theo-ngay', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - 6);

        const revenueDaily = await hoadon.aggregate([
            {
                $match: {
                    ngaylap: { $gte: startOfWeek, $lte: today },
                    trangthai: '2' 
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$ngaylap' } },
                    totalRevenue: { $sum: '$tongtien' }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(revenueDaily);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/doanh-thu-theo-thang', async (req, res) => {
    try {
        const today = new Date();
        const sixMonthsAgo = new Date(today);
        sixMonthsAgo.setMonth(today.getMonth() - 5);

        const revenueMonthly = await hoadon.aggregate([
            {
                $match: {
                    ngaylap: { $gte: sixMonthsAgo },
                    trangthai: '2'
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m', date: '$ngaylap' } },
                    totalRevenue: { $sum: '$tongtien' }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json(revenueMonthly);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/soluong/phim', async (req, res) => {
    try {
        const totalPhim = await phim.countDocuments();
        res.json({ totalPhim });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Đếm số lượng phim theo trangthai = 0
router.get('/soluong/phim/trangthai/0', async (req, res) => {
    try {
        const phimTrangThai0 = await phim.countDocuments({ trangthai: '0' });
        res.json({ phimTrangThai0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Đếm số lượng phim theo trangthai = 1
router.get('/soluong/phim/trangthai/1', async (req, res) => {
    try {
        const phimTrangThai1 = await phim.countDocuments({ trangthai: '1' });
        res.json({ phimTrangThai1 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Đếm số lượng phim theo trangthai = 2
router.get('/soluong/phim/trangthai/2', async (req, res) => {
    try {
        const phimTrangThai2 = await phim.countDocuments({ trangthai: '2' });
        res.json({ phimTrangThai2 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
