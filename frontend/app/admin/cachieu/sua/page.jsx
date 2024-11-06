"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import Swal from 'sweetalert2';
import "./SuaCaChieu.css";

export default function UpdateCaChieu() {
    const [caChieu, setCaChieu] = useState(null);
    const [phongChieus, setPhongChieus] = useState([]);
    const [phims, setPhims] = useState([]);
    const [phimDurations, setPhimDurations] = useState({});
    const [loading, setLoading] = useState(true);
    const [gioBatDauOptions] = useState(
        Array.from({ length: 44 }, (_, i) => {
            const hours = Math.floor(i / 2) + 1;
            const minutes = i % 2 === 0 ? '00' : '30';
            return `${String(hours).padStart(2, '0')}:${minutes}`;
        }).slice(0, 43)
    );

    const router = useRouter();
    const searchParams = useSearchParams();
    const caChieuId = searchParams.get("id");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [phongChieuRes, phimRes, caChieuRes] = await Promise.all([
                    axios.get('http://localhost:3000/phongchieu'),
                    axios.get('http://localhost:3000/phim'),
                    axios.get(`http://localhost:3000/xuatchieu/${caChieuId}`)
                ]);

                setPhongChieus(phongChieuRes.data);
                setPhims(phimRes.data);
                setCaChieu(caChieuRes.data);
                
                const phimDurationMap = {};
                phimRes.data.forEach(phim => phimDurationMap[phim._id] = phim.thoiluong);
                setPhimDurations(phimDurationMap);

                setLoading(false);
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };
        fetchData();
    }, [caChieuId]);

    const tinhGioKetThuc = (gioBatDau, thoiluong) => {
        if (!gioBatDau) return '';
        const [gio, phut] = gioBatDau.split(':').map(Number);
        const totalPhutBatDau = gio * 60 + phut;
        const totalPhutKetThuc = totalPhutBatDau + thoiluong;

        const gioKetThuc = Math.floor(totalPhutKetThuc / 60) % 24;
        const phutKetThuc = totalPhutKetThuc % 60;
        return `${String(gioKetThuc).padStart(2, '0')}:${String(phutKetThuc).padStart(2, '0')}`;
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: caChieu || {
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
        }),
        onSubmit: async (values) => {
            try {
                values.gioketthuc = tinhGioKetThuc(values.giobatdau, phimDurations[values.phim_id]);
                
                await axios.put(`http://localhost:3000/xuatchieu/update/${caChieuId}`, values);
                Swal.fire('Cập nhật ca chiếu thành công!');
                router.push('/admin/cachieu');
            } catch (error) {
                console.error("Error updating ca chieu:", error);
                Swal.fire("Có lỗi xảy ra khi cập nhật ca chiếu.");
            }
        }
    });

    useEffect(() => {
        if (formik.values.giobatdau && formik.values.phim_id) {
            formik.setFieldValue('gioketthuc', tinhGioKetThuc(formik.values.giobatdau, phimDurations[formik.values.phim_id]));
        }
    }, [formik.values.giobatdau, formik.values.phim_id]);

    if (loading) return <div>Loading...</div>;

    return (
        <Layout>
            <div className="container">
                <h1>Cập Nhật Ca Chiếu</h1>
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
                                {phongChieus.map(phongchieu => (
                                    <option key={phongchieu._id} value={phongchieu._id}>
                                        {phongchieu.tenphong}
                                    </option>
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
                                {phims.map(phim => (
                                    <option key={phim._id} value={phim._id}>
                                        {phim.tenphim}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-6">
                            <label>Ngày Chiếu</label>
                            <input
                                type="date"
                                name="ngaychieu"
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
                    <button type="submit">Cập Nhật Ca Chiếu</button>
                </form>
            </div>
        </Layout>
    );
}
