"use client"; 
import React from 'react';
import { Line } from 'react-chartjs-2'; // Change to Line chart
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables
import Layout from "@/app/components/admin/Layout";
import styles from './ThongKe.module.css'; // CSS module for styling
import '../../globals.css';
import '../../admin_header.css'; // Import global styles

// Register the necessary components
Chart.register(...registerables);

const ThongKePage = () => {
  // Mock data for the chart
  const revenueData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3'],
    datasets: [
      {
        label: 'Doanh Thu (VND)',
        data: [1000000, 1500000, 2000000], // Mock revenue data for 3 months
        fill: false, // No fill for line chart
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Options for the chart
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Doanh Thu (VND)',
        },
      },
    },
  };

  return (
    <Layout>
      <h1>Thống Kê</h1>
      <p>Đây là trang thống kê.</p>
      
      {/* Widgets Section */}
      <div className={styles.widgetsContainer}>
        <div className={styles.widget}>
          <h2 className={styles.title}>Đơn Hàng Mới</h2>
          <p className={styles.value}>5</p>
          <button className={styles.seeMoreButton}>
            Xem Thêm &gt;
          </button>
        </div>
        <div className={styles.widget}>
          <h2 className={styles.title}>Số Lượng Phim</h2>
          <p className={styles.value}>120</p>
          <button className={styles.seeMoreButton}>
            Xem Thêm &gt;
          </button>
        </div>
        <div className={styles.widget}>
          <h2 className={styles.title}>User Mới / Tổng User</h2>
          <p className={styles.value}>3 / 200</p>
          <button className={styles.seeMoreButton}>
            Xem Thêm &gt;
          </button>
        </div>
        <div className={styles.widget}>
          <h2 className={styles.title}>Bài Viết Mới / Tổng Bài Viết</h2>
          <p className={styles.value}>2 / 50</p>
          <button className={styles.seeMoreButton}>
            Xem Thêm &gt;
          </button>
        </div>
      </div>

     {/* Revenue Chart Section */}
<div className={styles.chartSection}>
  <h2 className={styles.chartTitle}>Doanh Thu 3 Tháng Gần Nhất</h2> {/* Có thể bật lại phần tiêu đề */}
  <div className={styles.chart}>
    <Line data={revenueData} options={options} /> {/* Change to Line */}
  </div>
</div>


      {/* Tables Section */}
      <div className={styles.tablesContainer}>
        <div className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Đơn Hàng Mới</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID Đơn Hàng</th>
                <th>Tên Khách Hàng</th>
                <th>Ngày Đặt</th>
                <th>Tổng Tiền</th>
                <th>Hình Ảnh</th> {/* New column for images */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>Nguyễn Văn A</td>
                <td>01/09/2024</td>
                <td>1,000,000đ</td>
                <td><img src="https://via.placeholder.com/50" alt="Nguyễn Văn A" className={styles.userImage} /></td> {/* Image */}
              </tr>
              <tr>
                <td>002</td>
                <td>Trần Thị B</td>
                <td>02/09/2024</td>
                <td>1,500,000đ</td>
                <td><img src="https://via.placeholder.com/50" alt="Trần Thị B" className={styles.userImage} /></td>
              </tr>
              <tr>
                <td>003</td>
                <td>Lê Văn C</td>
                <td>03/09/2024</td>
                <td>2,000,000đ</td>
                <td><img src="https://via.placeholder.com/50" alt="Lê Văn C" className={styles.userImage} /></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Khách Hàng Mới</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID Khách Hàng</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Ngày Đăng Ký</th>
                <th>Hình Ảnh</th> {/* New column for images */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>Trần Văn B</td>
                <td>tranvanb@example.com</td>
                <td>01/09/2024</td>
                <td><img src="https://via.placeholder.com/50" alt="Trần Văn B" className={styles.userImage} /></td>
              </tr>
              <tr>
                <td>002</td>
                <td>Nguyễn Thị D</td>
                <td>nguyenthid@example.com</td>
                <td>02/09/2024</td>
                <td><img src="https://via.placeholder.com/50" alt="Nguyễn Thị D" className={styles.userImage} /></td>
              </tr>
              <tr>
                <td>003</td>
                <td>Phạm Văn E</td>
                <td>phamvane@example.com</td>
                <td>03/09/2024</td>
                <td><img src="https://via.placeholder.com/50" alt="Phạm Văn E" className={styles.userImage} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ThongKePage;
