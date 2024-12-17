"use client";
import Layout from '@/app/components/admin/Layout';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './edit.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function EditMovie() {
  const router = useRouter();

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
        Swal.fire({
          title: 'Cập nhật thành công!',
          text: 'Phim đã được cập nhật thành công.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Chuyển hướng sang trang /admin/phim sau khi người dùng nhấn OK
          router.push('/admin/phim');
        });

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
      <label htmlFor="tenphim" className="form-label">Tên phim</label>
      <input
        id="tenphim"
        type="text"
        name="tenphim"
        required
        className="form-control"
        value={movie.tenphim}
        onChange={handleInputChange}
      />
    </div>
    <div className={`${styles.formGroup}`}>
      <label htmlFor="img" className="form-label">Hình ảnh</label>
      <input
        id="img"
        type="file"
        name="img"
        accept="image/*"
        className="form-control"
        onChange={handleImageChange} // Handle image change
      />
      {movie.img && <img src={movie.img} alt="Current Movie" className={styles.imagePreview} />}
    </div>
  </div>
  <div className={`${styles.formRow}`}>
    <div className={`${styles.formGroup}`}>
      <label htmlFor="noidung" className="form-label">Nội dung</label>
      <textarea
        id="noidung"
        name="noidung"
        required
        className="form-control"
        value={movie.noidung}
        onChange={handleInputChange}
      ></textarea>
    </div>
    <div className={`${styles.formGroup}`}>
      <label htmlFor="trailler" className="form-label">Trailer</label>
      <input
        id="trailler"
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
      <label htmlFor="daodien" className="form-label">Đạo diễn</label>
      <input
        id="daodien"
        type="text"
        name="daodien"
        required
        className="form-control"
        value={movie.daodien}
        onChange={handleInputChange}
      />
    </div>
    <div className={`${styles.formGroup}`}>
      <label htmlFor="dienvien" className="form-label">Diễn viên</label>
      <input
        id="dienvien"
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
      <label htmlFor="thoiluong" className="form-label">Thời lượng</label>
      <input
        id="thoiluong"
        type="number"
        name="thoiluong"
        required
        min={0}
        defaultValue={0}
        className="form-control"
        value={movie.thoiluong}
        onChange={handleInputChange}
      />
    </div>
    <div className={`${styles.formGroup}`}>
      <label htmlFor="ngayhieuluc" className="form-label">Ngày hiệu lực</label>
      <input
        id="ngayhieuluc"
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
      <label htmlFor="ngayhieulucden" className="form-label">Ngày hiệu lực đến</label>
      <input
        id="ngayhieulucden"
        type="date"
        name="ngayhieulucden"
        required
        className="form-control"
        value={movie.ngayhieulucden.slice(0, 10)} // Format date
        onChange={handleInputChange}
      />
    </div>
    <div className={`${styles.formGroup}`}>
      <label htmlFor="trangthai" className="form-label">Trạng thái</label>
      <select
        id="trangthai"
        name="trangthai"
        className="form-control"
        value={movie.trangthai}
        onChange={handleInputChange}
      >
        <option value="1">Sắp Chiếu</option>
        <option value="0">Đang Chiếu</option>
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
