"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/app/components/admin/Layout";
import "./OrderManagement.css";
import "../../globals.css";
import "../../admin_header.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]); // List of orders
  const [selectedOrder, setSelectedOrder] = useState(null); // Selected order for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch orders when the component loads
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch("http://localhost:3000/hoadon");
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();

        // Sort orders by creation date (newest first)
        const sortedOrders = data.sort(
          (a, b) => new Date(b.ngaylap) - new Date(a.ngaylap)
        );
        setOrders(sortedOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchOrders();
  }, []);

  // Fetch order details for modal
  const handleViewOrder = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/hoadon/${id}`);
      if (!response.ok) throw new Error("Failed to fetch order details");
      const data = await response.json();
      setSelectedOrder(data); // Set the selected order
      setIsModalOpen(true); // Open the modal
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Close modal handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <Layout>
      <div className="order-management">
        <h2>Quản Lý Đơn Hàng</h2>
        <p>Đây là trang quản lý đơn hàng</p>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {/* <div className="add-order-btn-container">
          <button className="add-order-btn">Thêm Đơn Hàng</button>
        </div> */}
      </div>
      <div className="tablesContainer">
        <div className="tableSection">
          <h2 className="tableTitle">Danh Sách Đơn Hàng</h2>
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã Đơn Hàng</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order._id}</td>
                  <td>{order.trangthai}</td>
                  <td>
                    <button
                      className="editButton"
                      onClick={() => handleViewOrder(order._id)}
                    >
                      Xem Đơn Hàng
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal Overlay */}
      {isModalOpen && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              &times;
            </button>
            <h3>Chi Tiết Đơn Hàng</h3>
            <p>
              <strong>Tên Người Đặt:</strong>{" "}
              {selectedOrder.taikhoan_id?.tentaikhoan || "N/A"}
            </p>
            <p>
              <strong>Ngày Lập:</strong>{" "}
              {new Date(selectedOrder.ngaylap).toLocaleDateString()}
            </p>
            <p>
              <strong>Giờ Lập:</strong> {selectedOrder.giolap || "N/A"}
            </p>
            <p>
              <strong>Tổng Tiền:</strong> {selectedOrder.tongtien} VND
            </p>
            <h4>Chi Tiết Sản Phẩm:</h4>
            {selectedOrder.details && selectedOrder.details.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Tên Món</th>
                    <th>Giá</th>
                    <th>Số Lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.details.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>{item.price} VND</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Không có chi tiết đơn hàng</p>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default OrderManagement;
