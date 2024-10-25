import { useState } from "react";

export default function Food() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const products = [
        { name: "Corn 1", price: "70.000", imgSrc: "https://i.pinimg.com/564x/ee/38/ab/ee38ab9a3fc95be435c74f75d5adc27a.jpg" },
        { name: "Corn 2", price: "75.000", imgSrc: "https://i.pinimg.com/564x/ee/38/ab/ee38ab9a3fc95be435c74f75d5adc27a.jpg" },
        { name: "Corn 3", price: "80.000", imgSrc: "https://i.pinimg.com/564x/ee/38/ab/ee38ab9a3fc95be435c74f75d5adc27a.jpg" },
        { name: "Corn 4", price: "85.000", imgSrc: "https://i.pinimg.com/564x/ee/38/ab/ee38ab9a3fc95be435c74f75d5adc27a.jpg" },
        { name: "Corn 5", price: "90.000", imgSrc: "https://i.pinimg.com/564x/ee/38/ab/ee38ab9a3fc95be435c74f75d5adc27a.jpg" },
        { name: "Corn 6", price: "95.000", imgSrc: "https://i.pinimg.com/564x/ee/38/ab/ee38ab9a3fc95be435c74f75d5adc27a.jpg" },
        { name: "Corn 7", price: "100.000", imgSrc: "https://i.pinimg.com/564x/ee/38/ab/ee38ab9a3fc95be435c74f75d5adc27a.jpg" },
        { name: "Corn 8", price: "105.000", imgSrc: "https://i.pinimg.com/564x/ee/38/ab/ee38ab9a3fc95be435c74f75d5adc27a.jpg" },
    ];

    const itemsPerPage = 4;  // Số sản phẩm hiển thị mỗi lần

    // Di chuyển đến nhóm sản phẩm trước đó
    const goToPrevious = () => {
        const newIndex = (currentIndex - itemsPerPage + products.length) % products.length;
        setCurrentIndex(newIndex);
    };

    // Di chuyển đến nhóm sản phẩm tiếp theo
    const goToNext = () => {
        const newIndex = (currentIndex + itemsPerPage) % products.length;
        setCurrentIndex(newIndex);
    };

    // Lấy các sản phẩm cho trang hiện tại
    const currentProducts = products.slice(currentIndex, currentIndex + itemsPerPage).concat(
        products.slice(0, Math.max(0, currentIndex + itemsPerPage - products.length))
    );

    return (
        <section className="food-section">
            {/* <div className="food-banner">
                <img src="../../img/food-banner-1.jpg" alt="" />
            </div> */}
            <div className="container">
                <div className="best-seller">
                    <p className="food-title">Best seller</p>
                    <div className="food-bestsell">
                        <div className="d-flex gap-3 justify-content-center mb-2">
                        <div className="btn-pre ">
                        <i onClick={goToPrevious} className="fa-solid fa-angles-left"></i>
                        </div>
                            {currentProducts.map((product, index) => (
                                <div key={index} className="food-box">
                                    <img src={product.imgSrc} alt="" />
                                    <div className="food-content">
                                        <h2>{product.name}</h2>
                                        <span>Giá : <strong>{product.price}</strong></span>
                                    </div>
                                    <button className="food-btn-addCart">Thêm vào giỏ hàng</button>
                                </div>
                            ))}
                            <div className="btn-next">
                            <i onClick={goToNext} className=" fa-solid fa-angles-right" ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" btn-cart d-flex justify-content-end">
            <button className="btn-checkout">Thanh toán</button>
            </div>
        </section>
    );
}
