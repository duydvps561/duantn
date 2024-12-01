"use client"; // Ensure this is at the very top
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import "./lichchieu.css";
import "./lichchieu-responsive.css"; // CSS responsive

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function LichChieu() {
  const { data: cachieu = [], error: cachieuError } = useSWR(`http://localhost:3000/xuatchieu`, fetcher);
  const { data: response = [], error: responseError } = useSWR(`http://localhost:3000/phim`, fetcher);

  const [filteredPhim, setFilteredPhim] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const today = new Date();
    const upcomingDates = Array.from({ length: 4 }, (_, i) => {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      return nextDate.toLocaleDateString("vi-VN");
    });
    setDates(upcomingDates);
  }, []);

  // Xử lý lỗi
  useEffect(() => {
    if (cachieuError || responseError) {
      setError("Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  }, [cachieuError, responseError]);

  // Lọc phim còn hiệu lực
  useEffect(() => {
    if (response.length > 0) {
      const today = new Date();
      const validPhim = response.filter((phim) => {
        const startDate = new Date(phim.ngayhieuluc);
        const endDate = new Date(phim.ngayhieulucden);
        return today >= startDate && today <= endDate;
      });
      setFilteredPhim(validPhim);
      setLoading(false);
    }
  }, [response]);

  if (loading) {
    return <div>Đang load lại trang...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleDateClick = (date) => {
    console.log(date);
    
    const filtered = response.filter((phim) => {
      const phimDate = new Date(phim.ngayhieuluc).toLocaleDateString("vi-VN");
      const hasShowtime = cachieu.some((showtime) => {
        return showtime.phim_id === phim._id && new Date(showtime.ngaychieu).toLocaleDateString("vi-VN") === date;
      });
      return phimDate === date && hasShowtime; // Lọc phim theo ngày và có suất chiếu
    });
    
    console.log(filtered);
    
    setFilteredPhim(filtered);
  };

  return (
    <section className="film-container">
      <h2 className="film-title text-light fw-bold">Phim đang chiếu</h2>
      <div className="date-list">
        {dates.map((dateString, index) => (
          <button
            className="date-button"
            key={index}
            onClick={() => handleDateClick(dateString)}
          >
            {dateString}
          </button>
        ))}
      </div>
      <p className="age-warning fw-bold">
        Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và
        Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
      </p>

      <div className="film-list d-flex col-12">
        {filteredPhim.length > 0 ? (
          filteredPhim.map((phim) => {
            const ngayHieuLuc = new Date(phim.ngayhieuluc).toLocaleDateString("vi-VN");
            const ngayHieuLucDen = new Date(phim.ngayhieulucden).toLocaleDateString("vi-VN");
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
                        alt={phim.tenphim.includes("-") ? phim.tenphim.slice(0, phim.tenphim.lastIndexOf("-")) : phim.tenphim}
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="film-card-body text-start">
                        <div className="film-timeline d-flex text-light">
                          <p className="release-date">{ngayHieuLuc}</p>
                          <p className="duration-info">{phim.thoiluong} phút</p>
                        </div>
                        <h5 className="film-title text-light text-uppercase">
                          {phim.tenphim.includes("-") ? phim.tenphim.slice(0, phim.tenphim.lastIndexOf("-")) : phim.tenphim}
                        </h5>
                        <p>Xuất xứ: {phim.xuatXu}</p>
                        <p>Khởi chiếu: {ngayHieuLucDen}</p>
                        <p className="film-description">
                          {phim.noidung.length > 90 ? `${phim.noidung.slice(0, 90)}...` : phim.noidung}
                        </p>
                        {cachieu.length > 0 && cachieu.map((showtime) => {
                          if (showtime.phim_id === phim._id) {
                            return (
                              <p key={showtime._id} className="film-schedule text-light">
                                Suất chiếu: {showtime.ngaychieu} {showtime.giobatdau}
                              </p>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p className="text-light">Không có phim nào phù hợp với ngày đã chọn.</p>
        )}
      </div>
    </section>
  );
}