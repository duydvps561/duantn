var express = require('express');
var router = express.Router();
const Ve = require('../models/ticket/ve');
const PhongChieu = require('../models/room/phongchieu');
const HoaDon = require('../models/food/hoadon');
const Ghe = require('../models/room/ghe');
const Movie = require('../models/movie/phim');
const FoodOrder = require('../models/food/foododer');
const Food = require('../models/food/food');
const TaiKhoan = require('../models/account/taikhoan');

router.put('/scan-qr/:hoadonId', async (req, res) => {
    try {
        const { hoadonId } = req.params;

        // Tìm hóa đơn theo ID và kiểm tra trạng thái
        const hoadon = await HoaDon.findById(hoadonId);

        if (!hoadon) {
            return res.status(404).json({ message: 'Hóa đơn không tồn tại' });
        }

        // Kiểm tra trạng thái hóa đơn trước khi cập nhật
        if (hoadon.trangthai === '2') {
            return res.status(400).json({ message: 'Hóa đơn đã được check-in trước đó' });
        }

        // Lấy thông tin vé liên quan đến hóa đơn
        const veDetails = await Ve.find({ hoadon_id: hoadonId })
            .populate({
                path: 'cachieu_id',
                populate: { path: 'phim_id', model: Movie }, // Lấy thông tin phim
            })
            .populate({
                path: 'ghe_id',
                model: Ghe, // Lấy thông tin ghế
                populate: { path: 'phongchieu_id', model: PhongChieu }, // Lấy thông tin phòng
            });

        if (veDetails.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy vé liên quan đến hóa đơn' });
        }

        // Lấy thông tin suất chiếu: Ngày chiếu và Giờ bắt đầu
        const ngaychieu = veDetails[0].cachieu_id.ngaychieu;
        const giobatdau = veDetails[0].cachieu_id.giobatdau;

        if (!ngaychieu || !giobatdau) {
            return res.status(400).json({ message: 'Thông tin ngày chiếu hoặc giờ bắt đầu không hợp lệ' });
        }

        // Kiểm tra ngày chiếu
        const today = new Date().toISOString().split('T')[0]; 
        const ngaychieuDate = new Date(ngaychieu).toISOString().split('T')[0]; // Loại bỏ phần giờ của ngaychieu

        if (today !== ngaychieuDate) {
            return res.status(400).json({ message: 'Ngày chiếu không trùng khớp với ngày hiện tại' });
        }

        // Kiểm tra thời gian
        const now = new Date(); // Thời gian hiện tại
        const checkInTime = new Date(`${ngaychieuDate}T${giobatdau}`); // Thời gian bắt đầu suất chiếu
        const timeDifference = (checkInTime - now) / (60 * 1000); // Chênh lệch phút

        if ( timeDifference > 30) {
            return res.status(400).json({
                message: 'Chưa đến thời gian check-in. Vui lòng đợi trong vòng 30 phút trước giờ chiếu',
            });
        } else if (timeDifference < -30) {
            return res.status(400).json({
                message: 'Đã quá thời gian check-in cho suất chiếu này',
            });
        }

        // Cập nhật trạng thái hóa đơn từ 1 -> 2 (đã check-in)
        hoadon.trangthai = '2';
        await hoadon.save();

        // Lấy thông tin tài khoản liên quan đến hóa đơn
        const taikhoan = await TaiKhoan.findById(hoadon.taikhoan_id);

        if (!taikhoan) {
            return res.status(404).json({ message: 'Không tìm thấy tài khoản khách hàng' });
        }

        // Tổng hợp thông tin ghế và phòng
        const gheDetails = veDetails.flatMap((ve) =>
            ve.ghe_id.map((ghe) => ({
                ghe: `${ghe.hang}${ghe.cot}`,
                phong: ghe.phongchieu_id.tenphong,
            }))
        );

        // Tổng hợp thông tin phim (nếu có nhiều vé, chỉ cần tên phim đầu tiên)
        const phimDetails = veDetails[0].cachieu_id.phim_id.tenphim;

        // Lấy thông tin món ăn liên quan đến hóa đơn
        const foodOrders = await FoodOrder.find({ hoadon_id: hoadonId })
            .populate('food_id');

        // Tổng hợp thông tin món ăn
        const foodDetails = foodOrders.map((order) => ({
            tenfood: order.food_id.tenfood,
            soluong: order.soluong,
        }));

        // Trả về thông tin tổng hợp
        res.json({
            message: 'Cập nhật trạng thái hóa đơn thành công',
            hoadon: {
                ...hoadon._doc,
                tongtien: hoadon.tongtien, // Tổng tiền hóa đơn
            },
            tentaikhoan: taikhoan.tentaikhoan, // Tên tài khoản
            phim: phimDetails,
            ngaychieu: ngaychieuDate, // Ngày chiếu
            giobatdau: giobatdau, // Giờ bắt đầu
            ghe: gheDetails.map(item => item.ghe),
            phong: [...new Set(gheDetails.map(item => item.phong))], // Loại bỏ phòng trùng lặp
            food: foodDetails,
            trangthai: hoadon.trangthai, // Trả về trạng thái của hóa đơn
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error });
    }
});

module.exports = router;
