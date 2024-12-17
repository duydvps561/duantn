"use client"; // Client Component directive

import Layout from '@/app/components/admin/Layout';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const AddMovie = () => {
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]); // State for genres
  const [selectedGenres, setSelectedGenres] = useState([]); // State for selected genres
  const router = useRouter();

  // Fetch genres from the backend
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:3000/theloai');
        if (response.ok) {
          const data = await response.json();
          setGenres(data);
        } else {
          console.error('Failed to fetch genres:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  // Handle change for multi-select genres
  const handleGenreChange = (event) => {
    const options = event.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedGenres(selected);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('theloaiIds', JSON.stringify(selectedGenres)); // Append selected genres as JSON array

    try {
      const response = await fetch('http://localhost:3000/phim/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await Swal.fire({
          title: 'Thành công!',
          text: 'Phim đã được thêm thành công.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          router.push('/admin/phim'); // Redirect
        });
      } else {
        const errorData = await response.json();
        console.error('Failed to add movie:', errorData);
        Swal.fire({
          title: 'Lỗi!',
          text: 'Không thể thêm phim. Vui lòng kiểm tra lại.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Lỗi!',
        text: 'Có lỗi xảy ra khi thêm phim.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  // Loading message
  if (loading) {
    return <div>Loading genres...</div>;
  }

  return (
    <Layout>
      <div className="m-3">
        <h2>Thêm Phim Mới</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group my-2">
            <label style={{ color: 'black' }} className="form-label">Tên phim</label>
            <input type="text" name="tenphim" required className="form-control" />
          </div>

          <div className="form-group my-2">
            <label style={{ color: 'black' }} className="form-label">Nội dung</label>
            <textarea name="noidung" required className="form-control"></textarea>
          </div>

          <div className="form-group my-2">
            <label style={{ color: 'black' }} className="form-label">Thời lượng</label>
            <input type="number" name="thoiluong" required className="form-control" />
          </div>

          <div className="form-group my-2">
            <label style={{ color: 'black' }} className="form-label">Đạo diễn</label>
            <input type="text" name="daodien" required className="form-control" />
          </div>

          <div className="form-group my-2">
            <label style={{ color: 'black' }} className="form-label">Diễn viên</label>
            <input type="text" name="dienvien" required className="form-control" />
          </div>

          <div className="form-group my-2">
            <label style={{ color: 'black' }} className="form-label">Trailer</label>
            <input type="text" name="trailler" required className="form-control" />
          </div>

          <div className="form-group my-2">
            <label style={{ color: 'black' }} className="form-label">Ngày hiệu lực</label>
            <input type="date" name="ngayhieuluc" required className="form-control" />
          </div>

          <div className="form-group my-2">
            <label style={{ color: 'black' }} className="form-label">Ngày hiệu lực đến</label>
            <input type="date" name="ngayhieulucden" required className="form-control" />
          </div>

          <div className="form-group my-2">
            <label style={{ color: 'black' }} className="form-label">Thể loại phim</label>
            <select
              multiple
              name="theloai"
              className="form-control"
              onChange={handleGenreChange}
              required
            >
              {genres.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.tentheloai}
                </option>
              ))}
            </select>
            <small>Giữ Ctrl để chọn nhiều thể loại</small>
          </div>

          <div className="form-group my-2">
            <label style={{ color: 'black' }} className="form-label">Hình ảnh</label>
            <input type="file" name="img" accept="image/*" required className="form-control" />
          </div>

          <div className="form-group my-2">
            <label style={{ color: 'black' }} className="form-label">Trạng thái</label>
            <select name="trangthai" className="form-control" defaultValue="1">
              <option value="1">Sắp Chiếu</option>
              <option value="0">Đang Chiếu</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Thêm Phim</button>
        </form>
      </div>
    </Layout>
  );
};

export default AddMovie;
