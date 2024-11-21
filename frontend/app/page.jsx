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
import { Sendemail } from "@/redux/slice/email";

export default function Home() {
  const userId = useSelector((state) => state.auth.user?.id);
  const userEmail = useSelector((state) => state.auth.user?.email);
  const dispatch = useDispatch();
  const router = useRouter();
  const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
  const [moviesComingSoon, setMoviesComingSoon] = useState([]);
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [typeNoti, setTypeNoti] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [gheID, setGheID] = useState('');
  const [cachieuID, setCachieuID] = useState('');

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const filmInfo = JSON.parse(localStorage.getItem('filmInfo') || '[]');
    setCachieuID(filmInfo.cachieuID)
    const idghe = cart.filter(item => item.hasOwnProperty('seat'))
      .map(item => item._id);
    setGheID(idghe);
    const amount = cart.reduce((acc, item) => acc + (item.gia * (item.quantity || 1)), 0);
    setTotalAmount(amount);
  }, []);
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const giolap = `${hours}:${minute}`;
  const ngaylap = now.toISOString()
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
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

      setIsProcessing(true);
      localStorage.setItem("hoadonProcessed", "true");
      const createInvoiceAndTicket = async () => {
        try {
          const hoadonResult = await dispatch(postHoadon(hoadondata)).unwrap();
          const hoadonId = hoadonResult._id;
          console.log("Hóa đơn đã được tạo:", hoadonId);
          const ticketdata = {
            cachieu_id: cachieuID,
            hoadon_id: hoadonId,
            ghe_id: gheID,
            giave: totalAmount,
          };
          console.log(ticketdata);
          const emailHTML = `
<!DOCTYPE html>
<html>
<head>
    <style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        padding: 20px;
        margin: 0;
    }
    .email-container {
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .email-header {
        background-color: #007bff;
        color: #ffffff;
        text-align: center;
        padding: 15px;
        border-radius: 8px 8px 0 0;
    }
    .email-body {
        padding: 20px;
        color: #333;
    }
        .email-footer {
        text-align: center;
        font-size: 12px;
        color: #aaa;
        padding-top: 10px;
    }
    .btn {
        display: inline-block;
        padding: 10px 20px;
        background: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 10px;
    }
    .ticket-details {
        margin-top: 20px;
        border: 1px solid #ddd;
        padding: 10px;
        border-radius: 5px;
        background: #f8f8f8;
    }
    .ticket-details p {
        margin: 5px 0;
    }
    </style>
</head>
<body>
    <div class="email-container">
    <div class="email-header">
        <h1>ACE Cinema xin chào!</h1>
    </div>
    <div class="email-body">
        <p>Xin chào <strong>Nguyễn Văn A</strong>,</p>
        <p>Bạn đã đặt vé thành công. Dưới đây là thông tin chi tiết:</p>
        <div class="ticket-details">
        <p><strong>Phim:</strong> Avengers: Endgame</p>
        <p><strong>Suất chiếu:</strong> 19:00, Thứ Bảy, 20/11/2024</p>
        <p><strong>Rạp:</strong> CGV Hoàng Văn Thụ</p>
        <p><strong>Phòng chiếu:</strong> Phòng 3</p>
        <p><strong>Ghế:</strong> A10, A11</p>
        <p><strong>Mã vé:</strong> ABCD1234</p>
        </div>
        <p>Hãy xuất trình mã vé này tại quầy để nhận vé hoặc quét mã QR để vào rạp. Chúc bạn có trải nghiệm xem phim thú vị!</p>
        <p><a href="http://localhost:3000" class="btn">Truy cập Website</a></p>
    </div>
    <div class="email-footer">
        &copy; 2024 Your Cinema. All rights reserved.
    </div>
    </div>
</body>
</html>

`;
          const emaildata = {
            to: userEmail,
            subject: "Xác nhận đặt vé thành công",
            text: "Cảm ơn bạn đã mua vé tại ACE Cinema!",
            html: emailHTML,
          };
          const ticketResult = await dispatch(postTicket(ticketdata)).unwrap();
          console.log("Vé đã được tạo:", ticketResult);
          dispatch(Sendemail(emaildata));
          dispatch(clearCart());
          setTypeNoti("success");
          setMessage("Thanh toán thành công. Cảm ơn bạn đã mua vé tại ACE Cinema");
          setShowNotification(true);
          setTimeout(() => {
            localStorage.removeItem("hoadonProcessed");
            router.replace("/");
          }, 2000);
        } catch (error) {
          console.error("Lỗi khi tạo hóa đơn hoặc vé:", error);
          setTypeNoti("error");
          setMessage("Thanh toán thất bại. Vui lòng thử lại!");
          setShowNotification(true);
        } finally {
          setIsProcessing(false);
        }
      };
      createInvoiceAndTicket();
    }

    if (query.get("canceled")) {
      setTypeNoti("canceled");
      setMessage("Thanh toán thất bại. Đang chuyển về trang thanh toán");
      setShowNotification(true);
      setTimeout(() => {
        router.replace("/thanhtoan");
      }, 2000);
    }
  }, [router, totalAmount, giolap, ngaylap, userId, cachieuID, gheID, isProcessing, dispatch]);


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
