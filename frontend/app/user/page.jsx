"use client"; // Đánh dấu component này là Client Component

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faPhone, faCalendarAlt } from "@fortawesome/free-solid-svg-icons"; // Nhập các icon cần thiết
import './user.css'; // Nhập file CSS

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Lấy user từ Redux state

  const [userData, setUserData] = useState(() => {
    // Kiểm tra localStorage khi khởi tạo state
    const savedData = localStorage.getItem('userData');
    return savedData ? JSON.parse(savedData) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [formData, setFormData] = useState({
    email: "",
    tentaikhoan: "",
    sdt: "",
    ngaysinh: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const id = user?.id;

      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:3000/taikhoan/${id}`
          );
          setUserData(response.data);
          localStorage.setItem('userData', JSON.stringify(response.data)); // Lưu dữ liệu vào localStorage
          // Cập nhật formData với dữ liệu người dùng
          setFormData({
            email: response.data.email,
            tentaikhoan: response.data.tentaikhoan,
            sdt: response.data.sdt,
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

    if (!userData) { // Chỉ gọi fetchUserData nếu chưa có dữ liệu
      fetchUserData();
    } else {
      setLoading(false); // Nếu đã có dữ liệu trong localStorage thì không cần loading
    }
  }, [user, userData]);

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
      localStorage.setItem('userData', JSON.stringify(response.data)); // Cập nhật dữ liệu vào localStorage
      setIsEditing(false); // Đóng form chỉnh sửa
    } catch (error) {
      console.error("Error updating user data:", error);
      setError("Unable to update user data");
    }
  };

  if (loading) return <p className="loading">Đang tải thông tin người dùng...</p>;
  if (error) return <p className="error">Lỗi: {error}</p>;

  return (
  <div className="user-container">
      <h1 className="user-profile__title">Thông tin cá nhân</h1>
      {isEditing ? ( 
        <form onSubmit={handleSubmit} className="user-profile__form">
          <div className="form-group">
            <label className="form-group__label">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-group__input"
            />
          </div>
          <div className="form-group">
            <label className="form-group__label">Tên tài khoản:</label>
            <input
              type="text"
              name="tentaikhoan"
              value={formData.tentaikhoan}
              onChange={handleChange}
              required
              className="form-group__input"
            />
          </div>
          <div className="form-group">
            <label className="form-group__label">Số điện thoại:</label>
            <input
              type="text"
              name="sdt"
              value={formData.sdt}
              onChange={handleChange}
              required
              className="form-group__input"
            />
          </div>
          <div className="form-group">
            <label className="form-group__label">Ngày sinh:</label>
            <input
              type="date"
              name="ngaysinh"
              value={formData.ngaysinh.split("T")[0]}
              onChange={handleChange}
              required
              className="form-group__input"
            />
          </div>
          <button type="submit" className="user-profile__button put-button">Lưu thay đổi</button>
          <button type="button" onClick={() => setIsEditing(false)} className="user-profile__button cancel-button">
            Hủy
          </button>
        </form>
      ) : (
        userData && ( // Hiển thị thông tin người dùng nếu không ở chế độ chỉnh sửa
        <div className="user-profile__info">
          <div class="avt-user">
          <img src="" alt="Avatar User" />
          </div>
        <div class="user-information">
          <div class="name__info">
            <h3>{userData.tentaikhoan}</h3>
            <p>@dovanduy230904</p>
          </div>
          <div class="information">
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Số điện thoại:</strong> {userData.sdt}</p>
            <p><strong>Ngày sinh:</strong>{" "}
                {(() => {
                  const dateParts = userData.ngaysinh.split("T")[0].split("-");
                  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
                })()}</p>
          </div>
        </div>
        <div class="rank__user">
          <p class="time__start"><strong>Thành viên từ:</strong> 01/01/2022</p>
          <p class="number__rank">Điểm: 1500</p>
        </div>
            {/* Nút chỉnh sửa */}
            <button onClick={() => setIsEditing(true)} className="user-profile__button edit-button">
              Chỉnh sửa thông tin
            </button>
          </div>
        )
      )}
    
  </div>
    
  );
};

export default UserProfile;