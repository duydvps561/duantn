"use client"; // Đánh dấu component này là Client Component

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import './user.css'; // Nhập file CSS

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Lấy user từ Redux state

  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem('userData');
    return savedData ? JSON.parse(savedData) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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
          const response = await axios.get(`http://localhost:3000/taikhoan/${id}`);
          setUserData(response.data);
          localStorage.setItem('userData', JSON.stringify(response.data));
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

    if (!userData) {
      fetchUserData();
    } else {
      setLoading(false);
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
      const response = await axios.put(`http://localhost:3000/taikhoan/${id}`, formData);
      setUserData(response.data);
      localStorage.setItem('userData', JSON.stringify(response.data));
      setIsEditing(false);
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
        userData && (
          <div className="user-profile__info">
            <div className="avt-user">
              <img src={userData.avatar || "./img/A (1) 4.png"} alt="Avatar User" />
            </div>
            <div className="user-information">
              <div className="name__info">
                <p><strong>Tên:</strong> {userData.tentaikhoan}</p>
                <p><strong>Giới tính:</strong> {userData.gioitinh}</p>
                <p><strong>Trạng thái tài khoản:</strong> {userData.trangthai}</p>
              </div>
              <div className="information">
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Số điện thoại:</strong> {userData.sdt}</p>
                <p><strong>Ngày sinh:</strong> {
                  userData.ngaysinh ? 
                  (() => {
                    const dateParts = userData.ngaysinh.split("T")[0].split("-");
                    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
                  })() : "Không có thông tin"
                }</p>
              </div>
            </div>
            <div className="rank__user">
              <p className="time__start"><strong>Thành viên từ:</strong> 01/01/2022</p>
              <p className="number__rank">Điểm: 1500</p>
            </div>
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