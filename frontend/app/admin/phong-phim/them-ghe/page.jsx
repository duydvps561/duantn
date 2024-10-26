"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/app/components/admin/Layout";
import Swal from "sweetalert2";
import * as Yup from "yup";
import "./ThemGhe.css";

const ThemGhe = () => {
  const [soHang, setSoHang] = useState(1); 
  const [tenHang, setTenHang] = useState([]); 
  const [soCot, setSoCot] = useState(1); 
  const [selectedSeats, setSelectedSeats] = useState([]); 
  const [phongchieuId, setPhongchieuId] = useState(""); 
  const [loaigheList, setLoaigheList] = useState([]); 
  const [phongchieuList, setPhongchieuList] = useState([]); 
  const [selectedLoaiGhe, setSelectedLoaiGhe] = useState(""); 
  const [seatColors, setSeatColors] = useState({}); 

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
      ? selectedSeats.filter(seat => seat.key !== seatKey) 
      : [...selectedSeats, { key: seatKey, loaiGheId: selectedLoaiGhe }];

    setSelectedSeats(updatedSeats);
  };

  const handleSubmit = async () => {
    if (!phongchieuId || selectedSeats.length === 0 || !selectedLoaiGhe) {
      Swal.fire("Thông báo", "Vui lòng chọn phòng chiếu, loại ghế và ít nhất một ghế.", "error");
      return;
    }

    const danhSachGhe = selectedSeats.map(seat => ({
      hang: seat.key[0],
      cot: seat.key.substring(1),
      loaiGheId: seat.loaiGheId,
    }));

    try {
      await axios.post("http://localhost:3000/ghe/them-ghe", {
        phongchieu_id: phongchieuId,
        danhSachGhe,
      });
      Swal.fire("Thành công!", "Thêm ghế thành công!", "success");

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      console.error(err);
      Swal.fire("Lỗi", "Lỗi khi thêm ghế.", "error");
    }
  };

  const getLoaiGheColor = (loaiGheId) => {
    const loaiGhe = loaigheList.find(loai => loai._id === loaiGheId);
    return loaiGhe ? loaiGhe.mau : "#ccc";
  };

  const renderSeat = (hang, cot) => {
    const seatKey = `${hang}${cot}`;
    const seat = selectedSeats.find(seat => seat.key === seatKey);
    
    const seatColor = seat
      ? getLoaiGheColor(seat.loaiGheId)
      : "#fff";

    return (
      <div 
        key={seatKey} 
        className="seat-wrapper" 
        style={{ backgroundColor: seatColor }} 
        onClick={() => handleSeatClick(seatKey)}
      >
        <label>{seatKey}</label>
      </div>
    );
  };

  const renderSeats = () => {
    const rows = [];
    for (let i = 0; i < soHang; i++) {
      const hang = tenHang[i] || String.fromCharCode(65 + i);
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
    setSelectedLoaiGhe(loaiGheId);
  };

  return (
    <Layout>
      <div className="them-ghe-container">
        <h1>Thêm Ghế</h1>

        <div className="row">
          <div className="form-group col-6 col-md-2">
            <label>Phòng Chiếu:</label>
            <select className="form-control" value={phongchieuId} onChange={(e) => setPhongchieuId(e.target.value)}>
              <option value="">Chọn phòng chiếu</option>
              {phongchieuList.map(phongChieu => (
                <option key={phongChieu._id} value={phongChieu._id}>
                  {phongChieu.tenphong}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group col-6 col-md-2">
            <label>Tên Hàng Ghế:</label>
            <input
              type="text"
              value={tenHang.join(", ")}
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
            <label>Loại Ghế:</label>
            <select className="form-control" value={selectedLoaiGhe} onChange={handleLoaiGheChange}>
              <option value="">Chọn loại ghế</option>
              {loaigheList.map(loaiGhe => (
                <option key={loaiGhe._id} value={loaiGhe._id}>
                  {loaiGhe.loaighe}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="seat-map">
          {renderSeats()}
        </div>

        <button className="btn btn-primary mt-3" onClick={handleSubmit}>Thêm Ghế</button>
      </div>
    </Layout>
  );
};

export default ThemGhe;
