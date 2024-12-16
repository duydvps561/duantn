"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/app/components/admin/Layout"; // Adjust path as per project structure
import './MovieCategoryManagement.css'; // Import CSS custom if needed
import '../../globals.css'; // Import global styles

const MovieCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryQuantity, setCategoryQuantity] = useState(0);
  const [currentCategoryId, setCurrentCategoryId] = useState(null); // For tracking edit
  const [showCategoryForm, setShowCategoryForm] = useState(false); // Toggle for form visibility
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovies, setSelectedMovies] = useState([]); // Danh sách phim thuộc thể loại
  const [selectedCategoryName, setSelectedCategoryName] = useState(""); // Tên thể loại đã chọn
  const itemsPerPage = 10;

  // Fetch categories from API on component mount
  useEffect(() => {
    fetch("https://backend-duan-9qb7.onrender.com/theloai")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const sortedCategories = data
          .map((category) => ({
            ...category,
            quantity: category.quantity ?? 0,
          }))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by creation date
        setCategories(sortedCategories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Handle pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Toggle add/edit category form visibility and set form for adding or editing
  const openCategoryForm = (category = null) => {
    if (category) {
      // Editing existing category
      setCategoryName(category.tentheloai);
      setCategoryQuantity(category.quantity);
      setCurrentCategoryId(category._id);
    } else {
      // Adding a new category
      setCategoryName("");
      setCategoryQuantity(0);
      setCurrentCategoryId(null);
    }
    setShowCategoryForm(true);
  };

  const closeCategoryForm = () => {
    setShowCategoryForm(false);
  };

  // Submit new or edited category
  const handleCategorySubmit = () => {
    const url = currentCategoryId 
      ? `https://backend-duan-9qb7.onrender.com/theloai/edit/${currentCategoryId}` 
      : "https://backend-duan-9qb7.onrender.com/theloai/add";
    const method = currentCategoryId ? "PUT" : "POST";
    const body = JSON.stringify({
      tentheloai: categoryName,
      quantity: categoryQuantity,
      trangthai: '1'
    });

    fetch(url, { method, headers: { "Content-Type": "application/json" }, body })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to submit category: " + response.statusText);
        }
        return response.json();
      })
      .then(updatedCategory => {
        if (currentCategoryId) {
          setCategories(categories.map(cat => cat._id === currentCategoryId ? updatedCategory : cat));
        } else {
          setCategories([...categories, updatedCategory]);
        }
        closeCategoryForm(); // Hide form after submission
      })
      .catch(error => console.error("Error submitting category:", error));
  };

  // Delete category
  const handleDelete = (id) => {
    fetch(`https://backend-duan-9qb7.onrender.com/theloai/delete/${id}`, { method: "DELETE" })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to delete category: " + response.statusText);
        }
        setCategories(categories.filter(category => category._id !== id));
      })
      .catch(error => console.error("Error deleting category:", error));
  };

  // Handle category click to fetch movies
  const handleCategoryClick = (category) => {
    setSelectedCategoryName(category.tentheloai);
    fetch(`https://backend-duan-9qb7.onrender.com/phim/theloai/${category._id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((movies) => {
        setSelectedMovies(movies);
      })
      .catch((error) => console.error("Error fetching movies by category:", error));
  };

  return (
    <Layout>
      <div className="category-management">
        <h2>Quản Lý Thể Loại Phim</h2>
        <p>Đây là trang quản lý thể loại phim.</p>

        <div className="add-category-btn-container">
          <button className="add-category-btn" onClick={() => openCategoryForm()}>
            Thêm Thể Loại
          </button>
        </div>

        {showCategoryForm && (
          <div className="overlay">
            <div className="category-form">
              <h3>{currentCategoryId ? "Chỉnh sửa thể loại" : "Thêm thể loại mới"}</h3>
              <input 
                type="text" 
                value={categoryName} 
                onChange={(e) => setCategoryName(e.target.value)} 
                placeholder="Tên thể loại" 
              />
              <div className="button-container">
                <button className="submit-category-btn" onClick={handleCategorySubmit}>
                  {currentCategoryId ? "Cập nhật" : "Thêm"}
                </button>
                <button className="cancel-btn" onClick={closeCategoryForm}>Hủy</button>
              </div>
            </div>
          </div>
        )}

        <div className="tablesContainer">
          <div className="tableSection">
            <h2 className="tableTitle">Danh Sách Thể Loại Phim</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Thể Loại</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((category, index) => (
                  <tr key={category._id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>
                      <button 
                        className="category-link" 
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category.tentheloai}
                      </button>
                    </td>
                    <td>
                      <button className="editButton" onClick={() => openCategoryForm(category)}>Sửa</button>
                      <button className="deleteButton" onClick={() => handleDelete(category._id)}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedMovies.length > 0 && (
            <div className="movies-list">
              <h3>Các phim thuộc thể loại: {selectedCategoryName}</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên Phim</th>
                    <th>Thời Lượng</th>
                    <th>Đạo Diễn</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMovies.map((movie, index) => (
                    <tr key={movie._id}>
                      <td>{index + 1}</td>
                      <td>{movie.tenphim}</td>
                      <td>{movie.thoiluong}</td>
                      <td>{movie.daodien}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MovieCategoryManagement;
