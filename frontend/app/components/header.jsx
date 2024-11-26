import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginModal from "../login/LoginModal";
import RegisterModal from "../register/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slice/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const link = [
    { name: "Trang chủ", path: "/" },
    { name: "Lịch chiếu", path: "/lichchieu" },
    { name: "Tin tức", path: "/tintuc" },
    { name: "Liên hệ", path: "/contact" },
    { name: "Giá vé", path: "/ticket" },
  ];

  const dispatch = useDispatch();
  const isAuthen = useSelector((state) => state.auth.authenticated);
  const user = useSelector((state) => state.auth.user);
  const pathname = usePathname();
  const [showRegister, setRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleOpenRegister = () => setRegister(true);
  const handleCloseRegister = () => setRegister(false);
  const handleOpenLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  // Log userId to check
  useEffect(() => {
    if (user) {
      console.log("User ID:", user.id);
    } else {
      console.log("User is not authenticated");
    }
  }, [user]);

  return (
    <header>
      <Link href="/">
        <img src="/img/logo.png" alt="Logo" />
      </Link>
      <nav>
        <ul className="nav-list">
          {link.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className={pathname === item.path ? "active" : ""}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {isAuthen && user ? (
        <div className="dropdown">
          <div
            className="d-flex align-items-center gap-3"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <div
              style={{
                backgroundColor: "#202d32",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
              className="d-flex align-items-center justify-content-center"
            >
              <FontAwesomeIcon
                icon={faUser}
                style={{ color: "#ffffff", fontSize: "14px" }}
              />
            </div>
            <span className="text-light" style={{ fontSize: "17px" }}>
              {user.username}
            </span>
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ color: "#ffffff", fontSize: "17px" }}
            />
          </div>
          <ul
            className="dropdown-menu mt-2"
            style={{ backgroundColor: "#10141b" }}
            aria-labelledby="dropdownMenuButton"
          >
            <li>
              <Link
                href={`/user`}
                className="dropdown-item"
                style={{ fontSize: "17px" }}
              >
                Thông tin cá nhân
              </Link>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                style={{ fontSize: "17px" }}
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Lịch sử
                mua vé
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                style={{ fontSize: "17px" }}
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Đăng
                xuất
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div className="d-flex gap-3">
          <button className="regist-btn" onClick={handleOpenRegister}>
            Đăng Ký
          </button>
          <button className="login-btn" onClick={handleOpenLogin}>
            Đăng Nhập
          </button>
        </div>
      )}

      <RegisterModal show={showRegister} handleClose={handleCloseRegister} />
      <LoginModal show={showLogin} handleClose={handleCloseLogin} />
    </header>
  );
}
