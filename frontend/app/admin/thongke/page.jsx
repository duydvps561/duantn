"use client";
import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Layout from "@/app/components/admin/Layout";
import "./ThongKe.css";
import "../../globals.css";
import "../../admin_header.css";
import Link from "next/link";
Chart.register(...registerables);

const ThongKePage = () => {
  const [stats, setStats] = useState({
    taikhoan: 0,
    tintuc: 0,
    food: 0,
    phongchieu: 0,
    ordersDaily: [],
    orderMonthly: [], // Khởi tạo với mảng rỗng
    revenueMonthly: [],
    totalRevenue: 0,
    latestTaikhoan: [],
    latestHoadon: [],
    revenueDaily: [],
    revenueMonthly: []
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          taikhoanRes,
          tintucRes,
          foodRes,
          phongchieuRes,
          dailyOrdersRes,
          monthlyOrdersRes, // Đổi tên biến để dễ hiểu
          revenueRes,
          latestTaikhoanRes,
          latestHoadonRes,
          revenueDailyRes, 
          revenueMonthlyRes,
        ] = await Promise.all([
          fetch("https://backend-duan-9qb7.onrender.com/thongke/soluong/taikhoan"),
          fetch("https://backend-duan-9qb7.onrender.com/thongke/soluong/tintuc"),
          fetch("https://backend-duan-9qb7.onrender.com/thongke/soluong/food"),
          fetch("https://backend-duan-9qb7.onrender.com/thongke/soluong/phongchieu"),
          fetch("https://backend-duan-9qb7.onrender.com/thongke/don-trong-ngay"),
          fetch("https://backend-duan-9qb7.onrender.com/thongke/don-trong-thang"),
          fetch("https://backend-duan-9qb7.onrender.com/thongke/tong-tien-hoadon"),
          fetch("https://backend-duan-9qb7.onrender.com/thongke/taikhoan-moi-nhat"),
          fetch("https://backend-duan-9qb7.onrender.com/thongke/hoadon-moi-nhat"),
          fetch("https://backend-duan-9qb7.onrender.com/thongke/doanh-thu-theo-ngay"),
          fetch("https://backend-duan-9qb7.onrender.com/thongke/doanh-thu-theo-thang")
        ]);

        setStats({
          taikhoan: (await taikhoanRes.json()).totalTaikhoan,
          tintuc: (await tintucRes.json()).totalTintuc,
          food: (await foodRes.json()).totalFood,
          phongchieu: (await phongchieuRes.json()).totalPhongchieu,
          ordersDaily: await dailyOrdersRes.json(),
          orderMonthly: await monthlyOrdersRes.json(), 
          totalRevenue: (await revenueRes.json()).total,
          latestTaikhoan: await latestTaikhoanRes.json(),
          latestHoadon: await latestHoadonRes.json(),
          revenueDaily: await revenueDailyRes.json(),
          revenueMonthly: await revenueMonthlyRes.json()
        });
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    }

    fetchStats();
  }, []);

  // Dữ liệu biểu đồ Bar (Số lượng đơn hàng theo ngày)
  const barData = {
    labels: stats.ordersDaily?.map((order) => order._id) || [],
    datasets: [
      {
        label: "Số lượng đơn hàng",
        data: stats.ordersDaily?.map((order) => order.count) || [],
        backgroundColor: "#4d6950",
        borderColor: "#4d6950",
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu biểu đồ Bar (Số lượng đơn hàng theo tháng)
  const barDatat = {
    labels: stats.orderMonthly?.map((order) => order._id) || [],
    datasets: [
      {
        label: "Số lượng đơn hàng",
        data: stats.orderMonthly?.map((order) => order.count) || [],
        backgroundColor: "#4d6950",
        borderColor: "#4d6950",
        borderWidth: 1,
      },
    ],
  };
  // Biểu đồ đường doanh thu theo ngày
const lineDataDaily = {
  labels: stats.revenueDaily?.map((item) => item._id) || [],
  datasets: [
      {
          label: "Doanh thu theo ngày",
          data: stats.revenueDaily?.map((item) => item.totalRevenue) || [],
          borderColor: "#4d6950",
          backgroundColor: "rgba(77, 105, 80, 0.2)",
          borderWidth: 2,
          tension: 0.4
      }
  ]
};

// Biểu đồ đường doanh thu theo tháng
const lineDataMonthly = {
  labels: stats.revenueMonthly?.map((item) => item._id) || [],
  datasets: [
      {
          label: "Doanh thu theo tháng",
          data: stats.revenueMonthly?.map((item) => item.totalRevenue) || [],
          borderColor: "#007bff",
          backgroundColor: "rgba(0, 123, 255, 0.2)",
          borderWidth: 2,
          tension: 0.4
      }
  ]
};

  return (
    <Layout>
      <div className="container-fluid">
        <div className="statsGrid">
        <div className="statCard">
            <h3>Tổng doanh thu</h3>
            <p>{stats.totalRevenue.toLocaleString("vi-VN")} VND</p>
          </div>
          <div className="statCard">
            <h3>Tài khoản</h3>
            <p>{stats.taikhoan}</p>
            <Link href="/admin/khach-hang">Xem thêm</Link>
          </div>
          <div className="statCard">
            <h3>Tin tức</h3>
            <p>{stats.tintuc}</p>
            <Link href="/admin/tin-tuc">Xem thêm</Link>
          </div>
          <div className="statCard">
            <h3>Món ăn</h3>
            <p>{stats.food}</p>
            <Link href="/admin/do-an">Xem thêm</Link>
          </div>
          <div className="statCard">
            <h3>Phòng chiếu</h3>
            <p>{stats.phongchieu}</p>
            <Link href="phong-phim">Xem thêm</Link>
          </div>
        </div>
        <div className="row mt-5">
          {/* Bảng tài khoản mới nhất */}
          <div className="latestSection col-6">
            <h3>Tài khoản mới nhất</h3>
            <table className="latestTable">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Ngày tạo</th>
                  <th>Hình Ảnh</th>
                </tr>
              </thead>
              <tbody>
                {stats.latestTaikhoan.map((taikhoan, index) => (
                  <tr key={index}>
                    <td>{taikhoan.email}</td>
                    <td>{new Date(taikhoan.createdAt).toLocaleDateString()}</td>
                    <td>
                      <img
                        src="https://via.placeholder.com/50"
                        alt={taikhoan.email}
                        className="userImage"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bảng đơn hàng mới nhất */}
          <div className="latestSection col-6">
            <h3>Đơn hàng mới nhất</h3>
            <table className="latestTable">
              <thead>
                <tr>
                  <th>Mã hóa đơn</th>
                  <th>Ngày tạo</th>
                  <th>Tổng tiền</th>
                  <th>Hình Ảnh</th>
                </tr>
              </thead>
              <tbody>
                {stats.latestHoadon.map((hoadon, index) => (
                  <tr key={index}>
                    <td>{hoadon._id}</td>
                    <td>{new Date(hoadon.createdAt).toLocaleDateString()}</td>
                    <td>{hoadon.tongtien.toLocaleString("vi-VN")} VND</td>
                    <td>
                      <img
                        src="https://via.placeholder.com/50"
                        alt={`Hóa đơn ${hoadon._id}`}
                        className="userImage"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row mt-5">
          {/* Biểu đồ Bar (Số lượng đơn hàng) */}
          <div className="chartContainer col-6">
            <h2>Số lượng đơn hàng 7 ngày qua</h2>
            <Bar
              data={barData}
              options={{ responsive: true, plugins: { legend: { display: true } } }}
            />
          </div>
          <div className="chartContainer col-6">
            <h2>Số lượng đơn hàng 6 tháng qua</h2>
            <Bar
              data={barDatat}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true },
                  tooltip: { mode: "index", intersect: false },
                },
                scales: {
                  x: { grid: { display: false } },
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>
        </div>
        <div className="row mt-5">
            {/* Biểu đồ đường doanh thu theo ngày */}
            <div className="chartContainer col-6">
                <h2>Doanh thu 7 ngày qua</h2>
                <Line
                    data={lineDataDaily}
                    options={{ responsive: true, plugins: { legend: { display: true } } }}
                />
            </div>

            {/* Biểu đồ đường doanh thu theo tháng */}
            <div className="chartContainer col-6">
                <h2>Doanh thu 6 tháng qua</h2>
                <Line
                    data={lineDataMonthly}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { display: true },
                            tooltip: { mode: "index", intersect: false }
                        },
                        scales: {
                            x: { grid: { display: false } },
                            y: { beginAtZero: true }
                        }
                    }}
                />
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThongKePage;
