"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import Link from 'next/link';
import styles from './QuanLyPhong.module.css'; // CSS module for styling
import '../../globals.css';
import '../../admin_header.css'; // Import global styles

const QuanLyPhongPage = () => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [status, setStatus] = useState('1');
  const [roomType, setRoomType] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRoomTypes();
    fetchRooms();
  }, []);

  const fetchRoomTypes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/loaiphong');
      setRoomTypes(response.data);
    } catch (error) {
      console.error('Error fetching room types:', error);
      alert('Có lỗi xảy ra khi lấy danh sách loại phòng.');
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:3000/phongchieu');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      alert('Có lỗi xảy ra khi lấy danh sách phòng.');
    }
  };

  const validateInputs = () => {
    if (!roomName.trim()) {
      alert('Vui lòng nhập tên phòng.');
      return false;
    }
    if (!roomType) {
      alert('Vui lòng chọn loại phòng.');
      return false;
    }
    return true;
  };

  const addRoom = async () => {
    if (!validateInputs()) return;

    const roomData = { 
      tenphong: roomName, 
      trangthai: status, 
      loaiphong_id: roomType // Đảm bảo rằng đây là trường đúng
    };

    try {
      const response = await axios.post('http://localhost:3000/phongchieu/add', roomData);
      if (response.status === 201) {
        fetchRooms();
        resetForm();
      }
    } catch (error) {
      if (error.response) {
        console.error('Error adding room:', error.response.data);
        alert(`Có lỗi xảy ra khi thêm phòng: ${error.response.data.error || error.response.statusText}`);
      } else {
        console.error('Error adding room:', error);
        alert('Có lỗi xảy ra khi thêm phòng.');
      }
    }
  };

  const updateRoom = async (id) => {
    if (!validateInputs()) return;

    const roomData = { 
      tenphong: roomName, 
      trangthai: status, 
      loaiphong_id: roomType
    };

    try {
      await axios.put(`http://localhost:3000/phongchieu/update/${id}`, roomData);
      fetchRooms();
      resetForm();
    } catch (error) {
      console.error('Error updating room:', error);
      alert('Có lỗi xảy ra khi cập nhật phòng.');
    }
  };

  const handleEdit = (id, currentName, currentStatus, currentType) => {
    setRoomName(currentName);
    setStatus(currentStatus);
    setRoomType(currentType);
    setIsEditing(true);
    setEditId(id);
  };

  const deleteRoom = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa phòng này không?')) {
      try {
        await axios.delete(`http://localhost:3000/phongchieu/delete/${id}`);
        fetchRooms();
      } catch (error) {
        console.error('Error deleting room:', error);
        alert('Có lỗi xảy ra khi xóa phòng.');
      }
    }
  };

  const resetForm = () => {
    setRoomName('');
    setStatus('1');
    setRoomType('');
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <Layout>
<<<<<<< HEAD
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
=======
      <h1>Quản Lý Phòng Phim</h1>
      <p>Đây là trang quản lý phòng phim.</p>
      <div className="d-flex justify-content-end align-items-center mb-3">
                    <Link href="/admin/phong-phim/them-ghe" className="btn btn-primary">
                        Thêm Ghế
                    </Link>
      </div>
      <div className={styles.formContainer}>
>>>>>>> 516d32125c19b354b51fd556efb1e1560f2aa00a
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
          <option value="">Chọn loại phòng</option>
          {roomTypes.map((type) => (
            <option key={type._id} value={type._id}>{type.loaiphong}</option> 
          ))}
        </select>
        <button 
          onClick={isEditing ? () => updateRoom(editId) : addRoom} 
          className={styles.submitButton}
        >
          {isEditing ? 'Cập Nhật' : 'Thêm Phòng'}
        </button>
      </div>
<<<<<<< HEAD

      {/* Tables Section */}
      <div style={{
  flex: 6,
  
}} className={styles.tablesContainer}>
=======
      <div className={styles.tablesContainer}>
>>>>>>> 516d32125c19b354b51fd556efb1e1560f2aa00a
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
                  <td>
                  <Link href={`/admin/phong-phim/chitietphongphim?id=${room._id}`} className="btn me-2 sua">
                                {room.tenphong}
                  </Link>
                  </td>
                  <td>{room.trangthai === '1' ? 'Đang Hoạt Động' : 'Ngừng Hoạt Động'}</td>
                  <td>{room.loaiphong}</td>
                  <td>
                    <button 
                      className={styles.editButton} 
                      onClick={() => handleEdit(room._id, room.tenphong, room.trangthai, room.loaiphong)}
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
