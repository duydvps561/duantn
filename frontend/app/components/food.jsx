import { addFood, fetchFood } from "@/redux/slice/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./notification";


export default function Food() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState("");
    const [typeNoti, setTypeNoti] = useState("");

    const dispatch = useDispatch();
    const { items, cart, loading, error } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchFood());
    }, [dispatch]);

    const itemsPerPage = 4;

    const goToPrevious = () => {
        const newIndex = (currentIndex - itemsPerPage + items.length) % items.length;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const newIndex = (currentIndex + itemsPerPage) % items.length;
        setCurrentIndex(newIndex);
    };

    const handleAddcart = (id) => {
        dispatch(addFood(id));
        setShowNotification(true);
        setMessage("Món ăn đã được thêm vào giỏ hàng!");
        setTypeNoti("success");
        console.log(id);
        console.log("Giỏ hàng hiện tại:", cart);
    };

    const handleTo = () => {
        window.location.href = "/thanhtoan/";
    };

    // Chỉ hiển thị các món ăn trong khoảng index hiện tại
    const displayedItems = items.slice(currentIndex, currentIndex + itemsPerPage);

    return (
        <section className="food-section">
            <Notification
                message={message}
                isVisible={showNotification}
                onClose={() => setShowNotification(false)}
                type={typeNoti}
            />
            <div className="container">
                <div className="best-seller">
                    <p className="food-title">Best seller</p>
                    <div className="food-bestsell">
                        <div className="d-flex gap-3 justify-content-center mb-2">
                            <div className="btn-pre">
                                <i onClick={goToPrevious} className="fa-solid fa-angles-left"></i>
                            </div>
                            {displayedItems.map((product) => (
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
                            <div className="btn-next">
                                <i onClick={goToNext} className="fa-solid fa-angles-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="btn-cart d-flex justify-content-end">
                
                <button onClick={handleTo} className="btn-checkout">Thanh toán</button>
            </div>
        </section>
    );
}
