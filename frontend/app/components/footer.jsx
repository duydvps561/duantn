import style from './footer.module.css';
export default function Footer() {
  return (
    <footer className={`${style.color} footer py-3`}>
    <nav className="d-flex justify-content-center align-items-center">
      <ul className="menu-bot d-flex">
        <li className="nav-item">
          <a href="#" className="nav-link text-light">Chính sách</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-light">Lịch Chiếu</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-light">Tin Tức</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-light">Giá Vé</a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link text-light">Liên Hệ</a>
        </li>
      </ul>
    </nav>
    <div className="img d-flex justify-content-center align-items-center">
      <img src="img/facebook.png" alt="Facebook" style={{ height: "50px" }} />
      <img src="img/zalo.png" alt="Zalo" style={{ height: "55px" }} />
      <img src="img/youtube.png" alt="YouTube" style={{ height: "50px" }} />
      <img src="img/ggplay.png" alt="Google Play" />
      <img src="img/appstore.png" alt="App Store" />
      <img src="img/bocongthuong.png" alt="Bộ Công Thương" />
    </div>
    <div className="contact-bottom">
      <div className="text-light">
        <p>Cơ quan chủ quản: BỘ VĂN HÓA, THỂ THAO VÀ DU LỊCH</p>
        <p>Trung tâm Chiếu phim ACE Cinema.</p>
        <p>Địa chỉ: Quận 12, Tp. Hồ Chí Minh - Điện thoại: 038.8293.743</p>
        <p>Copyright 2024. NCC All Rights Reserved. Dev by me</p>
      </div>
    </div>
  </footer>
  );
}
