"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./lichchieu.css";

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
    <section className="container">
      <h2 className="text-light fw-bold">Phim đang chiếu</h2>
      <div className="list-day">
        {uniqueDates.map((dateString, index) => {
          const date = new Date(dateString); // Convert to Date object
          const formattedDate = date.toLocaleDateString("vi-VN"); // Format to your locale
          return (
            <button
              className="day"
              key={index}
              onClick={() => handleDateClick(dateString)}
            >
              {formattedDate} {/* Display formatted date */}
            </button>
          );
        })}
      </div>
      <p className="node fw-bold">
        Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và
        Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
      </p>

      <div className="main d-flex col-12">
        {filteredPhim.map((phim, index) => {
          // Format the dates
          const ngayHieuLuc = new Date(phim.ngayhieuluc).toLocaleDateString(
            "vi-VN"
          );
          const ngayHieuLucDen = new Date(
            phim.ngayhieulucden
          ).toLocaleDateString("vi-VN");

          return (
            <div
              className="card mb-3 bg-dark"
              style={{ minWidth: "550px", height: "300px" }}
              key={index}
            >
              <div className="row g-0">
                <div className="col-md-5">
                  <img
                    src={`http://localhost:3000/img/phims/${phim.img}`}
                    className="img-fluid rounded-start"
                    style={{ minWidth: "230px", height: "300px" }}
                    alt={phim.tenphim}
                  />
                </div>
                <div className="col-md-7">
                  <div className="card-body text-start">
                    <div className="timeline d-flex text-light">
                      <p className="infor">{ngayHieuLuc}</p>
                      <p className="infor-time">{phim.thoiluong} phút</p>
                    </div>
                    <h5 className="card-title text-light">{phim.tenphim}</h5>
                    <p>Xuất xứ: {phim.xuatXu}</p>
                    <p>Khởi chiếu: {ngayHieuLucDen}</p>
                    <p className="card-text-node">{phim.noidung}</p>
                    <p className="card-text text-light">Lịch chiếu</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
