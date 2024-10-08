'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LoginModal from './LoginModal';

export default function Header() {
  const pathname = usePathname();

  const [showLogin, setShowLogin] = useState(false);

  const handleOpenLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);


  return (
    <header>
      <Link href="/">
        <img src="http://localhost:3000/img/logo.png" alt="anh logo" />
      </Link>
      <nav>
        <ul className="nav-list">
          <li>
            <Link href="/" className={pathname === '/' ? 'active' : ''}>
              Trang chủ
            </Link>
          </li>
          <li>
            <Link href="/lichchieu" className={pathname === '/lichchieu' ? 'active' : ''}>
              Lịch chiếu
            </Link>
          </li>
          <li>
            <Link href="/tintuc" className={pathname === '/tintuc' ? 'active' : ''}>
              Tin tức
            </Link>
          </li>
          <li>
            <Link href="/khuyenmai" className={pathname === '/khuyenmai' ? 'active' : ''}>
              Khuyến mãi
            </Link>
          </li>
          <li>
            <Link href="/ticket" className={pathname === '/ticket' ? 'active' : ''}>
              Giá vé
            </Link>
          </li>
          <li>
            <Link href="/contact" className={pathname === '/some-path' ? 'active' : ''}>
              Liên hoan phim
            </Link>
          </li>
          <li>
            <Link href="#" className={pathname === '/some-path' ? 'active' : ''}>
              Giới thiệu
            </Link>
          </li>
        </ul>
      </nav>
        <div className="btn-section">
          <button className="regist-btn">Đăng Ký</button>
          <button className="login-btn" onClick={handleOpenLogin}>Đăng Nhập</button>
      </div>

      {/* Hiển thị modal đăng nhập */}
      <LoginModal show={showLogin} handleClose={handleCloseLogin} />
    </header>
  );
}
