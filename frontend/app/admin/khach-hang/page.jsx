"use client";
import React, { useState } from "react";
import Layout from "@/app/components/admin/Layout"; // Có thể thay đổi theo cấu trúc thư mục của bạn
import './CustomerManagement.css'; // Import CSS custom nếu cần
import '../../globals.css'; // Import global styles

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    { id: 1, lastName: 'Đỗ Hồng', firstName: 'Nhanh', email: 'hongthanhtdev@gmail.com', phone: '0786979090', role: 'Admin' },
    { id: 2, lastName: 'Nguyễn Văn', firstName: 'B', email: 'nguyenvanb@gmail.com', phone: '0312345679', role: 'User' },
    { id: 3, lastName: 'Nguyễn Văn', firstName: 'C', email: 'nguyenvanc@gmail.com', phone: '0312345668', role: 'User' },
    { id: 4, lastName: 'Nguyễn Văn', firstName: 'D', email: 'nguyenvand@gmail.com', phone: '0312345658', role: 'User' },
    { id: 5, lastName: 'Nguyễn Văn', firstName: 'E', email: 'nguyenvane@gmail.com', phone: '0312345648', role: 'User' },
    { id: 6, lastName: 'Nguyễn Văn', firstName: 'F', email: 'nguyenvanf@gmail.com', phone: '0312345378', role: 'User' },
    { id: 7, lastName: 'Nguyễn Văn', firstName: 'G', email: 'nguyenvang@gmail.com', phone: '0312345628', role: 'User' },
    { id: 8, lastName: 'Nguyễn Văn', firstName: 'H', email: 'nguyenvanh@gmail.com', phone: '0312345378', role: 'User' }
  ]);

  const handleEdit = (id) => {
    // Hàm xử lý logic khi người dùng bấm nút Sửa
    console.log(`Edit customer with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Hàm xử lý logic khi người dùng bấm nút Xóa
    setCustomers(customers.filter(customer => customer.id !== id));
    console.log(`Deleted customer with id: ${id}`);
  };

  return (
    <Layout>
      <div class="customer-management">
        <h2>Quản Lý Khách Hàng</h2>
        <p>Đây là trang quản lý người dùng.</p>
        <div class="add-customer-btn-container">
          <button class="add-customer-btn">Thêm Khách Hàng</button>
        </div>

        <div class="tablesContainer">
          <div class="tableSection">
            <h2 class="tableTitle">Danh Sách Khách Hàng</h2>
            <table class="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ</th>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>SĐT</th>
                  <th>Role</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={customer.id}>
                    <td>{index + 1}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.firstName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.role}</td>
                    <td>
                      <button class="editButton" onClick={() => handleEdit(customer.id)}>Sửa</button>
                      <button class="deleteButton" onClick={() => handleDelete(customer.id)}>Xóa</button>
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

export default CustomerManagement;