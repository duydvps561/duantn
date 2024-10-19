"use client";
import React, { useState } from "react";
import Layout from "@/app/components/admin/Layout"; // Thay đổi đường dẫn theo cấu trúc dự án của bạn
import './MovieCategoryManagement.css'; // Import CSS custom nếu cần
import '../../globals.css'; // Import global styles

const MovieCategoryManagement = () => {
  // Dữ liệu mẫu cho các thể loại phim
  const [categories, setCategories] = useState([
    { id: 1, name: 'Hành Động', movieCount: 20 },
    { id: 2, name: 'Kinh Dị', movieCount: 20 },
    { id: 3, name: 'Hài', movieCount: 20 },
    { id: 4, name: 'Ngôn Tình', movieCount: 20 },
    { id: 5, name: 'Lịch Sử', movieCount: 20 },
    { id: 6, name: 'Viễn Tưởng', movieCount: 20 },
    { id: 7, name: 'Tâm Lý', movieCount: 20 },
    { id: 8, name: 'Tài Liệu', movieCount: 20 },
    { id: 9, name: 'Chiến Tranh', movieCount: 20 },
    { id: 10, name: 'Phiêu Lưu', movieCount: 20 },
    { id: 11, name: 'Gia Đình', movieCount: 20 },
    { id: 12, name: 'Tội Phạm', movieCount: 20 },
  ]);

  // Biến phân trang
  const [currentPage, setCurrentPage] = useState(1);  // Trang hiện tại
  const [itemsPerPage] = useState(10);  // Số mục trên mỗi trang

  // Tính toán chỉ số mục đầu và cuối dựa trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  // Tính toán số trang
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Hàm thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (id) => {
    console.log(`Edit category with id: ${id}`);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(category => category.id !== id));
    console.log(`Deleted category with id: ${id}`);
  };
  
  return (
    <Layout>
      <div className="category-management">
        <h2>Quản Lý Thể Loại Phim</h2>
        <p>Đây là trang quản lý thể loại phim.</p>
        {/* <div className="add-category-btn-container">
          <button className="add-category-btn">Thêm Loại</button>
        </div> */}

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
                {currentItems.map((category, index) => (
                  <tr key={category.id}>
                    <td>{indexOfFirstItem + index + 1}</td> {/* Số thứ tự chính xác trên mỗi trang */}
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

            {/* Phân trang */}
            <nav className='pagination-container'>
              <ul className="pagination">
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

export default MovieCategoryManagement;
