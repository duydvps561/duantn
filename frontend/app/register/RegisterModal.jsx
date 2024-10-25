"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Router from "next/router"; // Nhớ import Router
import "./register.css";

export default function RegisterModal({ show, handleClose }) {
  if (!show) return null;

  const formik = useFormik({
    initialValues: {
      ho: "",
      ten: "",
      tentaikhoan: "",
      email: "",
      sdt: "",
      password: "",
      repassword: "", // Sửa lại cho nhất quán
    },
    validationSchema: Yup.object({
      ho: Yup.string().required("Vui lòng nhập họ"),
      ten: Yup.string().required("Vui lòng nhập tên"),
      tentaikhoan: Yup.string().required("Vui lòng nhập tên tài khoản"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      sdt: Yup.string()
        .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
        .required("Vui lòng nhập số điện thoại"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số"
        )
        .required("Vui lòng nhập mật khẩu"),
      repassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
        .required("Vui lòng nhập lại mật khẩu"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ho: values.ho,
            ten: values.ten,
            tentaikhoan: values.tentaikhoan,
            email: values.email,
            sdt: values.sdt,
            password: values.password,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          if (res.status === 400 && errorData.message === "Email đã tồn tại") {
            setFieldError("email", "Email đã tồn tại");
          } else {
            throw new Error(errorData.message || "Đăng ký thất bại");
          }
        } else {
          alert("Đăng ký thành công!");
          Router.push("/"); // Chuyển hướng sau khi đăng ký thành công
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
      <div className="modal-register bg-dark rounded">
        <button onClick={handleClose} className="close-modal">
          &times;
        </button>
        <h2>Đăng Ký</h2>
        <form onSubmit={formik.handleSubmit}>
          {formik.errors.general && (
            <div className="error">{formik.errors.general}</div>
          )}{" "}
          {/* Hiển thị lỗi chung */}
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
              {formik.touched.ho && formik.errors.ho ? (
                <div className="error">{formik.errors.ho}</div>
              ) : null}
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
              {formik.touched.ten && formik.errors.ten ? (
                <div className="error">{formik.errors.ten}</div>
              ) : null}
            </div>
          </div>
          <div className="tentaikhoan">
            <label htmlFor="tentaikhoan">Tên tài khoản:</label>
            <input
              type="text"
              name="tentaikhoan"
              placeholder="Tên tài khoản..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.tentaikhoan}
            />
            {formik.touched.tentaikhoan && formik.errors.tentaikhoan ? (
              <div className="error">{formik.errors.tentaikhoan}</div>
            ) : null}
          </div>
          <div className="information">
            <div className="sdt">
              <label htmlFor="sdt">Số điện thoại:</label>
              <input
                type="text"
                name="sdt"
                placeholder="Số điện thoại..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sdt}
              />
              {formik.touched.sdt && formik.errors.sdt ? (
                <div className="error">{formik.errors.sdt}</div>
              ) : null}
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
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
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
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
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
              {formik.touched.repassword && formik.errors.repassword ? (
                <div className="error">{formik.errors.repassword}</div>
              ) : null}
            </div>
          </div>
          <button type="submit">Đăng kí</button>
          <p className="ans text-light">
            Bạn đã có tài khoản?{" "}
            <a className="login text-danger" href="#">
              Đăng nhập
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
