"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginModal from "../login/LoginModal";
import RegisterModal from "../register/RegisterModal";

export default function Header() {
  const pathname = usePathname();

  const [showRegister, setRegister] = useState(false);
  const handleOpenRegister = () => {
    setRegister(true);
  };
  const handleCloseRegister = () => {
    setRegister(false);
  };

  const [showLogin, setShowLogin] = useState(false);
  const handleOpenLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  return (
    <header>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <Link href="/">
        <img src="/img/logo.png" alt="anh logo" />
      </Link>
      <nav>
        <ul className="nav-list">
          <li>
            <Link href="/" className={pathname === "/" ? "active" : ""}>
              Trang chủ
            </Link>
          </li>
          <li>
            <Link
              href="/lichchieu"
              className={pathname === "/lichchieu" ? "active" : ""}
            >
              Lịch chiếu
            </Link>
          </li>
          <li>
            <Link
              href="/tintuc"
              className={pathname === "/tintuc" ? "active" : ""}
            >
              Tin tức
            </Link>
          </li>
          <li>
            <Link
              href="/khuyenmai"
              className={pathname === "/khuyenmai" ? "active" : ""}
            >
              Khuyến mãi
            </Link>
          </li>
          <li>
            <Link
              href="/ticket"
              className={pathname === "/ticket" ? "active" : ""}
            >
              Giá vé
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={pathname === "/some-path" ? "active" : ""}
            >
              Liên hoan phim
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className={pathname === "/some-path" ? "active" : ""}
            >
              Giới thiệu
            </Link>
          </li>
        </ul>
      </nav>
      <div className="btn-section">
        <button
          href="/register"
          className="regist-btn"
          onClick={handleOpenRegister}
        >
          Đăng Ký
        </button>
        <button className="login-btn" onClick={handleOpenLogin}>
          Đăng Nhập
        </button>
      </div>
      <RegisterModal show={showRegister} handleClose={handleCloseRegister} />
      <LoginModal show={showLogin} handleClose={handleCloseLogin} />
    </header>
  );
}
