"use client"; // Đánh dấu component này là Client Component

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./user.css"; // Nhập file CSS

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      tentaikhoan: "",
      sdt: "",
      ngaysinh: "",
      img: null,
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
      if (!id) {
        console.error("User ID not found");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("tentaikhoan", values.tentaikhoan);
        formData.append("sdt", values.sdt);
        formData.append("ngaysinh", values.ngaysinh);

        if (values.img) {
          formData.append("img", values.img);
        }

        console.log("FormData being submitted:");
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

        const response = await axios.put(
          `http://localhost:3000/taikhoan/${id}`,
          formData
        );

        console.log("Server response:", response.data);

        setUserData(response.data);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating user data:", error.response || error);
        setError(error.response?.data?.error || "Unable to update user data");
      }
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const id = user?.id;
      if (id) {
        try {
          console.log("Fetching user data with ID:", id);
          const response = await axios.get(
            `http://localhost:3000/taikhoan/${id}`
          );
          console.log("Fetched user data:", response.data);

          setUserData(response.data);
          formik.setValues({
            email: response.data.email,
            tentaikhoan: response.data.tentaikhoan,
            sdt: response.data.sdt,
            ngaysinh: response.data.ngaysinh,
            img: response.data.img,
          });
        } catch (error) {
          console.error("Error fetching user data:", error.response || error);
          setError("Unable to fetch user data");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) return <p>Đang tải thông tin người dùng...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!user) return <p>Bạn chưa đăng nhập.</p>;

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
            <div className="form-group">
              <label className="form-group__label">Chọn hình ảnh:</label>
              <input
                type="file"
                name="img"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    formik.setFieldValue("img", file);
                    setUserData((prevData) => ({
                      ...prevData,
                      img: imageUrl,
                    }));
                  }
                }}
                onBlur={formik.handleBlur}
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
                src={`http://localhost:3000/${userData.img}` || "./img/default-avatar.png"}
                alt="Avatar User"
              />
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
