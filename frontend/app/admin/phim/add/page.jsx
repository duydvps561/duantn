"use client"; // Client Component directive

import Layout from '@/app/components/admin/Layout';
import React, { useEffect, useState } from 'react';

const AddMovie = () => {
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]); // State for genres (optional)

  // Fetch genres from the backend (optional)
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:3000/theloai'); // Adjust the endpoint as needed
        if (response.ok) {
          const data = await response.json();
          setGenres(data); // Set genres into state
        } else {
          console.error('Failed to fetch genres:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchGenres(); // Fetch genres on component mount
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target); // Create FormData object

    try {
      const response = await fetch('http://localhost:3000/phim/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Movie added successfully:', result);
        // Show success notification or redirect
      } else {
        const errorData = await response.json();
        console.error('Failed to add movie:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Loading message while genres are being fetched
  if (loading) {
    return <div>Loading genres...</div>;
  }

  return (
    <Layout>
      <div className="m-3">
        <h2>Thêm Phim Mới</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group my-2">
            <label className="form-label">Tên phim</label>
            <input type="text" name="tenphim" required className="form-control" />
          </div>
          <div className="form-group my-2">
            <label className="form-label">Nội dung</label>
            <textarea name="noidung" required className="form-control"></textarea>
          </div>
          <div className="form-group my-2">
            <label className="form-label">Thời lượng</label>
            <input type="text" name="thoiluong" required className="form-control" />
          </div>
          <div className="form-group my-2">
            <label className="form-label">Đạo diễn</label>
            <input type="text" name="daodien" required className="form-control" />
          </div>
          <div className="form-group my-2">
            <label className="form-label">Diễn viên</label>
            <input type="text" name="dienvien" required className="form-control" />
          </div>
          <div className="form-group my-2">
            <label className="form-label">Trailer</label>
            <input type="text" name="trailler" required className="form-control" /> {/* Ensure correct spelling */}
          </div>
          <div className="form-group my-2">
            <label className="form-label">Ngày hiệu lực</label>
            <input type="date" name="ngayhieuluc" required className="form-control" />
          </div>
          <div className="form-group my-2">
            <label className="form-label">Ngày hiệu lực đến</label>
            <input type="date" name="ngayhieulucden" required className="form-control" />
          </div>
          <div className="form-group my-2">
            <label className="form-label">Hình ảnh</label>
            <input type="file" name="img" accept="image/*" required className="form-control" />
          </div>
          <div className="form-group my-2">
            <label className="form-label">Trạng thái</label>
            <select name="trangthai" className="form-control" defaultValue="1">
              <option value="1">Hiện</option>
              <option value="0">Ẩn</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary my-3">Thêm Phim</button>
        </form>
      </div>
    </Layout>
  );
};

export default AddMovie;