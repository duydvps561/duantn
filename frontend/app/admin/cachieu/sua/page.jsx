"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Layout from "@/app/components/admin/Layout";
import Swal from "sweetalert2";
import "./SuaCaChieu.css";

export default function UpdateCaChieu() {
  const [caChieu, setCaChieu] = useState(null);
  const [phongChieus, setPhongChieus] = useState([]);
  const [phims, setPhims] = useState([]);
  const [phimDurations, setPhimDurations] = useState({});
  const [loading, setLoading] = useState(true);
  const [gioBatDauOptions] = useState(
    Array.from({ length: 44 }, (_, i) => {
      const hours = Math.floor(i / 2) + 1;
      const minutes = i % 2 === 0 ? "00" : "30";
      return `${String(hours).padStart(2, "0")}:${minutes}`;
    }).slice(0, 43)
  );

  const router = useRouter();
  const searchParams = useSearchParams();
  const caChieuId = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [phongChieuRes, phimRes, caChieuRes] = await Promise.all([
          axios.get("http://localhost:3000/phongchieu"),
          axios.get("http://localhost:3000/phim"),
          axios.get(`http://localhost:3000/xuatchieu/${caChieuId}`),
        ]);

        setPhongChieus(phongChieuRes.data);
        setPhims(phimRes.data);
        setCaChieu(caChieuRes.data);

        const phimDurationMap = {};
        phimRes.data.forEach(
          (phim) => (phimDurationMap[phim._id] = phim.thoiluong)
        );
        setPhimDurations(phimDurationMap);

        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, [caChieuId]);

  const tinhGioKetThuc = (gioBatDau, thoiluong) => {
    if (!gioBatDau) return "";
    const [gio, phut] = gioBatDau.split(":").map(Number);
    const totalPhutBatDau = gio * 60 + phut;
    const totalPhutKetThuc = totalPhutBatDau + thoiluong;

    const gioKetThuc = Math.floor(totalPhutKetThuc / 60) % 24;
    const phutKetThuc = totalPhutKetThuc % 60;
    return `${String(gioKetThuc).padStart(2, "0")}:${String(phutKetThuc).padStart(2, "0")}`;
  };

  // Function to check room availability
  const kiemTraTrongTai = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/xuatchieu/check", values);
      return response.data.available;
    } catch (error) {
      console.error("Lỗi khi kiểm tra trống:", error);
      return false;
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: caChieu || {
      phongchieu_id: "",
      phim_id: "",
      ngaychieu: "",
      giobatdau: "",
      gioketthuc: "",
    },
    validationSchema: Yup.object({
      phongchieu_id: Yup.string().required("Chọn phòng chiếu"),
      phim_id: Yup.string().required("Chọn phim"),
      ngaychieu: Yup.date().required("Chọn ngày chiếu"),
      giobatdau: Yup.string().required("Nhập giờ bắt đầu"),
    }),
    onSubmit: async (values) => {
      // Check room availability before submitting
      const available = await kiemTraTrongTai(values);
      if (!available) {
        Swal.fire({
          title: "Lỗi!",
          text: "Phòng chiếu này không còn chỗ trong ngày này.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      try {
        values.gioketthuc = tinhGioKetThuc(
          values.giobatdau,
          phimDurations[values.phim_id]
        );

        await axios.put(
          `http://localhost:3000/xuatchieu/update/${caChieuId}`,
          values
        );
        Swal.fire({
          title: "Thành công!",
          text: "Cập nhật ca chiếu thành công!",
          icon: "success",
          confirmButtonText: "OK",
        });
        router.push("/admin/cachieu");
      } catch (error) {
        console.error("Error updating ca chieu:", error);
        Swal.fire({
          title: "Lỗi!",
          text: "Có lỗi xảy ra khi cập nhật ca chiếu.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    },
  });

  useEffect(() => {
    if (formik.values.giobatdau && formik.values.phim_id) {
      formik.setFieldValue(
        "gioketthuc",
        tinhGioKetThuc(
          formik.values.giobatdau,
          phimDurations[formik.values.phim_id]
        )
      );
    }
  }, [formik.values.giobatdau, formik.values.phim_id]);

  if (loading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="container">
        <h1>Cập Nhật Ca Chiếu</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-3 mb-3">
              <label>Phòng Chiếu</label>
              <select
                name="phongchieu_id"
                value={formik.values.phongchieu_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${
                  formik.touched.phongchieu_id && formik.errors.phongchieu_id
                    ? "is-invalid"
                    : ""
                }`}
              >
                <option value="">Chọn phòng chiếu</option>
                {phongChieus.map((phongchieu) => (
                  <option key={phongchieu._id} value={phongchieu._id}>
                    {phongchieu.tenphong}
                  </option>
                ))}
              </select>
              {formik.touched.phongchieu_id && formik.errors.phongchieu_id && (
                <div className="invalid-feedback">
                  {formik.errors.phongchieu_id}
                </div>
              )}
            </div>

            <div className="col-md-3 mb-3">
              <label>Phim</label>
              <select
                name="phim_id"
                value={formik.values.phim_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${formik.touched.phim_id && formik.errors.phim_id ? "is-invalid" : ""}`}
              >
                <option value="">Chọn phim</option>
                {phims.map((phim) => (
                  <option key={phim._id} value={phim._id}>
                    {phim.tenphim}
                  </option>
                ))}
              </select>
              {formik.touched.phim_id && formik.errors.phim_id && (
                <div className="invalid-feedback">{formik.errors.phim_id}</div>
              )}
            </div>

            <div className="col-md-2 mb-3">
              <label>Ngày Chiếu</label>
              <input
                type="date"
                name="ngaychieu"
                value={formik.values.ngaychieu}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${formik.touched.ngaychieu && formik.errors.ngaychieu ? "is-invalid" : ""}`}
              />
              {formik.touched.ngaychieu && formik.errors.ngaychieu && (
                <div className="invalid-feedback">{formik.errors.ngaychieu}</div>
              )}
            </div>

            <div className="col-md-2 mb-3">
              <label>Giờ Bắt Đầu</label>
              <select
                name="giobatdau"
                value={formik.values.giobatdau}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${formik.touched.giobatdau && formik.errors.giobatdau ? "is-invalid" : ""}`}
              >
                <option value="">Chọn giờ bắt đầu</option>
                {gioBatDauOptions.map((gio, index) => (
                  <option key={index} value={gio}>
                    {gio}
                  </option>
                ))}
              </select>
              {formik.touched.giobatdau && formik.errors.giobatdau && (
                <div className="invalid-feedback">{formik.errors.giobatdau}</div>
              )}
            </div>

            <div className="col-md-2 mb-3">
              <label>Giờ Kết Thúc</label>
              <input
                type="text"
                name="gioketthuc"
                value={formik.values.gioketthuc}
                readOnly
                className="form-control"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Cập Nhật
          </button>
        </form>
      </div>
    </Layout>
  );
}
