import React from "react";
import "./infor.css"; // Đảm bảo bạn có CSS cho modal

const InfoModal = ({ show, handleClose, user }) => {
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
              <strong>Ngày sinh:</strong>
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
