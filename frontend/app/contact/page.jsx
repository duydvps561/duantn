
import React from 'react';
import './contact.css'

const ContactPage = () => {
  return (
    <div className="container justify-content-center">
      <h2>Liên Hệ</h2>
      <div className="contact d-flex">
        <div className="contact-infor">
          <div className="infor">
            <h4>Trụ Sở</h4>
            <p>Số 87 Láng Hạ, Phường Thành Công, Quận Ba Đình, Tp. Hà Nội</p>
          </div>
          <div className="infor">
            <h4>Hỗ Trợ Khách Hàng</h4>
            <p>Hotline: 012346789</p>
            <p>Giờ làm việc: 8:00 - 22:00</p>
            <p>Tất cả các ngày bao gồm ngày lễ</p>
            <p>Email hỗ trợ: ABC123@gmail.com</p>
          </div>
          <div className="infor">
            <h4>Liên Hệ Quảng Cáo, Tổ Chức Sự Kiện, Thuê Rạp</h4>
            <p>Phòng Dịch Vụ</p>
            <p>Hotline: 012346789</p>
            <p>Email hỗ trợ: ABC123@gmail.com</p>
          </div>
          <div className="infor">
            <h4>Liên Hệ Mua Vé Hợp Đồng</h4>
            <p>Phòng Chiếu Phim Và Trưng Bày Sản Phẩm Điện Ảnh</p>
            <p>Hotline: 012346789</p>
            <p>Email hỗ trợ: ABC123@gmail.com</p>
          </div>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.395664587564!2d105.81305067548594!3d21.016848788187108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9ef82fed13%3A0x1ee04aa292e377a2!2zVHJ1bmcgdMOibSBDaGnhur91IHBoaW0gUXXhu5FjIGdpYQ!5e0!3m2!1svi!2s!4v1727341215756!5m2!1svi!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="form-contact">
        <form action="">
          <label htmlFor="fname">Họ và Tên</label><br/>
          <input type="text" id="fname" name="fname" placeholder="Họ và Tên" /><br/>
          <label htmlFor="lname">Số điện thoại</label><br/>
          <input type="text" id="lname" name="lname" placeholder="Số điện thoại" /><br/>
          <label htmlFor="email">Email</label><br/>
          <input type="text" id="email" name="email" placeholder="Email" /><br/>
          <label htmlFor="message">Yêu cầu từ khách hàng</label><br/>
          <input type="text" id="message" name="message" placeholder="Nội dung..." /><br/>
          <input type="submit" value="Gửi Thông Tin" />
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
