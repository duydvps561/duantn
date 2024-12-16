"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Layout from "@/app/components/admin/Layout";
import Link from "next/link";
import "./CaChieuPage.css";

export default function CaChieuPage() {
    const [caChieux, setCaChieux] = useState([]);
    const [phimSuggestions, setPhimSuggestions] = useState([]);
    const [phongSuggestions, setPhongSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterPhim, setFilterPhim] = useState("");
    const [filterPhong, setFilterPhong] = useState("");
    const [filterNgay, setFilterNgay] = useState("");
    const [showPhimSuggestions, setShowPhimSuggestions] = useState(false);
    const [showPhongSuggestions, setShowPhongSuggestions] = useState(false);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [caChieuResponse, phimResponse, phongResponse] = await Promise.all([
                    axios.get("https://backend-duan-9qb7.onrender.com/xuatchieu"),
                    axios.get("https://backend-duan-9qb7.onrender.com/phim"),
                    axios.get("https://backend-duan-9qb7.onrender.com/phongchieu"),
                ]);

                const caChieuData = await Promise.all(
                    caChieuResponse.data.map(async (caChieu) => {
                        try {
                            const phong = phongResponse.data.find(p => p._id === caChieu.phongchieu_id);
                            const phim = phimResponse.data.find(p => p._id === caChieu.phim_id);

                            return {
                                ...caChieu,
                                tenphong: phong?.tenphong || "Không xác định",
                                tenphim: phim?.tenphim || "Không xác định",
                            };
                        } catch (error) {
                            console.error(`Lỗi tải dữ liệu cho ca chiếu ${caChieu._id}:`, error);
                            return {
                                ...caChieu,
                                tenphong: "Không xác định",
                                tenphim: "Không xác định",
                            };
                        }
                    })
                );

                setCaChieux(caChieuData);
                setPhimSuggestions(phimResponse.data);
                setPhongSuggestions(phongResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                Swal.fire("Lỗi!", "Không thể tải dữ liệu.", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Bạn có chắc chắn muốn xóa ca chiếu này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Có",
            cancelButtonText: "Không",
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`https://backend-duan-9qb7.onrender.com/xuatchieu/delete/${id}`);
                setCaChieux(caChieux.filter((caChieu) => caChieu._id !== id));
                Swal.fire("Đã xóa!", "Ca chiếu đã được xóa.", "success");
            } catch (error) {
                console.error("Error deleting CaChieu:", error);
                Swal.fire("Lỗi!", "Không thể xóa ca chiếu.", "error");
            }
        }
    };

    const handleFilterChange = (setter, setShowSuggestions) => (e) => {
        setter(e.target.value);
        setShowSuggestions(true); // Hiển thị gợi ý khi người dùng gõ
    };

    const handleSelectPhim = (phim) => {
        setFilterPhim(phim.tenphim);
        setShowPhimSuggestions(false); // Ẩn gợi ý khi chọn phim
    };

    const handleSelectPhong = (phong) => {
        setFilterPhong(phong.tenphong);
        setShowPhongSuggestions(false); // Ẩn gợi ý khi chọn phòng
    };

    const filteredCaChieux = caChieux.filter((caChieu) => {
        const matchPhim =
            filterPhim === "" || caChieu.tenphim.toLowerCase().includes(filterPhim.toLowerCase());
        const matchPhong =
            filterPhong === "" || caChieu.tenphong.toLowerCase().includes(filterPhong.toLowerCase());
        const caChieuDate = new Date(caChieu.ngaychieu).toISOString().split("T")[0];
        const matchNgay = filterNgay === "" || caChieuDate === filterNgay;

        return matchPhim && matchPhong && matchNgay;
    });

    const sortedCaChieux = filteredCaChieux.sort(
        (a, b) => new Date(b.ngaychieu) - new Date(a.ngaychieu)
    );
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedCaChieux.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedCaChieux.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Layout>
            <div className="container-fluid">
                <h1 className="my-4">Danh Sách Ca Chiếu</h1>
                <div className="d-flex justify-content-end mb-3">
                    <Link
                        style={{ background: "#4d6950", color: "white" }}
                        href="/admin/cachieu/them"
                        className="btn"
                    >
                        Thêm Ca Chiếu
                    </Link>
                </div>
                <div className="mb-3">
                    <div className="d-flex justify-content-end row">
                        <div className="col-md-4 mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm theo tên phim"
                                value={filterPhim}
                                onChange={handleFilterChange(setFilterPhim, setShowPhimSuggestions)}
                            />
                            {showPhimSuggestions && filterPhim && (
                                <ul className="suggestion-list">
                                    {phimSuggestions
                                        .filter((phim) =>
                                            phim.tenphim
                                                .toLowerCase()
                                                .includes(filterPhim.toLowerCase())
                                        )
                                        .map((phim) => (
                                            <li
                                                key={phim._id}
                                                onClick={() => handleSelectPhim(phim)}
                                                className="suggestion-item"
                                            >
                                                {phim.tenphim}
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                        <div className="col-md-4 mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm theo tên phòng"
                                value={filterPhong}
                                onChange={handleFilterChange(setFilterPhong, setShowPhongSuggestions)}
                            />
                            {showPhongSuggestions && filterPhong && (
                                <ul className="suggestion-list">
                                    {phongSuggestions
                                        .filter((phong) =>
                                            phong.tenphong
                                                .toLowerCase()
                                                .includes(filterPhong.toLowerCase())
                                        )
                                        .map((phong) => (
                                            <li
                                                key={phong._id}
                                                onClick={() => handleSelectPhong(phong)}
                                                className="suggestion-item"
                                            >
                                                {phong.tenphong}
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                        <div className="col-md-4 mb-3">
                            <input
                                type="date"
                                className="form-control"
                                value={filterNgay}
                                onChange={handleFilterChange(setFilterNgay, () => {})}
                            />
                        </div>
                    </div>
                </div>

                <div className="tablesContainer">
                    <div className="tableSection">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Phòng Chiếu</th>
                                    <th>Phim</th>
                                    <th>Ngày Chiếu</th>
                                    <th>Giờ Bắt Đầu</th>
                                    <th>Giờ Kết Thúc</th>
                                    <th>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((caChieu) => (
                                    <tr key={caChieu._id}>
                                        <td>{caChieu.tenphong}</td>
                                        <td>{caChieu.tenphim}</td>
                                        <td>{new Date(caChieu.ngaychieu).toLocaleDateString("vi")}</td>
                                        <td>{caChieu.giobatdau}</td>
                                        <td>{caChieu.gioketthuc}</td>
                                        <td>
                                            <Link
                                                href={`/admin/cachieu/sua?id=${caChieu._id}`}
                                                className="btn me-2 sua"
                                            >
                                                Sửa
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(caChieu._id)}
                                                className="btn xoa"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                <nav aria-label="Pagination">
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
        </Layout>
    );
}
