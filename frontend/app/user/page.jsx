"use client"; // Đánh dấu component này là Client Component

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Lấy user từ Redux state

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [formData, setFormData] = useState({
    email: "",
    tentaikhoan: "",
    sdt: "",
    vaitro: "",
    ngaysinh: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const id = user?.id;
      console.log("User ID:", id);

      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:3000/taikhoan/${id}`
          );
          setUserData(response.data);
          // Cập nhật formData với dữ liệu người dùng
          setFormData({
            email: response.data.email,
            tentaikhoan: response.data.tentaikhoan,
            sdt: response.data.sdt,
            vaitro: response.data.vaitro,
            ngaysinh: response.data.ngaysinh,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Unable to fetch user data");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError("User ID is not defined");
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = user?.id;

    try {
      const response = await axios.put(
        `http://localhost:3000/taikhoan/${id}`,
        formData
      );
      setUserData(response.data);
      setIsEditing(false); // Đóng form chỉnh sửa
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Unable to update user data");
    }
  };

  if (loading) return <p>Đang tải thông tin người dùng...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  return (
    <div>
      <h1>Thông tin cá nhân</h1>
      {isEditing ? ( // Kiểm tra trạng thái chỉnh sửa
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Tên tài khoản:</label>
            <input
              type="text"
              name="tentaikhoan"
              value={formData.tentaikhoan}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Số điện thoại:</label>
            <input
              type="text"
              name="sdt"
              value={formData.sdt}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Vai trò:</label>
            <input
              type="text"
              name="vaitro"
              value={formData.vaitro}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Ngày sinh:</label>
            <input
              type="date"
              name="ngaysinh"
              value={formData.ngaysinh.split("T")[0]}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Lưu thay đổi</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Hủy
          </button>
        </form>
      ) : (
        userData && ( // Hiển thị thông tin người dùng nếu không ở chế độ chỉnh sửa
          <div>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Tên tài khoản:</strong> {userData.tentaikhoan}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {userData.sdt}
            </p>
            <p>
              <strong>Vai trò:</strong> {userData.vaitro}
            </p>
            <p>
              <strong>Ngày sinh:</strong>{" "}
              {(() => {
                const dateParts = userData.ngaysinh.split("T")[0].split("-");
                return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
              })()}{" "}
            </p>

            {/* Nút chỉnh sửa */}
            <button onClick={() => setIsEditing(true)}>
              Chỉnh sửa thông tin
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default UserProfile;
