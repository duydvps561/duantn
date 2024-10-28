"use client";
import React, { useEffect, useState } from "react";
import "./thanhtoan.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/redux/slice/cartSlice";
export default function ThanhToan() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [ghe, setghe] = useState([]);
  const [film, setFilm] = useState({});
  const [isLoaded, setIsLoaded] = useState(false); // Trạng thái để kiểm tra xem đã tải xong hay chưa
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    const filmData = localStorage.getItem('filmInfo');
    if (filmData) {
      setFilm(JSON.parse(filmData));
    }
  }, []);

  useEffect(() => {
    const seats = cart.map(item => item.seat).flat().filter(Boolean);
    setghe(seats);
    setIsLoaded(true); // Đánh dấu đã tải xong
  }, [cart]);

  useEffect(() => {
    // Tính tổng số tiền mỗi khi giỏ hàng thay đổi
    const amount = cart.reduce((acc, item) => acc + (item.gia * (item.quantity || 1)), 0);
    setTotalAmount(amount);
  }, [cart]);

  return (
      <div className="container">
        <div className="layout">
          {/* Thông tin phim */}
          <div className="item">
            <div className="title-item">
              <h2>Thông tin phim</h2>
              <button onClick={() => dispatch(clearCart())}>Xóa giỏ hàng</button>
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
              <h2>Thông tin thanh toán</h2>
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
                    const seats = item.seat && item.seat.length > 0 ? item.seat.join(', ') : 'Không có dữ liệu';
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
              <h2>Phương thức thanh toán</h2>
            </div>
            <div className="paymoment">
              {['VietQR', 'VNPay', 'Viettel Money', 'Payoo'].map((method) => (
                <div className="pay-account" key={method}>
                  <input
                    type="radio"
                    id={method}
                    name="payment"
                    value={method.toLowerCase().replace(' ', '')}
                    aria-label={`Select ${method} as payment method`}
                  />
                  <label htmlFor={method}>
                    <img
                      src={`img/${method.toLowerCase().replace(' ', '')}.png`}
                      alt={`${method} payment option`}
                    />
                    <h3>{method}</h3>
                  </label>
                </div>
              ))}
            </div>
            <div className="payment">
              <div className="infor-payment">
                <div className="title-item">
                  <h3>Chi phí</h3>
                </div>
                <div className="thanhtoan">
                  <h4>Thanh toán</h4>
                  <p>{totalAmount.toLocaleString()}đ</p>
                </div>
                <div className="thanhtoan">
                  <h4>Phí</h4>
                  <p>0đ</p>
                </div>
                <div className="thanhtoan">
                  <h4>Tổng cộng</h4>
                  <p>{totalAmount.toLocaleString()}đ</p>
                </div>
                <button>Thanh toán</button>
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
