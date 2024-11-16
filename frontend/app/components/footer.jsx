export default function Footer() {
  return (
    <footer className="footer bg-dark py-3">
      <div className="d-flex justify-content-center align-items-center">
        <ul className="menu-bot d-flex ">
          <li className="nav-item">
            <a href="#" className="nav-link text-light">
              Chinh Sach
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-light">
              Lich Chieu
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-light">
              Tin Tuc
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-light">
              Gia Ve
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-light">
              Hoi Dap
            </a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link text-light">
              Lien He
            </a>
          </li>
        </ul>
      </div>
      <div className="img d-flex justify-content-center align-items-center">
        <img src="img/facebook.png" alt="" style={{ height: "50px" }} />
        <img src="img/zalo.png" alt="" style={{ height: "55px" }} />
        <img src="img/youtube.png" alt="" style={{ height: "50px" }} />
        <img src="img/ggplay.png" alt="" />
        <img src="img/appstore.png" alt="" />
        <img src="img/bocongthuong.png" alt="" />
      </div>
      <div className="contact-bottom">
        <div className="text-light">
          <p>Cơ quan chủ quản: BỘ VĂN HÓA, THỂ THAO VÀ DU LỊCH</p>
          <p>Bản quyền thuộc Trung tâm Chiếu phim Quốc gia.</p>
          <p>
            Giấy phép số: 224/GP- TTĐT ngày 31/8/2010 - Chịu trách nhiệm: Vũ Đức
            Tùng – Giám đốc.
          </p>
          <p>
            Địa chỉ: 87 Láng Hạ, Quận Ba Đình, Tp. Hà Nội - Điện thoại:
            0339.445.887
          </p>
          <p>Copyright 2023. NCC All Rights Reservered. Dev by Anvui.vn</p>
        </div>
      </div>
    </footer>
  );
}
