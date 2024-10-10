"use client"; 
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import { useRouter, useSearchParams } from 'next/navigation'; 
import styles from './SuaDoAn.module.css'; 

const SuaDoAnPage = () => {
  const [foodData, setFoodData] = useState({
    tenfood: '',
    soluong: '',
    gia: '',
    loai: '',
    trangthai: '',
    img: '',
  });
  const [newImage, setNewImage] = useState(null); 
  const [imagePreview, setImagePreview] = useState(''); 
  const router = useRouter();
  const searchParams = useSearchParams();
  const foodId = searchParams.get('id'); 

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/food/${foodId}`);
        setFoodData(response.data);
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };

    if (foodId) {
      fetchFood();
    }
  }, [foodId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('tenfood', foodData.tenfood);
    formData.append('soluong', foodData.soluong);
    formData.append('gia', foodData.gia);
    formData.append('loai', foodData.loai);
    formData.append('trangthai', foodData.trangthai);
    if (newImage) {
      formData.append('img', newImage); 
    }

    try {
      await axios.put(`http://localhost:3000/food/update/${foodId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Cập nhật món ăn thành công!');
      router.push('/admin/do-an'); 
    } catch (error) {
      console.error('Error updating food item:', error);
    }
  };

  return (
    <Layout>
      <h1>Sửa Món Ăn</h1>
      <form onSubmit={handleSubmit} className={styles.editForm}>
        <div className={styles.formGroup}>
          <label htmlFor="tenfood">Tên Món Ăn</label>
          <input
            type="text"
            id="tenfood"
            name="tenfood"
            value={foodData.tenfood}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="soluong">Số Lượng</label>
          <input
            type="number"
            id="soluong"
            name="soluong"
            value={foodData.soluong}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="gia">Giá (VND)</label>
          <input
            type="number"
            id="gia"
            name="gia"
            value={foodData.gia}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
        <label htmlFor="loai">Loại</label>
        <select
          id="loai"
          name="loai"
          value={foodData.loai}
          onChange={handleInputChange}
          required
        >
          <option value="Đồ Ăn">Đồ Ăn</option>
          <option value="Combo">Combo</option>
          <option value="Nước">Nước</option>
          <option value="Quà Tặng">Quà Tặng</option>
        </select>
      </div>

        <div className={styles.formGroup}>
          <label htmlFor="trangthai">Trạng Thái</label>
          <select
            id="trangthai"
            name="trangthai"
            value={foodData.trangthai}
            onChange={handleInputChange}
            required
          >
            <option value="1">Còn hàng</option>
            <option value="0">Hết hàng</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="img">Hình Ảnh Hiện Tại</label>
          <div className={styles.imageContainer}>
            {foodData.img && (
              <img
                src={`http://localhost:3000/img/${foodData.img}`}
                alt={foodData.tenfood}
                className={styles.currentImage}
              />
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="img">Thay Đổi Hình Ảnh</label>
          <input type="file" id="img" name="img" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <div className={styles.imagePreviewContainer}>
              <p>Hình ảnh mới:</p>
              <img src={imagePreview} alt="Image Preview" className={styles.imagePreview} />
            </div>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Cập Nhật Món Ăn
        </button>
      </form>
    </Layout>
  );
};

export default SuaDoAnPage;
