import { logout } from '@/redux/slice/authSlice';
import { faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const authen = useSelector((state) => state.auth.authenticated);
  const user = useSelector((state) => state.auth.user);
  const handleLogout = () =>{
    dispatch(logout());
    router.push('/');
  }
  return (
    <header style={headerStyle}>
      <div style={titleContainerStyle}>
        <h4 style={leftTitleStyle}>ACE ADMIN</h4>
      </div>
      <div>
        {authen && user?.role === 'Admin' && (
          <>
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
                <span
                  className=""
                  style={{ fontSize: "17px",color:'#000' }}
                >
                  {user.username}
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  style={{ color: "#000", fontSize: "17px" }}
                />
              </div>
              <ul
                className="dropdown-menu mt-2"
                style={{ backgroundColor: "#10141b" }}
                aria-labelledby="dropdownMenuButton"
              >
                {/* <li>
                  <Link
                    href={`/user`}
                    className="dropdown-item"
                    style={{ fontSize: "17px" }}
                  >
                    Thông tin cá nhân
                  </Link>
                </li> */}
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    style={{ fontSize: "17px" }}
                    onClick={(handleLogout)}
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i> Đăng
                    xuất
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

const headerStyle = {
  backgroundColor: '#ffffff',
  color: 'black',
  padding: '10px',
  textAlign: 'center',

};

const titleContainerStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '0 20px',
};

const leftTitleStyle = {
  margin: 0,
  color: '#4d6950',

};

const rightTitleStyle = {
  margin: 0,
};

export default Header;
