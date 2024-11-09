"use client"; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import styles from './QuanLyPhong.module.css'; // CSS module for styling
import '../../globals.css';
import '../../admin_header.css'; // Import global styles

const QuanLyPhongPage = () => {
  const [rooms, setRooms] = useState([]); // State for room list
  const [roomName, setRoomName] = useState(''); // State for room name input
  const [status, setStatus] = useState('1'); // Default status is "1"
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:3000/loaiphong');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const addRoom = async () => {
    try {
      await axios.post('http://localhost:3000/loaiphong/add', { loaiphong: roomName, trangthai: status });
      fetchRooms(); // Refresh the list
      setRoomName(''); // Clear the input
      setStatus('1'); // Reset status to default
    } catch (error) {
      console.error('Error adding room:', error);
    }
  };


  const updateRoom = async (id) => {
    try {
      await axios.put(`http://localhost:3000/loaiphong/update/${id}`, { loaiphong: roomName, trangthai: status });
      fetchRooms(); // Refresh the list
      setRoomName(''); // Clear the input
      setStatus('1'); // Reset status to default
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  const handleEdit = (id, currentName, currentStatus) => {
    setRoomName(currentName);
    setStatus(currentStatus);
    setIsEditing(true);
    setEditId(id);
  };

  // Delete room
 // Delete room with confirmation
const deleteRoom = async (id) => {
  const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa phòng này không?');
  if (!isConfirmed) return;

  try {
    await axios.delete(`http://localhost:3000/loaiphong/delete/${id}`);
    fetchRooms(); // Refresh the list
  } catch (error) {
    console.error('Error deleting room:', error);
  }
};


  return (
    <Layout>
   <h1 style={{
  display: 'flex', 
  justifyContent: 'center',

  alignItems: 'center', 
}}>
        Quản Lý Phòng Phim</h1>

      {/* Form to Add or Edit Room */}
      <div style={{
  display: 'flex',
  gap: '1rem', 
  justifyContent: 'space-between'

}}>
   <div style={{
  flex: 4,
  
}} className={styles.formContainer}>
   <h1 style={{
  display: 'flex', 
  justifyContent: 'center',
    marginBottom: '2rem',
  alignItems: 'center', 
}}>
         </h1>
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
        <button 
          onClick={isEditing ? () => updateRoom(editId) : addRoom} 
          className={styles.submitButton}
        >
          {isEditing ? 'Cập Nhật' : 'Thêm Phòng'}
        </button>
      </div>

      {/* Tables Section */}
      <div style={{
  flex: 6,
  
}} className={styles.tablesContainer}>
        <div className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Danh Sách Phòng</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên Phòng</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr key={room._id}>
                  <td>{index + 1}</td>
                  <td>{room.loaiphong}</td>
                  <td>{room.trangthai === '1' ? 'Đang Hoạt Động' : 'Ngừng Hoạt Động'}</td>
                  <td>
                    <button 
                      className={styles.editButton} 
                      onClick={() => handleEdit(room._id, room.loaiphong, room.trangthai)}
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
   </div>
    </Layout>
  );
};

export default QuanLyPhongPage;
