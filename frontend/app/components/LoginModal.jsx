'use client';
import React from 'react';
import './loginModal.css'; 

export default function LoginModal({ show, handleClose }) {
    if (!show) return null; 

    return (
        <div className="modal-overlay  ">
            <div className="modal-login bg-dark rounded">
                <button onClick={handleClose} className="close-modal">&times;</button>
                <h2>Đăng nhập</h2>
                <form>
                    <label className="key" htmlFor="email">Email:</label>
                    <input type="text" id="email" name="Email" required placeholder="Email...." />
                    <label className="key" htmlFor="password">Mật khẩu:</label>
                    <input type="password" id="password" name="password" required placeholder="Mật khẩu...."/>
                    <p className="upPW"><a href="">Quên mật khẩu</a></p>
                    <button type="submit">Đăng nhập</button>
                    <p className="ans text-light">Bạn chưa có tài khoản? <a className="register text-danger" href="">Đăng ký</a></p>
                </form>
            </div>
        </div>
    );
}
