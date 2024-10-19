'use client';  // Chuyển thành Client Component

import React, { useState, useEffect } from 'react';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]); // Danh sách khách hàng
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [currentCustomer, setCurrentCustomer] = useState(null); // Khách hàng đang chỉnh sửa
  const [newCustomer, setNewCustomer] = useState({ // Thông tin khách hàng mới
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: '',
  });

  // Fetch danh sách khách hàng từ API khi component được mount
  useEffect(() => {
    fetch('http://localhost:3000/taikhoan') // API endpoint trả về danh sách khách hàng
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCustomers(data); // Gán dữ liệu khách hàng vào state
        } else {
          console.error('Expected an array, but received:', data);
          setCustomers([]); // Nếu không phải mảng, đặt customers thành mảng rỗng
        }
      })
      .catch(err => {
        console.error('Error fetching customers:', err);
        setCustomers([]); // Nếu có lỗi, đặt giá trị mặc định là mảng rỗng
      });
  }, []);

  // Xử lý sự kiện thêm hoặc cập nhật khách hàng
  const handleAddOrUpdateCustomer = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Chỉnh sửa khách hàng
      fetch(`http://localhost:3000/taikhoan/${currentCustomer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
      })
        .then(res => res.json())
        .then(updatedCustomer => {
          const updatedCustomers = customers.map(c => 
            c._id === updatedCustomer._id ? updatedCustomer : c
          );
          setCustomers(updatedCustomers);
          setIsEditing(false);
          setNewCustomer({ firstName: '', lastName: '', email: '', phoneNumber: '', role: '' });
        })
        .catch(err => console.error('Error updating customer:', err));
    } else {
      // Thêm mới khách hàng
      fetch('http://localhost:3000/taikhoan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomer),
      })
        .then(res => res.json())
        .then(addedCustomer => {
          setCustomers([...customers, addedCustomer]);
          setNewCustomer({ firstName: '', lastName: '', email: '', phoneNumber: '', role: '' });
        })
        .catch(err => console.error('Error adding customer:', err));
    }
  };

  // Xử lý sự kiện chỉnh sửa khách hàng
  const handleEditCustomer = (customer) => {
    setIsEditing(true);
    setCurrentCustomer(customer);
    setNewCustomer(customer);
  };

  // Xử lý sự kiện xóa khách hàng
  const handleDeleteCustomer = (customerId) => {
    fetch(`http://localhost:3000/taikhoan/${customerId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCustomers(customers.filter(c => c._id !== customerId));
      })
      .catch(err => console.error('Error deleting customer:', err));
  };

  // Xử lý thay đổi trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  return (
    <div>
      <h1>Quản Lý Khách Hàng</h1>
      <h2>Danh Sách Khách Hàng</h2>
      <table>
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
          {customers.length > 0 ? (
            customers.map((customer, index) => (
              <tr key={customer._id}>
                <td>{index + 1}</td>
                <td>{customer.lastName}</td>
                <td>{customer.firstName}</td>
                <td>{customer.email}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.role}</td>
                <td>
                  <button onClick={() => handleEditCustomer(customer)}>Sửa</button>
                  <button onClick={() => handleDeleteCustomer(customer._id)}>Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Không có khách hàng nào</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>{isEditing ? 'Chỉnh Sửa Khách Hàng' : 'Thêm Khách Hàng'}</h2>
      <form onSubmit={handleAddOrUpdateCustomer}>
        <input
          type="text"
          name="firstName"
          placeholder="Họ"
          value={newCustomer.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Tên"
          value={newCustomer.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="SĐT"
          value={newCustomer.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={newCustomer.role}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? 'Cập Nhật' : 'Thêm'}</button>
      </form>
    </div>
  );
}
