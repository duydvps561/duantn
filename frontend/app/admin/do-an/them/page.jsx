"use client"; 
import { useState } from 'react';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout"; // Đường dẫn tới Layout component
import styles from '../QuanLyDoAn.module.css'; 

const ThemDoAnPage = () => {
  const [tenfood, setTenfood] = useState('');
  const [soluong, setSoluong] = useState('');
  const [gia, setGia] = useState('');
  const [loai, setLoai] = useState('');
  const [trangthai, setTrangthai] = useState(1);
  const [image, setImage] = useState(null); // Trường để lưu trữ hình ảnh

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('tenfood', tenfood);
    formData.append('soluong', soluong);
    formData.append('gia', gia);
    formData.append('loai', loai);
    formData.append('trangthai', trangthai);
    formData.append('img', image); // Đảm bảo tên trường là 'img' theo API

    try {
      await axios.post('http://localhost:3000/food/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      alert('Thêm món ăn thành công!');
      router.push('/admin/do-an');
      setTenfood('');
      setSoluong('');
      setGia('');
      setLoai('');
      setTrangthai(1);
      setImage(null); 
    } catch (error) {
      console.error('Error adding food item:', error);
      alert('Có lỗi xảy ra khi thêm món ăn!');
    }
  };

  return (
    <Layout>
      <h1>Thêm Đồ Ăn</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label>Tên món ăn:</label>
          <input 
            type="text" 
            value={tenfood} 
            onChange={(e) => setTenfood(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Số lượng:</label>
          <input 
            type="number" 
            value={soluong} 
            onChange={(e) => setSoluong(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Giá:</label>
          <input 
            type="number" 
            value={gia} 
            onChange={(e) => setGia(e.target.value)} 
            required 
          />
        </div>
        <div>
        <label>Loại:</label>
        <select 
            value={loai} 
            onChange={(e) => setLoai(e.target.value)} 
            required
        >
            <option value="">Chọn loại</option> {/* Thêm tùy chọn mặc định */}
            <option value="Đồ Ăn">Đồ Ăn</option>
            <option value="Combo">Combo</option>
            <option value="Nước">Nước</option>
            <option value="Quà Tặng">Quà Tặng</option>
        </select>
        </div>
        <div>
          <label>Trạng thái:</label>
          <select value={trangthai} onChange={(e) => setTrangthai(Number(e.target.value))}>
            <option value={1}>Còn hàng</option>
            <option value={0}>Hết hàng</option>
          </select>
        </div>
        <div>
          <label>Ảnh:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            required 
          />
        </div>
        <button type="submit">Thêm Món Ăn</button>
      </form>
    </Layout>
  );
};

export default ThemDoAnPage;
