"use client";
import React, { useState, useEffect } from 'react';
import Layout from "@/app/components/admin/Layout";
import Link from 'next/link'; // Import Link from next/link
import styles from './QuanLyPhim.module.css';
import '../../globals.css';
import '../../admin_header.css';
const QuanLyPhimPage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/phim');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);
  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('vi-VN');
  };
  const deleteMovie = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phim này?')) {
      try {
        const response = await fetch(`http://localhost:3000/phim/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete movie');
        }
        setMovies(movies.filter(movie => movie._id !== id));
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    }
  };
  return (
    <Layout>
<h1 style={{
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
}}>
  Quản Lý Phim
</h1>
      <div className={styles.addMovieButtonContainer}>
      <Link href="/admin/phim/add" className={styles.deleteButton}>THÊM PHIM</Link>
      </div>

      <div className={styles.tablesContainer}>
        <div className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Danh Sách Phim</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Tên Phim</th>
                {/* <th>Nội Dung</th>
                <th>Thời Lượng</th>
                <th>Đạo Diễn</th>
                <th>Diễn Viên</th>
                <th>Trailler</th> */}
                <th>Ngày Hiệu Lực</th>
                <th>Ngày Hiệu Lực Đến</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, index) => (
                <tr key={movie._id}>
                  <td>{index + 1}</td>
                  <td>
                  {movie.img && <img src={`http://localhost:3001/img/phims/${movie.img}`} alt={movie.tenphim} className={styles.movieImage} />}

                  </td>
                  <td style={{'textTransform': "uppercase"}}>{movie.tenphim}</td>
                  {/* <td>{movie.noidung}</td>
                  <td>{movie.thoiluong}</td>
                  <td>{movie.daodien}</td>
                  <td>{movie.dienvien}</td> */}
                  {/* <td>
                    <a href={movie.trailler} target="_blank" rel="noopener noreferrer">Xem Trailler</a>
                  </td> */}
                  <td>{formatDate(movie.ngayhieuluc)}</td>
                  <td>{formatDate(movie.ngayhieulucden)}</td>
                  <td>{movie.trangthai === '0' ? 'Hoạt Động' : 'Không Hoạt Động'}</td>
                  <td style={{display: 'flex'}}>
                  <Link href={`/admin/phim/edit?id=${movie._id}`} style={{background: '#4d6950', color: 'white'}} className="btn me-2 sua">Sửa</Link>
                    <button className={styles.deleteButton} onClick={() => deleteMovie(movie._id)}>Xóa</button>
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