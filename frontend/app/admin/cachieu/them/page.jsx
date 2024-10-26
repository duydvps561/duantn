"use client"
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import Swal from 'sweetalert2';
import './AddCaChieu.css';

export default function AddCaChieu() {
    const [phongChieus, setPhongChieus] = useState([]);
    const [phims, setPhims] = useState([]);
    const [gioBatDauOptions] = useState(
        Array.from({ length: 22 }, (_, i) => {
            const hour = String(i + 1).padStart(2, '0');
            return `${hour}:00`;
        })
    );

    useEffect(() => {
        axios.get('http://localhost:3000/phongchieu')
            .then(response => setPhongChieus(response.data))
            .catch(error => console.error('Error fetching PhongChieu:', error));

        axios.get('http://localhost:3000/phim')
            .then(response => setPhims(response.data))
            .catch(error => console.error('Error fetching Phim:', error));

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        document.getElementById('ngaychieu').setAttribute('min', tomorrowStr);
    }, []);

    const calculateEndTime = (startTime) => {
        if (!startTime) return '';
        const [hour, minute] = startTime.split(':').map(Number);
        const endHour = (hour + 2) % 24;
        return `${String(endHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    };

    const checkAvailability = async (values) => {
        const { phongchieu_id, ngaychieu, giobatdau } = values;
        const startDateTime = new Date(`${ngaychieu}T${giobatdau}:00+07:00`);
        
        const response = await axios.post('http://localhost:3000/xuatchieu/check', {
            phongchieu_id,
            ngaychieu,
            giobatdau: startDateTime.toISOString(),
        });
        return response.data.available;
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
            ngaychieu: Yup.date().required('Chọn ngày chiếu').test('is-future-date', 'Ngày chiếu phải lớn hơn hoặc bằng ngày mai', value => {
                if (!value) return false;
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);
                return new Date(value).getTime() >= tomorrow.getTime();
            }),
            giobatdau: Yup.string().required('Nhập giờ bắt đầu'),
            gioketthuc: Yup.string().required('Nhập giờ kết thúc')
        }),
        onSubmit: async (values, { resetForm }) => {
            const isAvailable = await checkAvailability(values);
            if (!isAvailable) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Khoảng thời gian này đã có ca chiếu khác!'
                });
                return;
            }

            try {
                const response = await axios.post('http://localhost:3000/xuatchieu/add', values);
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Ca chiếu đã được thêm thành công!'
                });
                resetForm();

                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } catch (error) {
                console.error('Error adding CaChieu:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Đã xảy ra lỗi khi thêm ca chiếu.'
                });
            }
        }
    });

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
                                {gioBatDauOptions.map((time, index) => (
                                    <option key={index} value={time}>{time}</option>
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
                    </div>

                    <button type="submit">Thêm Ca Chiếu</button>
                </form>
            </div>
        </Layout>
    );
}
