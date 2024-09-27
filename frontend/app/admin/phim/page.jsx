"use client"; 
import React from 'react';
import Layout from "@/app/components/admin/Layout";
import styles from './QuanLyPhim.module.css'; // CSS module for styling
import '../../globals.css'; // Import global styles

const QuanLyPhimPage = () => {
  // Mock data for the movie list
  const movies = [
    {
      id: 1,
      name: 'Phim A',
      room: 'Phòng 1',
      type: 'Hành Động',
      duration: '120 phút',
      status: 'Đang Chiếu',
      image: 'https://via.placeholder.com/50'
    },
    {
      id: 2,
      name: 'Phim B',
      room: 'Phòng 2',
      type: 'Kinh Dị',
      duration: '90 phút',
      status: 'Sắp Chiếu',
      image: 'https://via.placeholder.com/50'
    },
    {
      id: 3,
      name: 'Phim C',
      room: 'Phòng 3',
      type: 'Lãng Mạn',
      duration: '110 phút',
      status: 'Ngừng Chiếu',
      image: 'https://via.placeholder.com/50'
    },
    {
      id: 3,
      name: 'Phim C',
      room: 'Phòng 3',
      type: 'Lãng Mạn',
      duration: '110 phút',
      status: 'Ngừng Chiếu',
      image: 'https://via.placeholder.com/50'
    },
    {
      id: 3,
      name: 'Phim C',
      room: 'Phòng 3',
      type: 'Lãng Mạn',
      duration: '110 phút',
      status: 'Ngừng Chiếu',
      image: 'https://via.placeholder.com/50'
    },
    {
      id: 3,
      name: 'Phim C',
      room: 'Phòng 3',
      type: 'Lãng Mạn',
      duration: '110 phút',
      status: 'Ngừng Chiếu',
      image: 'https://via.placeholder.com/50'
    },
    {
      id: 3,
      name: 'Phim C',
      room: 'Phòng 3',
      type: 'Lãng Mạn',
      duration: '110 phút',
      status: 'Ngừng Chiếu',
      image: 'https://via.placeholder.com/50'
    },
    {
      id: 3,
      name: 'Phim C',
      room: 'Phòng 3',
      type: 'Lãng Mạn',
      duration: '110 phút',
      status: 'Ngừng Chiếu',
      image: 'https://via.placeholder.com/50'
    },
    {
      id: 3,
      name: 'Phim C',
      room: 'Phòng 3',
      type: 'Lãng Mạn',
      duration: '110 phút',
      status: 'Ngừng Chiếu',
      image: 'https://via.placeholder.com/50'
    },
  ];

  return (
    <Layout>
      <h1>Quản Lý Phim</h1>
      <p>Đây là trang quản lý phim.</p>

      {/* Nút Thêm Phim */}
      <div className={styles.addMovieButtonContainer}>
        <button className={styles.addMovieButton}>Thêm Phim</button>
      </div>

      {/* Tables Section */}
      <div className={styles.tablesContainer}>
        <div className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Danh Sách Phim</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Tên Phim</th>
                <th>Phòng</th>
                <th>Loại</th>
                <th>Thời Lượng</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, index) => (
                <tr key={movie.id}>
                  <td>{index + 1}</td>
                  <td><img src={"https://bazaarvietnam.vn/wp-content/uploads/2022/01/Harpers-Bazaar-phim-thang-2-sing2-scaled.jpg"} alt={movie.name} className={styles.movieImage} /></td>
                  <td>{movie.name}</td>
                  <td>{movie.room}</td>
                  <td>{movie.type}</td>
                  <td>{movie.duration}</td>
                  <td>{movie.status}</td>
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

export default QuanLyPhimPage;
