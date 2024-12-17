"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/app/components/admin/Layout"; // Assuming you're using a Layout component for your admin page
import './LoaiphongCRUD.css'; // Assuming you create a CSS file for styling

const LoaigheCRUD = () => {
  const [loaigheList, setLoaigheList] = useState([]);
  const [loaighe, setLoaighe] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch loaighe list
  useEffect(() => {
    fetchLoaighes();
  }, []);

  const fetchLoaighes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/loaighe");
      setLoaigheList(response.data);
    } catch (error) {
      console.error("Error fetching loaighe:", error);
    }
  };

  // Add new loaighe
  const addLoaighe = async () => {
    try {
      await axios.post("http://localhost:3000/loaighe/add", { loaighe });
      fetchLoaighes(); // Refresh the list
      setLoaighe(""); // Clear the input
    } catch (error) {
      console.error("Error adding loaighe:", error);
    }
  };

  // Update loaighe
  const updateLoaighe = async (id) => {
    try {
      await axios.put(`http://localhost:3000/loaighe/update/${id}`, { loaighe });
      fetchLoaighes(); // Refresh the list
      setLoaighe(""); // Clear the input
      setIsEditing(false);
      setEditId(null);
    } catch (error) {
      console.error("Error updating loaighe:", error);
    }
  };

  // Edit handler
  const handleEdit = (id, currentLoaighe) => {
    setLoaighe(currentLoaighe);
    setIsEditing(true);
    setEditId(id);
  };

  // Delete loaighe
  const deleteLoaighe = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/loaighe/delete/${id}`);
      fetchLoaighes(); // Refresh the list
    } catch (error) {
      console.error("Error deleting loaighe:", error);
    }
  };

  return (
    <Layout>
      <div className="crud-container">
        <h1 className="title">Quản Lý Loại Ghế</h1>

        <div className="form-container">
          <input
            type="text"
            value={loaighe}
            onChange={(e) => setLoaighe(e.target.value)}
            placeholder="Nhập loại ghế"
            className="input-field"
          />
          <button
            className="add-btn"
            onClick={isEditing ? () => updateLoaighe(editId) : addLoaighe}
          >
            {isEditing ? "Cập Nhật" : "Thêm Loại Ghế"}
          </button>
        </div>

        <table className="crud-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Loại Ghế</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {loaigheList.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.loaighe}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(item._id, item.loaighe)}
                  >
                    Sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteLoaighe(item._id)}
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

export default LoaigheCRUD;
