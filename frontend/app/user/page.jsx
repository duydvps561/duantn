"use client"; // Đánh dấu component này là Client Component

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
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

  const formik = useFormik({
    initialValues: {
      email: "",
      tentaikhoan: "",
      sdt: "",
      ngaysinh: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email không hợp lệ')
        .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Email phải có định dạng @gmail.com")
        .required('Email là bắt buộc'),
      sdt: Yup.string()
        .matches(/^(03|05|07|08|09)\d{8}$/, 'Số điện thoại không hợp lệ')
        .required('Số điện thoại là bắt buộc'),
    }),
    onSubmit: async (values) => {
      const id = user?.id;

      try {
        const response = await axios.put(`http://localhost:3000/taikhoan/${id}`, values);
        setUserData(response.data);
        localStorage.setItem('userData', JSON.stringify(response.data));
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating user data:", error);
        setError("Unable to update user data");
      }
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const id = user?.id;

      if (id) {
        try {
          const response = await axios.get(`http://localhost:3000/taikhoan/${id}`);
          setUserData(response.data);
          localStorage.setItem('userData', JSON.stringify(response.data));
          formik.setValues({
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

  if (loading) return <p className="loading">Đang tải thông tin người dùng...</p>;
  if (error) return <p className="error">Lỗi: {error}</p>;

  // Kiểm tra xem người dùng có đăng nhập không
  if (!user) {
    return <p className="error">Bạn chưa đăng nhập.</p>;
  }

  return (
    <div className="user-container">
      <h1 className="user-profile__title">Thông tin cá nhân</h1>
      {isEditing ? (
        <form onSubmit={formik.handleSubmit} className="user-profile__form">
          <div className="form-group">
            <label className="form-group__label">Email:</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="form-group__input"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label className="form-group__label">Tên tài khoản:</label>
            <input
              type="text"
              name="tentaikhoan"
              value={formik.values.tentaikhoan}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="form-group__input"
            />
          </div>
          <div className="form-group">
            <label className="form-group__label">Số điện thoại:</label>
            <input
              type="text"
              name="sdt"
              value={formik.values.sdt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="form-group__input"
            />
            {formik.touched.sdt && formik.errors.sdt ? (
              <div className="error-message">{formik.errors.sdt}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label className="form-group__label">Ngày sinh:</label>
            <input
              type="date"
              name="ngaysinh"
              value={formik.values.ngaysinh.split("T")[0]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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