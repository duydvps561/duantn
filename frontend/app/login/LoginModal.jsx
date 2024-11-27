"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./loginModal.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";

export default function LoginModal({ show, handleClose }) {
  const dispatch = useDispatch();
  // const isAuthen = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter;
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
            matkhau: values.matkhau,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Đăng nhập thất bại");
        }

        const data = await res.json();
        const { token, user } = data;

        dispatch(login({ token, user }));
        alert("Đăng nhập thành công!");
        handleClose();
        router.push("/");
      } catch (error) {
        setFieldError("general", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // if (isAuthen) {
  //   return (
  //     <div className="module_modal" onClick={handleClose}>
  //       <div
  //         className="modal-overlay"
  //         onClick={(event) => event.stopPropagation()}
  //       >
  //         <div className="modal-login bg-dark rounded">
  //           <h2>Bạn đã đăng nhập thành công!</h2>
  //           <button onClick={handleClose} className="close-modal">
  //             &times;
  //           </button>
  //           <p>Người dùng hiện tại: {formik.values.email}</p>
  //           <button onClick={handleClose}>Đóng</button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
 
  return (
    <div className="module_modal" onClick={handleClose}>
      <div
        className="modal-overlay"
        onClick={(event) => event.stopPropagation()}
      >
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
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}

            <label className="key" htmlFor="matkhau">
              Mật khẩu:
            </label>
            <input
              type="password"
              id="matkhau"
              name="matkhau"
              required
              placeholder="Mật khẩu...."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.matkhau}
            />
            {formik.touched.matkhau && formik.errors.matkhau && (
              <div className="error">{formik.errors.matkhau}</div>
            )}

            <p className="upPW">
              <a href="#">Quên mật khẩu?</a>
            </p>
            <button type="submit" disabled={formik.isSubmitting}>
              Đăng nhập
            </button>
            <p className="ans text-light">
              Bạn chưa có tài khoản?{" "}
              <a className="register text-danger" href="/register">
                Đăng ký
              </a>
            </p>
          </form>
          {formik.errors.general && (
            <div className="error">{formik.errors.general}</div>
          )}
        </div>
      </div>
    </div>
  );
}
