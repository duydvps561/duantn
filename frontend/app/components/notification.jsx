"use client";
import React, { useEffect } from "react";

export default function Notification({ message, isVisible, onClose, type }) {
    useEffect(() => {
        // Tự động đóng sau 5 giây (nếu cần)
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000); // 5 giây

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    // Đặt màu sắc dựa trên loại thông báo
    const getNotificationStyle = () => {
        switch (type) {
            case 'success':
                return { color: "green" }; // Màu xanh lá cho thành công
            case 'canceled':
                return { color: "#dc3545" }; // Màu đỏ cho thất bại
            default:
                return { color: "#000", }; // Màu mặc định
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                top: "70px", // Vị trí từ trên xuống
                right: "20px", // Vị trí từ phải sang
                width: "300px", // Chiều rộng của thông báo
                padding: "10px", // Padding trong thông báo
                borderRadius: "10px", // Góc bo tròn
                display: isVisible ? "block" : "none", // Ẩn khi không cần thiết
                zIndex: 9999, // Đảm bảo thông báo ở trên cùng
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Đổ bóng cho thông báo
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.5s ease-in-out", // Hiệu ứng mờ dần
                ...getNotificationStyle(),
            }}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                    maxWidth: "400px",
                    textAlign: "center",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    position: "relative", // Để đặt nút "X" trong thông báo
                }}
            >
                {/* Nút "X" để đóng thông báo */}
                <h3 style={{ color: getNotificationStyle().color,fontSize:'16px' }}>{message}</h3>
                <button
                    onClick={onClose}
                    style={{
                        top: "10px",
                        right: "5px",
                        background: "none",
                        border: "none",
                        fontSize: "12px",
                        cursor: "pointer",
                    }}
                >
                    Đóng
                </button>
            </div>
        </div>
    );
}
