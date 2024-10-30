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
        {uniqueDates.map((date, index) => (
          <button
            className="day"
            key={index}
            onClick={() => handleDateClick(date)}
          >
            {date}
          </button>
        ))}
      </div>
      <p className="node fw-bold">
        Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và
        Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
      </p>

      <div className="main d-flex col-12">
        {filteredPhim.map((phim, index) => (
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
                  style={{ maxWidth: "230px", height: "300px" }}
                  alt={phim.tenphim}
                />
              </div>
              <div className="col-md-7">
                <div className="card-body text-start">
                  <div className="timeline d-flex text-light">
                    <p className="infor">{phim.ngayhieuluc}</p>
                    <p className="infor-time">{phim.thoiluong}</p>
                  </div>
                  <h5 className="card-title text-light">{phim.tenphim}</h5>
                  <p>Xuất xứ: {phim.xuatXu}</p>
                  <p>Khởi chiếu: {phim.ngayhieulucden}</p>
                  <p className="card-text-node">{phim.noidung}</p>
                  <p className="card-text text-light">Lịch chiếu</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
