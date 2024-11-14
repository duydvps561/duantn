"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Slide from "./components/slide";
import { useRouter } from "next/navigation";
import Notification from "./components/notification";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/slice/cartSlice";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
  const [moviesComingSoon, setMoviesComingSoon] = useState([]);
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [typeNoti, setTypeNoti] = useState('');
  useEffect(() => {
    // Kiểm tra trạng thái đơn hàng
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      dispatch(clearCart());
      setTypeNoti('success');
      setMessage("Thanh toán thành công. Cảm ơn bạn đã sử dụng payOS!");
      setShowNotification(true); // Hiển thị thông báo
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }

    if (query.get("canceled")) {
      setTypeNoti('canceled');
      setMessage("Thanh toán thất bại. Đang chuyển về trang thanh toán");
      setShowNotification(true); // Hiển thị thông báo
      setTimeout(() => {
        router.push("/thanhtoan");
      }, 2000);
    }

  }, [router]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [nowPlayingResponse, comingSoonResponse] = await Promise.all([
          axios.get("http://localhost:3000/phim/dangchieu"),
          axios.get("http://localhost:3000/phim/sapchieu"),
        ]);
        setMoviesNowPlaying(nowPlayingResponse.data);
        setMoviesComingSoon(comingSoonResponse.data);
      } catch (error) {
        console.error("Không tìm thấy dữ liệu phim:", error);
      }
    };
    fetchMovies();
  }, []);

  const renderMovieCards = (movies) =>
    movies.map((movie) => (
      <div className="card" key={movie._id}>
        <Link
          href={`/filmdetail/${movie._id}`}
          className="text-decoration-none text-muted"
        >
          <div className="img-top">
            <img
              src={`http://localhost:3000/img/phims/${movie.img}`}
              alt={movie.tenphim}
            />
          </div>
          <div className="card-body">
            <div className="day-time">
              <a href="">{movie.thoiluong} Phút</a>
              <a href="">{new Date(movie.ngayhieuluc).toLocaleDateString("vi-VN")}</a>
            </div>
            <div className="title-card">
              <h1>{movie.tenphim}</h1>
            </div>
          </div>
        </Link>
      </div>
    ));

  return (
    <>
      <Notification
        message={message}
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
        type={typeNoti}
      />

      <Slide />
      <div className="container">
        <div className="main-title">
          <i className="fa fa-circle" style={{ fontSize: "25px", color: "red" }}></i>
          <h1>Phim Đang Chiếu</h1>
        </div>
        <div className="row">{renderMovieCards(moviesNowPlaying)}</div>

        <div className="main-title mt-5">
          <i className="fa fa-circle" style={{ fontSize: "25px", color: "red" }}></i>
          <h1>Phim Sắp Chiếu</h1>
        </div>
        <div className="row">{renderMovieCards(moviesComingSoon)}</div>
      </div>
    </>
  );
}
