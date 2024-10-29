"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/app/components/admin/Layout";
import './CustomerManagement.css'; // Import CSS custom nếu cần
import '../../globals.css'; // Import global styles

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/taikhoan/');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // Handle search by name
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/taikhoan/search/${searchName}`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error searching customers:', error);
    }
  };

  return (
    <Layout>
    <div className="customer-management">
      <h2>Quản Lý Khách Hàng</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm Kiếm</button>
      </div>

      <table className="customer-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ</th>
            <th>Tên</th>
            <th>Email</th>
            <th>SDT</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer._id}>
              <td>{index + 1}</td>
              <td>{customer.ho}</td>
              <td>{customer.tentaikhoan}</td>
              <td>{customer.email}</td>
              <td>{customer.sdt}</td>
              <td>{customer.vaitro}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
};

export default CustomerManagement;

