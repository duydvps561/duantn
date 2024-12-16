"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/app/components/admin/Layout";
import axios from "axios";
import Swal from "sweetalert2";
import "./lienhe.css";

const ITEMS_PER_PAGE = 10;

const ContactUs = () => {
  const [contacts, setContacts] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("https://backend-duan-9qb7.onrender.com/lienhe");
        setContacts(res.data);
        setTotalPages(Math.ceil(res.data.length / ITEMS_PER_PAGE)); // Calculate total pages
        setFilteredContacts(res.data.slice(0, ITEMS_PER_PAGE)); // Show first page
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };

    fetchContacts();
  }, []);

  const paginate = (page) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setFilteredContacts(contacts.slice(startIndex, endIndex)); // Update contacts for the current page
  };

  const handleReply = async (id) => {
    if (!replyMessage) {
      Swal.fire({
        title: "Lỗi",
        text: "Vui lòng nhập nội dung phản hồi!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      await axios.post(`https://backend-duan-9qb7.onrender.com/lienhe/reply/${id}`, { replyMessage });
      Swal.fire({
        title: "Thành công",
        text: "Phản hồi thành công!",
        icon: "success",
        confirmButtonText: "OK",
      });
      setReplyMessage("");
      setSelectedContact(null);

      const updatedContacts = contacts.map((contact) =>
        contact._id === id ? { ...contact, trangthai: 2 } : contact
      );
      setContacts(updatedContacts);
      paginate(currentPage); // Refresh contacts after reply
    } catch (err) {
      console.error("Error replying to contact:", err);
      Swal.fire({
        title: "Lỗi",
        text: "Đã xảy ra lỗi khi phản hồi!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Layout>
      <div className="container-fluid">
        <h2>Quản Lý Liên Hệ</h2>
        <div className="row">
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Điện thoại</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact._id}>
                    <td>{contact.Name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                      {contact.trangthai === 1 ? (
                        <span className="text-warning">Chờ trả lời</span>
                      ) : (
                        <span className="text-success">Đã trả lời</span>
                      )}
                    </td>
                    <td>
                      {contact.trangthai === 1 && (
                        <button
                          className="btn btn-primary"
                          onClick={() => setSelectedContact(contact)}
                        >
                          Trả lời
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <nav aria-label="Pagination">
              <ul className="pagination pagination-sm justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button onClick={() => paginate(currentPage - 1)} className="page-link">
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                    <button onClick={() => paginate(index + 1)} className="page-link">
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button onClick={() => paginate(currentPage + 1)} className="page-link">
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-4 traloi">
            <h3>Trả lời liên hệ</h3>
            {selectedContact && (
              <div className="reply-section">
                <p>
                  <strong>Nội dung liên hệ:</strong>
                  <br />
                  {selectedContact.contact}
                </p>
                <textarea
                  className="form-control"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Nhập nội dung phản hồi"
                />
                <button className="btn btn-success mt-2" onClick={() => handleReply(selectedContact._id)}>
                  Gửi phản hồi
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
