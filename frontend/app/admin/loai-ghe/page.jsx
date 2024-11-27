"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import styles from './QuanLyPhim.module.css';
import '../../globals.css';
import '../../admin_header.css';
import { SketchPicker } from 'react-color';

const QuanLyLoaiGhePage = () => {
  const [seatTypes, setSeatTypes] = useState([]);
  const [seatTypeName, setSeatTypeName] = useState("");
  const [seatTypeColor, setSeatTypeColor] = useState("#000000"); // State for seat type color
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSeatTypes();
  }, []);

  const fetchSeatTypes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/loaighe");
      setSeatTypes(response.data);
    } catch (error) {
      console.error("Failed to fetch seat types:", error);
      setError("Không thể tải loại ghế. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const addSeatType = async () => {
    try {
      await axios.post("http://localhost:3000/loaighe/add", { 
        loaighe: seatTypeName,
        mau: seatTypeColor // Add color field
      });
      fetchSeatTypes();
      setSeatTypeName("");
      setSeatTypeColor("#000000"); // Reset color to default
    } catch (error) {
      console.error("Error adding seat type:", error);
    }
  };

  const updateSeatType = async (id) => {
    try {
      await axios.put(`http://localhost:3000/loaighe/update/${id}`, { 
        loaighe: seatTypeName,
        mau: seatTypeColor // Add color field
      });
      fetchSeatTypes();
      setSeatTypeName("");
      setSeatTypeColor("#000000"); // Reset color to default
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error("Error updating seat type:", error);
    }
  };

  const handleEdit = (id, currentSeatType, currentColor) => {
    setSeatTypeName(currentSeatType);
    setSeatTypeColor(currentColor); // Set color for editing
    setIsEditing(true);
    setEditId(id);
  };

  const deleteSeatType = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/loaighe/delete/${id}`);
      fetchSeatTypes();
    } catch (error) {
      console.error("Error deleting seat type:", error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <Layout>
      <h1 style={{
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
}}>Quản Lý Loại Ghế</h1>

      <div style={{
  display: 'flex',
  justifyContent: 'space-between',
  gap: '2rem'
}}>
  {/* Phần bên trái */}
  <div style={{
    flex: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  }}>
    <p style={{
      margin: '0',
      fontSize: '16px',
      fontWeight: 'bold'
    }}>Tên loại ghế.</p>

    <input
      type="text"
      value={seatTypeName}
      onChange={(e) => setSeatTypeName(e.target.value)}
      placeholder="Nhập loại ghế"
      style={{
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.3s'
      }}
      onFocus={(e) => e.target.style.borderColor = '#007bff'}
      onBlur={(e) => e.target.style.borderColor = '#ccc'}
    />

    <p style={{
      margin: '0',
      fontSize: '16px',
      fontWeight: 'bold'
    }}>Màu ghế.</p>

    <SketchPicker
      color={seatTypeColor}
      onChangeComplete={(color) => setSeatTypeColor(color.hex)} // Cập nhật màu khi chọn
    />

    <button
      style={{
        padding: '10px 15px',
        backgroundColor: '#4d6950',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#4d6950'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#314533'}
      onClick={isEditing ? () => updateSeatType(editId) : addSeatType}
    >
      {isEditing ? "Cập Nhật" : "Thêm Loại Ghế"}
    </button>
  </div>

  {/* Phần bên phải */}
  <div className={styles.tablesContainer} style={{ flex: 6 }}>
    <div className={styles.tableSection}>
      <h2 className={styles.tableTitle}>Danh Sách Loại Ghế</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Loại Ghế</th>
            <th>Màu</th> {/* Add color column */}
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {seatTypes.map((seatType, index) => (
            <tr key={seatType._id}>
              <td>{index + 1}</td>
              <td>{seatType.loaighe}</td>
              <td>
                <div style={{
                  backgroundColor: seatType.mau,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%'
                }} />
              </td> {/* Display color as a colored circle */}
              <td>
                <button
                  className={styles.editButton}
                  onClick={() => handleEdit(seatType._id, seatType.loaighe, seatType.mau)}
                >
                  Sửa
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteSeatType(seatType._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

    </Layout>
  );
};

export default QuanLyLoaiGhePage;
