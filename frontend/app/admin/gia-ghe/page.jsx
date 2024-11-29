"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/app/components/admin/Layout";
import styles from "./QuanLyPhim.module.css";
import "../../globals.css";
import Swal from 'sweetalert2';

const QuanLyGiaGhePage = () => {
  const [seatPrices, setSeatPrices] = useState([]);
  const [selectedSeatPrice, setSelectedSeatPrice] = useState({
    loaighe_id: "",
    giaghe: "",
    giobatdau: "",
    gioketthuc: "",
    ngaycuoituan: 0, // thêm ngaycuoituan
    trangthai: 1,    // thêm trangthai
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seatTypes, setSeatTypes] = useState([]);

  useEffect(() => {
    fetchSeatPrices();
    fetchSeatTypes();
  }, []);

  const fetchSeatPrices = async () => {
    try {
      const response = await axios.get("http://localhost:3000/giaghe");
      setSeatPrices(response.data);
    } catch (error) {
      console.error("Failed to fetch seat prices:", error);
      setError("Không thể tải giá ghế. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSeatTypes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/loaighe");
      setSeatTypes(response.data);
    } catch (error) {
      console.error("Failed to fetch seat types:", error);
      setError("Không thể tải loại ghế. Vui lòng thử lại sau.");
    }
  };

  const addSeatPrice = async () => {
    try {
      await axios.post("http://localhost:3000/giaghe/add", selectedSeatPrice);
      
      // Hiển thị thông báo thành công
      await Swal.fire({
        title: 'Thành công!',
        text: 'Giá vé đã được thêm thành công.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
  
      fetchSeatPrices(); // Cập nhật danh sách giá vé
      resetForm(); // Đặt lại form
    } catch (error) {
      console.error("Error adding seat price:", error);
      
      // Hiển thị thông báo lỗi
      Swal.fire({
        title: 'Lỗi!',
        text: 'Có lỗi xảy ra khi thêm giá vé.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const updateSeatPrice = async (id) => {
    try {
      await axios.put(`http://localhost:3000/giaghe/update/${id}`, selectedSeatPrice);
      
      // Hiển thị thông báo thành công
      await Swal.fire({
        title: 'Thành công!',
        text: 'Giá vé đã được cập nhật thành công.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
  
      fetchSeatPrices(); // Cập nhật danh sách giá vé
      resetForm(); // Đặt lại form
      setIsEditing(false); // Đặt trạng thái chỉnh sửa về false
      setEditId(null); // Đặt ID chỉnh sửa về null
    } catch (error) {
      console.error("Error updating seat price:", error);
      // Hiển thị thông báo lỗi
      Swal.fire({
        title: 'Lỗi!',
        text: 'Có lỗi xảy ra khi cập nhật giá vé.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleEdit = (id, seatPrice) => {
    setSelectedSeatPrice(seatPrice);
    setIsEditing(true);
    setEditId(id);
  };

  const deleteSeatPrice = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/giaghe/delete/${id}`);
      
      // Hiển thị thông báo thành công
      await Swal.fire({
        title: 'Xóa thành công!',
        text: 'Giá vé đã được xóa thành công.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
  
      fetchSeatPrices(); // Cập nhật danh sách giá vé
    } catch (error) {
      console.error("Error deleting seat price:", error);
      // Hiển thị thông báo lỗi
      Swal.fire({
        title: 'Lỗi!',
        text: 'Có lỗi xảy ra khi xóa giá vé.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  

  const resetForm = () => {
    setSelectedSeatPrice({
      loaighe_id: "",
      giaghe: "",
      giobatdau: "",
      gioketthuc: "",
      trangthai: 1,
    });
  };

  // Chuyển đổi ngày thành thứ trong tuần
  const getWeekday = (dateString) => {
    const days = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  // Kiểm tra xem ngày có phải là cuối tuần hay không
  const isWeekend = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day === 0 || day === 6; // Chủ Nhật (0) hoặc Thứ 7 (6)
  };

  // Điều chỉnh giá ghế cho ngày lễ hoặc cuối tuần
  const adjustSeatPrice = (seatPrice) => {
    if (isWeekend(seatPrice.giobatdau)) {
      return seatPrice.giaghe * 1.5; // Tăng 50% giá vào cuối tuần
    }
    return seatPrice.giaghe;
  };

  if (loading) {
    return <div className={styles.loading}>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <Layout>
      <h1>Quản Lý Giá Ghế</h1>
      <p>Đây là trang quản lý các giá ghế.</p>

      {/* Form to Add or Edit Seat Price */}
      <div className={styles.formContainer}>
        <select
          value={selectedSeatPrice.loaighe_id}
          onChange={(e) => setSelectedSeatPrice({ ...selectedSeatPrice, loaighe_id: e.target.value })}
          className={styles.selectField}
        >
          <option value="">Chọn loại ghế</option>
          {seatTypes.map((seatType) => (
            <option key={seatType._id} value={seatType._id}>
              {seatType.loaighe}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={selectedSeatPrice.giaghe}
          onChange={(e) => setSelectedSeatPrice({ ...selectedSeatPrice, giaghe: e.target.value })}
          placeholder="Nhập giá ghế"
          className={styles.inputField}
        />
        <input
          type="datetime-local"
          value={selectedSeatPrice.giobatdau}
          onChange={(e) => setSelectedSeatPrice({ ...selectedSeatPrice, giobatdau: e.target.value })}
          className={styles.inputField}
        />
        <input
          type="datetime-local"
          value={selectedSeatPrice.gioketthuc}
          onChange={(e) => setSelectedSeatPrice({ ...selectedSeatPrice, gioketthuc: e.target.value })}
          className={styles.inputField}
        />
       <label style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
  <span style={{ marginRight: '10px', color: 'black' }}>Áp dụng cho cuối tuần</span>
  <input
    type="checkbox"
    checked={selectedSeatPrice.ngaycuoituan === 1}
    onChange={(e) => setSelectedSeatPrice({ ...selectedSeatPrice, ngaycuoituan: e.target.checked ? 1 : 0 })}
    style={{ width: '40px', height: '20px', cursor: 'pointer' }}
  />
</label>

{/* Toggle cho Trạng Thái */}
<label style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
  <span style={{ marginRight: '10px', color: 'black' }}>Trạng thái hoạt động</span>
  <input
    type="checkbox"
    checked={selectedSeatPrice.trangthai === 1}
    onChange={(e) => setSelectedSeatPrice({ ...selectedSeatPrice, trangthai: e.target.checked ? 1 : 0 })}
    style={{ width: '40px', height: '20px', cursor: 'pointer' }}
  />
</label>

        <button
          className={styles.addButton}
          onClick={isEditing ? () => updateSeatPrice(editId) : addSeatPrice}
        >
          {isEditing ? "Cập Nhật" : "Thêm Giá Ghế"}
        </button>
      </div>

      {/* Tables Section */}
      <div className={styles.tablesContainer}>
        <div className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Danh Sách Giá Ghế</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Loại Ghế</th>
                <th>Giá Ghế</th>
                <th>Ngày Bắt Đầu</th>
                <th>Ngày Kết Thúc</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {seatPrices.map((seatPrice, index) => (
                <tr key={seatPrice._id}>
                  <td>{index + 1}</td>
                  <td>{seatPrice.loaighe_id?.loaighe || "Không xác định"}</td>
                  <td>{adjustSeatPrice(seatPrice)}</td>
                  <td>{`${getWeekday(seatPrice.giobatdau)}  `}</td>
                  <td>{`${getWeekday(seatPrice.gioketthuc)}  `}</td>
                  <td>{seatPrice.ngaycuoituan === 1 ? "Có" : "Không"}</td>
            <td>{seatPrice.trangthai === 1 ? "Hoạt động" : "Không hoạt động"}</td>
                  <td>
                  <td>
           <button className={`${styles.actionButton} ${styles.editButton}`} onClick={() => handleEdit(seatPrice._id, seatPrice)}>Chỉnh sửa</button>
           <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={() => deleteSeatPrice(seatPrice._id)}>Xóa</button>
        </td>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>    
        </div>
      </div>
    </Layout>
  );
};

export default QuanLyGiaGhePage;
