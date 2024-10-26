"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import styles from './ChiTietPhongPhim.module.css';
import * as Yup from 'yup';

const ChiTietPhongPhimPage = () => {
  const [phongChieuDetail, setPhongChieuDetail] = useState(null);
  const [selectedGhes, setSelectedGhes] = useState([]);
  const [loaigheList, setLoaigheList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLoaigheId, setSelectedLoaigheId] = useState('');
  const [newGheInfo, setNewGheInfo] = useState({});
  const [errors, setErrors] = useState({});

  const router = useRouter();
  const searchParams = useSearchParams();
  const phongChieuId = searchParams.get('id');

  const seatSchema = Yup.object().shape({
    hang: Yup.string().required('Hàng không được bỏ trống'),
    cot: Yup.string().required('Cột không được bỏ trống')
  });

  useEffect(() => {
    const fetchPhongChieuDetail = async () => {
      try {
        const [phongchieuRes, loaigheRes] = await Promise.all([
          axios.get(`http://localhost:3000/phongchieu/ghe/${phongChieuId}`),
          axios.get('http://localhost:3000/loaighe')
        ]);
        setPhongChieuDetail(phongchieuRes.data);
        setLoaigheList(loaigheRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching phong chieu or loaighe data:', error);
        setError('Lỗi khi tải dữ liệu');
        setLoading(false);
      }
    };

    if (phongChieuId) {
      fetchPhongChieuDetail();
    }
  }, [phongChieuId]);

  const handleSeatSelect = (ghe) => {
    if (selectedGhes.some(selectedGhe => selectedGhe._id === ghe._id)) {
      setSelectedGhes(selectedGhes.filter(selectedGhe => selectedGhe._id !== ghe._id));
      const { [ghe._id]: _, ...rest } = newGheInfo; 
      setNewGheInfo(rest);
    } else {
      setSelectedGhes([...selectedGhes, ghe]);
      setNewGheInfo(prev => ({
        ...prev,
        [ghe._id]: { hang: ghe.hang, cot: ghe.cot }
      }));
    }
  };

  const handleInputChange = (gheId, field, value) => {
    setNewGheInfo(prev => ({
      ...prev,
      [gheId]: {
        ...prev[gheId],
        [field]: value,
      },
    }));
  };

  const handleUpdateGhe = async () => {
    let isValid = true;
    const newErrors = {};

    for (const ghe of selectedGhes) {
      try {
        await seatSchema.validate(newGheInfo[ghe._id], { abortEarly: false });
      } catch (validationErrors) {
        isValid = false;
        newErrors[ghe._id] = validationErrors.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
      }
    }

    setErrors(newErrors);

    if (isValid) {
      const updatePromises = selectedGhes.map(async (ghe) => {
        const updatedGhe = { 
          ...ghe, 
          hang: newGheInfo[ghe._id]?.hang || ghe.hang, 
          cot: newGheInfo[ghe._id]?.cot || ghe.cot, 
          loaighe_id: selectedLoaigheId || ghe.loaighe_id._id 
        };
        try {
          await axios.put(`http://localhost:3000/phongchieu/ghe/update/${ghe._id}`, updatedGhe);
        } catch (error) {
          console.error('Error updating seat:', error);
          Swal.fire('Cập nhật ghế thất bại', '', 'error');
        }
      });

      await Promise.all(updatePromises);
      Swal.fire('Cập nhật thành công!', '', 'success').then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Chờ 5 giây trước khi làm mới trang
      });
    } else {
      Swal.fire('Vui lòng kiểm tra lại thông tin ghế', '', 'error');
    }
  };

  const handleDeleteGhes = async () => {
    if (selectedGhes.length === 0) return;

    try {
      const deletePromises = selectedGhes.map(ghe =>
        axios.delete(`http://localhost:3000/phongchieu/ghe/delete/${ghe._id}`)
      );

      await Promise.all(deletePromises);

      Swal.fire('Đã xóa ghế thành công!', '', 'success').then(() => {
        setSelectedGhes([]); 
        window.location.reload();
      });
    } catch (error) {
      console.error('Error deleting seats:', error);
      Swal.fire('Xóa ghế thất bại', '', 'error');
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className='container'>
        <h2>Chi tiết phòng chiếu: {phongChieuDetail.phongchieu.tenphong}</h2>
        <h3>Loại phòng: {phongChieuDetail.phongchieu.loaiphong_id?.loaiphong || 'Không xác định'}</h3>
        <div className='row'>
          <div className='col-md-9'>
            <h3>Danh sách ghế</h3>
            <table className={`table ${styles.table}`}>
              <thead>
                <tr>
                  <th>Chọn</th>
                  <th>Hàng</th>
                  <th>Cột</th>
                  <th>Loại ghế</th>
                </tr>
              </thead>
              <tbody>
                {phongChieuDetail.ghe.map(ghe => (
                  <tr key={ghe._id}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedGhes.some(selectedGhe => selectedGhe._id === ghe._id)}
                        onChange={() => handleSeatSelect(ghe)}
                      />
                    </td>
                    <td><span>{ghe.hang}</span></td>
                    <td><span>{ghe.cot}</span></td>
                    <td><span>{ghe.loaighe_id?.loaighe || 'Không có loại'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='col-md-3'>
            <h3>Chọn loại ghế để cập nhật:</h3>
            <select className="form-select" value={selectedLoaigheId} onChange={(e) => setSelectedLoaigheId(e.target.value)}>
              <option value="">Chọn loại ghế</option>
              {loaigheList.map(loaighe => (
                <option key={loaighe._id} value={loaighe._id}>{loaighe.loaighe}</option>
              ))}
            </select>

            <h4>Thay đổi hàng và cột:</h4>
            {selectedGhes.map(ghe => (
              <div key={ghe._id} className="mb-3">
                <label>{`Ghế: ${ghe.hang}-${ghe.cot}`}</label>
                <input 
                  type="text" 
                  className="form-control mb-2"
                  value={newGheInfo[ghe._id]?.hang || ''} 
                  placeholder="Hàng mới"
                  onChange={(e) => handleInputChange(ghe._id, 'hang', e.target.value)} 
                />
                {errors[ghe._id]?.hang && <p style={{ color: 'red' }}>{errors[ghe._id].hang}</p>}
                <input 
                  type="text" 
                  className="form-control"
                  value={newGheInfo[ghe._id]?.cot || ''} 
                  placeholder="Cột mới"
                  onChange={(e) => handleInputChange(ghe._id, 'cot', e.target.value)} 
                />
                {errors[ghe._id]?.cot && <p style={{ color: 'red' }}>{errors[ghe._id].cot}</p>}
              </div>
            ))}

            <button className="btn btn-danger w-100 mt-3" onClick={handleDeleteGhes} disabled={selectedGhes.length === 0}>Xóa ghế đã chọn</button>
            <button className="btn btn-success w-100 mt-3" onClick={handleUpdateGhe}>
              Cập nhật ghế đã chọn
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChiTietPhongPhimPage;
