"use client";
import React, { useEffect, useState } from "react";
import "./thanhtoan.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/redux/slice/cartSlice";
import Link from "next/link";
import { setQrUrl } from "@/redux/slice/qrSlice";
import { useRouter } from "next/navigation";
import { clearMovieInfo } from "@/redux/slice/filmSlice";
export default function ThanhToan() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [ghe, setghe] = useState([]);
  const [film, setFilm] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [qrUrllink, setQrUrllink] = useState("");
  useEffect(() => {
    if (paymentMethod === "vietqr") {
      const description = encodeURIComponent(`Thanh toán ${film.tenphim || "phim"}`);
      const accountName = encodeURIComponent("PHAN MINH TUONG");
      const url = `https://img.vietqr.io/image/MB-1911010104-compact.png?amount=${totalAmount}&addInfo=${description}&accountName=${accountName}`;
      setQrUrllink(url);
      dispatch(setQrUrl(url));
    }
  }, [paymentMethod, totalAmount, film.tenphim, dispatch]);

  useEffect(() => {
    const filmData = localStorage.getItem('filmInfo');
    if (filmData) {
      setFilm(JSON.parse(filmData));
    }
  }, []);

  useEffect(() => {
    const seats = cart.map(item => item.seat).flat().filter(Boolean);
    setghe(seats);
    setIsLoaded(true);
  }, [cart]);

  useEffect(() => {
    const amount = cart.reduce((acc, item) => acc + (item.gia * (item.quantity || 1)), 0);
    setTotalAmount(amount);
  }, [cart]);
  const handlePayment = async () => {
    if (paymentMethod === 'vietqr') {
      router.push(`/thanhtoan/option?${qrUrllink}`);
    } else if (paymentMethod === 'payos') {
      
      try {
        const Orcode = Math.floor(Math.random() *1000000);
        const response = await fetch('http://localhost:3000/payos/create-payment-link', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalAmount,
            description: Orcode ,
            orderCode: Orcode ,
            returnUrl: "http://localhost:3001?success=true",
          }),
        });
        const data = await response.json();
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
          dispatch(setQrUrl(data.checkoutUrl));
        }
      } catch (error) {
        console.error("Payment error:", error);
      }
    }
  }
  return (
    <div className="container">
      <div className="layout">
        <div className="item">
          <div className="title-item">
            <h2 className="text-light">Thông tin phim</h2>
            <button onClick={() => {dispatch(clearCart());dispatch(clearMovieInfo())}}>Xóa giỏ hàng</button>
          </div>
          <div className="item-body">
            <div className="filmdetail">
              <h3>Phim</h3>
              <p>{film.tenphim || 'Không có thông tin'}</p>
              <h3>Ngày giờ chiếu</h3>
              <p>
                {film.ngaychieu
                  ? new Date(film.ngaychieu).toLocaleDateString()
                  : 'Không có thông tin'}
                {film.giochieu || 'Không có thông tin'}
              </p>
              <h3>Định dạng</h3>
              <p>2D</p>
            </div>
            <div className="theater">
              <h3>Ghế</h3>
              <p>{ghe.length > 0 ? ghe.join(', ') : 'Không có ghế'}</p>
              <h3>Phòng chiếu</h3>
              <p>{film.phongchieu || 'Không có thông tin'}</p>
            </div>
          </div>
        </div>

        {/* Thông tin thanh toán */}
        <div className="item">
          <div className="title-item">
            <h2 className="text-light">Thông tin thanh toán</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>Danh mục</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {isLoaded && cart.length > 0 ? (
                cart.map((item) => {
                  const seats = Array.isArray(item.seat) && item.seat.length > 0 ? item.seat.join(', ') : 'Không có dữ liệu';
                  return (
                    <tr key={item._id}>
                      <td>{item.tenfood ? item.tenfood : seats}</td>
                      <td>{item.quantity || 1}</td>
                      <td>{item.gia ? item.gia.toLocaleString() + ' đ' : 'Không có dữ liệu'}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">Giỏ hàng trống</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Phương thức thanh toán */}
        <div className="item">
          <div className="title-item">
            <h2 className="text-light">Phương thức thanh toán</h2>
          </div>
          <div className="paymoment">
            {['VietQR', 'PayOS'].map((method) => (
              <div className="pay-account" key={method}>
                <input
                  type="radio"
                  id={method}
                  name="payment"
                  value={method.toLowerCase().replace(' ', '')}
                  aria-label={`Select ${method} as payment method`}
                  checked={paymentMethod === method.toLowerCase().replace(' ', '')}
                  onChange={() => setPaymentMethod(method.toLowerCase().replace(" ", ""))}
                />
                <label htmlFor={method}>
                  <img className="payment-option"
                    src={`img/${method.toLowerCase().replace(' ', '')}.png`}
                    alt={`${method} payment option`}
                  />
                  <h3 style={{ fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>{method}</h3>
                </label>
              </div>
            ))}
          </div>
          <div className="payment">
            <div className="infor-payment">
              <div className="title-item text-light">
                <h3>Chi phí</h3>
              </div>
              <div className="thanhtoan text-light">
                <h4>Thanh toán</h4>
                <p>{totalAmount.toLocaleString()}đ</p>
              </div>
              <div className="thanhtoan text-light">
                <h4>Phí</h4>
                <p>0đ</p>
              </div>
              <div className="thanhtoan text-light">
                <h4>Tổng cộng</h4>
                <p>{totalAmount.toLocaleString()}đ</p>
              </div>
              <button onClick={handlePayment} disabled={cart.length === 0 || !paymentMethod}>Thanh toán</button>
              <p className="luuy">
                Lưu ý: Không mua vé cho trẻ em dưới 13 tuổi đối với các suất chiếu phim kết thúc sau 22h00 và không mua vé cho trẻ em dưới 16 tuổi đối với các suất chiếu phim kết thúc sau 23h00.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
