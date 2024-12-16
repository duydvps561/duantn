"use client"; 
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import styles from './QuanLyDoAn.module.css'; 
import '../../globals.css';
import '../../admin_header.css';
import Link from 'next/link';
import Swal from 'sweetalert2';

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:3000/food'); 
        const sortedFoods = response.data.sort((a, b) => {
          // Sorting by 'createdAt' (if it exists) or by '_id' (MongoDB IDs are generated in a time-order sequence)
          return new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id);
        });
        
        setFoods(sortedFoods);
        setFilteredFoods(sortedFoods);
        setNoResults(false);
      } catch (error) {
        console.error('Error fetching food items:', error);
        Swal.fire('Error', 'Có lỗi xảy ra khi lấy danh sách đồ ăn!', 'error');
      }
    };
    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa món ăn này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    });

    if (confirmed.isConfirmed) {
      try {
        await axios.delete(`https://backend-duan-9qb7.onrender.com/food/delete/${id}`);
        setFoods(foods.filter(food => food._id !== id));
        setFilteredFoods(filteredFoods.filter(food => food._id !== id));
        Swal.fire('Xóa thành công!', 'Món ăn đã được xóa.', 'success');
      } catch (error) {
        console.error('Error deleting food item:', error);
        Swal.fire('Lỗi', 'Có lỗi xảy ra khi xóa món ăn!', 'error');
      }
    }
  };

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const indexOfLastFood = currentPage * itemsPerPage;
  const indexOfFirstFood = indexOfLastFood - itemsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood);

  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  return (
    <Layout>
      <h1>Quản Lý Đồ Ăn</h1>
      <p>Đây là trang quản lý đồ ăn.</p>
      <div className={styles.addFoodButtonContainer}>
        <Link href="/admin/do-an/them">
          <button className={styles.addFoodButton}>Thêm Đồ Ăn</button>
        </Link>
      </div>

      <div className={styles.tablesContainer}>
        <div className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Danh Sách Đồ Ăn</h2>
          {noResults && <div className={styles.error}>Sản phẩm không tồn tại!</div>}
          <table className={styles.table}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Hình</th>
                <th>Giá</th>
                <th>Loại</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {currentFoods.length > 0 ? (
                currentFoods.map((food, index) => (
                  <tr key={food._id}>
                    <td>{indexOfFirstFood + index + 1}</td>
                    <td>{food.tenfood}</td>
                    <td>
                      <img 
                        src={`https://backend-duan-9qb7.onrender.com/img/food/${food.img}`} 
                        alt={food.tenfood} 
                        className={styles.foodImage} 
                      />
                    </td>
                    <td>{food.gia} VND</td>
                    <td>{food.loai}</td>
                    <td>{food.trangthai === 1 ? 'Còn hàng' : 'Hết hàng'}</td>
                    <td>
                      <Link href={`/admin/do-an/sua?id=${food._id}`}>
                        <button className={styles.editButton}>Sửa</button>
                      </Link>
                      <button 
                        className={styles.deleteButton} 
                        onClick={() => handleDelete(food._id)}>
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className={styles.noData}>Không có món ăn nào.</td>
                </tr>
              )}
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
    </Layout>
  );
};

export default FoodList;
