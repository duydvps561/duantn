"use client";

import Layout from '@/app/components/admin/Layout';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './edit.module.css';
import axios from 'axios';

export default function EditMovie() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({
    tenphim: '',
    noidung: '',
    thoiluong: '',
    daodien: '',
    dienvien: '',
    trailler: '',
    ngayhieuluc: '',
    ngayhieulucden: '',
    img: '',
    trangthai: '1',
  });
  const [newImage, setNewImage] = useState(null); // State for new image
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return; // Check if id exists
      try {
        const response = await axios.get(`http://localhost:3000/phim/${id}`);
        if (response.status === 200) {
          // Thiết lập URL ảnh mặc định
          const movieData = response.data;
          movieData.img = `http://localhost:3000/img/phims/${movieData.img}`; // Thiết lập URL ảnh
          setMovie(movieData);
        } else {
          console.error('Failed to fetch movie:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovie();
  }, [id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    Object.keys(movie).forEach((key) => {
      formData.append(key, movie[key]);
    });
    
    if (newImage) {
      formData.append('img', newImage); // Append new image if it exists
    }
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
  }
    try {
      const response = await axios.put(`http://localhost:3000/phim/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Movie updated successfully:', response.data);
        // Show success notification or redirect
      } else {
        console.error('Failed to update movie:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating movie:', error);
    }
  };

  if (loading) return <div>Loading movie data...</div>;

  return (
    <Layout>
      <div className="m-3">
        <h2>Sửa Phim</h2>
        <form className={styles.formContainer} onSubmit={handleSubmit} encType="multipart/form-data">
          <div className={`${styles.formRow}`}>
            <div className={`${styles.formGroup}`}>
              <label className="form-label">Tên phim</label>
              <input
                type="text"
                name="tenphim"
                required
                className="form-control"
                value={movie.tenphim}
                onChange={handleInputChange}
              />
            </div>
            <div className={`${styles.formGroup}`}>
              <label className="form-label">Hình ảnh</label>
              <input
                type="file"
                name="img"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange} // Handle image change
              />
           {movie.img && <img src={movie.img} alt="Current Movie" className={styles.imagePreview} />} {/* Hiển thị ảnh hiện tại */}
            </div>
          </div>
          <div className={`${styles.formRow}`}>
            <div className={`${styles.formGroup}`}>
              <label className="form-label">Nội dung</label>
              <textarea
                name="noidung"
                required
                className="form-control"
                value={movie.noidung}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className={`${styles.formGroup}`}>
              <label className="form-label">Trailer</label>
              <input
                type="text"
                name="trailler"
                required
                className="form-control"
                value={movie.trailler}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={`${styles.formRow}`}>
            <div className={`${styles.formGroup}`}>
              <label className="form-label">Đạo diễn</label>
              <input
                type="text"
                name="daodien"
                required
                className="form-control"
                value={movie.daodien}
                onChange={handleInputChange}
              />
            </div>
            <div className={`${styles.formGroup}`}>
              <label className="form-label">Diễn viên</label>
              <input
                type="text"
                name="dienvien"
                required
                className="form-control"
                value={movie.dienvien}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={`${styles.formRow}`}>
            <div className={`${styles.formGroup}`}>
              <label className="form-label">Thời lượng</label>
              <input
                type="number"
                name="thoiluong"
                required
                className="form-control"
                value={movie.thoiluong}
                onChange={handleInputChange}
              />
            </div>
            <div className={`${styles.formGroup}`}>
              <label className="form-label">Ngày hiệu lực</label>
              <input
                type="date"
                name="ngayhieuluc"
                required
                className="form-control"
                value={movie.ngayhieuluc.slice(0, 10)} // Format date
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={`${styles.formRow}`}>
            <div className={`${styles.formGroup}`}>
              <label className="form-label">Ngày hiệu lực đến</label>
              <input
                type="date"
                name="ngayhieulucden"
                required
                className="form-control"
                value={movie.ngayhieulucden.slice(0, 10)} // Format date
                onChange={handleInputChange}
              />
            </div>
            <div className={`${styles.formGroup}`}>
              <label className="form-label">Trạng thái</label>
              <select
                name="trangthai"
                className="form-control"
                value={movie.trangthai}
                onChange={handleInputChange}
              >
                <option value="1">Còn chiếu</option>
                <option value="0">Ngừng chiếu</option>
              </select>
            </div>
          </div>
          <button type="submit" className={`${styles.submitButton}`}>
            Cập Nhật Phim
          </button>
        </form>
      </div>
    </Layout>
  );
}
