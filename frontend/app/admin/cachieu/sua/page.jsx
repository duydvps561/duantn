"use client";
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function SuaCaChieu({ params }) {
    const [caChieu, setCaChieu] = useState(null);
    const router = useRouter();

    // Lấy dữ liệu ca chiếu khi component được mount
    useEffect(() => {
        const fetchCaChieu = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/xuatchieu/${params.id}`);
                setCaChieu(response.data);
                formik.setValues({
                    phongchieu_id: response.data.phongchieu_id,
                    phim_id: response.data.phim_id,
                    ngaychieu: response.data.ngaychieu,
                    giobatdau: response.data.giobatdau,
                    gioketthuc: response.data.gioketthuc
                });
            } catch (error) {
                console.error('Error fetching CaChieu:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Không thể tải dữ liệu ca chiếu.'
                });
            }
        };
        fetchCaChieu();
    }, [params.id]);

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
        onSubmit: async (values) => {
            try {
                await axios.put(`http://localhost:3000/xuatchieu/update/${params.id}`, values);
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Ca chiếu đã được cập nhật thành công!'
                });
                router.push('/admin/cachieu');
            } catch (error) {
                console.error('Error updating CaChieu:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Đã xảy ra lỗi khi cập nhật ca chiếu.'
                });
            }
        }
    });

    // Kiểm tra nếu caChieu chưa được tải
    if (!caChieu) return <p>Loading...</p>;

    return (
        <Layout>
            <div className="container">
                <h1>Sửa Ca Chiếu</h1>
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
                                {/* Thêm tùy chọn phòng chiếu tương tự như trong trang thêm */}
                                {/* Ví dụ: */}
                                <option value="1">Phòng 1</option>
                                <option value="2">Phòng 2</option>
                                {/* ... thêm các phòng khác */}
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
                                {/* Thêm tùy chọn phim tương tự như trong trang thêm */}
                                {/* Ví dụ: */}
                                <option value="1">Phim A</option>
                                <option value="2">Phim B</option>
                                {/* ... thêm các phim khác */}
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
                            <input
                                type="time"
                                name="giobatdau"
                                value={formik.values.giobatdau}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.giobatdau && formik.errors.giobatdau ? (
                                <div>{formik.errors.giobatdau}</div>
                            ) : null}
                        </div>

                        <div className="col-3">
                            <label>Giờ Kết Thúc</label>
                            <input
                                type="time"
                                name="gioketthuc"
                                value={formik.values.gioketthuc}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.gioketthuc && formik.errors.gioketthuc ? (
                                <div>{formik.errors.gioketthuc}</div>
                            ) : null}
                        </div>
                    </div>
                    <button type="submit">Cập Nhật Ca Chiếu</button>
                </form>
            </div>
        </Layout>
    );
}
