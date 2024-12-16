"use client"; // Đánh dấu component này là Client Component

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./user.css"; // Nhập file CSS

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Lấy user từ Redux state

  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem("userData");
    return savedData ? JSON.parse(savedData) : null;
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(null); // Thêm state cho avatar

  const formik = useFormik({
    initialValues: {
      email: "",
      tentaikhoan: "",
      sdt: "",
      ngaysinh: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .matches(
          /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
          "Email phải có định dạng @gmail.com"
        )
        .required("Email là bắt buộc"),
      sdt: Yup.string()
        .matches(/^(03|05|07|08|09)\d{8}$/, "Số điện thoại không hợp lệ")
        .required("Số điện thoại là bắt buộc"),
    }),
    onSubmit: async (values) => {
      const id = user?.id;

      try {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("tentaikhoan", values.tentaikhoan);
        formData.append("sdt", values.sdt);
        formData.append("ngaysinh", values.ngaysinh);
        
        // Nếu có avatar mới, thêm vào formData
        if (avatar) {
          formData.append("img", avatar);
        }

        const response = await axios.put(
          `http://localhost:3000/taikhoan/${id}`,
          formData
        );
        setUserData(response.data);
        localStorage.setItem("userData", JSON.stringify(response.data));
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
          const response = await axios.get(
            `http://localhost:3000/taikhoan/${id}`
          );
          setUserData(response.data);
          localStorage.setItem("userData", JSON.stringify(response.data));
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

  useEffect(() => {
    // Update the form values whenever editing mode is activated
    if (isEditing && userData) {
      formik.setValues({
        email: userData.email,
        tentaikhoan: userData.tentaikhoan,
        sdt: userData.sdt,
        ngaysinh: userData.ngaysinh,
      });
    }
  }, [isEditing, userData]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file); // Cập nhật state avatar khi người dùng chọn file
    }
  };

  const handleUpdateAvatar = async () => {
    const id = user?.id;

    if (avatar) {
      try {
        const formData = new FormData();
        formData.append("img", avatar); // Thêm avatar vào formData

        const response = await axios.put(
          `http://localhost:3000/taikhoan/${id}/img`, // Đảm bảo endpoint đúng
          formData
        );
        setUserData(response.data);
        localStorage.setItem("userData", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error updating avatar:", error);
        setError("Unable to update avatar");
      }
    }
  };

  if (loading) return <p className="loading">Đang tải thông tin người dùng...</p>;
  if (error) return <p className="error">Lỗi: {error}</p>;

  if (!user) {
    return <p className="error">Bạn chưa đăng nhập.</p>;
  }

  return (
    <div className="user-container">
      {isEditing ? (
        <>
          <h2 className="edit-title">Chỉnh sửa thông tin</h2>
          <form onSubmit={formik.handleSubmit} className="user-profile__form">
            <div className="form-group">
              <label className="form-group__label">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
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
                placeholder="Your Name"
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
                placeholder="Số điện thoại"
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
                style={{ color: "#666666" }}
                value={formik.values.ngaysinh.split("T")[0]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className="form-group__input"
              />
            </div>
            <div className="form-buttons">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="user-profile__button cancel-button"
              >
                Hủy
              </button>
              <button type="submit" className="user-profile__button put-button">
                Lưu thay đổi
              </button>
            </div>
          </form>
        </>
      ) : (
        userData && (
          <div className="user-profile__info">
            <div className="avt-user">
              <img
                src={userData.img || "./img/A (1) 4.png"} // Hiển thị avatar nếu có, nếu không hiển thị ảnh mặc định
                alt="Avatar User"
              />
              {/* Nút thay đổi avatar */}
              <input
                type="file"
                onChange={handleAvatarChange} // Gọi hàm handleAvatarChange khi người dùng chọn ảnh
                className="avatar-upload"
              />
              <button onClick={handleUpdateAvatar} className="user-profile__button update-avatar-button">
                Cập nhật avatar
              </button>
            </div>
            <div className="user-information">
              <div className="name__info">
                <h3>{userData.tentaikhoan}</h3>
                <p>{userData.email}</p>
                <p>{userData.sdt}</p>
                <p>Đang {userData.trangthai}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="user-profile__button edit-button"
                >
                  Chỉnh sửa
                </button>
              </div>
            </div>
            <div className="rank__user">
              <p className="time__start">
                <strong>Thành viên từ:</strong> 01/01/2022
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default UserProfile;
