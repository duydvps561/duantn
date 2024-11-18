import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faEnvelope,
  faMobileAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./contact.css";

const ContactPage = () => {
  return (
    <div class="contact-container">
      <div class="contact-banner">
        <div class="card banner-top">
          <img
            src="./img/banner-contact.jpg"
            class="card-img"
            alt="Contact Banner"
          />
          <div class="card-img-overlay">
            <h3 class="card-title">Liên Hệ</h3>
          </div>
        </div>
      </div>

      <div class="getInTouch">
        <div class="from-getIntouch">
          <div class="title-from">
            <h3>Liên hệ</h3>
            <h1>Liên lạc với chúng tôi</h1>
          </div>
          <form action="" class="from">
            <label for="username">Name</label>
            <input type="text" id="username" placeholder="Your Name" required />

            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              required
            />

            <label for="message">Messenger</label>
            <textarea
              name="comment"
              id="message"
              placeholder="Type Here..."
              required
            ></textarea>

            <button type="submit">Gửi</button>
          </form>
        </div>
        <div class="contact-infor">
          <div class="text">
            <p>
              ĐỀ NGHỊ QUÝ KHÁN GIẢ LƯU Ý KHI MUA VÉ XEM PHIM (ĐẶC BIỆT KHI MUA
              VÉ ONLINE). TTCPQG KHÔNG CHẤP NHẬN HOÀN TIỀN HOẶC ĐỔI VÉ ĐÃ THANH
              TOÁN THÀNH CÔNG KHI MUA VÉ ONLINE VÀ VÉ MUA SAI QUY ĐỊNH TẠI QUẦY
              VÉ.
            </p>
          </div>
          <div className="icon-infor">
            <div className="icon">
              <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faPhoneAlt} />
              <p>Số điện thoại bàn</p>
              <p>(+84) 388293743</p>
            </div>
            <div className="icon">
              <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faEnvelope} />
              <p>Email</p>
              <p>dovanduy2309004@gmail.com</p>
            </div>
            <div className="icon">
              <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faMobileAlt} />
              <p>Số điện thoại di động</p>
              <p>(+84) 388293743</p>
            </div>
            <div className="icon">
              <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faMapMarkerAlt} />
              <p>Địa chỉ</p>
              <p>208/14 AB, phường 6, quận 9, Hồ Chí Minh</p>
            </div>
          </div>
          <div class="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501726.5419237417!2d106.36488460913512!3d10.754617415148584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1731908275556!5m2!1sen!2s"
              width="600"
              height="250"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div class="contact-banner-bottom">
        <div class="card banner-bottom text-bg-dark">
          <img
            src="./img/banner-contect1.jpg"
            class="card-img"
            alt="Bottom Banner"
          />
          <div class="card-img-overlay">
            <h2 class="card-title">Get in Touch</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
