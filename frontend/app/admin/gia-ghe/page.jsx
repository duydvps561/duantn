"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import Layout from "@/app/components/admin/Layout";
import styles from './QuanLyPhim.module.css'; // Updated for clarity
import '../../globals.css'; // Import global styles

const QuanLyGiaGhePage = () => {
  const [seatPrices, setSeatPrices] = useState([]); // State for seat prices
  const [selectedSeatPrice, setSelectedSeatPrice] = useState({
    loaighe_id: "", // ID of seat type
    giaghe: "", // Price
    giobatdau: "", // Start time
    gioketthuc: "", // End time
    trangthai: 1 // Status
  });
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [editId, setEditId] = useState(null); // ID of price being edited
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const [seatTypes, setSeatTypes] = useState([]); // State for seat types

  // Fetch seat prices and seat types from API when the component mounts
  useEffect(() => {
    fetchSeatPrices();
    fetchSeatTypes();
  }, []);

  const fetchSeatPrices = async () => {
    try {
      const response = await axios.get("http://localhost:3001/giaghe");
      setSeatPrices(response.data); // Set fetched data to state
    } catch (error) {
      console.error("Failed to fetch seat prices:", error);
      setError("Không thể tải giá ghế. Vui lòng thử lại sau.");
    } finally {
      setLoading(false); // Stop loading after data is fetched or if there is an error
    }
  };

  const fetchSeatTypes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/loaighe");
      setSeatTypes(response.data); // Set fetched data to state
    } catch (error) {
      console.error("Failed to fetch seat types:", error);
      setError("Không thể tải loại ghế. Vui lòng thử lại sau.");
    }
  };

  // Add new seat price
  const addSeatPrice = async () => {
    try {
      await axios.post("http://localhost:3001/giaghe/add", selectedSeatPrice);
      fetchSeatPrices(); // Refresh the list
      resetForm(); // Clear the input fields
    } catch (error) {
      console.error("Error adding seat price:", error);
    }
  };

  // Update seat price
  const updateSeatPrice = async (id) => {
    try {
      await axios.put(`http://localhost:3001/giaghe/update/${id}`, selectedSeatPrice);
      fetchSeatPrices(); // Refresh the list
      resetForm(); // Clear the input fields
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error("Error updating seat price:", error);
    }
  };

  // Edit handler
  const handleEdit = (id, seatPrice) => {
    setSelectedSeatPrice(seatPrice);
    setIsEditing(true);
    setEditId(id);
  };

  // Delete seat price
  const deleteSeatPrice = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/giaghe/delete/${id}`);
      fetchSeatPrices(); // Refresh the list
    } catch (error) {
      console.error("Error deleting seat price:", error);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setSelectedSeatPrice({
      loaighe_id: "",
      giaghe: "",
      giobatdau: "",
      gioketthuc: "",
      trangthai: 1
    });
  };

  if (loading) {
    return <div className={styles.loading}>Đang tải dữ liệu...</div>; // Loading message
  }

  if (error) {
    return <div className={styles.error}>{error}</div>; // Display error message
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
          {seatTypes.map(seatType => (
            <option key={seatType._id} value={seatType._id}>{seatType.loaighe}</option>
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
                <th>Giờ Bắt Đầu</th>
                <th>Giờ Kết Thúc</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
  {seatPrices.map((seatPrice, index) => (
    <tr key={seatPrice._id}>
      <td>{index + 1}</td>
      <td>{seatPrice.loaighe_id?.loaighe || "Không xác định"}</td>
      <td>{seatPrice.giaghe}</td>
      <td>{new Date(seatPrice.giobatdau).toLocaleString()}</td>
      <td>{new Date(seatPrice.gioketthuc).toLocaleString()}</td>
      {/* Add other columns as needed */}
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
