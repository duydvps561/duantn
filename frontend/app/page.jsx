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
      
      // Dữ liệu hóa đơn
      const hoadondata = {
        tongtien: totalAmount,
        giolap: giolap,
        ngaylap: ngaylap,
        taikhoan_id: userId,
      };
  
      setIsProcessing(true);
      localStorage.setItem("hoadonProcessed", "true");
  
      // Hàm xử lý tạo hóa đơn và vé
      const createInvoiceAndTicket = async () => {
        try {
          // Tạo hóa đơn
          const hoadonResult = await dispatch(postHoadon(hoadondata)).unwrap();
          const hoadonId = hoadonResult._id;
          console.log("Hóa đơn đã được tạo:", hoadonId);
  
          // Tạo vé sau khi hóa đơn được tạo thành công
          const ticketdata = {
            cachieu_id: cachieuID,
            hoadon_id: hoadonId, // Sử dụng hoadonId để tạo vé
            ghe_id: gheID,
            giave: totalAmount,
          };
          
          const ticketResult = await dispatch(postTicket(ticketdata)).unwrap();
          console.log("Vé đã được tạo:", ticketResult);
          
          // Xử lý sau khi tạo vé thành công
          dispatch(clearCart());
          setTypeNoti("success");
          setMessage("Thanh toán thành công. Cảm ơn bạn đã mua vé tại ACE Cinema");
          setShowNotification(true);
          
          setTimeout(() => {
            localStorage.removeItem("hoadonProcessed");
            router.replace("/"); // Chuyển hướng về trang chủ
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
  
      // Gọi hàm tạo hóa đơn và vé
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
              <h1 className="text-uppercase">{movie.tenphim}</h1>
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
