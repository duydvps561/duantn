import { addFood, fetchFood } from "@/redux/slice/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Food() {
    const authen = useSelector((state) => state.auth.authenticated);
    const userID = useSelector((state) => state.auth.user?.id);
    const [currentIndexBongNgo, setCurrentIndexBongNgo] = useState(0); // Index cho Bổng ngô
    const [currentIndexNuoc, setCurrentIndexNuoc] = useState(0); // Index cho Nước
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState("");
    const [typeNoti, setTypeNoti] = useState("");
    const dispatch = useDispatch();
    const { items, cart, loading, error } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchFood());
    }, [dispatch]);

    const itemsPerPage = 4;

    // Phân loại các món ăn theo loại
    const bongNgoItems = items.filter(item => item.loai === "Đồ Ăn");
    const nuocItems = items.filter(item => item.loai === "Nước");

    // Hiển thị các món ăn theo loại và chỉ giới hạn theo itemsPerPage
    const displayedBongNgoItems = bongNgoItems.slice(currentIndexBongNgo, currentIndexBongNgo + itemsPerPage);
    const displayedNuocItems = nuocItems.slice(currentIndexNuoc, currentIndexNuoc + itemsPerPage);

    const goToPreviousBongNgo = () => {
        const newIndex = (currentIndexBongNgo - itemsPerPage + bongNgoItems.length) % bongNgoItems.length;
        setCurrentIndexBongNgo(newIndex);
    };

    const goToNextBongNgo = () => {
        const newIndex = (currentIndexBongNgo + itemsPerPage) % bongNgoItems.length;
        setCurrentIndexBongNgo(newIndex);
    };

    const goToPreviousNuoc = () => {
        const newIndex = (currentIndexNuoc - itemsPerPage + nuocItems.length) % nuocItems.length;
        setCurrentIndexNuoc(newIndex);
    };

    const goToNextNuoc = () => {
        const newIndex = (currentIndexNuoc + itemsPerPage) % nuocItems.length;
        setCurrentIndexNuoc(newIndex);
    };

    const handleAddcart = (id) => {
        dispatch(addFood(id));
        setShowNotification(true);
        setMessage("Sản phẩm đã được thêm vào giỏ hàng!");
        setTypeNoti("success");
        console.log("Giỏ hàng hiện tại:", cart);
    };

    const handleTo = () => {
        window.location.href = "/thanhtoan/";
    };

    return (
        <section className="food-section">
            <Notification
                message={message}
                isVisible={showNotification}
                onClose={() => setShowNotification(false)}
                type={typeNoti}
            />
            <div className="container">
                <div className="food-container">
                    {/* Hiển thị danh sách Bổng ngô */}
                    <p className="food-title">Bổng ngô</p>
                    <div className="food-content">
                        <div className="d-flex gap-3 justify-content-center mb-2">
                            <button className="food-nav-btn prev" style={{ border: 'none' }} disabled={currentIndexBongNgo === 0}>
                                <FontAwesomeIcon icon={faChevronLeft} onClick={goToPreviousBongNgo} style={{ color: "#fff", fontSize: "30px" }} />
                            </button>
                            {displayedBongNgoItems.map((product) => (
                                <div key={product._id} className="food-box">
                                    <img src={`http://localhost:3000/img/food/${product.img}`} alt="anh food" />
                                    <div className="food-content">
                                        <h2>{product.tenfood}</h2>
                                        <span>Giá : <strong>{product.gia}</strong></span>
                                    </div>
                                    <button className="food-btn-addCart" onClick={() => handleAddcart(product._id)}>
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            ))}
                            <button className="food-nav-btn next" style={{ border: 'none' }} disabled={currentIndexBongNgo + itemsPerPage >= bongNgoItems.length}>
                                <FontAwesomeIcon icon={faChevronRight} onClick={goToNextBongNgo} style={{ color: "#fff", fontSize: "30px" }} />
                            </button>
                        </div>
                    </div>

                    {/* Hiển thị danh sách Nước */}
                    <p className="food-title">Nước</p>
                    <div className="food-content">
                        <div className="d-flex gap-3 justify-content-center mb-2">
                            <button className="food-nav-btn prev" style={{ border: 'none' }} disabled={currentIndexNuoc === 0}>
                                <FontAwesomeIcon icon={faChevronLeft} onClick={goToPreviousNuoc} style={{ color: "#fff", fontSize: "30px" }} />
                            </button>
                            {displayedNuocItems.map((product) => (
                                <div key={product._id} className="food-box">
                                    <img src={`http://localhost:3000/img/food/${product.img}`} alt="anh food" />
                                    <div className="food-content">
                                        <h2>{product.tenfood}</h2>
                                        <span>Giá : <strong>{product.gia}</strong></span>
                                    </div>
                                    <button className="food-btn-addCart" onClick={() => handleAddcart(product._id)}>
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            ))}
                            <button className="food-nav-btn next" style={{ border: 'none' }} disabled={currentIndexNuoc + itemsPerPage >= nuocItems.length}>
                                <FontAwesomeIcon icon={faChevronRight} onClick={goToNextNuoc} style={{ color: "#fff", fontSize: "30px" }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {authen && userID ? (
                <div className="btn-cart d-flex justify-content-end">
                    <button onClick={handleTo} className="btn-checkout">Thanh toán</button>
                </div>
            ) : (
                <div className="alert alert-warning d-flex justify-content-center">
                    <span>Vui lòng <strong>đăng nhập</strong> hoặc <strong>đăng ký</strong> tài khoản để tiếp tục.</span>
                </div>
            )}
        </section>
    );
}
