"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/app/components/admin/Layout";
import "./ThemGhe.css";

const ThemGhe = () => {
  const [soHang, setSoHang] = useState(1); // Số hàng ghế
  const [tenHang, setTenHang] = useState([]); // Tên hàng ghế
  const [soCot, setSoCot] = useState(1); // Số cột ghế
  const [selectedSeats, setSelectedSeats] = useState([]); // Ghế đã chọn
  const [phongchieuId, setPhongchieuId] = useState(""); // ID phòng chiếu
  const [loaigheList, setLoaigheList] = useState([]); // Danh sách loại ghế
  const [phongchieuList, setPhongchieuList] = useState([]); // Danh sách phòng chiếu
  const [selectedLoaiGhe, setSelectedLoaiGhe] = useState(""); // Loại ghế được chọn cho một ghế
  const [seatColors, setSeatColors] = useState({}); // Lưu màu sắc cho mỗi loại ghế

  useEffect(() => {
    const fetchData = async () => {
      try {
        const phongchieuRes = await axios.get("http://localhost:3000/phongchieu");
        const loaigheRes = await axios.get("http://localhost:3000/loaighe");
        setPhongchieuList(phongchieuRes.data);
        setLoaigheList(loaigheRes.data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu", err);
      }
    };
    fetchData();
  }, []);

  const handleSeatClick = (seatKey) => {
    const currentSeat = selectedSeats.find(seat => seat.key === seatKey);
    const updatedSeats = currentSeat
      ? selectedSeats.filter(seat => seat.key !== seatKey) // Bỏ chọn ghế
      : [...selectedSeats, { key: seatKey, loaiGheId: selectedLoaiGhe }]; // Chọn ghế mới với loại ghế

    setSelectedSeats(updatedSeats);
  };

  const handleSubmit = async () => {
    if (!phongchieuId || selectedSeats.length === 0 || !selectedLoaiGhe) {
      alert("Vui lòng chọn phòng chiếu, loại ghế và ít nhất một ghế.");
      return;
    }

    const danhSachGhe = selectedSeats.map(seat => ({
      hang: seat.key[0], // Lấy hàng từ key
      cot: seat.key.substring(1), // Lấy cột từ key
      loaiGheId: seat.loaiGheId, // Gửi loại ghế đã chọn
    }));

    try {
      await axios.post("http://localhost:3000/ghe/them-ghe", {
        phongchieu_id: phongchieuId,
        danhSachGhe,
      });
      alert("Thêm ghế thành công!");
      setSelectedSeats([]); // Xóa ghế đã chọn sau khi thêm
      setSelectedLoaiGhe(""); // Reset loại ghế đã chọn
      setSeatColors({}); // Reset màu sắc
    } catch (err) {
      console.error(err);
      alert("Lỗi khi thêm ghế.");
    }
  };

  const getLoaiGheColor = (loaiGheId) => {
    const loaiGhe = loaigheList.find(loai => loai._id === loaiGheId);
    return loaiGhe ? loaiGhe.mau : "#ccc"; // Lấy màu từ loại ghế hoặc màu mặc định
  };

  const renderSeat = (hang, cot) => {
    const seatKey = `${hang}${cot}`; 
    const seat = selectedSeats.find(seat => seat.key === seatKey);
    
    const seatColor = seat
      ? getLoaiGheColor(seat.loaiGheId) // Sử dụng màu của loại ghế
      : "#fff"; // Nếu không có ghế thì màu trắng

    return (
      <div 
        key={seatKey} 
        className="seat-wrapper" 
        style={{ backgroundColor: seatColor }} 
        onClick={() => handleSeatClick(seatKey)} // Thêm sự kiện click cho ghế
      >
        <label>{seatKey}</label>
      </div>
    );
  };

  const renderSeats = () => {
    const rows = [];
    for (let i = 0; i < soHang; i++) {
      const hang = tenHang[i] || String.fromCharCode(65 + i); // Mặc định là A, B, C...
      const row = [];
      for (let j = 1; j <= soCot; j++) {
        row.push(renderSeat(hang, j));
      }
      rows.push(
        <div key={hang} className="seat-row">
          {row}
        </div>
      );
    }
    return rows;
  };

  const handleLoaiGheChange = (e) => {
    const loaiGheId = e.target.value;
    setSelectedLoaiGhe(loaiGheId); // Cập nhật loại ghế đã chọn
  };

  return (
    <Layout>
      <div className="them-ghe-container">
        <h1>Thêm Ghế</h1>

        <div className="row">
          <div className="form-group col-6 col-md-2">
            <label>Tên Hàng Ghế:</label>
            <input
              type="text"
              value={tenHang.join(", ")} // Hiển thị tên hàng ghế
              onChange={(e) => setTenHang(e.target.value.split(",").map(item => item.trim()))}
              className="form-control"
              placeholder="Nhập tên hàng ghế, cách nhau bằng dấu phẩy"
            />
          </div>

          <div className="form-group col-6 col-md-2">
            <label>Số Hàng:</label>
            <input
              type="number"
              value={soHang}
              onChange={(e) => setSoHang(Number(e.target.value))}
              className="form-control"
              min="1"
            />
          </div>

          <div className="form-group col-6 col-md-2">
            <label>Số Cột:</label>
            <input
              type="number"
              value={soCot}
              onChange={(e) => setSoCot(Number(e.target.value))}
              className="form-control"
              min="1"
            />
          </div>

          <div className="form-group col-6 col-md-2">
            <label>Chọn Loại Ghế:</label>
            <select
              value={selectedLoaiGhe}
              onChange={handleLoaiGheChange}
              className="form-control"
            >
              <option value="">Chọn loại ghế</option>
              {loaigheList.map((loai) => (
                <option key={loai._id} value={loai._id}>
                  {loai.loaighe}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Chọn Phòng Chiếu:</label>
          <select
            value={phongchieuId}
            onChange={(e) => setPhongchieuId(e.target.value)}
            className="form-control"
          >
            <option value="">Chọn phòng chiếu</option>
            {phongchieuList.map((phong) => (
              <option key={phong._id} value={phong._id}>
                {phong.tenphong}
              </option>
            ))}
          </select>
        </div>

        <div className="seats-container">
          {renderSeats()}
        </div>

        <button onClick={handleSubmit} className="btn btn-primary">Thêm Ghế</button>
      </div>
    </Layout>
  );
};

export default ThemGhe;
