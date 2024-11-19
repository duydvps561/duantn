"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // useParams for App Router
import axios from 'axios';
import "./chitietkhuyenmai.css";

export default function ChitietKhuyenMai() {
  const [promotion, setPromotion] = useState(null);
  const { id } = useParams(); // Get the id directly from useParams
  const [viewIncremented, setViewIncremented] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchPromotionDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/tintuc/${id}`);
          setPromotion(response.data);
        } catch (error) {
          console.error('Failed to fetch promotion details:', error);
        }
      };
      fetchPromotionDetails();
    }
  }, [id]);

  useEffect(() => {
    let timer;
    if (promotion && !viewIncremented) {
      // Start a timer for 10 seconds
      timer = setTimeout(() => {
        incrementViewCount();
      }, 10000);
    }

    return () => clearTimeout(timer); // Clear timer on component unmount
  }, [promotion, viewIncremented]);

  const incrementViewCount = async () => {
    try {
      await axios.put(`http://localhost:3000/tintuc/view/${id}`);
      setViewIncremented(true); // Ensure view count only increments once per load
    } catch (error) {
      console.error('Failed to increment view count:', error);
    }
  };

  if (!promotion) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container">
      <h2 className="text-center mb-4">{promotion.title}</h2>
      <img
        src={`http://localhost:3000/img/tintuc/${promotion.image}`}
        className="img-fluid mb-4"
        alt={promotion.title}
      />
      <div className="mb-3">
        <span className="text-muted">Ngày đăng: {new Date(promotion.createdAt).toLocaleDateString()}</span>
      </div>
      
      <div dangerouslySetInnerHTML={{ __html: promotion.content }}></div>

      <p><strong>Lượt xem:</strong> {promotion.view}</p>
      <p><strong>Loại:</strong> {promotion.loai}</p>

      {promotion.contact && (
        <div className="contact-info mt-4">
          <h4>Thông tin liên hệ</h4>
          <p>{promotion.contact}</p>
        </div>
      )}
    </div>
  );
}
