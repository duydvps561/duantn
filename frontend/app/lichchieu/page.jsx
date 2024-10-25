"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./lichchieu.css";
export default function lichchieu() {
  const [listPhim, setlistPhim] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/phim")
      .then((response) => {
        setlistPhim(response.data);
      })
      .catch((error) => {
        console.error("lỗi khi lấy dữ liệu", error);
      });
  }, []);
  return (
    <section className="container">
      <h2 className="text-light fw-bold">Phim đang chiếu</h2>
      <div className="list-day">
        <button className="day">12-09-2024</button>
        <button className="day">12-09-2024</button>
        <button className="day">12-09-2024</button>
        <button className="day">12-09-2024</button>
      </div>
      <p className="node fw-bold">
        Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và
        Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
      </p>

      <div className="main d-flex col-12">
        {listPhim.map((phim, index) => (
          <div
            className="card mb-3 bg-dark"
            style={{ minWidth: "550px", height: "300px" }}
            key={index}
          >
            <div className="row g-0">
              <div className="col-md-5">
                <img
                  src={phim.img}
                  className="img-fluid rounded-start"
                  style={{ maxWidth: "230px", height: "300px" }}
                  alt={phim.title}
                />
              </div>
              <div className="col-md-7">
                <div className="card-body text-start">
                  <div className="timeline d-flex text-light">
                    <p className="infor">{phim.ngayhieuluc}</p>
                    <p className="infor-time">{phim.thoiLuong} phút</p>
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
