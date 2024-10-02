"use client"; 
import React from 'react';
import Layout from "@/app/components/admin/Layout";
import styles from './QuanLyDoAn.module.css'; // CSS module for styling
import '../../globals.css'; // Import global styles

const QuanLyDoAnPage = () => {
  // Mock data for the food list
  const foodItems = [
    {
      id: 1,
      name: 'Món 1',
      image: 'https://promotion.sony.com.vn/Data/Sites/1/media/pawgraphy/tips-food/s%E1%BB%AD-d%E1%BB%A5ng-ch%C3%A2n-m%C3%A1y-%C4%91%E1%BB%83-th%E1%BB%AD-c%C3%A1c-b%E1%BB%91-c%E1%BB%A5c---vietnam-food-stylist.jpg',
      price: '50.000 VNĐ',
      type: 'Món Chính',
      status: 'Còn Hàng',
    },
    {
      id: 2,
      name: 'Món 2',
      image: 'https://promotion.sony.com.vn/Data/Sites/1/media/pawgraphy/tips-food/s%E1%BB%AD-d%E1%BB%A5ng-ch%C3%A2n-m%C3%A1y-%C4%91%E1%BB%83-th%E1%BB%AD-c%C3%A1c-b%E1%BB%91-c%E1%BB%A5c---vietnam-food-stylist.jpg',
      price: '30.000 VNĐ',
      type: 'Món Phụ',
      status: 'Hết Hàng',
    },
    {
      id: 3,
      name: 'Món 3',
      image: 'https://promotion.sony.com.vn/Data/Sites/1/media/pawgraphy/tips-food/s%E1%BB%AD-d%E1%BB%A5ng-ch%C3%A2n-m%C3%A1y-%C4%91%E1%BB%83-th%E1%BB%AD-c%C3%A1c-b%E1%BB%91-c%E1%BB%A5c---vietnam-food-stylist.jpg',
      price: '20.000 VNĐ',
      type: 'Tráng Miệng',
      status: 'Còn Hàng',
    },
    // Thêm món ăn khác nếu cần
  ];

  return (
    <Layout>
      <h1>Quản Lý Đồ Ăn</h1>
      <p>Đây là trang quản lý đồ ăn.</p>

      {/* Nút Thêm Đồ Ăn */}
      <div className={styles.addFoodButtonContainer}>
        <button className={styles.addFoodButton}>Thêm Đồ Ăn</button>
      </div>

      {/* Tables Section */}
      <div className={styles.tablesContainer}>
        <div className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Danh Sách Đồ Ăn</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Loại</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {foodItems.map((food, index) => (
                <tr key={food.id}>
                  <td>{index + 1}</td>
                  <td><img src={food.image} alt={food.name} className={styles.foodImage} /></td>
                  <td>{food.name}</td>
                  <td>{food.price}</td>
                  <td>{food.type}</td>
                  <td>{food.status}</td>
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

export default QuanLyDoAnPage;
