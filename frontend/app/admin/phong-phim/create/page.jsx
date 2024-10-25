"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "@/app/components/admin/Layout";
import './LoaiphongCRUD.css'; // Assuming you create a CSS file for styling

const LoaiphongCRUD = () => {
  const [loaiphongList, setLoaiphongList] = useState([]);
  const [loaiphong, setLoaiphong] = useState('');
  const [trangthai, setTrangthai] = useState('1'); // Default status is "1"
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch loaiphong list
  useEffect(() => {
    fetchLoaiphongs();
  }, []);

  const fetchLoaiphongs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/loaiphong');
      setLoaiphongList(response.data);
    } catch (error) {
      console.error('Error fetching loaiphongs:', error);
    }
  };

  // Add new loaiphong
  const addLoaiphong = async () => {
    try {
      await axios.post('http://localhost:3000/loaiphong/add', { loaiphong, trangthai });
      fetchLoaiphongs(); // Refresh the list
      setLoaiphong(''); // Clear the input
      setTrangthai('1'); // Reset status to default
      console.log({ loaiphong, trangthai })
    } catch (error) {
      console.error('Error adding loaiphong:', error);
    }
  };

  // Update loaiphong
  const updateLoaiphong = async (id) => {
    try {
      await axios.put(`http://localhost:3000/loaiphong/update/${id}`, { loaiphong, trangthai });
      fetchLoaiphongs(); // Refresh the list
      setLoaiphong(''); // Clear the input
      setTrangthai('1'); // Reset status to default
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error('Error updating loaiphong:', error);
    }
  };

  // Edit handler
  const handleEdit = (id, currentLoaiphong, currentTrangthai) => {
    setLoaiphong(currentLoaiphong);
    setTrangthai(currentTrangthai);
    setIsEditing(true);
    setEditId(id);
  };

  // Delete loaiphong
  const deleteLoaiphong = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/loaiphong/delete/${id}`);
      fetchLoaiphongs(); // Refresh the list
    } catch (error) {
      console.error('Error deleting loaiphong:', error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h1 className="title">Loại Phòng</h1>
        
        <div className="form-container">
          <input
            type="text"
            value={loaiphong}
            onChange={(e) => setLoaiphong(e.target.value)}
            placeholder="Nhập loại phòng"
            className="input-field"
          />
          <select
            value={trangthai}
            onChange={(e) => setTrangthai(e.target.value)}
            className="select-field"
          >
            <option value="1">Hoạt động</option>
            <option value="0">Không hoạt động</option>
          </select>
          <button 
            onClick={isEditing ? () => updateLoaiphong(editId) : addLoaiphong} 
            className="submit-button"
          >
            {isEditing ? 'Cập Nhật' : 'Thêm Loại Phòng'}
          </button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Loại Phòng</th>
              <th>Trạng Thái</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {loaiphongList.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.loaiphong}</td>
                <td>{item.trangthai === '1' ? 'Hoạt động' : 'Không hoạt động'}</td>
                <td>
                  <button 
                    className="edit-button" 
                    onClick={() => handleEdit(item._id, item.loaiphong, item.trangthai)}
                  >
                    Sửa
                  </button>
                  <button 
                    className="delete-button" 
                    onClick={() => deleteLoaiphong(item._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default LoaiphongCRUD;
