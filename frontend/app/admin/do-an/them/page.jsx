"use client";
import { useState } from 'react';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import { useRouter } from 'next/navigation';  // Next.js 13 navigation import
import Swal from 'sweetalert2';
import './them.css';

const ThemDoAnPage = () => {
  const [tenfood, setTenfood] = useState('');
  const [gia, setGia] = useState('');
  const [loai, setLoai] = useState('');
  const [trangthai, setTrangthai] = useState(1);
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tenfood || !gia || !loai || !image) {
      Swal.fire('Thông báo', 'Vui lòng điền đầy đủ thông tin.', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('tenfood', tenfood);
    formData.append('gia', gia);
    formData.append('loai', loai);
    formData.append('trangthai', trangthai);
    formData.append('img', image);

    try {
      const response = await axios.post('http://localhost:3000/food/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      if (response.status === 201) {
        Swal.fire({
          title: 'Thành công',
          text: 'Thêm món ăn thành công!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          router.push('/admin/do-an');
        });
      } else {
        Swal.fire('Lỗi', 'Có lỗi xảy ra khi thêm món ăn!', 'error');
      }
    } catch (error) {
      console.error('Error adding food item:', error);
      Swal.fire('Lỗi', 'Có lỗi xảy ra khi thêm món ăn!', 'error');
    }
  };

  return (
    <Layout>
      <h1>Thêm Đồ Ăn</h1>
      <form onSubmit={handleSubmit} className="editForm">
        <div className='row'>
        <div className="formGroup col-6">
          <label>Tên món ăn:</label>
          <input
            type="text"
            value={tenfood}
            onChange={(e) => setTenfood(e.target.value)}
            required
          />
        </div>
        <div className="formGroup col-6">
          <label>Giá:</label>
          <input
            type="number"
            value={gia}
            onChange={(e) => setGia(e.target.value)}
            required
          />
        </div>
        <div className="formGroup col-6">
          <label>Loại:</label>
          <select
            value={loai}
            onChange={(e) => setLoai(e.target.value)}
            required
          >
            <option value="">Chọn loại</option>
            <option value="Đồ Ăn">Đồ Ăn</option>
            <option value="Combo">Combo</option>
            <option value="Nước">Nước</option>
            <option value="Quà Tặng">Quà Tặng</option>
          </select>
        </div>
        <div className="formGroup col-6">
          <label>Trạng thái:</label>
          <select value={trangthai} onChange={(e) => setTrangthai(Number(e.target.value))}>
            <option value={1}>Còn hàng</option>
            <option value={0}>Hết hàng</option>
          </select>
        </div>
        </div>
        <div className="formGroup">
          <label>Ảnh:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="submitButton">Thêm Món Ăn</button>
      </form>
    </Layout>
  );
};

export default ThemDoAnPage;
