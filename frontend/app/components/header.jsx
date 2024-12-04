import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LoginModal from "../login/LoginModal";
import RegisterModal from "../register/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slice/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronDown, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const link = [
    { name: "Trang chủ", path: "/" },
    { name: "Lịch chiếu", path: "/lichchieu" },
    { name: "Tin tức", path: "/tintuc" },
    { name: "Liên hệ", path: "/contact" },
    { name: "Giá vé", path: "/ticket" },
  ];

  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthen = useSelector((state) => state.auth.authenticated);
  const user = useSelector((state) => state.auth.user);
  const pathname = usePathname();
  const [showRegister, setRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  const [menuRes, setMenuRes] = useState(false);
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuRes]);
  
  const handleOpenRegister = () => setRegister(true);
  const handleCloseRegister = () => setRegister(false);
  const handleOpenLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  }

  const toggleMenu = () => setMenuRes(!menuRes);
  const handleScroll = () => {
    if (menuRes) {
      setMenuRes(false); 
    }
  };
  return (
    <header>
      <Link href="/">
        <img src="/img/logo.png" alt="Logodsadadwqeqe" />
      </Link>

      <button className="burger-btn" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Thanh nav mặc định */}
      <nav className="nav-list d-none d-md-flex">
        <ul>
          {link.map((item, index) => (
            <li key={index}>
              <Link href={item.path} className={pathname === item.path ? "active" : ""}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Thanh nav responsive */}
      <nav className={`nav-list ${menuRes ? "d-block" : "d-none"} d-md-none`}>
        <ul>
          {link.map((item, index) => (
            <li key={index}>
              <Link href={item.path} className={pathname === item.path ? "active" : ""}>
                {item.name}
              </Link>
            </li>
          ))}
          {isAuthen && user ? (
            <div className="user-profile d-flex align-items-center flex-column justify-content-center gap-1">
              <img src="../../img/logo.png" alt="User Logo" />
              <h3>{user.username}</h3>
              <div className="user-link">
                <li >
                  <Link href="/user">
                    Thông tin người dùng
                  </Link>
                </li>
                <li>
                  <Link href="/yourticket">
                    Lịch sử vé
                  </Link>
                </li>
                <div className="user-logout" onClick={handleLogout}>
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    style={{ color: "#ffffff", fontSize: "14px" }}
                  />
                  <span> Đăng xuất</span>
                </div>
              </div>
            </div>

          ) : (
            <>
              <li>
                <button className="regist-btn" onClick={handleOpenRegister}>
                  Đăng Ký
                </button>
              </li>
              <li>
                <button className="login-btn" onClick={handleOpenLogin}>
                  Đăng Nhập
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Dropdown user (hiện ở màn hình lớn) */}
      {isAuthen && user ? (
        <div className="dropdown d-none d-md-block">
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
            <FontAwesomeIcon icon={faChevronDown} style={{ color: "#ffffff", fontSize: "17px" }} />
          </div>
          <ul
            className="dropdown-menu mt-2 w-100"
            style={{ backgroundColor: "#10141b" }}
            aria-labelledby="dropdownMenuButton"
          >
            <li>
              <Link href={`/user`} className="dropdown-item" style={{ fontSize: "17px" }}>
                Thông tin cá nhân
              </Link>
            </li>
            <li>
              <Link href="/yourticket" className="dropdown-item" style={{ fontSize: "17px" }}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Lịch sử mua vé
              </Link>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                style={{ fontSize: "17px" }}
                onClick={handleLogout}
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Đăng xuất
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div className="d-flex gap-3 d-none d-md-block">
          <button className="regist-btn" onClick={handleOpenRegister}>
            Đăng Ký
          </button>
          <button className="login-btn" onClick={handleOpenLogin}>
            Đăng Nhập
          </button>
        </div>
      )}

      {/* Modals */}
      <RegisterModal show={showRegister} handleClose={handleCloseRegister} />
      <LoginModal show={showLogin} handleClose={handleCloseLogin} />
    </header>

  );
}
