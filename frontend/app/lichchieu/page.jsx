"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import "./lichchieu.css";
import "./lichchieu-responsive.css"; // CSS responsive

export default function LichChieu() {
  const [listPhim, setListPhim] = useState([]);
  const [filteredPhim, setFilteredPhim] = useState([]);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/phim");
        setListPhim(response.data);
        setFilteredPhim(response.data);
        const dates = [
          ...new Set(response.data.map((phim) => phim.ngayhieuluc)),
        ];
        setUniqueDates(dates);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDateClick = (date) => {
    const filtered = listPhim.filter((phim) => phim.ngayhieuluc === date);
    setFilteredPhim(filtered);
  };

  if (loading) {
    return <p className="text-light">Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  return (
    <section className="film-container">
      <h2 className="film-title text-light fw-bold">Phim đang chiếu</h2>
      <div className="date-list">
        {uniqueDates.map((dateString, index) => {
          const date = new Date(dateString);
          const formattedDate = date.toLocaleDateString("vi-VN");
          return (
            <button
              className="date-button"
              key={index}
              onClick={() => handleDateClick(dateString)}
            >
              {formattedDate}
            </button>
          );
        })}
      </div>
      <p className="age-warning fw-bold">
        Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và
        Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
      </p>

      <div className="film-list d-flex col-12">
        {filteredPhim.map((phim) => {
          const ngayHieuLuc = new Date(phim.ngayhieuluc).toLocaleDateString(
            "vi-VN"
          );
          const ngayHieuLucDen = new Date(
            phim.ngayhieulucden
          ).toLocaleDateString("vi-VN");

          return (
            <div
              className="film-card mb-3 bg-dark"
              style={{ minWidth: "550px", height: "300px" }}
              key={phim._id}
            >
              <Link
                href={`/filmdetail/${phim._id}`}
                className="card-link text-decoration-none text-muted"
              >
                <div className="row g-0">
                  <div className="col-md-5">
                    <img
                      src={`http://localhost:3000/img/phims/${phim.img}`}
                      className="film-image img-fluid rounded-start"
                      style={{ minWidth: "230px", height: "300px" }}
                      alt={
                        phim.tenphim.includes("-")
                          ? phim.tenphim.slice(0, phim.tenphim.lastIndexOf("-"))
                          : phim.tenphim
                      }
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="film-card-body text-start">
                      <div className="film-timeline d-flex text-light">
                        <p className="release-date">{ngayHieuLuc}</p>
                        <p className="duration-info">{phim.thoiluong} phút</p>
                      </div>
                      <h5 className="film-title text-light text-uppercase">
                        {phim.tenphim.includes("-")
                          ? phim.tenphim.slice(0, phim.tenphim.lastIndexOf("-"))
                          : phim.tenphim}
                      </h5>
                      <p>Xuất xứ: {phim.xuatXu}</p>
                      <p>Khởi chiếu: {ngayHieuLucDen}</p>
                      <p className="film-description">
                        {phim.noidung.length > 90
                          ? `${phim.noidung.slice(0, 90)}...`
                          : phim.noidung}
                      </p>
                      {/* lịch chiếu của phim */}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
