
"use client"; 
import React, { useState } from 'react';
import Layout from "@/app/components/admin/Layout";
import './OrderManagement.css'; // Để dùng CSS custom nếu cần
import '../../globals.css';
import '../../admin_header.css'; // Import global styles

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    { id: 1, code: '#', status: 'Đã xác nhận' },
    { id: 2, code: '#', status: 'Đã hủy' },
    { id: 3, code: '#', status: 'Đã xác nhận' },
    { id: 4, code: '#', status: 'Đã xác nhận' },
  ]);


  return (
    <Layout>
    <div className="order-management">
      <h2>Quản Lý Đơn Hàng</h2>
      <p>Đây là trang quản lý đơn hàng</p>
      <div className="add-order-btn-container">
      <button className="add-order-btn">Thêm Đơn Hàng</button>
    </div>
      <p></p>
      </div>
        <div className = "tablesContainer" >
        <div className="tableSection">
          <h2 className= "tableTitle">Danh Sách Đơn Hàng</h2>
          <table className= "table">
            <thead>
              <tr>
              <th>STT</th>
              <th>Mã đơn hàng</th>
               <th>Trạng Thái</th>
              <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
            {orders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.code}</td>
                  <td>{order.status}</td>
                  <td>
                    <button className= "editButton" >Sửa</button>
                    <button className= "deleteButton">Xóa</button>
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

export default OrderManagement;