"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./loginModal.css";

export default function LoginModal({ show, handleClose }) {
  if (!show) return null;

  const formik = useFormik({
    initialValues: {
      email: "",
      matkhau: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email không hợp lệ").required("Bắt buộc"),
      matkhau: Yup.string().required("Bắt buộc"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch("http://localhost:3000/login/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            matkhau: values.matkhau, // Chỉnh sửa trường này cho phù hợp với API
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Đăng nhập thất bại");
        }

        // Lưu token vào cookie
        const data = await res.json();
        document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}`;

        alert("Đăng nhập thành công!");

        // Chuyển trang theo role
        const token = data.token;
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role === "admin") {
          window.location.href = "http://localhost:3002/";
        } else {
          window.location.href = "/";
        }
      } catch (error) {
        setFieldError("general", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="modal-overlay">
      <div className="modal-login bg-dark rounded">
        <button onClick={handleClose} className="close-modal">
          &times;
        </button>
        <h2>Đăng nhập</h2>
        <form onSubmit={formik.handleSubmit}>
          <label className="key" htmlFor="email">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            required
            placeholder="Email...."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}

          <label className="key" htmlFor="matkhau">
            Mật khẩu:
          </label>
          <input
            type="matkhau"
            id="matkhau"
            name="matkhau"
            required
            placeholder="Mật khẩu...."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.matkhau}
          />
          {formik.touched.matkhau && formik.errors.matkhau ? (
            <div className="error">{formik.errors.matkhau}</div>
          ) : null}

          <p className="upPW">
            <a href="">Quên mật khẩu</a>
          </p>
          <button type="submit">Đăng nhập</button>
          <p className="ans text-light">
            Bạn chưa có tài khoản?{" "}
            <a className="register text-danger" href="">
              Đăng ký
            </a>
          </p>
        </form>
        {formik.errors.general && (
          <div className="error">{formik.errors.general}</div>
        )}
      </div>
    </div>
  );
}
