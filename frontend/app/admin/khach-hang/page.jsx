"use client";
import React, { useState } from "react";
import Layout from "@/app/components/admin/Layout";
import './CustomerManagement.css'; // Import CSS custom nếu cần
import '../../globals.css'; // Import global styles

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    { id: 1, lastName: 'Đỗ Hồng', firstName: 'Nhanh', email: 'hongnhanhfedev@gmail.com', phone: '0786979090', role: 'Admin' },
    { id: 2, lastName: 'Nguyễn Văn', firstName: 'B', email: 'nguyenvanb@gmail.com', phone: '0312345679', role: 'User' },
    { id: 3, lastName: 'Nguyễn Văn', firstName: 'C', email: 'nguyenvanc@gmail.com', phone: '0312345668', role: 'User' },
    { id: 4, lastName: 'Nguyễn Văn', firstName: 'D', email: 'nguyenvand@gmail.com', phone: '0312345658', role: 'User' },
    { id: 5, lastName: 'Nguyễn Văn', firstName: 'E', email: 'nguyenvane@gmail.com', phone: '0312345648', role: 'User' },
    { id: 6, lastName: 'Nguyễn Văn', firstName: 'F', email: 'nguyenvanf@gmail.com', phone: '0312345378', role: 'User' },
    { id: 7, lastName: 'Nguyễn Văn', firstName: 'G', email: 'nguyenvang@gmail.com', phone: '0312345628', role: 'User' },
    { id: 8, lastName: 'Nguyễn Văn', firstName: 'H', email: 'nguyenvanh@gmail.com', phone: '0312345378', role: 'User' },
    // Thêm dữ liệu khách hàng để phân trang thử nghiệm
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  // Lấy các khách hàng của trang hiện tại
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const totalPages = Math.ceil(customers.length / customersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <div className="customer-management">
        <h2>Quản Lý Khách Hàng</h2>
        <p>Đây là trang quản lý người dùng.</p>
        <div className="add-customer-btn-container">
          <button className="add-customer-btn">Thêm Khách Hàng</button>
        </div>

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
                {currentCustomers.map((customer, index) => (
                  <tr key={customer.id}>
                    <td>{index + 1 + indexOfFirstCustomer}</td> {/* Đánh STT theo trang */}
                    <td>{customer.lastName}</td>
                    <td>{customer.firstName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.role}</td>
                    <td>
                      <button className="editButton" onClick={() => handleEdit(customer.id)}>Sửa</button>
                      <button className="deleteButton" onClick={() => handleDelete(customer.id)}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Phân trang */}
            <nav className="pagination-container" aria-label="Pagination">
              <ul className="pagination pagination-sm justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button onClick={() => paginate(currentPage - 1)} className="page-link">
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button onClick={() => paginate(index + 1)} className="page-link">
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button onClick={() => paginate(currentPage + 1)} className="page-link">
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerManagement;
