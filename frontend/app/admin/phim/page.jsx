"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/app/components/admin/Layout";
import Link from "next/link";
import styles from "./QuanLyPhim.module.css";
import "../../globals.css";
import "../../admin_header.css";
import Swal from "sweetalert2";

const QuanLyPhimPage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("all"); // Bộ lọc hiện tại
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
  const itemsPerPage = 10;

  // Lấy dữ liệu phim
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/phim");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Sắp xếp theo ngày hiệu lực từ mới đến cũ
        const sortedMovies = data.sort(
          (a, b) => new Date(b.ngayhieuluc) - new Date(a.ngayhieuluc)
        );
        setMovies(sortedMovies);
        setFilteredMovies(sortedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  // Lọc phim theo trạng thái và từ khóa tìm kiếm
  useEffect(() => {
    const filterMovies = () => {
      let filtered = movies;

      // Lọc theo trạng thái
      if (currentFilter !== "all") {
        filtered = filtered.filter((movie) => movie.trangthai === currentFilter);
      }

      // Lọc theo từ khóa tìm kiếm
      if (searchTerm.trim() !== "") {
        filtered = filtered.filter((movie) =>
          movie.tenphim.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredMovies(filtered);
    };

    filterMovies();
  }, [movies, currentFilter, searchTerm]);

  const formatDate = (isoDate) => new Date(isoDate).toLocaleDateString("vi-VN");

  const deleteMovie = async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa",
      text: "Bạn có chắc chắn muốn xóa phim này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có, xóa nó!",
      cancelButtonText: "Không, quay lại!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/phim/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete movie");
        }
        setMovies(movies.filter((movie) => movie._id !== id));
        Swal.fire("Xóa thành công!", "Phim đã được xóa.", "success");
      } catch (error) {
        console.error("Error deleting movie:", error);
        Swal.fire("Lỗi!", "Có lỗi xảy ra khi xóa phim.", "error");
      }
    }
  };

  // Cập nhật bộ lọc
  const filterByStatus = (status) => {
    setCurrentFilter(status);
    setCurrentPage(1); // Reset về trang đầu
  };

  // Cập nhật từ khóa tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset về trang đầu
  };

  // Tính toán phim hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        Quản Lý Phim
      </h1>
      <div className={styles.addMovieButtonContainer}>
        <Link href="/admin/phim/add" className={styles.deleteButton}>
          THÊM PHIM
        </Link>
      </div>

      {/* Bộ lọc và tìm kiếm */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Bộ lọc trạng thái */}
        <select
          onChange={(e) => filterByStatus(e.target.value)}
          value={currentFilter}
          className={styles.filterSelect}
        >
          <option value="all">Tất Cả</option>
          <option value="0">Đang Chiếu</option>
          <option value="1">Sắp Chiếu</option>
          <option value="2">Hết Kỳ Hạn</option>
        </select>

        {/* Ô tìm kiếm */}
        <input
          type="text"
          placeholder="Tìm kiếm tên phim..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      {/* Bảng hiển thị danh sách phim */}
      <div className={styles.tablesContainer}>
        <div className={styles.tableSection}>
          <h2 className={styles.tableTitle}>Danh Sách Phim</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Tên Phim</th>
                <th>Ngày Hiệu Lực</th>
                <th>Ngày Hiệu Lực Đến</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {currentMovies.map((movie, index) => (
                <tr key={movie._id}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>
                    {movie.img && (
                      <img
                        src={`http://localhost:3000/img/phims/${movie.img}`}
                        alt={movie.tenphim}
                        className={styles.movieImage}
                      />
                    )}
                  </td>
                  <td style={{ textTransform: "uppercase" }}>{movie.tenphim}</td>
                  <td>{formatDate(movie.ngayhieuluc)}</td>
                  <td>{formatDate(movie.ngayhieulucden)}</td>
                  <td>
                    {movie.trangthai === "0"
                      ? "Đang Chiếu"
                      : movie.trangthai === "1"
                      ? "Sắp Chiếu"
                      : "Hết Kỳ Hạn"}
                  </td>
                  <td style={{ display: "flex" }}>
                    <Link
                      href={`/admin/phim/edit?id=${movie._id}`}
                      style={{ background: "#4d6950", color: "white" }}
                      className="btn me-2 sua"
                    >
                      Sửa
                    </Link>
                    <button
                      className={styles.deleteButton}
                      onClick={() => deleteMovie(movie._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav aria-label="Pagination">
          <ul className="pagination pagination-sm justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button onClick={() => paginate(currentPage - 1)} className="page-link">
                &laquo;
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index + 1}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button onClick={() => paginate(currentPage + 1)} className="page-link">
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  );
};

export default QuanLyPhimPage;
