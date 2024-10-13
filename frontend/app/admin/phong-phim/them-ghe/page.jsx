"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/app/components/admin/Layout"; 
import "./ThemGhe.css"; // Thêm tệp CSS

const ThemGhe = () => {
  const [soHang, setSoHang] = useState(1);
  const [danhSachHang, setDanhSachHang] = useState([]);
  const [phongchieuId, setPhongchieuId] = useState(""); 
  const [loaigheList, setLoaigheList] = useState([]);   
  const [phongchieuList, setPhongchieuList] = useState([]); 

  // Lấy danh sách phòng chiếu và loại ghế khi component load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const phongchieuRes = await axios.get("http://localhost:3000/phongchieu");
        const loaigheRes = await axios.get("http://localhost:3000/loaighe");
        setPhongchieuList(phongchieuRes.data);
        setLoaigheList(loaigheRes.data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu", err);
      }
    };
    fetchData();
  }, []);

  // Cập nhật số hàng và danh sách hàng khi người dùng nhập
  const handleSoHangChange = (e) => {
    const soHangMoi = parseInt(e.target.value);
    setSoHang(soHangMoi);
    
    const dsHang = Array.from({ length: soHangMoi }, () => ({
      hang: "",
      soCot: 1,
      loaiGheTheoViTri: [{ tuViTri: 1, denViTri: 1, loaiGheId: "" }]
    }));
    setDanhSachHang(dsHang);
  };

  // Cập nhật thông tin từng hàng ghế
  const handleHangChange = (index, field, value) => {
    const dsHangMoi = [...danhSachHang];
    dsHangMoi[index][field] = value;
    setDanhSachHang(dsHangMoi);
  };

  // Thêm loại ghế cho một hàng cụ thể
  const handleThemLoaiGhe = (index) => {
    const dsHangMoi = [...danhSachHang];
    dsHangMoi[index].loaiGheTheoViTri.push({ tuViTri: 1, denViTri: 1, loaiGheId: "" });
    setDanhSachHang(dsHangMoi);
  };

  // Xử lý khi form được gửi
  const handleSubmit = async () => {
    if (!phongchieuId) {
      alert("Vui lòng chọn phòng chiếu.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/ghe/them-ghe", {
        phongchieu_id: phongchieuId,
        danhSachHang
      });
      alert("Thêm ghế thành công!");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi thêm ghế.");
    }
  };

  return (
    <Layout>
      <div className="them-ghe-container">
        <h1>Thêm Ghế</h1>

        {/* Chọn phòng chiếu */}
        <div className="form-group">
          <label>Chọn Phòng Chiếu:</label>
          <select 
            value={phongchieuId} 
            onChange={(e) => setPhongchieuId(e.target.value)}
            className="form-control"
          >
            <option value="">Chọn phòng chiếu</option>
            {phongchieuList.map((phong) => (
              <option key={phong._id} value={phong._id}>
                {phong.tenphong}
              </option>
            ))}
          </select>
        </div>

        {/* Nhập số hàng */}
        <div className="form-group">
          <label>Số hàng:</label>
          <input 
            type="number" 
            value={soHang} 
            onChange={handleSoHangChange} 
            min={1} 
            className="form-control"
          />
        </div>

        {/* Danh sách hàng và cấu hình ghế */}
        {danhSachHang.map((hang, index) => (
          <div key={index} className="hang-container">
            <h3>Hàng {index + 1}</h3>
            <div className="form-group">
              <label>Hàng:</label>
              <input
                type="text"
                value={hang.hang}
                onChange={(e) => handleHangChange(index, "hang", e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Số cột:</label>
              <input
                type="number"
                value={hang.soCot}
                onChange={(e) => handleHangChange(index, "soCot", parseInt(e.target.value))}
                min={1}
                className="form-control"
              />
            </div>

            {/* Loại ghế theo vị trí */}
            {hang.loaiGheTheoViTri.map((loaiGhe, loaiIndex) => (
              <div key={loaiIndex} className="loai-ghe-container">
                <div className="form-group">
                  <label>Từ vị trí:</label>
                  <input
                    type="number"
                    value={loaiGhe.tuViTri}
                    onChange={(e) => {
                      const newLoaiGhe = [...danhSachHang];
                      newLoaiGhe[index].loaiGheTheoViTri[loaiIndex].tuViTri = parseInt(e.target.value);
                      setDanhSachHang(newLoaiGhe);
                    }}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Đến vị trí:</label>
                  <input
                    type="number"
                    value={loaiGhe.denViTri}
                    onChange={(e) => {
                      const newLoaiGhe = [...danhSachHang];
                      newLoaiGhe[index].loaiGheTheoViTri[loaiIndex].denViTri = parseInt(e.target.value);
                      setDanhSachHang(newLoaiGhe);
                    }}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Loại ghế:</label>
                  <select
                    value={loaiGhe.loaiGheId}
                    onChange={(e) => {
                      const newLoaiGhe = [...danhSachHang];
                      newLoaiGhe[index].loaiGheTheoViTri[loaiIndex].loaiGheId = e.target.value;
                      setDanhSachHang(newLoaiGhe);
                    }}
                    className="form-control"
                  >
                    <option value="">Chọn loại ghế</option>
                    {loaigheList.map((loai) => (
                      <option key={loai._id} value={loai._id}>
                        {loai.loaighe}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

            <button className="btn btn-secondary" onClick={() => handleThemLoaiGhe(index)}>Thêm loại ghế</button>
          </div>
        ))}

        <button className="btn btn-primary" onClick={handleSubmit}>Thêm Ghế</button>
      </div>
    </Layout>
  );
};

export default ThemGhe;
