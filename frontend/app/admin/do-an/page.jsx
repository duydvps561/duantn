// "use client"; 
// import React from 'react';
// import Layout from "@/app/components/admin/Layout";
// import styles from './QuanLyDoAn.module.css'; // CSS module for styling
// import '../../globals.css'; // Import global styles

// const QuanLyDoAnPage = () => {
//   // Mock data for the food list
//   return (
//     <Layout>
//       <h1>Quản Lý Đồ Ăn</h1>
//       <p>Đây là trang quản lý đồ ăn.</p>

//       {/* Nút Thêm Đồ Ăn */}
//       <div className={styles.addFoodButtonContainer}>
//         <button className={styles.addFoodButton}>Thêm Đồ Ăn</button>
//       </div>

//       {/* Tables Section */}
//       <div className={styles.tablesContainer}>
//         <div className={styles.tableSection}>
//           <h2 className={styles.tableTitle}>Danh Sách Đồ Ăn</h2>
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th>STT</th>
//                 <th>Ảnh</th>
//                 <th>Tên</th>
//                 <th>Giá</th>
//                 <th>Loại</th>
//                 <th>Trạng Thái</th>
//                 <th>Thao Tác</th>
//               </tr>
//             </thead>
//             <tbody>
//               {foodItems.map((food, index) => (
//                 <tr key={food.id}>
//                   <td>{index + 1}</td>
//                   <td><img src={food.image} alt={food.name} className={styles.foodImage} /></td>
//                   <td>{food.name}</td>
//                   <td>{food.price}</td>
//                   <td>{food.type}</td>
//                   <td>{food.status}</td>
//                   <td>
//                     <button className={styles.editButton}>Sửa</button>
//                     <button className={styles.deleteButton}>Xóa</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default QuanLyDoAnPage;
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/app/components/admin/Layout";
// import "./ThemGhe.css";

const ThemGhe = () => {
  const [soHang, setSoHang] = useState(2); // Số hàng ghế
  const [tenHang, setTenHang] = useState([]); // Tên hàng ghế
  const [soCot, setSoCot] = useState(14); // Số cột ghế
  const [selectedSeats, setSelectedSeats] = useState([]); // Ghế đã chọn
  const [phongchieuId, setPhongchieuId] = useState(""); // ID phòng chiếu
  const [loaigheList, setLoaigheList] = useState([]); // Danh sách loại ghế
  const [phongchieuList, setPhongchieuList] = useState([]); // Danh sách phòng chiếu
  const [selectedLoaiGhe, setSelectedLoaiGhe] = useState(""); // Loại ghế được chọn

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
    if (!phongchieuId || selectedSeats.length === 0) {
      alert("Vui lòng chọn phòng chiếu và ít nhất một ghế.");
      return;
    }

    const danhSachGhe = selectedSeats.map(seat => ({
      seatKey: seat.key, // Sử dụng key cho seatKey
      loaiGheId: seat.loaiGheId,
    }));

    try {
      await axios.post("http://localhost:3000/ghe/them-ghe", {
        phongchieu_id: phongchieuId,
        danhSachGhe,
      });
      alert("Thêm ghế thành công!");
      setSelectedSeats([]); // Xóa ghế đã chọn sau khi thêm
    } catch (err) {
      console.error(err);
      alert("Lỗi khi thêm ghế.");
    }
  };

  const renderSeat = (hang, cot) => {
    const seatKey = `${hang}${cot}`; // Sửa lỗi cú pháp
    const seat = selectedSeats.find(seat => seat.key === seatKey);
    const seatColor = seat ? getColorForLoaiGhe(seat.loaiGheId) : "transparent"; // Màu ghế theo loại

    return (
      <div key={seatKey} className="seat-wrapper" style={{ backgroundColor: seatColor }}>
        <input
          type="checkbox"
          checked={!!seat}
          onChange={() => handleSeatClick(seatKey)}
        />
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

  // Hàm để lấy màu sắc cho loại ghế
  const getColorForLoaiGhe = (loaiGheId) => {
    switch (loaiGheId) {
      case "loaiA":
        return "lightblue"; // Màu cho loại A
      case "loaiB":
        return "lightgreen"; // Màu cho loại B
      // Thêm các loại và màu sắc khác nếu cần
      default:
        return "transparent"; // Mặc định
    }
  };

  const handleAddLoaiGhe = () => {
    if (selectedLoaiGhe) {
      const updatedSeats = selectedSeats.map(seat => ({
        ...seat,
        loaiGheId: selectedLoaiGhe,
      }));
      setSelectedSeats(updatedSeats);
    } else {
      alert("Vui lòng chọn loại ghế trước.");
    }
  };

  return (
    <Layout>
      <div className="them-ghe-container">
        <h1>Thêm Ghế</h1>

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

        <div className="form-group">
          <label>Số Hàng:</label>
          <input
            type="number"
            value={soHang}
            onChange={(e) => setSoHang(Number(e.target.value))}
            className="form-control"
            min="1"
          />
        </div>

        <div className="form-group">
          <label>Tên Hàng (phân tách bằng dấu phẩy, VD: A,B,C):</label>
          <input
            type="text"
            value={tenHang.join(",")}
            onChange={(e) => setTenHang(e.target.value.split(","))}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Số Cột:</label>
          <input
            type="number"
            value={soCot}
            onChange={(e) => setSoCot(Number(e.target.value))}
            className="form-control"
            min="1"
          />
        </div>

        <div className="form-group">
          <label>Chọn Loại Ghế:</label>
          <select
            value={selectedLoaiGhe}
            onChange={(e) => setSelectedLoaiGhe(e.target.value)}
            className="form-control"
          >
            <option value="">Chọn loại ghế</option>
            {loaigheList.map((loaiGhe) => (
              <option key={loaiGhe._id} value={loaiGhe._id}>
                {loaiGhe.ten}
              </option>
            ))}
          </select>
          <button onClick={handleAddLoaiGhe} className="btn btn-primary">Thêm loại ghế</button>
        </div>

        <div className="seats-container">{renderSeats()}</div>

        <button onClick={handleSubmit} className="btn btn-success">Thêm Ghế</button>
      </div>
    </Layout>
  );
};

export default ThemGhe;
