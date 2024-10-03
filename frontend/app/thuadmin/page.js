"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AddTaiKhoan = () => {
  const [tentaikhoan, setTenTaiKhoan] = useState('');
  const [gioitinh, setGioiTinh] = useState('');
  const [sdt, setSdt] = useState('');
  const [ngaysinh, setNgaySinh] = useState('');
  const [email, setEmail] = useState('');
  const [matkhau, setMatKhau] = useState('');
  const [vaitro, setVaiTro] = useState('');
  const [trangthai, setTrangThai] = useState(1);
  const [img, setImg] = useState(null);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('tentaikhoan', tentaikhoan);
    formData.append('gioitinh', gioitinh);
    formData.append('sdt', sdt);
    formData.append('ngaysinh', ngaysinh);
    formData.append('email', email);
    formData.append('matkhau', matkhau);
    formData.append('vaitro', vaitro);
    formData.append('trangthai', trangthai);
    if (img) {
      formData.append('img', img);
    }

    try {
      const res = await axios.post('http://localhost:3000/taikhoan/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 201) {
        alert('Tài khoản đã được thêm thành công');
        router.push('/'); 
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Đã xảy ra lỗi khi thêm tài khoản');
    }
  };

  return (
    <div className="container">
      <h1>Thêm tài khoản mới</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tentaikhoan">Tên tài khoản</label>
          <input
            type="text"
            id="tentaikhoan"
            className="form-control"
            value={tentaikhoan}
            onChange={(e) => setTenTaiKhoan(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gioitinh">Giới tính</label>
          <input
            type="text"
            id="gioitinh"
            className="form-control"
            value={gioitinh}
            onChange={(e) => setGioiTinh(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sdt">Số điện thoại</label>
          <input
            type="text"
            id="sdt"
            className="form-control"
            value={sdt}
            onChange={(e) => setSdt(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ngaysinh">Ngày sinh</label>
          <input
            type="date"
            id="ngaysinh"
            className="form-control"
            value={ngaysinh}
            onChange={(e) => setNgaySinh(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="matkhau">Mật khẩu</label>
          <input
            type="password"
            id="matkhau"
            className="form-control"
            value={matkhau}
            onChange={(e) => setMatKhau(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="vaitro">Vai trò</label>
          <input
            type="text"
            id="vaitro"
            className="form-control"
            value={vaitro}
            onChange={(e) => setVaiTro(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="trangthai">Trạng thái</label>
          <select
            id="trangthai"
            className="form-control"
            value={trangthai}
            onChange={(e) => setTrangThai(Number(e.target.value))}
          >
            <option value="1">Hiển thị</option>
            <option value="0">Ẩn</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="img">Hình ảnh</label>
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
          Thêm tài khoản
        </button>
      </form>
    </div>
  );
};

export default AddTaiKhoan;