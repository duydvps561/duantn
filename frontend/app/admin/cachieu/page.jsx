"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Layout from "@/app/components/admin/Layout";
import Link from 'next/link';

export default function CaChieuPage() {
    const [caChieux, setCaChieux] = useState([]);

    useEffect(() => {
        const fetchCaChieux = async () => {
            try {
                const response = await axios.get('http://localhost:3000/xuatchieu');
                setCaChieux(response.data);
            } catch (error) {
                console.error('Error fetching CaChieu:', error);
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
                console.error('Error deleting CaChieu:', error);
                Swal.fire('Lỗi!', 'Không thể xóa ca chiếu.', 'error');
            }
        }
    };

    return (
        <Layout>
            <div className="container">
                <h1>Danh Sách Ca Chiếu</h1>
                <Link href="/admin/cachieu/them" className="btn btn-primary">Thêm Ca Chiếu</Link>
                <table className="table">
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
                        {caChieux.map(caChieu => (
                            <tr key={caChieu._id}>
                                <td>{caChieu.phongchieu_id}</td>
                                <td>{caChieu.phim_id}</td>
                                <td>{new Date(caChieu.ngaychieu).toLocaleDateString()}</td>
                                <td>{caChieu.giobatdau}</td>
                                <td>{caChieu.gioketthuc}</td>
                                <td>
                                    <Link href={`/admin/cachieu/sua/${caChieu._id}`} className="btn btn-warning">Sửa</Link>
                                    <button onClick={() => handleDelete(caChieu._id)} className="btn btn-danger">Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
