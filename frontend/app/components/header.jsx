"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginModal from "../login/LoginModal";
import RegisterModal from "../register/RegisterModal";

export default function Header() {
  const links = [
    { name: "Trang chủ", path: "/" },
    { name: "Lịch chiếu", path: "/lichchieu" },
    { name: "Tin tức", path: "/tintuc" },
    { name: "Khuyến mãi", path: "/khuyenmai" },
    { name: "Giá vé", path: "/ticket" },
  ];
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
          {
            links.map((link, index) => (
              <li key={index}>
                <Link href={link.path} className={pathname === link.path? "active" : ""}>
                  {link.name}
                </Link>
              </li>
            ))
          }
          {/* <li>
            <Link href="/" className={pathname === "/" ? "active" : ""}>
              Trang chủ
            </Link>
          </li> */}
      
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
