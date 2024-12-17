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
import { postFoodOrder } from "@/redux/slice/foodorderSlice";

export default function Home() {
  const boxes = document.querySelectorAll(".box");

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  boxes.forEach((box) => {
    observer.observe(box);
  });

  const today = new Date();
  // console.log(today);

  const userId = useSelector((state) => state.auth.user?.id);
  const userEmail = useSelector((state) => state.auth.user?.email);
  const dispatch = useDispatch();
  const router = useRouter();

  const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
  const [moviesComingSoon, setMoviesComingSoon] = useState([]);

  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [typeNoti, setTypeNoti] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [gheID, setGheID] = useState("");
  const [cachieuID, setCachieuID] = useState("");
  const [food, setFood] = useState([]);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const filmInfo = JSON.parse(localStorage.getItem("filmInfo") || "[]");
    setCachieuID(filmInfo.cachieuID);
    const idghe = cart
      .filter((item) => item.hasOwnProperty("seat"))
      .map((item) => item._id);
    setGheID(idghe);
    const foodDetails = cart
    .filter((item) => item.hasOwnProperty("tenfood"))
    .map((item) => ({
        id: item._id,
        quantity: item.quantity,
        gia: item.gia,
    }));
    setFood(foodDetails);
    const amount = cart.reduce(
      (acc, item) => acc + item.gia * (item.quantity || 1),
      0
    );
    setTotalAmount(amount);
  }, []);
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const giolap = `${hours}:${minute}`;
  const ngaylap = now.toISOString();
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const isHoadonProcessed = localStorage.getItem("hoadonProcessed");

    if (
      query.get("success") === "true" &&
      !isProcessing &&
      !isHoadonProcessed
    ) {
      setTypeNoti("success");
      setMessage("Đang xử lý thanh toán...");
      setShowNotification(true);
      if (
        !totalAmount ||
        !giolap ||
        !ngaylap ||
        !userId ||
        !cachieuID ||
        !gheID
      ) {
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

          const foodorderDataList = food.map((item) => ({
            hoadon_id: hoadonId,
            food_id: item.id,
            soluong: item.quantity,
            tongtien: item.gia*item.quantity,
          }));
      
          foodorderDataList.forEach((foodorderData) => {
            dispatch(postFoodOrder(foodorderData));
          });

          const ticketdata = {
            cachieu_id: cachieuID,
            hoadon_id: hoadonId,
            ghe_id: gheID,
            giave: totalAmount,
          };
          food.forEach((fod) => {
            dispatch(postFoodOrder(fod));
        });
          const ticketResult = await dispatch(postTicket(ticketdata)).unwrap();
          console.log("Vé đã được tạo:", ticketResult);
          const ticketId = ticketResult.hoadon_id;
          const ticketDetails = await fetch(
            `http://localhost:3000/ve/${ticketId}`
          ).then((res) => res.json());
          if (!ticketDetails) throw new Error("Không tìm thấy chi tiết vé!");

          const cachieu = await fetch(
            `http://localhost:3000/xuatchieu/${ticketDetails.cachieu_id}`
          ).then((res) => res.json());
          if (!cachieu) throw new Error("Không tìm thấy suất chiếu!");

          const gheList = [];
          try {
            const ghePromises = ticketDetails.ghe_id.map(async (gheid) => {
              const response = await fetch(
                `http://localhost:3000/ghe/${gheid}`
              );
              if (!response.ok)
                throw new Error(`Không tìm thấy ghế với ID ${gheid}`);
              const ghe = await response.json();
              return ghe;
            });
            const gheResults = await Promise.all(ghePromises);
            gheList.push(...gheResults);
          } catch (error) {
            console.error("Lỗi khi lấy thông tin ghế:", error);
          }
          const phongchieu = await fetch(
            `http://localhost:3000/phongchieu/${cachieu.phongchieu_id}`
          ).then((res) => res.json());
          if (!phongchieu) throw new Error("Không tìm thấy phòng chiếu!");

          const phim = await fetch(
            `http://localhost:3000/phim/${cachieu.phim_id}`
          ).then((res) => res.json());
          if (!phim) throw new Error("Không tìm thấy thông tin phim!");

          const ngaychieu = new Date(cachieu.ngaychieu);
          const ngay = ngaychieu.getDate().toString().padStart(2, "0");
          const thang = (ngaychieu.getMonth() + 1).toString().padStart(2, "0");
          const nam = ngaychieu.getFullYear();
          const ngayThangNam = `${ngay}/${thang}/${nam}`;

          // qr
          const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${ticketId}&size=200x200`;
          const emailHTML = `
          <html>
            <style>
              .email-body {
                  padding: 20px;
                  color: #333;
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
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; margin: 20px auto; padding: 20px; border: 1px solid #dddddd;">
                <tr>
                  <td style="text-align: center; padding-bottom: 20px;">
                    <img src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/466577385_122127115214398570_1390939337045666896_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=t2-aiIAf07EQ7kNvgHwiD9J&_nc_zt=23&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=A3Ky9-EYGGNgFPDdZlp_A6R&oh=00_AYB2EnlQnHnWO6W8G6qAT99z99m4_NP-rtmFZAy9mofPZg&oe=673F780E" alt="ACE Cinema Logo" style="max-width: 150px;">
                  </td>
                </tr>
                <tr>
                  <td  class="email-body" style="padding: 10px 20px; text-align: left;">
                    <p>Xin chào <strong>${userEmail}</strong>,</p>
                    <p>Bạn đã đặt vé thành công. Dưới đây là thông tin chi tiết:</p>
                    <div class="ticket-details">
                    <p><strong>Phim:</strong> ${phim.tenphim}</p>
                    <p><strong>Suất chiếu:</strong> ${cachieu.giobatdau
            }, ${ngayThangNam}</p>
                    <p><strong>Rạp:</strong> CGV Hoàng Văn Thụ</p>
                    <p><strong>Phòng chiếu:</strong> ${phongchieu.tenphong}</p>
                    <p><strong>Ghế: ${gheList
              .map((ghe) => `${ghe.hang}${ghe.cot}`)
              .join(", ")}
                    </strong>
                    </p>
                    <p><strong>Mã vé:</strong> ${ticketId}</p>
                    </div>
                    <div>
                    <img style="text-align: center; padding-bottom: 20px;" src="${qrCodeUrl}" alt="QR Code" style="width: 550px; height: 350px;" />
                    </div>
                    <p><a href="http://localhost:3001" class="btn">Truy cập Website</a></p>
                    <p>Hãy xuất trình mã vé này tại quầy để nhận vé hoặc quét mã QR để vào rạp. Chúc bạn có trải nghiệm xem phim thú vị!</p>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding: 20px; text-align: left; border-top: 1px solid #dddddd;">
                    <p style="color: #555; font-size: 14px; line-height: 1.6;">Trân trọng,</p>
                    <p style="color: #333; font-weight: bold; font-size: 16px; margin: 0;">ACE Cinema Team</p>
                    <p style="color: #888; font-size: 14px; margin: 5px 0 0;">Hotline: 123-456-789</p>
                    <p style="color: #888; font-size: 14px; margin: 5px 0 0;">Website: <a href="https://acecinema.com" style="color: #1e88e5; text-decoration: none;">www.acecinema.com</a></p>
                  </td>
                </tr>
              </table>
            </body>
          </html>
            `;
          const emaildata = {
            to: userEmail,
            subject: "Xác nhận đặt vé thành công",
            text: "Cảm ơn bạn đã mua vé tại ACE Cinema!",
            html: emailHTML,
          };
          dispatch(Sendemail(emaildata));
          dispatch(clearCart());
          setTypeNoti("success");
          setMessage(
            "Thanh toán thành công. Cảm ơn bạn đã mua vé tại ACE Cinema. Hãy kiểm tra email để xem thông tin về vé!"
          );
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
      dispatch(clearCart());
      setTypeNoti("canceled");
      setMessage("Thanh toán thất bại");
      setShowNotification(true);
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    }
  }, [
    router,
    totalAmount,
    giolap,
    ngaylap,
    userId,
    cachieuID,
    gheID,
    isProcessing,
    dispatch,
  ]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [nowPlayingResponse, comingSoonResponse] = await Promise.all([
          axios.get("http://localhost:3000/phim/dangchieu"),
          axios.get("http://localhost:3000/phim/sapchieu"),
        ]);
      const nowPlayingMovies = nowPlayingResponse.data
        .sort((a, b) => new Date(b.ngayhieuluc) - new Date(a.ngayhieuluc))
        .slice(0, 10);
      const comingSoonMovies = comingSoonResponse.data
        .sort((a, b) => new Date(b.ngayhieuluc) - new Date(a.ngayhieuluc))
        .slice(0, 10);

      setMoviesNowPlaying(nowPlayingMovies);
      setMoviesComingSoon(comingSoonMovies);
      } catch (error) {
        console.error("Không tìm thấy dữ liệu phim:", error);
      }
    };
    fetchMovies();
  }, []);

  const renderMovieCards = (movies) =>
    movies.map((movie) => (
      <div className="card" key={movie._id}>
        <div className="box">
          <Link
            href={`/filmdetail/${movie._id}`} //?cachieu=${selectedDate}//
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
                <p style={{ color: "#fff" }}>{movie.thoiluong} Phút</p>
                <p style={{ color: "#fff" }}>
                  {new Date(movie.ngayhieuluc).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <div className="title-card">
                <h1 className="text-uppercase">{movie.tenphim}</h1>
              </div>
            </div>
          </Link>
        </div>
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
          <i
            className="fa fa-circle"
            style={{ fontSize: "25px", color: "red" }}
          ></i>
          <h1>Phim Đang Chiếu</h1>
        </div>

        <div className="row gap-3">{renderMovieCards(moviesNowPlaying)}</div>

        <div className="main-title mt-5">
          <i
            className="fa fa-circle"
            style={{ fontSize: "25px", color: "red" }}
          ></i>
          <h1>Phim Sắp Chiếu</h1>
        </div>

        <div className="row gap-3">{renderMovieCards(moviesComingSoon)}</div>
      </div>
    </>
  );
}
