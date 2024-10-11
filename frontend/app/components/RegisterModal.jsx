'use client';
import React from 'react';
import './register.css'; 

export default function LoginModal({ show, handleClose }) {
    if (!show) return null; 

    return (
        <div className="modal-overlay  ">
            <div className="modal-register bg-dark rounded">
                <button onClick={handleClose} className="close-modal">&times;</button>
                <h2>Đăng Ký</h2>
                <form>
                <div class="hoten">
                <div class="ho">
                    <label for="fname">Họ:</label>
                    <input type="text" placeholder="Họ..."/>
                </div>
                <div class="ten">
                    <label for="fname">Tên:</label>
                    <input type="text" placeholder="Tên..."/>
                </div>
            </div>
            <div class="username">
                <label for="uname">Tên tài khoản:</label>
                <input type="text" placeholder="Tên tài khoản..."/>
            </div>
            <div class="information">
                <div class="nphone">
                    <label for="nphone">Số điện thoại:</label>
                    <input type="text" placeholder="Số điện thoại..."/>
                </div>
                <div class="email">
                    <label for="email">Email:</label>
                    <input type="text" placeholder="Email..."/>
                </div>
            </div>
            <div class="pw">
                <div class="pass">
                    <label for="pass">Mật khẩu:</label>
                    <input type="text" placeholder="Mật khẩu..."/>
                </div>
                <div class="repass">
                    <label for="repass">Xác nhận mật khẩu:</label>
                    <input type="text" placeholder="Xác nhận mật khẩu..."/>
                </div>
            </div>
                    <button type="submit">Đăng kí</button>
                    <p className="ans text-light">Bạn đã có tài khoản? <a className="login text-danger" href="">Đăng nhập</a></p>
                </form>
            </div>
        </div>
    );
}
