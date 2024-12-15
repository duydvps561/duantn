"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faEnvelope,
  faMobileAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import "./contact.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = () => {
    setFormData({ name: "", email: "", phone: "", contact: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/lienhe/add",
        formData
      );
      if (response.status === 201) {
        Swal.fire({
          title: "Thành công!",
          text: "Chúng tôi đã nhận được góp ý của quý khách.",
          icon: "success",
          confirmButtonText: "OK",
        });
        reset();
      }
    } catch (error) {
      Swal.fire({
        title: "Lỗi!",
        text: "Có lỗi xảy ra, vui lòng thử lại.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-banner">
        <div className="card banner-contact-top">
          <img
            src="./img/banner-contact.jpg"
            className="card-img"
            alt="Contact Banner"
          />
        </div>
      </div>

      <div className="getInTouch">
        <div className="from-getIntouch">
          <div className="title-from">
            <h3>Liên hệ</h3>
            <h1>Liên lạc với chúng tôi</h1>
          </div>
          <form onSubmit={handleSubmit} className="from">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label htmlFor="contact">Messenger</label>
            <textarea
              name="contact"
              id="contact"
              placeholder="Type Here..."
              value={formData.contact}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Gửi</button>
          </form>
        </div>
        <div className="contact-infor">
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
              <FontAwesomeIcon
                style={{ fontSize: "20px" }}
                icon={faMobileAlt}
              />
              <p>Số điện thoại di động</p>
              <p>(+84) 388293743</p>
            </div>
            <div className="icon">
              <FontAwesomeIcon
                style={{ fontSize: "20px" }}
                icon={faMapMarkerAlt}
              />
              <p>Địa chỉ</p>
              <p>208/14 AB, phường 6, quận 9, Hồ Chí Minh</p>
            </div>
          </div>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501726.5419237417!2d106.36488460913512!3d10.754617415148584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1731908275556!5m2!1sen!2s"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="contact-banner">
        <div className="card banner-contact-bottom text-bg-dark">
          <img
            src="./img/banner-contect1.jpg"
            className="card-img"
            alt="Bottom Banner"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
