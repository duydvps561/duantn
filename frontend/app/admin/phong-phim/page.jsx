"use client"; 
import React from 'react';
import Layout from "@/app/components/admin/Layout";
import styles from './QuanLyPhong.module.css'; // CSS module for styling
import '../../globals.css'; // Import global styles

const QuanLyPhongPage = () => {
  // Mock data for the room list
  const rooms = [
    { id: 1, name: 'Phòng 1', status: 'Đang Hoạt Động' },
    { id: 2, name: 'Phòng 2', status: 'Ngừng Hoạt Động' },
    { id: 3, name: 'Phòng 3', status: 'Đang Hoạt Động' },
    { id: 4, name: 'Phòng 4', status: 'Ngừng Hoạt Động' },
    // Thêm phòng khác nếu cần
  ];

  return (
    <Layout>
      <h1>Quản Lý Phòng Phim</h1>
      <p>Đây là trang quản lý phòng phim.</p>

      {/* Nút Thêm Phòng */}
      <div className={styles.addRoomButtonContainer}>
        <button className={styles.addRoomButton}>Thêm Phòng</button>
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
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr key={room.id}>
                  <td>{index + 1}</td>
                  <td>{room.name}</td>
                  <td>{room.status}</td>
                  <td>
                    <button className={styles.editButton}>Sửa</button>
                    <button className={styles.deleteButton}>Xóa</button>
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
