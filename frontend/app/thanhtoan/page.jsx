"use client";
import React from "react";
import "./thanhtoan.css";

export default function ModalPayMoment({ show, handleClose }) {
  if (!show) return null;
  return (
    <div class="container">
      <div class="layout">
        <div class="item">
          <div class="title-item">
            <h2>Thông tin phim</h2>
          </div>
          <div class="item-body">
            <div class="filmdetail ">
              <h3>Phim</h3>
              <p>LÀM GIÀU VỚI MA</p>
              <h3>Ngày giờ chiếu</h3>
              <p>11:45 - 14/09/2024</p>
              <h3>Định dạng</h3>
              <p>2D</p>
            </div>
            <div class="theater">
              <h3>Ghế</h3>
              <p>H7</p>
              <h3>Phòng chiếu</h3>
              <p>5</p>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="title-item">
            <h2>Thông tin thanh toán</h2>
          </div>
          <table>
            <tr>
              <th>Danh mục</th>
              <th>Số lượng</th>
              <th>Tổng tiền</th>
            </tr>
            <tr>
              <td>Ghế(H7)</td>
              <td>1</td>
              <td>80.000đ</td>
            </tr>
          </table>
        </div>
        <div class="item">
          <div class="title-item">
            <h2>Phương thức thanh toán</h2>
          </div>
          <div class="paymoment">
            <div class="pay-account">
              <input type="radio" />
              <img src="img/vietqr.png" alt="" />
              <h3>VietQR</h3>
            </div>
            <div class="pay-account">
              <input type="radio" />
              <img src="img/vnpay.png" alt="" />
              <h3>VietQR</h3>
            </div>
            <div class="pay-account">
              <input type="radio" />
              <img src="img/viettelmoney.png" alt="" />
              <h3>VietQR</h3>
            </div>
            <div class="pay-account">
              <input type="radio" />
              <img src="img/payoo.png" alt="" />
              <h3>VietQR</h3>
            </div>
          </div>
          <div class="payment">
            <div class="infor-payment">
              <div class="title-item">
                <h3>Chi phí</h3>
              </div>
              <div class="thanhtoan">
                <h4>Thanh toán</h4>
                <p>80.000đ</p>
              </div>
              <div class="thanhtoan">
                <h4>Phí</h4>
                <p>0đ</p>
              </div>
              <div class="thanhtoan">
                <h4>Tổng cộng</h4>
                <p>80.000đ</p>
              </div>
              <button>Thanh toán</button>
              <p onClick={handleClose}>Quay lại</p>
              <p class="luuy">
                Lưu ý: Không mua vé cho trẻ em dưới 13 tuổi đối với các suất
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
