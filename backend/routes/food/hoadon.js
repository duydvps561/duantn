var express = require("express");
var router = express.Router();
const Hoadon = require("../../models/food/hoadon");
const FoodOder = require('../../models/food/foododer');// Model FoodOrder
const Ve = require('../../models/ticket/ve');
// Get all invoices
router.get("/", async function (req, res, next) {
  try {
    // Populate `tentaikhoan` in the response
    const hoadon = await Hoadon.find().populate("taikhoan_id", "tentaikhoan");
    res.json(hoadon);
  } catch (err) {
    next(err);
  }
});

// Add a new invoice
router.post("/add", async (req, res) => {
  try {
    const hoadon = new Hoadon(req.body);
    const result = await hoadon.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const hoadon = await Hoadon.findById(req.params.id)
//     .populate("taikhoan_id","tentaikhoan");
//     const tickets = await Ve.find({ hoadon_id: req.params.id })
//     .populate({
//       path: 'cachieu_id',     
//       model: 'cachieu_id',          
//       select: 'giobatdau gioketthuc ngaychieu phim_id'
//   });
 
//     if (!hoadon) {
//       return res.status(404).send({ message: "Hóa đơn không tồn tại" });
//     }
//     res.json(hoadon);
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    // Lấy thông tin hóa đơn
    const hoadon = await Hoadon.findById(req.params.id)
      .populate("taikhoan_id", "tentaikhoan"); // Lấy tên tài khoản
    
    if (!hoadon) {
      return res.status(404).send({ message: "Hóa đơn không tồn tại" });
    }

    // Lấy tất cả món ăn/thức uống từ bảng foododer dựa vào hoadon_id
    const foodOrders = await FoodOder.find({ hoadon_id: req.params.id })
      .populate("food_id", "tenfood gia") // Lấy tên món ăn và giá
      .lean();
    // Debug thông tin foodOrders
    console.log("Food Orders:", foodOrders);

    // Lấy tất cả vé từ bảng ve dựa vào hoadon_id
    const tickets = await Ve.find({ hoadon_id: req.params.id })
  .populate({
    path: 'cachieu_id', // Tìm thông tin lịch chiếu
    select: 'giobatdau gioketthuc ngaychieu phim_id', // Chọn các trường cần thiết
    populate: {
      path: 'phim_id', // Tìm thông tin phim
      select: 'tenphim thoiluong' // Chọn các trường cần thiết của phim
    }
  })
  .populate({
    path: 'ghe_id', // Populate the `ghe_id` field (seats)
    select: 'hang cot phongchieu_id createdAt updatedAt', // Select specific fields from `ghe_id`
    populate: {
      path: 'phongchieu_id', // Populate hall details if needed
      select: 'tenphongchieu' // Select the hall name
    }
  })
  .lean()
    // Debug thông tin tickets
    console.log("Tickets:", tickets);

  
    // Tổng hợp dữ liệu trả về
    const response = {
      hoadon: {
        _id: hoadon._id,
        tentaikhoan: hoadon.taikhoan_id?.tentaikhoan || "Không xác định",
        tongtien: hoadon.tongtien,
        createdAt: hoadon.createdAt
      },
      foodOrders: foodOrders.map(order => ({
        tenmon: order.food_id?.tenfood || "Không xác định",
        gia: order.food_id?.gia || 0,
        soluong: order.soluong,
        tongtien: order.tongtien
      })),
      tickets: tickets.map(ticket => ({
        giave: ticket.giave,
        giobatdau: ticket.cachieu_id?.giobatdau || "N/A",
        gioketthuc: ticket.cachieu_id?.gioketthuc || "N/A",
        ngaychieu: ticket.cachieu_id?.ngaychieu || "N/A",
        tenphim: ticket.cachieu_id?.phim_id?.tenphim || "N/A",
        thoiluong: ticket.cachieu_id?.phim_id?.thoiluong || "N/A",
        soghe: ticket.ghe_id?.map(ghe => `${ghe.hang}${ghe.cot}`).join(", ") || "N/A", // Combine row and column for seats
        phongchieu: ticket.ghe_id?.map(ghe => ghe.phongchieu_id?.tenphongchieu).join(", ") || "N/A" // Hall name for each seat
      }))
    };

    // Trả về kết quả
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Có lỗi xảy ra khi lấy dữ liệu" });
  }
});

// Get invoice details
router.get("/:id/details", async (req, res) => {
  try {
    const hoadon = await Hoadon.findById(req.params.id);
    if (!hoadon) {
      return res.status(404).send({ message: "Hóa đơn không tồn tại" });
    }
    res.json(hoadon.details);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Delete invoice
router.delete("/:id", async (req, res) => {
  try {
    const hoadon = await Hoadon.findByIdAndDelete(req.params.id);
    if (!hoadon) {
      return res.status(404).send({ message: "Hóa đơn không tồn tại" });
    }
    res.status(200).send({ message: "Hóa đơn đã xóa thành công" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update invoice
router.put("/:id", async (req, res) => {
  try {
    const hoadon = await Hoadon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!hoadon) {
      return res.status(404).send({ message: "Hóa đơn không tồn tại" });
    }
    res.json(hoadon);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
router.put("/qrcheckin/:id", async (req, res) => {
  try {
    const hoadon = await Hoadon.findById(req.params.id);

    if (!hoadon) {
      return res
        .status(404)
        .send({ message: "QR không hợp lệ hoặc hóa đơn không tồn tại" });
    }

    // Chuyển trangthai sang kiểu number để đảm bảo việc so sánh đúng
    const trangthai = Number(hoadon.trangthai); // Chuyển trangthai thành kiểu số

    console.log("Trạng thái hóa đơn hiện tại:", trangthai);

    if (trangthai === 2) {
      return res
        .status(400)
        .send({ message: "QR không hợp lệ (trạng thái hóa đơn đã là 2)" });
    }

    if (trangthai === 1) {
      hoadon.trangthai = 2; // Cập nhật trạng thái lên 2 (Check-in thành công)
      await hoadon.save();
      return res.status(200).send({ message: "Check-in thành công", hoadon });
    }

    return res
      .status(400)
      .send({ message: "QR không hợp lệ (hóa đơn không ở trạng thái 1)" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
