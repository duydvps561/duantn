"use client";
import { useState } from 'react';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import { useRouter } from 'next/navigation';  // Next.js 13 navigation import
import Swal from 'sweetalert2';
import * as Yup from 'yup'; 
import './them.css';

const ThemDoAnPage = () => {
  const [tenfood, setTenfood] = useState('');
  const [gia, setGia] = useState('');
  const [loai, setLoai] = useState('');
  const [trangthai, setTrangthai] = useState(1);
  const [image, setImage] = useState(null);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    tenfood: Yup.string().required('Tên món ăn không được để trống'),
    gia: Yup.number().typeError('Giá phải là một số').positive('Giá phải lớn hơn 0').required('Giá không được để trống'),
    loai: Yup.string().required('Vui lòng chọn loại món ăn'),
    image: Yup.mixed().required('Vui lòng chọn ảnh'),
  });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    const formData = { tenfood, gia, loai, image };
    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const uploadData = new FormData();
      uploadData.append('tenfood', tenfood);
      uploadData.append('gia', gia);
      uploadData.append('loai', loai);
      uploadData.append('trangthai', trangthai);
      uploadData.append('img', image);

      const response = await axios.post('https://backend-duan-9qb7.onrender.com/food/add', uploadData, {
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
      if (error.name === 'ValidationError') {
        Swal.fire('Thông báo', error.errors.join('\n'), 'warning');
      } else {
        console.error('Error adding food item:', error);
        Swal.fire('Lỗi', 'Có lỗi xảy ra khi thêm món ăn!', 'error');
      }
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
          />
        </div>
        <div className="formGroup col-6">
          <label>Giá:</label>
          <input
            type="number"
            value={gia}
            onChange={(e) => setGia(e.target.value)}
          />
        </div>
        <div className="formGroup col-6">
          <label>Loại:</label>
          <select
            value={loai}
            onChange={(e) => setLoai(e.target.value)}
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
          />
        </div>
        <button type="submit" className="submitButton">Thêm Món Ăn</button>
      </form>
    </Layout>
  );
};

export default ThemDoAnPage;
