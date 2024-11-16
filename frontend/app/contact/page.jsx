import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons"; // Nhập biểu tượng vị trí
import "./contact.css";

const ContactPage = () => {
  return (
    <div class="container">
      <div class="trending-title">
        <h1>Bảng Xếp Hạng Phim</h1>
      </div>
      <div class="film-list">
        <div class="film-item">
          <img class="film-img" src="./img/0017840_0 1-1.png" alt="Phim 1" />
          <div class="film-info">
            <h2 class="film-title">Phim 1</h2>
            <p class="film-rating">⭐ 4.5/5</p>
          </div>
        </div>
        <div class="film-item">
          <img class="film-img" src="./img/0017840_0 1-2.png" alt="Phim 2" />
          <div class="film-info">
            <h2 class="film-title">Phim 2</h2>
            <p class="film-rating">⭐ 4.0/5</p>
          </div>
        </div>
        <div class="film-item">
          <img class="film-img" src="./img/0017840_0 1-3.png" alt="Phim 3" />
          <div class="film-info">
            <h2 class="film-title">Phim 3</h2>
            <p class="film-rating">⭐ 4.8/5</p>
          </div>
        </div>
      </div>
      <div class="comment-film">
        <h2>Bình Luận của Khách Hàng</h2>
        <div class="comments">
          <div class="comment">
            <p class="comment-user">Người Dùng 1:</p>
            <p>Tôi rất thích Phim 1! Cốt truyện thật sự hấp dẫn.</p>
          </div>
          <div class="comment">
            <p class="comment-user">Người Dùng 2:</p>
            <p>Phim 2 có những diễn viên xuất sắc, nhưng cốt truyện hơi yếu.</p>
          </div>
          <div class="comment">
            <p class="comment-user">Người Dùng 3:</p>
            <p>
              Phim 3 là một trải nghiệm tuyệt vời! Tôi khuyên mọi người nên xem.
            </p>
          </div>
          <div class="comment">
            <p class="comment-user">Người Dùng 4:</p>
            <p>
              Phim 4 là một trải nghiệm tuyệt vời! Tôi khuyên mọi người nên xem.
            </p>
          </div>
          <div class="comment">
            <p class="comment-user">Người Dùng 4:</p>
            <p>
              Phim 4 là một trải nghiệm tuyệt vời! Tôi khuyên mọi người nên xem.
            </p>
          </div>
          <div class="comment">
            <p class="comment-user">Người Dùng 4:</p>
            <p>
              Phim 4 là một trải nghiệm tuyệt vời! Tôi khuyên mọi người nên xem.
            </p>
          </div>
          <div class="comment">
            <p class="comment-user">Người Dùng 4:</p>
            <p>
              Phim 4 là một trải nghiệm tuyệt vời! Tôi khuyên mọi người nên xem.
            </p>
          </div>
          <div class="comment">
            <p class="comment-user">Người Dùng 4:</p>
            <p>
              Phim 4 là một trải nghiệm tuyệt vời! Tôi khuyên mọi người nên xem.
            </p>
          </div>
        </div>
      </div>
      <div class="from-comment">
        <input type="text" placeholder="Đóng góp ý kiến của bạn" />
        <button>Gửi</button>
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
