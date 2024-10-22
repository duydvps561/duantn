'use client';
import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup'; 
import './register.css'; 

export default function LoginModal({ show, handleClose }) {
    if (!show) return null; 

    const validationSchema = Yup.object({
        ho: Yup.string()
            .required('Vui lòng nhập họ'),
        ten: Yup.string()
            .required('Vui lòng nhập tên'),
        username: Yup.string()
            .required('Vui lòng nhập tên tài khoản'),
        nphone: Yup.string()
            .matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ')
            .required('Vui lòng nhập số điện thoại'),
        email: Yup.string()
            .email('Email không hợp lệ')
            .required('Vui lòng nhập email'),
        password: Yup.string()
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
            .required('Vui lòng nhập mật khẩu'),
        repassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
            .required('Vui lòng xác nhận mật khẩu'),
    });

    // Sử dụng Formik để quản lý form
    const formik = useFormik({
        initialValues: {
            ho: '',
            ten: '',
            username: '',
            nphone: '',
            email: '',
            password: '',
            repassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:3000/register', {
                    ho: values.ho,
                    ten: values.ten,
                    username: values.username,
                    nphone: values.nphone,
                    email: values.email,
                    password: values.password
                });

                if(response.status === 200) {
                    alert('Đăng ky thành công!');
                    handleClose();
                }
            } catch (error) {
                console.error('Có lỗi xảy ra:', error);
                alert('Đăng ký không thành công. Vui lòng thử lại !');
                
            }
        },
    });

    return (
        <div className="modal-overlay">
            <div className="modal-register bg-dark rounded">
                <button onClick={handleClose} className="close-modal">&times;</button>
                <h2>Đăng Ký</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="hoten">
                        <div className="ho">
                            <label htmlFor="ho">Họ:</label>
                            <input
                                type="text"
                                name="ho"
                                placeholder="Họ..."
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.ho}
                            />
                            {formik.touched.ho && formik.errors.ho ? <div className="error">{formik.errors.ho}</div> : null}
                        </div>
                        <div className="ten">
                            <label htmlFor="ten">Tên:</label>
                            <input
                                type="text"
                                name="ten"
                                placeholder="Tên..."
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.ten}
                            />
                            {formik.touched.ten && formik.errors.ten ? <div className="error">{formik.errors.ten}</div> : null}
                        </div>
                    </div>
                    <div className="username">
                        <label htmlFor="username">Tên tài khoản:</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Tên tài khoản..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username ? <div className="error">{formik.errors.username}</div> : null}
                    </div>
                    <div className="information">
                        <div className="nphone">
                            <label htmlFor="nphone">Số điện thoại:</label>
                            <input
                                type="text"
                                name="nphone"
                                placeholder="Số điện thoại..."
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nphone}
                            />
                            {formik.touched.nphone && formik.errors.nphone ? <div className="error">{formik.errors.nphone}</div> : null}
                        </div>
                        <div className="email">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email..."
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                        </div>
                    </div>
                    <div className="pw">
                        <div className="pass">
                            <label htmlFor="password">Mật khẩu:</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Mật khẩu..."
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
                        </div>
                        <div className="repass">
                            <label htmlFor="repassword">Xác nhận mật khẩu:</label>
                            <input
                                type="password"
                                name="repassword"
                                placeholder="Xác nhận mật khẩu..."
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.repassword}
                            />
                            {formik.touched.repassword && formik.errors.repassword ? <div className="error">{formik.errors.repassword}</div> : null}
                        </div>
                    </div>
                    <button type="submit">Đăng kí</button>
                    <p className="ans text-light">
                        Bạn đã có tài khoản? <a className="login text-danger" href="#">Đăng nhập</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
