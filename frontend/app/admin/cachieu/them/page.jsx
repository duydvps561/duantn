"use client"
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import Swal from 'sweetalert2';
import './AddCaChieu.css';

export default function AddCaChieu() {
    const [phongChieus, setPhongChieus] = useState([]);
    const [phims, setPhims] = useState([]);
    const [caChieus, setCaChieus] = useState([]);
    const [gioBatDauOptions] = useState(
        Array.from({ length: 22 }, (_, i) => `${String(i + 1).padStart(2, '0')}:00`)
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const phongChieuResponse = await axios.get('http://localhost:3000/phongchieu');
                setPhongChieus(phongChieuResponse.data);

                const phimResponse = await axios.get('http://localhost:3000/phim');
                setPhims(phimResponse.data);

                const today = new Date().toISOString().split('T')[0];
                document.getElementById('ngaychieu').setAttribute('min', today);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const calculateEndTime = (startTime) => {
        if (!startTime) return '';
        const [hour, minute] = startTime.split(':').map(Number);
        const endHour = (hour + 2) % 24; // Giả sử ca chiếu dài 2 giờ
        return `${String(endHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    };

    const checkAvailability = async (values) => {
        const { phongchieu_id, ngaychieu, giobatdau, gioketthuc } = values;
        try {
            const response = await axios.post('http://localhost:3000/xuatchieu/check', {
                phongchieu_id, ngaychieu, giobatdau, gioketthuc
            });
            return response.data.available;
        } catch (error) {
            console.error('Error checking availability:', error);
            return false; 
        }
    };

    const isOverlapping = (newShowtime) => {
        const newStartTime = new Date(`${newShowtime.ngaychieu}T${newShowtime.giobatdau}`);
        const newEndTime = new Date(`${newShowtime.ngaychieu}T${newShowtime.gioketthuc}`);

        return caChieus.some(caChieu => {
            const existingStartTime = new Date(`${caChieu.ngaychieu}T${caChieu.giobatdau}`);
            const existingEndTime = new Date(`${caChieu.ngaychieu}T${caChieu.gioketthuc}`);

            return (
                (newStartTime >= existingStartTime && newStartTime < existingEndTime) || // Trùng với giờ bắt đầu của ca chiếu đã có
                (newEndTime > existingStartTime && newEndTime <= existingEndTime) || // Trùng với giờ kết thúc của ca chiếu đã có
                (newStartTime <= existingStartTime && newEndTime >= existingEndTime) // Ca chiếu mới bao gồm ca chiếu đã có
            );
        });
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
            // Kiểm tra trùng lặp
            if (isOverlapping(values)) {
                Swal.fire('Khoảng thời gian này đã có ca chiếu khác!');
                return;
            }

            const isAvailable = await checkAvailability(values);
            if (!isAvailable) {
                Swal.fire('Khoảng thời gian này đã có ca chiếu khác!');
                return;
            }

            setCaChieus((prevCaChieus) => [...prevCaChieus, values]); // Cập nhật danh sách Ca Chiếu
            resetForm();
        }
    });

    const handleAddShowtime = async () => {
        for (const caChieu of caChieus) {
            try {
                await axios.post('http://localhost:3000/xuatchieu/add', caChieu);
            } catch (error) {
                console.error('Error adding CaChieu:', error);
                Swal.fire('Đã xảy ra lỗi khi thêm ca chiếu.');
            }
        }
        Swal.fire('Tất cả các ca chiếu đã được thêm thành công!');
        setCaChieus([]); // Xóa tất cả ca chiếu sau khi thêm thành công
    };

    useEffect(() => {
        if (formik.values.giobatdau) {
            formik.setFieldValue('gioketthuc', calculateEndTime(formik.values.giobatdau));
        }
    }, [formik.values.giobatdau]);

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
                            >
                                <option value="">Chọn phòng chiếu</option>
                                {phongChieus.map(phong => (
                                    <option key={phong._id} value={phong._id}>{phong.tenphong}</option>
                                ))}
                            </select>
                            {formik.touched.phongchieu_id && formik.errors.phongchieu_id ? (
                                <div>{formik.errors.phongchieu_id}</div>
                            ) : null}
                        </div>

                        <div className="col-6">
                            <label>Phim</label>
                            <select
                                name="phim_id"
                                value={formik.values.phim_id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">Chọn phim</option>
                                {phims.map(phim => (
                                    <option key={phim._id} value={phim._id}>{phim.tenphim}</option>
                                ))}
                            </select>
                            {formik.touched.phim_id && formik.errors.phim_id ? (
                                <div>{formik.errors.phim_id}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            <label>Ngày Chiếu</label>
                            <input
                                type="date"
                                name="ngaychieu"
                                id="ngaychieu"
                                value={formik.values.ngaychieu}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.ngaychieu && formik.errors.ngaychieu ? (
                                <div>{formik.errors.ngaychieu}</div>
                            ) : null}
                        </div>

                        <div className="col-3">
                            <label>Giờ Bắt Đầu</label>
                            <select
                                name="giobatdau"
                                value={formik.values.giobatdau}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    formik.setFieldValue('gioketthuc', calculateEndTime(e.target.value));
                                }}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">Chọn giờ bắt đầu</option>
                                {gioBatDauOptions.map(gio => (
                                    <option key={gio} value={gio}>{gio}</option>
                                ))}
                            </select>
                            {formik.touched.giobatdau && formik.errors.giobatdau ? (
                                <div>{formik.errors.giobatdau}</div>
                            ) : null}
                        </div>

                        <div className="col-3">
                            <label>Giờ Kết Thúc</label>
                            <input
                                type="text"
                                name="gioketthuc"
                                value={formik.values.gioketthuc}
                                readOnly
                            />
                            {formik.touched.gioketthuc && formik.errors.gioketthuc ? (
                                <div>{formik.errors.gioketthuc}</div>
                            ) : null}
                        </div>

                        <div className="col-3">
                            <label>&nbsp;</label>
                            <button type="submit">Thêm Ca Chiếu</button>
                        </div>
                    </div>
                </form>

                {caChieus.length > 0 && (
                    <div>
                        <h2>Danh Sách Ca Chiếu</h2>
                        <ul>
                            {caChieus.map((caChieu, index) => {
                                const phong = phongChieus.find(p => p._id === caChieu.phongchieu_id)?.tenphong;
                                const phim = phims.find(p => p._id === caChieu.phim_id)?.tenphim;
                                return (
                                    <li key={index}>
                                        {phong} - {phim} - {caChieu.ngaychieu} - {caChieu.giobatdau} - {caChieu.gioketthuc}
                                    </li>
                                );
                            })}
                        </ul>
                        <button onClick={handleAddShowtime}>Lưu Tất Cả</button>
                    </div>
                )}
            </div>
        </Layout>
    );
}
