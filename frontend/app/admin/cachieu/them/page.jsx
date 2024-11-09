"use client"; 
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import Swal from 'sweetalert2';
import './AddCaChieu.css';

export default function ThemCaChieu() {
    const [phongChieus, setPhongChieus] = useState([]);
    const [phims, setPhims] = useState([]);
    const [caChieus, setCaChieus] = useState([]);
    const [gioBatDauOptions] = useState(
        Array.from({ length: 44 }, (_, i) => {
            const hours = Math.floor(i / 2) + 1;
            const minutes = i % 2 === 0 ? '00' : '30';
            return `${String(hours).padStart(2, '0')}:${minutes}`;
        }).slice(0, 43)
    );

    const [thoiluong, setThoiluong] = useState(0); 

    useEffect(() => {
        const layDuLieu = async () => {
            try {
                const [phongChieuResponse, phimResponse] = await Promise.all([
                    axios.get('http://localhost:3000/phongchieu'),
                    axios.get('http://localhost:3000/phim')
                ]);
                setPhongChieus(phongChieuResponse.data);
                setPhims(phimResponse.data);

                const today = new Date().toISOString().split('T')[0];
                document.getElementById('ngaychieu').setAttribute('min', today);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        layDuLieu();
    }, []);

    const tinhGioKetThuc = (gioBatDau, thoiluong) => {
        if (!gioBatDau) return '';
        const [gio, phut] = gioBatDau.split(':').map(Number);
        const totalPhutBatDau = gio * 60 + phut;
        const totalPhutKetThuc = totalPhutBatDau + thoiluong;

        const gioKetThuc = Math.floor(totalPhutKetThuc / 60) % 24;
        const phutKetThuc = totalPhutKetThuc % 60;
        return `${String(gioKetThuc).padStart(2, '0')}:${String(phutKetThuc).padStart(2, '0')}`;
    };

    const kiemTraTrongTai = async (values) => {
        try {
            const response = await axios.post('http://localhost:3000/xuatchieu/check', values);
            return response.data.available;
        } catch (error) {
            console.error('Lỗi khi kiểm tra trống:', error);
            return false;
        }
    };

    const kiemTraTrungLap = (caChieuMoi) => {
        const thoiGianBatDauMoi = new Date(`${caChieuMoi.ngaychieu}T${caChieuMoi.giobatdau}`);
        const thoiGianKetThucMoi = new Date(`${caChieuMoi.ngaychieu}T${caChieuMoi.gioketthuc}`);

        return caChieus.some(caChieu => {
            const thoiGianBatDauCu = new Date(`${caChieu.ngaychieu}T${caChieu.giobatdau}`);
            const thoiGianKetThucCu = new Date(`${caChieu.ngaychieu}T${caChieu.gioketthuc}`);

            return (
                (thoiGianBatDauMoi >= thoiGianBatDauCu && thoiGianBatDauMoi < thoiGianKetThucCu) ||
                (thoiGianKetThucMoi > thoiGianBatDauCu && thoiGianKetThucMoi <= thoiGianKetThucCu) ||
                (thoiGianBatDauMoi <= thoiGianBatDauCu && thoiGianKetThucMoi >= thoiGianKetThucCu)
            );
        });
    };
    const formatDate = (date) => {
        const d = new Date(date);
        return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    };

    const formik = useFormik({
        initialValues: {
            phongchieu_id: '',
            phim_id: '',
            ngaychieu: '',
            giobatdau: '',
            gioketthuc: ''
        },
        validationSchema: Yup.object({
            phongchieu_id: Yup.string().required('Chọn phòng chiếu'),
            phim_id: Yup.string().required('Chọn phim'),
            ngaychieu: Yup.date().required('Chọn ngày chiếu'),
            giobatdau: Yup.string().required('Nhập giờ bắt đầu'),
            gioketthuc: Yup.string().required('Nhập giờ kết thúc')
        }),
        onSubmit: async (values, { resetForm }) => {
            // Tìm thời gian phim
            const selectedPhim = phims.find(phim => phim._id === values.phim_id);
            if (selectedPhim) {
                setThoiluong(selectedPhim.thoiluong); 

                values.gioketthuc = tinhGioKetThuc(values.giobatdau, selectedPhim.thoiluong);

                if (kiemTraTrungLap(values)) {
                    Swal.fire('Khoảng thời gian này đã có ca chiếu khác!');
                    return;
                }

                const trongTai = await kiemTraTrongTai(values);
                if (!trongTai) {
                    Swal.fire('Khoảng thời gian này đã có ca chiếu khác!');
                    return;
                }

                // Lưu ca chiếu với định dạng ngày
                setCaChieus((prevCaChieus) => [
                    ...prevCaChieus, 
                    { ...values, ngaychieu: formatDate(values.ngaychieu) }
                ]);
                resetForm();
            }
        }
    });

    const luuCaChieu = async () => {
        for (const caChieu of caChieus) {
            try {
                await axios.post('http://localhost:3000/xuatchieu/add', caChieu);
            } catch (error) {
                console.error('Lỗi khi thêm CaChieu:', error);
                Swal.fire('Đã xảy ra lỗi khi thêm ca chiếu.');
                return;
            }
        }
        Swal.fire('Tất cả các ca chiếu đã được thêm thành công!');
        setCaChieus([]);
    };

    useEffect(() => {
        if (formik.values.giobatdau) {
            const selectedPhim = phims.find(phim => phim._id === formik.values.phim_id);
            if (selectedPhim) {
                formik.setFieldValue('gioketthuc', tinhGioKetThuc(formik.values.giobatdau, selectedPhim.thoiluong));
            }
        }
    }, [formik.values.giobatdau, formik.values.phim_id, phims]);

    return (
        <Layout>
            <div className="container">
                <h1>Thêm Ca Chiếu Mới</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <label>Phòng Chiếu</label>
                            <select
                                name="phongchieu_id"
                                value={formik.values.phongchieu_id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.phongchieu_id && formik.errors.phongchieu_id ? "error" : ""}
                            >
                                <option value="">Chọn phòng chiếu</option>
                                {phongChieus.map((phongchieu) => (
                                    <option key={phongchieu._id} value={phongchieu._id}>{phongchieu.tenphong}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-6">
                            <label>Phim</label>
                            <select
                                name="phim_id"
                                value={formik.values.phim_id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.phim_id && formik.errors.phim_id ? "error" : ""}
                            >
                                <option value="">Chọn phim</option>
                                {phims.map((phim) => (
                                    <option key={phim._id} value={phim._id}>{phim.tenphim}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-6">
                            <label>Ngày Chiếu</label>
                            <input
                                type="date"
                                name="ngaychieu"
                                id="ngaychieu"
                                value={formik.values.ngaychieu}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.ngaychieu && formik.errors.ngaychieu ? "error" : ""}
                            />
                        </div>
                        <div className="col-6">
                            <label>Giờ Bắt Đầu</label>
                            <select
                                name="giobatdau"
                                value={formik.values.giobatdau}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.giobatdau && formik.errors.giobatdau ? "error" : ""}
                            >
                                <option value="">Chọn giờ bắt đầu</option>
                                {gioBatDauOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-6">
                            <label>Giờ Kết Thúc</label>
                            <input
                                type="text"
                                name="gioketthuc"
                                value={formik.values.gioketthuc}
                                readOnly
                            />
                        </div>
                    </div>
                    <button type="submit">Thêm Ca Chiếu</button>
                </form>
                <button onClick={luuCaChieu} className="btn-luu">Lưu Tất Cả</button>

                <h2>Danh Sách Ca Chiếu</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Phòng Chiếu</th>
                            <th>Phim</th>
                            <th>Ngày Chiếu</th>
                            <th>Giờ Bắt Đầu</th>
                            <th>Giờ Kết Thúc</th>
                        </tr>
                    </thead>
                    <tbody>
                        {caChieus.map((caChieu, index) => (
                            <tr key={index}>
                                <td>{phongChieus.find(p => p._id === caChieu.phongchieu_id)?.tenphong}</td>
                                <td>{phims.find(p => p._id === caChieu.phim_id)?.tenphim}</td>
                                <td>{caChieu.ngaychieu}</td>
                                <td>{caChieu.giobatdau}</td>
                                <td>{caChieu.gioketthuc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
