"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/app/components/admin/Layout";
import './CustomerManagement.css'; // Import CSS custom nếu cần
import '../../globals.css';
import '../../admin_header.css'; // Import global styles


function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Gọi API để lấy danh sách tất cả các tài khoản
    fetch('http://localhost:3000/taikhoan')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCustomers(data); // Lưu danh sách tài khoản vào state
        setLoading(false);  // Kết thúc trạng thái loading
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Đang tải danh sách khách hàng...</p>;
  if (error) return <p>Đã xảy ra lỗi: {error.message}</p>;

  return (
    <Layout>
    <div>
      <h1>Danh sách khách hàng</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <p>ID: {customer.id}</p>
            <p>Tên: {customer.tentaikhoan}</p>
            <p>Email: {customer.email}</p>
            <p>Vai Trò: {customer.vaitro}</p>
            <p>Trạng thái: {customer.trangthai}</p>
          </li>
        ))}
      </ul>
    </div>
    </Layout>
  );
}

export default CustomerList;
