"use client";
import React, { useState } from "react";
import Layout from "@/app/components/admin/Layout";
import './CustomerManagement.css'; // Import CSS custom nếu cần
import '../../globals.css'; // Import global styles

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    { id: 1, lastName: 'Đỗ Hồng', firstName: 'Nhanh', email: 'hongnhanhfedev@gmail.com', phone: '0786979090', role: 'Admin' },
    { id: 2, lastName: 'Nguyễn Văn', firstName: 'B', email: 'nguyenvanb@gmail.com', phone: '0312345679', role: 'User' },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false); // Trạng thái để điều khiển hiển thị form
  const [isEditing, setIsEditing] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({ lastName: '', firstName: '', email: '', phone: '', role: 'User' });

  const openForm = () => setIsFormOpen(true);  // Hàm mở form
  const closeForm = () => {
    setIsFormOpen(false); // Đóng form
    setIsEditing(false);  // Hủy trạng thái chỉnh sửa
    setNewCustomer({ lastName: '', firstName: '', email: '', phone: '', role: 'User' }); // Xóa dữ liệu form
  };

  const handleSave = () => {
    if (isEditing) {
      setCustomers(customers.map(customer => customer.id === currentCustomer.id ? currentCustomer : customer));
    } else {
      setCustomers([...customers, { ...newCustomer, id: customers.length + 1 }]);
    }
    closeForm();  // Đóng form sau khi lưu
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setCurrentCustomer({ ...currentCustomer, [name]: value });
    } else {
      setNewCustomer({ ...newCustomer, [name]: value });
    }
  };

  return (
    <Layout>
      <div className="customer-management">
        <h2>Quản Lý Khách Hàng</h2>

        {/* Nút Thêm Khách Hàng */}
        <div className="add-customer-btn-container">
          <button className="add-customer-btn" onClick={openForm}>Thêm Khách Hàng</button>
        </div>

        {/* Overlay và Form Thêm/Sửa Khách Hàng */}
        {isFormOpen && (
          <div className={`modal-overlay ${isFormOpen ? 'active' : ''}`}>
            <div className="customer-form">
              <h3>{isEditing ? "Sửa Khách Hàng" : "Thêm Khách Hàng"}</h3>
              <input
                type="text"
                name="lastName"
                placeholder="Họ"
                value={isEditing ? currentCustomer?.lastName : newCustomer.lastName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="firstName"
                placeholder="Tên"
                value={isEditing ? currentCustomer?.firstName : newCustomer.firstName}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={isEditing ? currentCustomer?.email : newCustomer.email}
                onChange={handleInputChange}
              />

              {/* Gộp ô SĐT và Role */}
              <div className="phone-role-container">
                <input
                  type="text"
                  name="phone"
                  placeholder="SĐT"
                  value={isEditing ? currentCustomer?.phone : newCustomer.phone}
                  onChange={handleInputChange}
                />
                <select
                  name="role"
                  value={isEditing ? currentCustomer?.role : newCustomer.role}
                  onChange={handleInputChange}
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <button onClick={handleSave}>{isEditing ? "Lưu Thay Đổi" : "Thêm Khách Hàng"}</button>
              <button className="cancel-btn" onClick={closeForm}>Hủy</button>
            </div>
          </div>
        )}

        {/* Hiển thị danh sách khách hàng */}
        <div className="tablesContainer">
          <div className="tableSection">
            <h2 className="tableTitle">Danh Sách Khách Hàng</h2>
            <table className="table">
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
                      <button className="editButton" onClick={() => { setIsEditing(true); setCurrentCustomer(customer); openForm(); }}>Sửa</button>
                      <button className="deleteButton" onClick={() => setCustomers(customers.filter(c => c.id !== customer.id))}>Xóa</button>
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
