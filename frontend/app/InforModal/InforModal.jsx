// app/inforModal/InforModal.js
import React, { useEffect, useState } from "react";
import "./infor.css";

const InfoModal = ({ show, handleClose, email }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token && email) {
        try {
          const response = await fetch(
            `http://localhost:3000/taiKhoan?email=${email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    if (show) {
      fetchUserData();
    }
  }, [show, email]);

  if (!show) return null;

  return (
    <div className="info-modal-overlay">
      <div className="info-modal">
        <h2>Thông tin người dùng</h2>
        {user ? (
          <>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Tên tài khoản:</strong>{" "}
              {user.tentaikhoan || "Không có tên tài khoản"}
            </p>
            <p>
              <strong>Giới tính:</strong>{" "}
              {user.gioitinh || "Không có thông tin"}
            </p>
            <p>
              <strong>SDT:</strong> {user.sdt || "Không có thông tin"}
            </p>
            <p>
              <strong>Ngày sinh:</strong>{" "}
              {user.ngaysinh
                ? new Date(user.ngaysinh).toLocaleDateString("vi-VN")
                : "Không có thông tin"}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {user.trangthai || "Không có thông tin"}
            </p>
          </>
        ) : (
          <p>Không có thông tin người dùng.</p>
        )}
        <button onClick={handleClose}>Đóng</button>
      </div>
    </div>
  );
};

export default InfoModal;
