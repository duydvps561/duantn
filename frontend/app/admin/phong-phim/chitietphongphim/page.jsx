"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './ChiTietPhongPhim.module.css';

const ChiTietPhongPhimPage = () => {
  const [phongChieuDetail, setPhongChieuDetail] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const phongChieuId = searchParams.get('id');

  useEffect(() => {
    const fetchPhongChieuDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/phongchieu/ghe/${phongChieuId}`);
        setPhongChieuDetail(response.data);
      } catch (error) {
        console.error('Error fetching phong chieu data:', error);
      }
    };

    if (phongChieuId) {
      fetchPhongChieuDetail();
    }
  }, [phongChieuId]);

  if (!phongChieuDetail) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <Layout>
      <h1>Chi Tiết Phòng Phim</h1>
      <div className={styles.phongChieuDetails}>
        <h2>Tên Phòng: {phongChieuDetail.phongchieu?.tenPhong || 'Không có thông tin'}</h2>
        <p>Loại Phòng: {phongChieuDetail.phongchieu?.loaiphong_id?.loaiphong || 'Không xác định'}</p>
        <h3>Danh sách ghế:</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Hàng</th>
              <th>Cột</th>
              <th>Loại Ghế</th>
            </tr>
          </thead>
          <tbody>
            {phongChieuDetail.ghe.map((ghe) => (
              <tr key={ghe._id}>
                <td>{ghe.hang}</td>
                <td>{ghe.cot}</td>
                <td>{ghe.loaighe_id?.tenLoaiGhe || 'Không xác định'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ChiTietPhongPhimPage;
