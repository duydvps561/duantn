"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2"; // Import SweetAlert2
import * as Yup from "yup"; // Import Yup để kiểm tra dữ liệu
import './forgot.css';

export default function Forgotpassword() {
  const [email, setEmail] = useState("");

  // Validation schema dùng Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kiểm tra email trước khi gửi yêu cầu
      await validationSchema.validate({ email });

      const response = await axios.post("http://localhost:3000/forgotpassword/forgot-password", { email });
      if (response.status === 200) {
        setEmail("");

        // Hiển thị thông báo thành công với SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Email đã được gửi!',
          text: 'Vui lòng kiểm tra hòm thư của bạn để đặt lại mật khẩu.',
        });
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        // Nếu có lỗi từ Yup
        Swal.fire({
          icon: 'warning',
          title: 'Lỗi xác minh!',
          text: err.message,
        });
      } else if (err.response) {
        // Lỗi từ server
        Swal.fire({
          icon: 'error',
          title: 'Lỗi!',
          text: err.response.data.error || "Có lỗi xảy ra, vui lòng thử lại.",
        });
      } else {
        // Lỗi kết nối
        Swal.fire({
          icon: 'error',
          title: 'Lỗi kết nối!',
          text: "Không thể kết nối với máy chủ.",
        });
      }
    }
  };

  return (
    <div className="container forgotform">
      <h3>Quên mật khẩu</h3>
      <form onSubmit={handleSubmit}>
        <div className="forget-email">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn forget-submit">Gửi yêu cầu</button>
      </form>
      <Link className="next-trang" href="/">
        <span className="">Quay lại trang chủ</span>
      </Link>
    </div>
  );
}
