"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import "./khuyenmai.css";

export default function KhuyenMai() {
  const [promotions, setPromotions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tintuc');
        setPromotions(response.data);
      } catch (error) {
        console.error('Failed to fetch promotions:', error);
      }
    };

    fetchPromotions();
  }, []);

  const eventPromotions = promotions.filter((promotion) => promotion.loai === "Sự kiện");
  const newestEvents = [...eventPromotions]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  const mostViewedEvents = [...eventPromotions]
    .sort((a, b) => b.luotXem - a.luotXem);

  const filteredPromotions = eventPromotions.filter((promotion) => {
    const isMatchTitleOrAuthor =
      promotion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (promotion.author && promotion.author.toLowerCase().includes(searchTerm.toLowerCase()));
    const isMatchDate = selectedDate ? new Date(promotion.createdAt).toLocaleDateString() === selectedDate : true;
    return isMatchTitleOrAuthor && isMatchDate;
  });

  const danhSachSuKien = filteredPromotions.filter(
    (promotion) => !newestEvents.some((newEvent) => newEvent._id === promotion._id)
  );

  return (
    <div className="containers">
      <h2 className="title-khuyenmai text-center mb-4">Khuyến Mãi</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm theo tên tin tức hoặc tác giả"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="date"
            className="form-control"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <h3 className="text-light mb-3">Top 3 Sự Kiện Mới Nhất</h3>
          <div className="row">
            {newestEvents.map((promotion) => (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={promotion._id}>
                <div className="card h-100 bg-dark text-light">
                  <Link href={`/khuyenmaict/${promotion._id}`}>
                    <img
                      src={`http://localhost:3000/img/tintuc/${promotion.image}`}
                      className="card-img-top-1"
                      alt={promotion.title}
                    />
                  </Link>
                  <div className="card-body">
                    <span className="card-text-date">{new Date(promotion.createdAt).toLocaleDateString()}</span>
                    <Link href={`/khuyenmaict/${promotion._id}`}>
                      <h5 className="card-title">{promotion.title}</h5>
                    </Link>
                    <p className="card-text">{promotion.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-md-9">
          <h4 className="text-light mb-3">Danh Sách Sự Kiện</h4>
          <div className="row">
            {danhSachSuKien.map((promotion) => (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={promotion._id}>
                <div className="card h-100 bg-dark text-light">
                  <Link href={`/khuyenmaict/${promotion._id}`}>
                    <img
                      src={`http://localhost:3000/img/tintuc/${promotion.image}`}
                      className="card-img-top"
                      alt={promotion.title}
                    />
                  </Link>
                  <div className="card-body">
                    <span className="card-text-date">{new Date(promotion.createdAt).toLocaleDateString()}</span>
                    <Link href={`/khuyenmaict/${promotion._id}`}>
                      <h5 className="card-title">{promotion.title}</h5>
                    </Link>
                    <p className="card-text">{promotion.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-3">
          <h3 className="text-light mb-3">Lượt Xem Nhiều Nhất</h3>
          {mostViewedEvents.slice(0, 3).map((promotion) => (
            <div className="card mb-3 bg-dark text-light" key={promotion._id}>
              <Link href={`/promotion/${promotion._id}`}>
                <img
                  src={`http://localhost:3000/img/tintuc/${promotion.image}`}
                  className="card-img-top"
                  alt={promotion.title}
                />
              </Link>
              <div className="card-body">
                <span className="card-text-date">{new Date(promotion.createdAt).toLocaleDateString()}</span>
                <Link href={`/promotion/${promotion._id}`}>
                  <h5 className="card-title">{promotion.title}</h5>
                </Link>
                <p className="card-text">Lượt xem: {promotion.view}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
