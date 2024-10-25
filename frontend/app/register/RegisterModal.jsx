'use client';
import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import './register.css';

export default function LoginModal({ show, handleClose }) {
    if (!show) return null;

    const validationSchema = Yup.object({
        tentaikhoan: Yup.string()
            .required('Vui lòng nhập tên tài khoản'),
        gioitinh: Yup.string()
            .required('Vui lòng chọn giới tính'),
        sdt: Yup.string()
            .matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ')
            .required('Vui lòng nhập số điện thoại'),
        ngaysinh: Yup.string()
            .required('Vui lòng chọn ngày sinh'),
        email: Yup.string()
            .email('Email không hợp lệ')
            .required('Vui lòng nhập email'),
        matkhau: Yup.string()
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
            .required('Vui lòng nhập mật khẩu'),
        rematkhau: Yup.string()
            .oneOf([Yup.ref('matkhau'), null], 'Mật khẩu xác nhận không khớp')
            .required('Vui lòng xác nhận mật khẩu'),
    });

    const formik = useFormik({
        initialValues: {
            tentaikhoan: '',
            gioitinh: '',
            sdt: '',
            ngaysinh: '',
            email: '',
            matkhau: '',
            rematkhau: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:3000/register/add', {
                    tentaikhoan: values.tentaikhoan,
                    gioitinh: values.gioitinh,
                    sdt: values.sdt,
                    ngaysinh: values.ngaysinh,
                    email: values.email,
                    matkhau: values.matkhau,
                });
                if (response.status === 201) {
                    alert('Đăng ký thành công!');
                    handleClose();
                }
            } catch (error) {
                if (error.response) {
                    console.error('Error data:', error.response.data);
                    console.error('Error status:', error.response.status);
                    alert(`Đăng ký không thành công. Lỗi: ${error.response.data.message}`);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('Error request:', error.request);
                    alert('Không thể kết nối đến server. Vui lòng thử lại sau.');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error message:', error.message);
                    alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
                }
                
            }
        },
    });
    return (
        <div className="modal-overlay">
            <div className="modal-register bg-dark rounded">
                <button onClick={handleClose} className="close-modal">&times;</button>
                <h2>Đăng Ký</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label>Tên tài khoản</label>
                        <input
                            type="text"
                            name="tentaikhoan"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.tentaikhoan}
                        />
                        {formik.touched.tentaikhoan && formik.errors.tentaikhoan ? (
                            <div>{formik.errors.tentaikhoan}</div>
                        ) : null}
                    </div>

                    <div>
                        <label>Giới tính</label>
                        <select
                            name="gioitinh"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.gioitinh}
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                        {formik.touched.gioitinh && formik.errors.gioitinh ? (
                            <div>{formik.errors.gioitinh}</div>
                        ) : null}
                    </div>

                    <div>
                        <label>Số điện thoại</label>
                        <input
                            type="text"
                            name="sdt"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.sdt}
                        />
                        {formik.touched.sdt && formik.errors.sdt ? (
                            <div>{formik.errors.sdt}</div>
                        ) : null}
                    </div>

                    <div>
                        <label>Ngày sinh</label>
                        <input
                            type="date"
                            name="ngaysinh"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.ngaysinh}
                        />
                        {formik.touched.ngaysinh && formik.errors.ngaysinh ? (
                            <div>{formik.errors.ngaysinh}</div>
                        ) : null}
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div>
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            name="matkhau"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.matkhau}
                        />
                        {formik.touched.matkhau && formik.errors.matkhau ? (
                            <div>{formik.errors.matkhau}</div>
                        ) : null}
                    </div>

                    <div>
                        <label>Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            name="rematkhau"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.rematkhau}
                        />
                        {formik.touched.rematkhau && formik.errors.rematkhau ? (
                            <div>{formik.errors.rematkhau}</div>
                        ) : null}
                    </div>
                    <button type="submit">Đăng Ký</button>
                </form>
            </div>
        </div>
    );
}