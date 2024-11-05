import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons"; // Thêm dòng này
import LoginModal from "../login/LoginModal";
import RegisterModal from "../register/RegisterModal";
import InfoModal from "../InforModal/InforModal"; // Đảm bảo đường dẫn đúng

export default function Header() {
  const pathname = usePathname();

  const [showRegister, setRegister] = useState(false);
  const handleOpenRegister = () => setRegister(true);
  const handleCloseRegister = () => setRegister(false);

  const [showLogin, setShowLogin] = useState(false);
  const handleOpenLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const [showInfo, setShowInfo] = useState(false);

  const handleOpenInfo = () => {
    if (user) {
      setShowInfo(true);
    }
  };

  const handleCloseInfo = () => setShowInfo(false);

  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  useEffect(() => {
    loadUserFromLocalStorage();
    fetchUserData(); // Lấy thông tin người dùng từ API
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (token) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/taiKhoan?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          setUser(userData); // Cập nhật thông tin người dùng
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

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
              href="#"
              className={pathname === "/some-path" ? "active" : ""}
            >
              Giới thiệu
            </Link>
          </li>
        </ul>
      </nav>
      <div className="btn-section">
        {user ? (
          <>
            <div className="welcome-message" onClick={handleOpenInfo}>
              <FontAwesomeIcon
                icon={faUser} // Sử dụng biểu tượng người dùng
                className="icon-log-out"
              />
              {user.email}
            </div>
            <button
              type="button"
              className="btn-log-out"
              onClick={handleLogout}
            >
              <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                className="icon-log-out"
              />
            </button>
          </>
        ) : (
          <>
            <button className="regist-btn" onClick={handleOpenRegister}>
              Đăng Ký
            </button>
            <button className="login-btn" onClick={handleOpenLogin}>
              Đăng Nhập
            </button>
          </>
        )}
      </div>
      <RegisterModal show={showRegister} handleClose={handleCloseRegister} />
      <LoginModal
        show={showLogin}
        handleClose={handleCloseLogin}
        onLoginSuccess={handleLoginSuccess}
      />
      <InfoModal
        show={showInfo}
        handleClose={handleCloseInfo}
        email={user?.email}
      />
    </header>
  );
}
