"use client";
import React from "react";
import "./thanhtoan.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/redux/slice/cartSlice";

export default function ThanhToan() {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  return (
    <div className="container">
      <div className="layout">
        <div className="item">
          <div className="title-item">
            <h2>Thông tin phim</h2>
            <button onClick={() => dispatch(clearCart())}>Xoa cart</button>
          </div>
          <div className="item-body">
            <div className="filmdetail">
              <h3>Phim</h3>
              <p>LÀM GIÀU VỚI MA</p>
              <h3>Ngày giờ chiếu</h3>
              <p>11:45 - 14/09/2024</p>
              <h3>Định dạng</h3>
              <p>2D</p>
            </div>
            <div className="theater">
              <h3>Ghế</h3>
              <p>H7</p>
              <h3>Phòng chiếu</h3>
              <p>5</p>
            </div>
          </div>
        </div>
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
              {cart.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>
                      {item.tenfood ? item.tenfood : item.seat ? item.seat : 'Không có dữ liệu'}
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.gia ? item.gia.toLocaleString() : 'ko có dữ liệu'}đ</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="item">
          <div className="title-item">
            <h2>Phương thức thanh toán</h2>

          </div>
          <div className="paymoment">
            <div className="pay-account">
              <input type="radio" name="payment" />
              <img src="img/vietqr.png" alt="VietQR" />
              <h3>VietQR</h3>
            </div>
            <div className="pay-account">
              <input type="radio" name="payment" />
              <img src="img/vnpay.png" alt="VNPay" />
              <h3>VNPay</h3>
            </div>
            <div className="pay-account">
              <input type="radio" name="payment" />
              <img src="img/viettelmoney.png" alt="Viettel Money" />
              <h3>Viettel Money</h3>
            </div>
            <div className="pay-account">
              <input type="radio" name="payment" />
              <img src="img/payoo.png" alt="Payoo" />
              <h3>Payoo</h3>
            </div>
          </div>
          <div className="payment">
            <div className="infor-payment">
              <div className="title-item">
                <h3>Chi phí</h3>
              </div>
              <div className="thanhtoan">
                <h4>Thanh toán</h4>
                <p>80.000đ</p>
              </div>
              <div className="thanhtoan">
                <h4>Phí</h4>
                <p>0đ</p>
              </div>
              <div className="thanhtoan">
                <h4>Tổng cộng</h4>
                <p>80.000đ</p>
              </div>
              <button>Thanh toán</button>
              <p className="luuy">
                Lưu ý: Không mua vé cho trẻ em dưới 13 tuổi đối với các suất
                chiếu phim kết thúc sau 22h00 và không mua vé cho trẻ em dưới 16
                tuổi đối với các suất chiếu phim kết thúc sau 23h00.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
