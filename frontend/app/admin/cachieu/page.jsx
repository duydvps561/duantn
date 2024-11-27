"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Layout from "@/app/components/admin/Layout";
import Link from 'next/link';
import './CaChieuPage.css';

export default function CaChieuPage() {
    const [caChieux, setCaChieux] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchCaChieux = async () => {
            try {
                const response = await axios.get('http://localhost:3000/xuatchieu');
                const caChieuData = await Promise.all(
                    response.data.map(async (caChieu) => {
                        try {
                            const phongChieuResponse = await axios.get(`http://localhost:3000/phongchieu/${caChieu.phongchieu_id}`);
                            const phimResponse = await axios.get(`http://localhost:3000/phim/${caChieu.phim_id}`);
                            return {
                                ...caChieu,
                                tenphong: phongChieuResponse.data.tenphong,
                                tenphim: phimResponse.data.tenphim,
                            };
                        } catch (error) {
                            console.error(`Lỗi tải dữ liệu cho ca chiếu ${caChieu._id}:`, error);
                            return {
                                ...caChieu,
                                tenphong: 'Không xác định',
                                tenphim: 'Không xác định',
                            };
                        }
                    })
                );
                setCaChieux(caChieuData);
            } catch (error) {
                console.error('Error fetching CaChieu:', error.response || error.message || error);
                Swal.fire('Lỗi!', 'Không thể tải danh sách ca chiếu.', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchCaChieux();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa ca chiếu này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/xuatchieu/delete/${id}`);
                setCaChieux(caChieux.filter(caChieu => caChieu._id !== id));
                Swal.fire('Đã xóa!', 'Ca chiếu đã được xóa.', 'success');
            } catch (error) {
                console.error('Error deleting CaChieu:', error.response || error.message || error);
                Swal.fire('Lỗi!', 'Không thể xóa ca chiếu.', 'error');
            }
        }
    };

    const sortedCaChieux = caChieux.sort((a, b) => new Date(b.ngaychieu) - new Date(a.ngaychieu));
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedCaChieux.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedCaChieux.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Layout>
            <div className="container-fluid">
                <h1 className="my-4">Danh Sách Ca Chiếu</h1>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link style={{background: '#4d6950', color: 'white'}} href="/admin/cachieu/them" className="btn  ">
                        Thêm Ca Chiếu
                    </Link>
                </div>
                {loading ? (
                    <div className="text-center">
                        <p>Đang tải dữ liệu...</p>
                    </div>
                ) : (
                    <>
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
                                {currentItems.map(caChieu => (
                                    <tr key={caChieu._id}>
                                        <td>{caChieu.tenphong}</td>
                                        <td>{caChieu.tenphim}</td>
                                        <td>{new Date(caChieu.ngaychieu).toLocaleDateString('vi')}</td>
                                        <td>{caChieu.giobatdau}</td>
                                        <td>{caChieu.gioketthuc}</td>
                                        <td>
                                            <Link href={`/admin/cachieu/sua?id=${caChieu._id}`} className="btn me-2 sua">
                                                Sửa
                                            </Link>
                                            <button onClick={() => handleDelete(caChieu._id)} className="btn xoa">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                    </>
                )}
            </div>
        </Layout>
    );
}
