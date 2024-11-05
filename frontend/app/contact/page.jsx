import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation } from '@fortawesome/free-solid-svg-icons'; // Nhập biểu tượng vị trí
import "./contact.css";

const ContactPage = () => {
  return (
  <div className="contact-container">
  <div className="contact-row">
    <h1>Liên hệ</h1>
    <div className="contact-top-content">
      <div className="contact-form-col-8">
        <form className="contact-form" action="">
          <div className="contact-information">
            <input type="email" className="contact-input" placeholder="Email" required />
            <input type="tel" className="contact-input" placeholder="Số điện thoại" required />
          </div>
          <input type="text" className="contact-input" placeholder="Họ và Tên" required />
          <textarea className="contact-textarea" placeholder="Messenger...."></textarea>
          <button className="contact-send-btn" type="submit">Send Messenger</button>
        </form>
      </div>
      <div className="contact-info-col-4">
        <div className="contact-info">
          <h1 className="contact-title">Tư Vấn Khách Hàng</h1>
          <p className="contact-description">
            Mọi sự thắc mắc của quý khách sẽ được chúng tôi giải đáp khi quý
            khách yêu cầu.
            <br />
            Để giải đáp thắc mắc vui lòng gửi thông tin email cho chúng tôi
          </p>
          <div className="contact-send-email">
            <input type="email" className="contact-input" placeholder="Email" required />
            <button className="contact-email-btn">Send Email</button>
          </div>
        </div>
      </div>
    </div>
    <div className="contact-middle-content">
      <div id="contact-box-phone" className="contact-box col-4">
        <div className="contact-card">
          <div className="contact-title">
            <i className="fa fa-phone" style={{ fontSize: '36px' }}>
              0123456789
            </i>
          </div>
          <p className="contact-info-description">Gọi vào số hotline này để được tư vấn</p>
        </div>
      </div>
      <div id="contact-box-mail" className="contact-box col-4">
        <div className="contact-card">
          <div className="contact-title">
            <i className="fa fa-envelope" style={{ fontSize: '36px' }}>
              abcxyz@gmail.com
            </i>
          </div>
          <p className="contact-info-description">Gọi vào số hotline này để được tư vấn</p>
        </div>
      </div>
      <div id="contact-box-location" className="contact-box col-4">
        <div className="contact-card">
          <div className="contact-title">
          <i className="fa fa-map-marker" style={{ fontSize: '36px' }}>
            Địa chỉ nè baaaaaaa
          </i>
          </div>
          <p className="contact-info-description">Gọi vào số hotline này để được tư vấn</p>
        </div>
      </div>
    </div>
  </div>

  <div className="contact-bot-content">
    <div className="contact-map-col-12">
      <div className="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12498.679263964908!2d106.68228527684877!3d10.761607947164666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f19e63f0a05%3A0xd4c41b784ebcc3e8!2sCinestar%20Cinema%20Qu%E1%BB%91c%20Thanh!5e0!3m2!1svi!2s!4v1730452044126!5m2!1svi!2s"
          width="100%"
          height="600"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
</div>
);
};

export default ContactPage;
