"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Layout from "@/app/components/admin/Layout";
import Swal from "sweetalert2";
import "./AddCaChieu.css";

export default function ThemCaChieu() {
  const [phongChieus, setPhongChieus] = useState([]);
  const [phims, setPhims] = useState([]);
  const [phimSuggestions, setPhimSuggestions] = useState([]);
  const [filterPhim, setFilterPhim] = useState("");
  const [showPhimSuggestions, setShowPhimSuggestions] = useState(false);
  const [caChieus, setCaChieus] = useState([]);
  const [gioKetThuc, setGioKetThuc] = useState("");
  const [gioBatDauOptions] = useState(
    Array.from({ length: 44 }, (_, i) => {
      const hours = Math.floor(i / 2) + 1;
      const minutes = i % 2 === 0 ? "00" : "30";
      return `${String(hours).padStart(2, "0")}:${minutes}`;
    }).slice(0, 43)
  );

  useEffect(() => {
    const layDuLieu = async () => {
      try {
        const [phongChieuResponse, phimResponse] = await Promise.all([
          axios.get("http://localhost:3000/phongchieu"),
          axios.get("http://localhost:3000/phim"),
        ]);
        setPhongChieus(phongChieuResponse.data);
        setPhims(phimResponse.data);

        // Cài đặt giá trị tối thiểu cho ngày là hôm nay
        const today = new Date().toISOString().split("T")[0];
        document.getElementById("ngaychieu").setAttribute("min", today);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    layDuLieu();
  }, []);

  const tinhGioKetThuc = (gioBatDau, thoiluong) => {
    if (!gioBatDau) return "";
    const [gio, phut] = gioBatDau.split(":").map(Number);
    const totalPhutBatDau = gio * 60 + phut;
    const totalPhutKetThuc = totalPhutBatDau + thoiluong;

    const gioKetThuc = Math.floor(totalPhutKetThuc / 60) % 24;
    const phutKetThuc = totalPhutKetThuc % 60;
    return `${String(gioKetThuc).padStart(2, "0")}:${String(phutKetThuc).padStart(2, "0")}`;
  };

  const kiemTraTrungLap = (caChieuMoi) => {
    const thoiGianBatDauMoi = new Date(`${caChieuMoi.ngaychieu}T${caChieuMoi.giobatdau}`);
    const thoiGianKetThucMoi = new Date(`${caChieuMoi.ngaychieu}T${caChieuMoi.gioketthuc}`);

    return caChieus.some((caChieu) => {
      const thoiGianBatDauCu = new Date(`${caChieu.ngaychieu}T${caChieu.giobatdau}`);
      const thoiGianKetThucCu = new Date(`${caChieu.ngaychieu}T${caChieu.gioketthuc}`);

      return (
        (thoiGianBatDauMoi >= thoiGianBatDauCu && thoiGianBatDauMoi < thoiGianKetThucCu) ||
        (thoiGianKetThucMoi > thoiGianBatDauCu && thoiGianKetThucMoi <= thoiGianKetThucCu) ||
        (thoiGianBatDauMoi <= thoiGianBatDauCu && thoiGianKetThucMoi >= thoiGianKetThucCu)
      );
    });
  };

  const kiemTraTrongTai = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/xuatchieu/check", values);
      return response.data.available;
    } catch (error) {
      console.error("Lỗi khi kiểm tra trống:", error);
      return false;
    }
  };

  const handleFilterChange = (e) => {
    const search = e.target.value.toLowerCase();
    setFilterPhim(search);
    setShowPhimSuggestions(true);
    const filteredSuggestions = phims.filter((phim) =>
      phim.tenphim.toLowerCase().includes(search)
    );
    setPhimSuggestions(filteredSuggestions);
  };

  const handleSelectPhim = (phim) => {
    formik.setFieldValue("phim_id", phim._id);
    setFilterPhim(phim.tenphim);
    setShowPhimSuggestions(false);
  };

  const formik = useFormik({
    initialValues: {
      phongchieu_id: "",
      phim_id: "",
      ngaychieu: "",
      giobatdau: "",
      gioketthuc: "",
    },
    validationSchema: Yup.object({
      phongchieu_id: Yup.string().required("Vui lòng chọn phòng chiếu"),
      phim_id: Yup.string().required("Vui lòng chọn phim"),
      ngaychieu: Yup.date().required("Vui lòng chọn ngày chiếu"),
      giobatdau: Yup.string().required("Vui lòng chọn giờ bắt đầu"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const selectedPhim = phims.find((phim) => phim._id === values.phim_id);
      if (selectedPhim) {
        values.gioketthuc = tinhGioKetThuc(values.giobatdau, selectedPhim.thoiluong);

        if (kiemTraTrungLap(values)) {
          Swal.fire("Lỗi", "Khoảng thời gian này đã có ca chiếu khác!", "error");
          return;
        }

        const isAvailable = await kiemTraTrongTai(values);
        if (!isAvailable) {
          Swal.fire("Lỗi", "Khoảng thời gian này đã có ca chiếu khác!", "error");
          return;
        }

        try {
          await axios.post("http://localhost:3000/xuatchieu/add", values);
          setCaChieus((prevCaChieus) => [
            ...prevCaChieus,
            { ...values, ngaychieu: values.ngaychieu.split("-").reverse().join("/") },
          ]);
          Swal.fire("Thành công!", "Ca chiếu đã được thêm thành công!", "success");
          resetForm();
          setGioKetThuc("");
        } catch (error) {
          console.error("Lỗi khi thêm CaChieu:", error);
          Swal.fire("Lỗi!", "Đã xảy ra lỗi khi thêm ca chiếu.", "error");
        }
      }
    },
  });

  useEffect(() => {
    const selectedPhim = phims.find((phim) => phim._id === formik.values.phim_id);
    if (selectedPhim && formik.values.giobatdau) {
      const ketThuc = tinhGioKetThuc(formik.values.giobatdau, selectedPhim.thoiluong);
      setGioKetThuc(ketThuc);
      formik.setFieldValue("gioketthuc", ketThuc);
    } else {
      setGioKetThuc("");
    }
  }, [formik.values.phim_id, formik.values.giobatdau]);

  return (
    <Layout>
      <div className="container">
        <h1 className="my-4">Thêm Ca Chiếu Mới</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-5 mb-3">
              <label>Phim</label>
              <input
                type="text"
                className={`form-control ${formik.errors.phim_id ? "is-invalid" : ""}`}
                placeholder="Nhập tên phim"
                value={filterPhim}
                onChange={handleFilterChange}
              />
              {showPhimSuggestions && phimSuggestions.length > 0 && (
                <ul className="suggestions">
                  {phimSuggestions.map((phim) => (
                    <li key={phim._id} onClick={() => handleSelectPhim(phim)}>
                      {phim.tenphim} - {phim.trangthai}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="col-md-5 mb-3">
              <label>Phòng Chiếu</label>
              <select
                name="phongchieu_id"
                value={formik.values.phongchieu_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${formik.errors.phongchieu_id ? "is-invalid" : ""}`}
              >
                <option value="">Chọn phòng chiếu</option>
                {phongChieus.map((phongchieu) => (
                  <option key={phongchieu._id} value={phongchieu._id}>
                    {phongchieu.tenphong}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3 mb-3">
              <label>Ngày Chiếu</label>
              <input
                type="date"
                name="ngaychieu"
                id="ngaychieu"
                value={formik.values.ngaychieu}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${formik.errors.ngaychieu ? "is-invalid" : ""}`}
              />
            </div>

            <div className="col-md-3 mb-3">
              <label>Giờ Bắt Đầu</label>
              <select
                name="giobatdau"
                value={formik.values.giobatdau}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${formik.errors.giobatdau ? "is-invalid" : ""}`}
              >
                <option value="">Chọn giờ bắt đầu</option>
                {gioBatDauOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label>Giờ Kết Thúc</label>
              <input type="text" className="form-control" value={gioKetThuc} disabled />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Thêm Ca Chiếu
          </button>
        </form>

        <div className="mt-5">
                    <h3>Danh Sách Ca Chiếu</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Phòng Chiếu</th>
                                <th>Phim</th>
                                <th>Ngày Chiếu</th>
                                <th>Giờ Bắt Đầu</th>
                                <th>Giờ Kết Thúc</th>
                            </tr>
                        </thead>
                        <tbody>
                            {caChieus.map((caChieu, index) => (
                                <tr key={index}>
                                    <td>{phongChieus.find(p => p._id === caChieu.phongchieu_id)?.tenphong}</td>
                                    <td>{phims.find(p => p._id === caChieu.phim_id)?.tenphim}</td>
                                    <td>{caChieu.ngaychieu}</td>
                                    <td>{caChieu.giobatdau}</td>
                                    <td>{caChieu.gioketthuc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
      </div>
    </Layout>
  );
}
