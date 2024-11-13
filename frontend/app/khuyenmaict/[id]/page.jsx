"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // useParams for App Router
import axios from 'axios';
import "./chitietkhuyenmai.css";

export default function ChitietKhuyenMai() {
  const [promotion, setPromotion] = useState(null);
  const { id } = useParams(); // Get the id directly from useParams

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
      <p>{promotion.content}</p>
      <p><strong>Lượt xem:</strong> {promotion.view}</p>
      <p><strong>Loại:</strong> {promotion.loai}</p>
    </div>
  );
}
