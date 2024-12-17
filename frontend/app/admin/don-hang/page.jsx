  "use client";
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import Layout from "@/app/components/admin/Layout";
  import "./OrderManagement.css";
  import "../../globals.css";
  import "../../admin_header.css";

  const OrderManagement = () => {
    const [orders, setOrders] = useState([]); // Danh sách đơn hàng
    const [filteredOrders, setFilteredOrders] = useState([]); // Đơn hàng hiển thị trên trang hiện tại
    const [selectedOrder, setSelectedOrder] = useState(null); // Đơn hàng được chọn để xem chi tiết
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [error, setError] = useState(null); // Lỗi nếu có
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const ITEMS_PER_PAGE = 10; // Số lượng đơn hàng mỗi trang
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang

    // Fetch danh sách đơn hàng khi component load
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          const response = await axios.get("http://localhost:3000/hoadon");
          const data = response.data;

          // Sắp xếp đơn hàng theo ngày lập (mới nhất ở trên cùng)
          const sortedOrders = data.sort(
            (a, b) => new Date(b.ngaylap) - new Date(a.ngaylap)
          );
          setOrders(sortedOrders);

          // Tính toán phân trang
          setTotalPages(Math.ceil(sortedOrders.length / ITEMS_PER_PAGE));
          setFilteredOrders(sortedOrders.slice(0, ITEMS_PER_PAGE)); // Hiển thị trang đầu tiên
        } catch (err) {
          console.error("Lỗi khi tải danh sách đơn hàng:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }, []);

    // Phân trang
    const paginate = (page) => {
      setCurrentPage(page);
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setFilteredOrders(orders.slice(startIndex, endIndex));
    };

    // Fetch thông tin chi tiết đơn hàng
    const handleViewOrder = async (id) => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/hoadon/${id}`);
        const data = response.data;
        setSelectedOrder(data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết đơn hàng:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <Layout>
        <div className="order-management-container">
          {/* Bảng danh sách đơn hàng */}
          <div className="orders-list">
            <div className="tableSection">
              <h2 className="tableTitle">Danh sách đơn hàng</h2>

              {error && <p style={{ color: "red" }}>{error}</p>}
              <table className="table">
                <thead>
                  <tr>
                    <th>Mã đơn hàng</th>
                    <th>Ngày lập</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{new Date(order.ngaylap).toLocaleDateString()}</td>
                      <td>
        {order.trangthai === "1"
          ? "Chờ xác nhận"
          : order.trangthai === "2"
          ? "Đã xác nhận"
          : "Không rõ"}
      </td>
                      <td>
                        <button
                          className="editButton"
                          onClick={() => handleViewOrder(order._id)}
                        >
                          Xem đơn hàng
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <nav aria-label="Pagination">
                <ul className="pagination pagination-sm justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      className="page-link"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li
                      key={index + 1}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => paginate(index + 1)}
                        className="page-link"
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      className="page-link"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Bảng chi tiết đơn hàng */}
          <div className="order-details">
  {selectedOrder ? (
    <>
      <h3>Chi tiết đơn hàng</h3>
      <p>
        <strong>Mã đơn hàng:</strong> {selectedOrder.hoadon._id}
      </p>
      <p>
        <strong>Tên tài khoản:</strong> {selectedOrder.hoadon.tentaikhoan}
      </p>
      <p>
        <strong>Tổng tiền:</strong> {selectedOrder.hoadon.tongtien}
      </p>
      <p>
        <strong>Ngày lập:</strong>{" "}
        {new Date(selectedOrder.hoadon.createdAt).toLocaleDateString()}
      </p>

      <h4>Thông tin món ăn:</h4>
      {selectedOrder.foodOrders && selectedOrder.foodOrders.length > 0 ? (
        selectedOrder.foodOrders.map((food, index) => (
          <div key={index}>
            <p>
              <strong>Tên món:</strong> {food.tenmon}
            </p>
            <p>
              <strong>Giá:</strong> {food.gia}
            </p>
            <p>
              <strong>Số lượng:</strong> {food.soluong}
            </p>
            <p>
              <strong>Tổng tiền:</strong> {food.tongtien}
            </p>
          </div>
        ))
      ) : (
        <p>Không có món ăn trong đơn hàng</p>
      )}

      <h4>Thông tin vé:</h4>
      {selectedOrder.tickets && selectedOrder.tickets.length > 0 ? (
        selectedOrder.tickets.map((ticket, index) => (
          <div key={index}>
            <p>
              <strong>Giá vé:</strong> {ticket.giave}
            </p>
            <p>
              <strong>Giờ bắt đầu:</strong> {ticket.giobatdau}
            </p>
            <p>
              <strong>Giờ kết thúc:</strong> {ticket.gioketthuc}
            </p>
            <p>
              <strong>Ngày chiếu:</strong>{" "}
              {new Date(ticket.ngaychieu).toLocaleDateString()}
            </p>
            <p>
              <strong>Tên phim:</strong> {ticket.tenphim || "N/A"}
            </p>
            <p>
              <strong>Thời lượng:</strong> {ticket.thoiluong || "N/A"}
            </p>
           
          </div>
        ))
      ) : (
        <p>Không có vé trong đơn hàng</p>
      )}
    </>
  ) : (
    <p>Chọn một đơn hàng để xem chi tiết</p>
  )}
</div>

        </div>
      </Layout>
    );
  };

  export default OrderManagement;
