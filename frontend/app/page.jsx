"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Slide from "./components/slide";
import { useRouter } from "next/navigation";
import Notification from "./components/notification";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/redux/slice/cartSlice";
import { postHoadon } from "@/redux/slice/hoadonSlice";
import { postTicket } from "@/redux/slice/ticket";

export default function Home() {
  const userId = useSelector((state) => state.auth.user?.id);
  const dispatch = useDispatch();
  const router = useRouter();
  const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
  const [moviesComingSoon, setMoviesComingSoon] = useState([]);
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [typeNoti, setTypeNoti] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const amount = cart.reduce((acc, item) => acc + (item.gia * (item.quantity || 1)), 0);
    setTotalAmount(amount);
  }, []);
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const giolap = `${hours}:${minute}`;
  const ngaylap = now.toISOString()
  const cachieuID = '64b5f93e49e7b6e31c5f7190';
  const hoadonID = '64b5f93e49e7b6e31c5f7191';
  const gheID = '672b7e6ae6ff062499489b6e';
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    // const { orderCode } = query.get('orderCode');
    const isHoadonProcessed = localStorage.getItem("hoadonProcessed");

    if (query.get("success") === "true" && !isProcessing && !isHoadonProcessed) {
      setTypeNoti("success");
      setMessage("Đang xử lý thanh toán...");
      setShowNotification(true);
      if (!totalAmount || !giolap || !ngaylap || !userId || !cachieuID || !gheID) {
        console.error("Thiếu dữ liệu cần thiết cho hóa đơn hoặc vé!");
        return;
      }
      const hoadondata = {
        tongtien: totalAmount,
        giolap: giolap,
        ngaylap: ngaylap,
        taikhoan_id: userId,
      };
      const ticketdata = {
        cachieu_id: "64b5f93e49e7b6e31c5f7191",
        hoadon_id: "6737a0d3e78ce0a5476d286b",
        ghe_id: '672b7e6ae6ff062499489b6e',
        giave: totalAmount
      }
      setIsProcessing(true);
      localStorage.setItem("hoadonProcessed", "true");

      Promise.allSettled([
        dispatch(postHoadon(hoadondata)).unwrap(),
        dispatch(postTicket(ticketdata)).unwrap(),
      ])
        .then((results) => {
          const [hoadonResult, ticketResult] = results;
          if (hoadonResult.status === 'fulfilled' && ticketResult.status === 'fulfilled') {
            dispatch(clearCart());
            setTypeNoti("success");
            setMessage("Thanh toán thành công. Cảm ơn bạn đã mua vé tại ACE Cinema");
            setShowNotification(true);
            setTimeout(() => {
              localStorage.removeItem("hoadonProcessed");
              router.replace("/");
            }, 2000);
          } else {
            if (hoadonResult.status === 'rejected') {
              console.error("Lỗi khi tạo hóa đơn:", hoadonResult.reason);
              setTypeNoti("error");
              setMessage("Lỗi khi tạo hóa đơn");
              setShowNotification(true);
            }
            if (ticketResult.status === "rejected") {
              console.error("Lỗi khi tạo vé:", ticketResult.reason);
              setTypeNoti("error");
              setMessage("Lỗi khi tạo vé. Vui lòng thử lại!");
              setShowNotification(true);
            }
          }
        })
        .catch((error) => {
          console.error("Error posting hoadon:", error);
          setTypeNoti("error");
          setMessage("Thanh toán thất bại. Vui lòng thử lại!");
          setShowNotification(true);
          localStorage.removeItem("hoadonProcessed");
        })
        .finally(() => {
          setIsProcessing(false);
        });
    }

    if (query.get("canceled")) {
      setTypeNoti('canceled');
      setMessage("Thanh toán thất bại. Đang chuyển về trang thanh toán");
      setShowNotification(true);
      setTimeout(() => {
        router.replace("/thanhtoan");
      }, 2000);
    }

  }, [router, totalAmount, giolap, ngaylap, dispatch, isProcessing]);

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
              <p style={{ color: '#fff' }}>{movie.thoiluong} Phút</p>
              <p style={{ color: '#fff' }}>{new Date(movie.ngayhieuluc).toLocaleDateString("vi-VN")}</p>
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
