"use client"; // Ensure this is at the very top
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import "./lichchieu.css";
import "./lichchieu-responsive.css"; // CSS responsive
import { Button } from "@/public/bootstrap-5.3.3-dist/js/bootstrap.bundle.min";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function LichChieu() {
  const { data: cachieu = [], error: cachieuError } = useSWR(`http://localhost:3000/xuatchieu`, fetcher);
  const { data: response = [], error: responseError } = useSWR(`http://localhost:3000/phim`, fetcher);

  if (cachieuError || responseError) {
    return <div>Error loading data. Please try again later.</div>;
  }
  if (!response || !cachieu) {
    return <div>Loading...</div>;
  }

  // Lấy ngày hiện tại và 3 ngày tiếp theo
  const today = new Date();
  const dates = Array.from({ length: 4 }, (_, index) => {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + index);
    return nextDate.toISOString().split('T')[0]; // Định dạng ngày là YYYY-MM-DD
  });

  // State để lưu ngày đã chọn
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  // Hàm xử lý sự kiện khi người dùng nhấn vào một ngày
  const handleDateClick = (dateString) => {
    setSelectedDate(dateString);
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
        {response.length > 0 ? (
          response.map((phim) => {
            const ngayHieuLuc = new Date(phim.ngayhieuluc).toLocaleDateString("vi-VN");
            const ngayHieuLucDen = new Date(phim.ngayhieulucden).toLocaleDateString("vi-VN");
            const isShowing = cachieu.some(showtime => {
              const showtimeDate = new Date(showtime.ngaychieu).toISOString().split('T')[0];
              return showtimeDate === selectedDate && showtime.phim_id === phim._id; // So sánh với ngày đã chọn
            });

            return isShowing ? (
              <div
                className="film-card mb-3 bg-dark"
                style={{ minWidth: "550px", height: "300px" }}
                key={phim._id}
              >
                <Link
                  href={`/filmdetail/${phim._id}?ngaychieu=${selectedDate+'T00:00:00.000Z'}`}
                  className="card-link text-decoration-none text-muted"
                >
                  <div className="row g-0">
                    <div className="col-md-5">
                      <img
                        src={`http://localhost:3000/img/phims/${phim.img}`}
                        className="film-image img-fluid rounded-start"
                        style={{ minWidth: "230px", height: "300px" }}
                        alt={'phim moi'}
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="film-card-body text-start">
                        <div className="film-timeline d-flex text-light">
                          <p className="release-date">{ngayHieuLuc}</p>
                          <p className="duration-info">{phim.thoiluong} phút</p>
                        </div>
                        <h4>{phim.tenphim}</h4>
                        <h5 className="film-title text-light text-uppercase">{phim.titulo}</h5>
                        <p>Khởi chiếu: {ngayHieuLucDen}</p>
                        <p className="film-description">
                          {phim.noidung.length > 90 ? `${phim.noidung.slice(0, 90)}...` : phim.noidung}
                        </p>
                        <div className="d-flex flex-wrap gap-3" style={{ maxWidth: "290px", height: "auto" }}>
                          {cachieu.map((showtime) => {
                            const showtimeDate = new Date(showtime.ngaychieu);
                            if (showtime.phim_id === phim._id && showtimeDate.toISOString().split('T')[0] === selectedDate) {
                              return (
                                <>
                                <Link className="text-decoration-none"  href={`/filmdetail/${phim._id}?ngaychieu=${selectedDate+'T00:00:00.000Z'}&&giochieu=${showtime.giobatdau}`}>
                                <p key={showtime._id} className="film-schedule text-light border border-1 rounded p-1 mb-0  ">
                                  {showtime.giobatdau}
                              </p>
                                </Link>
                                </>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ) : null;
          })
        ) : (
          <p className="text-light">Không có phim nào phù hợp với ngày đã chọn.</p>
        )}
      </div>
    </section>
  );
}