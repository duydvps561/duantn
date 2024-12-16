"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Layout from "@/app/components/admin/Layout";
import styles from './QuanLyTinTuc.module.css'; // Create this CSS file to style the news management page
import "../../globals.css";

const TinTucPage = () => {
  const [tintucs, setTintucs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-duan-9qb7.onrender.com/tintuc');
        setTintucs(response.data);
      } catch (error) {
        console.error('Error fetching tin tuc:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://backend-duan-9qb7.onrender.com/tintuc/deletetintuc/${id}`);
      setTintucs(tintucs.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting tin tuc:', error);
    }
  };

  const sortedTintucs = tintucs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedTintucs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(sortedTintucs.length / itemsPerPage);

  return (
    <Layout>
      <div className={styles.newsManagement}>
        <h1 className={styles.title}>Quản Lý Tin Tức</h1>
        <div className={styles.addNewsButtonContainer}>
          <Link href="/admin/tin-tuc/them">
            <button className={styles.addNewsButton}>Thêm Tin Tức</button>
          </Link>
        </div>

        <div className={styles.tablesContainer}>
          <div className={styles.tableSection}>
            <h2 className={styles.tableTitle}>Danh Sách Tin Tức</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Tiêu đề</th>
                  <th>Hình ảnh</th>
                  <th>Mô tả</th>
                  <th>Ngày đăng</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(tin => (
                  <tr key={tin._id}>
                    <td>{tin.title}</td>
                    <td>
                    <img src={`https://backend-duan-9qb7.onrender.com/img/tintuc/${tin.image}`} alt={tin.title} className={styles.newsImage} />
                  </td>
                    <td>{tin.describe}</td>
                    <td>{new Date(tin.createdAt).toLocaleDateString()}</td>
                    <td>{tin.trangthai}</td>
                    <td>
                      <Link href={`/admin/tin-tuc/sua?id=${tin._id}`}>
                        <button className={styles.editButton}>Sửa</button>
                      </Link>
                      <button className={styles.deleteButton} onClick={() => handleDelete(tin._id)}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <nav className={styles.paginationContainer} aria-label="Pagination">
          <ul className={`pagination pagination-sm justify-content-center`}>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button onClick={() => paginate(currentPage - 1)} className="page-link">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button onClick={() => paginate(currentPage + 1)} className="page-link">
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  );
};

export default TinTucPage;
