"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import styles from '../QuanLyPhong.module.css'; // CSS module for styling
import '../../../globals.css'; // Import global styles

const QuanLyPhongPage = () => {
  const [rooms, setRooms] = useState([]); // State for room list
  const [roomName, setRoomName] = useState(''); // State for room name input
  const [status, setStatus] = useState('1'); // Default status is "1"
  const [roomType, setRoomType] = useState('Standard'); // State for room type input, with a default value
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:3000/loaiphong');
      setLoaiphongList(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const addRoom = async () => {
    try {
      await axios.post('http://localhost:3000/loaiphong/add', { loaiphong, trangthai });
      fetchLoaiphongs(); // Refresh the list
      setLoaiphong(''); // Clear the input
      setTrangthai('1'); // Reset status to default
      console.log({ loaiphong, trangthai })
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };

  const updateRoom = async (id) => {
    try {
      await axios.put(`http://localhost:3000/loaiphong/update/${id}`, { loaiphong, trangthai });
      fetchLoaiphongs(); // Refresh the list
      setLoaiphong(''); // Clear the input
      setTrangthai('1'); // Reset status to default
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const handleEdit = (room) => {
    setRoomName(room.tenphong);
    setStatus(room.trangthai);
    setRoomType(room.loaiphong_id); // Ensure this matches your data structure
    setIsEditing(true);
    setEditId(room._id);
  };

  const deleteRoom = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/loaiphong/delete/${id}`);
      fetchLoaiphongs(); // Refresh the list
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  const resetForm = () => {
    setRoomName('');
    setStatus('1');
    setRoomType('Standard');
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <Layout>
      <h1>Quản Lý Phòng Phim</h1>
      <p>Đây là trang quản lý phòng phim.</p>

      {/* Form to Add or Edit Room */}
      <div className={styles.formContainer}>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Nhập tên phòng"
          className={styles.inputField}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.selectField}
        >
          <option value="1">Đang Hoạt Động</option>
          <option value="0">Ngừng Hoạt Động</option>
        </select>
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className={styles.selectField}
        >
          <option value="Standard">Tiêu Chuẩn</option>
          <option value="VIP">VIP</option>
          <option value="Deluxe">Deluxe</option>
        </select>
        <button 
          onClick={isEditing ? () => updateRoom(editId) : addRoom} 
          className={styles.submitButton}
        >
          {isEditing ? 'Cập Nhật' : 'Thêm Phòng'}
        </button>
      </div>

      {/* Tables Section */}
      <div className={styles.tablesContainer}>
        <div className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Danh Sách Phòng</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên Phòng</th>
                <th>Trạng Thái</th>
                <th>Loại Phòng</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr key={room._id}>
                  <td>{index + 1}</td>
                  <td>{room.tenphong}</td>
                  <td>{room.trangthai === '1' ? 'Đang Hoạt Động' : 'Ngừng Hoạt Động'}</td>
                  <td>{room.loaiphong_id}</td>
                  <td>
                    <button 
                      className={styles.editButton} 
                      onClick={() => handleEdit(room)}
                    >
                      Sửa
                    </button>
                    <button 
                      className={styles.deleteButton} 
                      onClick={() => deleteRoom(room._id)}
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

export default QuanLyPhongPage;
