import React, { useEffect, useState } from "react";
import "./userinfor.css";

const UserInfo = ({ userId, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/taikhoan/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
        setUpdatedUser(data); // Khởi tạo updatedUser với dữ liệu ban đầu
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      console.log("userId is undefined or null");
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/taikhoan/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUser(data); // Cập nhật thông tin người dùng mới
      setIsEditing(false); // Đổi về chế độ xem
    } catch (error) {
      console.error("Error updating user:", error);
      setError(error.message);
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!user) return null;

  return (
    <div className="user-info">
  <h2>Thông tin cá nhân</h2>
  {isEditing ? (
    <div className="put-infor">
        <label>
          Tên người dùng:
          </label>
          <input
            type="text"
            name="tentaikhoan"
            value={updatedUser.tentaikhoan || ""}
            onChange={handleChange}
          />
        
        <label>
          Email:
          </label>
          <input
            type="email"
            name="email"
            value={updatedUser.email || ""}
            onChange={handleChange}
          />
        
        <label>
          Số điện thoại:
          </label>
          <input
            type="text"
            name="sdt"
            value={updatedUser.sdt || ""}
            onChange={handleChange}
          />
        
        <label>
          Giới tính:
          </label>
          <input
            type="text"
            name="gioitinh"
            value={updatedUser.gioitinh || ""}
            onChange={handleChange}
          />
       
        <label>
          Ngày sinh:
          </label>
          <input
            type="date"
            name="ngaysinh"
            value={
              updatedUser.ngaysinh
                ? new Date(updatedUser.ngaysinh).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
          />
        
        <label>
          Vai trò:
          </label>
          <input
            type="text"
            name="vaitro"
            value={updatedUser.vaitro || ""}
            onChange={handleChange}
          />
        
      <div className="button-group">
        <button onClick={handleSave}>Lưu</button>
        <button onClick={() => setIsEditing(false)}>Hủy</button>
      </div>
    </div>
  ) : (
    <div className="get-infor">
      <div className="info-group">
        <p>Tên người dùng: {user.tentaikhoan || "Chưa có tên"}</p>
        <p>Email: {user.email || "Chưa có email"}</p>
      </div>
      <div className="info-group">
        <p>Số điện thoại: {user.sdt || "Chưa có số điện thoại"}</p>
        <p>Giới tính: {user.gioitinh || "Chưa có giới tính"}</p>
      </div>
      <div className="info-group">
        <p>
          Ngày sinh: {new Date(user.ngaysinh).toLocaleDateString() || "Chưa có ngày sinh"}
        </p>
        <p>Vai trò: {user.vaitro || "Chưa có vai trò"}</p>
      </div>
      <div className="button-group">
        <button onClick={() => setIsEditing(true)}>Sửa</button>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  )}
</div>
  );
};

export default UserInfo;
