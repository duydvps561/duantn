"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import Layout from "@/app/components/admin/Layout";
import styles from './QuanLyPhim.module.css'; // Renamed for clarity
import '../../globals.css'; // Import global styles

const QuanLyLoaiGhePage = () => {
  const [seatTypes, setSeatTypes] = useState([]); // State for seat types
  const [seatTypeName, setSeatTypeName] = useState(""); // State for new seat type name
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const [editId, setEditId] = useState(null); // ID of seat type being edited
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  // Fetch seat types from API when the component mounts
  useEffect(() => {
    fetchSeatTypes();
  }, []);

  const fetchSeatTypes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/loaighe");
      setSeatTypes(response.data); // Set fetched data to state
    } catch (error) {
      console.error("Failed to fetch seat types:", error);
      setError("Không thể tải loại ghế. Vui lòng thử lại sau.");
    } finally {
      setLoading(false); // Stop loading after data is fetched or if there is an error
    }
  };

  // Add new seat type
  const addSeatType = async () => {
    try {
      await axios.post("http://localhost:3001/loaighe/add", { loaighe: seatTypeName });
      fetchSeatTypes(); // Refresh the list
      setSeatTypeName(""); // Clear the input
    } catch (error) {
      console.error("Error adding seat type:", error);
    }
  };

  // Update seat type
  const updateSeatType = async (id) => {
    try {
      await axios.put(`http://localhost:3001/loaighe/update/${id}`, { loaighe: seatTypeName });
      fetchSeatTypes(); // Refresh the list
      setSeatTypeName(""); // Clear the input
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error("Error updating seat type:", error);
    }
  };

  // Edit handler
  const handleEdit = (id, currentSeatType) => {
    setSeatTypeName(currentSeatType);
    setIsEditing(true);
    setEditId(id);
  };

  // Delete seat type
  const deleteSeatType = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/loaighe/delete/${id}`);
      fetchSeatTypes(); // Refresh the list
    } catch (error) {
      console.error("Error deleting seat type:", error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Đang tải dữ liệu...</div>; // Loading message
  }

  if (error) {
    return <div className={styles.error}>{error}</div>; // Display error message
  }

  return (
    <Layout>
      <h1>Quản Lý Loại Ghế</h1>
      <p>Đây là trang quản lý các loại ghế.</p>

      {/* Form to Add or Edit Seat Type */}
      <div className={styles.formContainer}>
        <input
          type="text"
          value={seatTypeName}
          onChange={(e) => setSeatTypeName(e.target.value)}
          placeholder="Nhập loại ghế"
          className={styles.inputField}
        />
        <button
          className={styles.addButton}
          onClick={isEditing ? () => updateSeatType(editId) : addSeatType}
        >
          {isEditing ? "Cập Nhật" : "Thêm Loại Ghế"}
        </button>
      </div>

      {/* Tables Section */}
      <div className={styles.tablesContainer}>
        <div className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Danh Sách Loại Ghế</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Loại Ghế</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {seatTypes.map((seatType, index) => (
                <tr key={seatType._id}>
                  <td>{index + 1}</td>
                  <td>{seatType.loaighe}</td>
                  <td>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEdit(seatType._id, seatType.loaighe)}
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
    </Layout>
  );
};

export default QuanLyLoaiGhePage;
