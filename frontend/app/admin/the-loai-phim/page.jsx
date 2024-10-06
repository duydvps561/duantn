"use client";
import React, { useState } from "react";
import Layout from "@/app/components/admin/Layout"; // Thay đổi đường dẫn theo cấu trúc dự án của bạn
import './MovieCategoryManagement.css'; // Import CSS custom nếu cần
import '../../globals.css'; // Import global styles

const MovieCategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Hành Động', movieCount: 20 },
    { id: 2, name: 'Kinh Dị', movieCount: 20 },
    { id: 3, name: 'Hài', movieCount: 20 },
    { id: 4, name: 'Ngôn Tình', movieCount: 20 },
    { id: 5, name: 'Lịch Sử', movieCount: 20 },
  ]);

  const handleEdit = (id) => {
    // Hàm xử lý logic khi người dùng bấm nút Sửa
    console.log(`Edit category with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Hàm xử lý logic khi người dùng bấm nút Xóa
    setCategories(categories.filter(category => category.id !== id));
    console.log(`Deleted category with id: ${id}`);
  };

  return (
    <Layout>
      <div className="category-management">
        <h2>Quản Lý Thể Loại Phim</h2>
        <p>Đây là trang quản lý thể loại phim.</p>
        <div className="add-category-btn-container">
          <button className="add-category-btn">Thêm Loại</button>
        </div>

        <div className="tablesContainer">
          <div className="tableSection">
            <h2 className="tableTitle">Danh Sách Thể Loại Phim</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Thể Loại</th>
                  <th>Số Bộ Phim</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>{category.movieCount}</td>
                    <td>
                      <button className="editButton" onClick={() => handleEdit(category.id)}>Sửa</button>
                      <button className="deleteButton" onClick={() => handleDelete(category.id)}>Xóa</button>
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

export default MovieCategoryManagement;
