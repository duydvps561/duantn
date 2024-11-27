"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import * as Yup from "yup"; // Import Yup để kiểm tra mật khẩu
import './resetpass.css';

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation schema dùng Yup
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu không được để trống"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
      .required("Xác nhận mật khẩu không được để trống"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kiểm tra dữ liệu đầu vào trước khi gửi request
      await validationSchema.validate({ password, confirmPassword });

      const response = await axios.post(`http://localhost:3000/forgotpassword/reset-password/${userId}`, {
        token,
        password,
        confirmPassword,
      });

      if (response.status === 200) {
        // Hiển thị thông báo thành công với SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Đổi mật khẩu thành công! Bạn sẽ được chuyển về trang chủ.",
        });
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        // Nếu có lỗi từ Yup
        Swal.fire({
          icon: "error",
          title: "Lỗi xác minh!",
          text: err.message,
        });
      } else if (err.response) {
        // Lỗi từ server
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: err.response.data.error || "Có lỗi xảy ra, vui lòng thử lại.",
        });
      } else {
        // Lỗi kết nối
        Swal.fire({
          icon: "error",
          title: "Lỗi kết nối!",
          text: "Không thể kết nối với máy chủ.",
        });
      }
    }
  };

  return (
    <div className="container forgotform">
      <h3>Đổi lại mật khẩu</h3>
      <form onSubmit={handleSubmit}>
        <div className="forget-email">
          <label>Mật khẩu mới</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="forget-email">
          <label>Xác nhận mật khẩu</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn forget-submit">Đặt lại mật khẩu</button>
      </form>
    </div>
  );
}
