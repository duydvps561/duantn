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
        Array.from({ length: 22 }, (_, i) => `${String(i + 1).padStart(2, '0')}:00`)
    );
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const [caChieuRes, phongChieuRes, phimRes] = await Promise.all([
                        axios.get(`http://localhost:3000/xuatchieu/${id}`),
                        axios.get('http://localhost:3000/phongchieu'),
                        axios.get('http://localhost:3000/phim'),
                    ]);
                    setCaChieu(caChieuRes.data);
                    setPhongChieus(phongChieuRes.data);
                    setPhims(phimRes.data);
                    const durations = {};
                    phimRes.data.forEach(phim => {
                        durations[phim._id] = phim.dodai;
                    });
                    setPhimDurations(durations);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                Swal.fire('Lỗi!', 'Không thể tải dữ liệu.', 'error');
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const calculateEndTime = (startTime, phimId) => {
        const duration = phimDurations[phimId] || 120; // Fallback to 2 hours if duration is unavailable
        const [hour, minute] = startTime.split(':').map(Number);
        const endHour = (hour + Math.floor(duration / 60)) % 24;
        const endMinute = (minute + (duration % 60)) % 60;
        return `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
    };

    const formik = useFormik({
        initialValues: {
            phongchieu_id: caChieu ? caChieu.phongchieu_id : '',
            phim_id: caChieu ? caChieu.phim_id : '',
            ngaychieu: caChieu ? caChieu.ngaychieu : '',
            giobatdau: caChieu ? caChieu.giobatdau : '',
            gioketthuc: caChieu ? calculateEndTime(caChieu.giobatdau, caChieu.phim_id) : '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            phongchieu_id: Yup.string().required('Chọn phòng chiếu'),
            phim_id: Yup.string().required('Chọn phim'),
            ngaychieu: Yup.date().required('Chọn ngày chiếu'),
            giobatdau: Yup.string().required('Nhập giờ bắt đầu'),
            gioketthuc: Yup.string().required('Nhập giờ kết thúc')
        }),
        onSubmit: async (values) => {
            try {
                await axios.put(`http://localhost:3000/xuatchieu/update/${id}`, values);
                Swal.fire('Thành công!', 'Cập nhật ca chiếu thành công.', 'success');
                router.push('/admin/cachieu');
            } catch (error) {
                console.error('Error updating CaChieu:', error);
                Swal.fire('Lỗi!', 'Đã xảy ra lỗi khi cập nhật ca chiếu.', 'error');
            }
        }
    });

    return (
        <Layout>
            <div className="container">
                <h1>Cập Nhật Ca Chiếu</h1>
                {loading ? <p>Loading...</p> : (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="row">
                            {/* Phòng Chiếu */}
                            <div className="col-6">
                                <label>Phòng Chiếu</label>
                                <select
                                    name="phongchieu_id"
                                    value={formik.values.phongchieu_id}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Chọn phòng chiếu</option>
                                    {phongChieus.map(phong => (
                                        <option key={phong._id} value={phong._id}>{phong.tenphong}</option>
                                    ))}
                                </select>
                                {formik.touched.phongchieu_id && formik.errors.phongchieu_id && (
                                    <div>{formik.errors.phongchieu_id}</div>
                                )}
                            </div>

                            {/* Phim */}
                            <div className="col-6">
                                <label>Phim</label>
                                <select
                                    name="phim_id"
                                    value={formik.values.phim_id}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        formik.setFieldValue(
                                            'gioketthuc',
                                            calculateEndTime(formik.values.giobatdau, e.target.value)
                                        );
                                    }}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Chọn phim</option>
                                    {phims.map(phim => (
                                        <option key={phim._id} value={phim._id}>{phim.tenphim}</option>
                                    ))}
                                </select>
                                {formik.touched.phim_id && formik.errors.phim_id && (
                                    <div>{formik.errors.phim_id}</div>
                                )}
                            </div>
                        </div>

                        {/* Ngày Chiếu & Giờ */}
                        <div className="row">
                            {/* Ngày Chiếu */}
                            <div className="col-3">
                                <label>Ngày Chiếu</label>
                                <input
                                    type="date"
                                    name="ngaychieu"
                                    value={formik.values.ngaychieu}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.ngaychieu && formik.errors.ngaychieu && (
                                    <div>{formik.errors.ngaychieu}</div>
                                )}
                            </div>

                            {/* Giờ Bắt Đầu */}
                            <div className="col-3">
                                <label>Giờ Bắt Đầu</label>
                                <select
                                    name="giobatdau"
                                    value={formik.values.giobatdau}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        formik.setFieldValue(
                                            'gioketthuc',
                                            calculateEndTime(e.target.value, formik.values.phim_id)
                                        );
                                    }}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Chọn giờ bắt đầu</option>
                                    {gioBatDauOptions.map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                                {formik.touched.giobatdau && formik.errors.giobatdau && (
                                    <div>{formik.errors.giobatdau}</div>
                                )}
                            </div>

                            {/* Giờ Kết Thúc */}
                            <div className="col-3">
                                <label>Giờ Kết Thúc</label>
                                <input
                                    type="text"
                                    name="gioketthuc"
                                    value={formik.values.gioketthuc}
                                    readOnly
                                />
                                {formik.touched.gioketthuc && formik.errors.gioketthuc && (
                                    <div>{formik.errors.gioketthuc}</div>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="row mt-3">
                            <button type="submit">Cập nhật ca chiếu</button>
                        </div>
                    </form>
                )}
            </div>
        </Layout>
    );
}
