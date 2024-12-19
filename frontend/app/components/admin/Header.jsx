import { logout } from '@/redux/slice/authSlice';
import { faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './header.css';
const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const authen = useSelector((state) => state.auth.authenticated);
  const user = useSelector((state) => state.auth.user);
  const handleLogout = () => {
    dispatch(logout());
    router.replace('/');
  };
  return (
    <header className="headerstyle">
      <div className="titleContainer">
        <h4 className="leftTitle">ACE ADMIN</h4>
      </div>
      <div className='qr-checkin'>
        <Link href='/admin/QR'><img src="http://localhost:3000/img/qr.png" alt="" /></Link>
      </div>
      <div>
        {authen && user?.role === 'Admin' && (
          <div className="dropdown">
            <div
              className="d-flex align-items-center gap-3 dropdownButton"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="userIconContainer">
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ color: '#ffffff', fontSize: '14px' }}
                />
              </div>
              <span className="userName">{user.username}</span>
              <FontAwesomeIcon icon={faChevronDown} className="chevronIcon" />
            </div>
            <ul
              className="dropdown-menu mt-2 w-100 dropdownMenu"
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <a
                  className="dropdown-item logoutLink"
                  href="#"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i> Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
