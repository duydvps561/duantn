"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AddFood = () => {
  const [tenfood, setTenFood] = useState('');
  const [loai, setLoai] = useState('');
  const [gia, setGia] = useState('');
  const [trangthai, setTrangThai] = useState(1);
  const [img, setImg] = useState(null);
  const [error, setError] = useState(''); // Thêm state để lưu thông báo lỗi
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('tenfood', tenfood);
    formData.append('loai', loai);
    formData.append('gia', gia);
    formData.append('trangthai', trangthai);
    if (img) {
      formData.append('img', img);
    }

    try {
      const res = await axios.post('http://localhost:3000/food/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 201) {
        alert('Sản phẩm đã được thêm thành công');
        router.push('/'); 
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Đã xảy ra lỗi khi thêm sản phẩm'); 
    }
};

  return (
    <div className="container">
      <h1>Thêm sản phẩm mới</h1>
      {error && <div className="alert alert-danger">{error}</div>} {/* Hiển thị thông báo lỗi nếu có */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tenfood">Tên sản phẩm</label>
          <input
            type="text"
            id="tenfood"
            className="form-control"
            value={tenfood}
            onChange={(e) => setTenFood(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="loai">Loại sản phẩm</label>
          <input
            type="text"
            id="loai"
            className="form-control"
            value={loai}
            onChange={(e) => setLoai(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gia">Giá</label>
          <input
            type="number"
            id="gia"
            className="form-control"
            value={gia}
            onChange={(e) => setGia(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="trangthai">Trạng thái</label>
          <select
            id="trangthai"
            className="form-control"
            value={trangthai}
            onChange={(e) => setTrangThai(Number(e.target.value))} // Chuyển đổi sang số
          >
            <option value="1">Hiển thị</option>
            <option value="0">Ẩn</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="img">Hình ảnh sản phẩm</label>
          <input
            type="file"
            id="img"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
};

export default AddFood;
