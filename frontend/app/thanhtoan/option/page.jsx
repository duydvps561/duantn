'use client';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ThanhtoanQR() {
    const [totalAmount, setTotalAmount] = useState(0);
    const qrState = useSelector((state) => state.qr);
    const {cart }= useSelector((state) => state.cart);
    useEffect((item) =>{
        const amount = cart.reduce((acc, item) => acc + (item.gia * (item.quantity || 1)), 0);
        setTotalAmount(amount);
    },[cart])
    const url = qrState.url;
    const [isLoading, setIsLoading] = useState(false);
    const [timeleft, setTimeleft] = useState(5 * 60);
    const [isComplete, setIsComplete] = useState(false);
    const postInvoice = async (invoiceData) => {
        try {
            const response = await fetch('http://localhost:3000/hoadon/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invoiceData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error posting invoice:', error);
        }
    };
    const now = new Date(); // Lấy thời gian hiện tại

    // Lấy giờ theo định dạng 24h
    const hours = String(now.getHours()).padStart(2, '0'); // Đảm bảo có 2 chữ số
    const minute = String(now.getMinutes()).padStart(2, '0'); // Đảm bảo có 2 chữ số
    const giolap = `${hours}:${minute}`; // Định dạng giờ phút
    // Lấy ngày theo định dạng dd/mm/yyyy
    const ngaylap = now.toISOString()// Định dạng ngày
    const invoiceData = {
        "tongtien": totalAmount,
        "giolap": giolap, // Giờ hiện tại
        "ngaylap": ngaylap, // Ngày hiện tại
        "taikhoan_id": "671ba17131448681a2fcfcde"
    };
    useEffect(
        () => {
            if (timeleft > 0) {
                const timer = setInterval(() => {
                    setTimeleft(prevTime => prevTime - 1);
                }, 1000);
                return () => clearInterval(timer);
            } else {
                window.location.href = '/thanhtoan';
            }
        },
        [timeleft]
    )
    const minutes = Math.floor(timeleft / 60);
    const seconds = timeleft % 60;

    const handleClick = async () => {
        setIsLoading(true);
        setIsComplete(false);
        let checkBill = true;

        if (checkBill) {
            try {
                const response = await postInvoice(invoiceData);

                if (response) {
                    setTimeout(() => {
                        setIsLoading(false);
                        setIsComplete(true);

                        setTimeout(() => {
                            window.location.href = '/thanhtoan/thanhcong';
                        }, 1000);
                    }, 5000);
                } else {
                    console.error("Không gửi được hóa đơn");
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Lỗi khi gửi hóa đơn:", error);
                setIsLoading(false);
            }
        } else {
            console.error("Quét mã QR không thành công");
            setIsLoading(false);
        }
    };


    return (
        <div className="container" style={{ color: "#ffffff", marginBottom: '20px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: "20px" }}>QR Code cho Thanh Toán</h2>
            <div className="qr-container" style={{ marginBottom: "20px" }}>
                {url ? (
                    <img src={url} alt="QR Code" style={{ width: 350, height: 350 }} />
                ) : (
                    <p>Không có dữ liệu để tạo mã QR</p>
                )}
                <p style={{ marginTop: "10px", fontSize: "20px" }}>
                    {minutes.toString().padStart(2, "0")} :{" "}
                    {seconds.toString().padStart(2, "0")}
                </p>
            </div>
            <div className="qr-notice" style={{ color: '#ffffff' }}>
                <p>
                    Quý khách vui lòng kiểm tra và thanh toán QR Code trên điện thoại để đặt hàng.
                </p>
                <p>
                    Vé sẽ được gửi về email đăng ký bằng mã QR.
                </p>
                <p>
                    Nếu có bất kì lỗi phát sinh vui lòng liên hệ : 1919919011
                </p>
            </div>
            <div className="check d-flex justify-content-center flex-column align-items-center">
                <button
                    className="btn"
                    style={{
                        width: "200px",
                        backgroundColor: "#504D62",
                        color: "#ffffff",
                        transition: "background-color 0.3s, color 0.3s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative"
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundImage = "linear-gradient(to right, #6A82FB, #FC5C7D)";
                        e.target.style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundImage = "none";
                        e.target.style.backgroundColor = "#504D62";
                        e.target.style.color = "#ffffff";
                    }}
                    onClick={handleClick}
                >
                    {isLoading ? (
                        <span className="spinner"></span>
                    ) : isComplete ? (
                        <span className="checkmark">✔️</span>  // Biểu tượng dấu tích
                    ) : (
                        "Kiểm tra thanh toán"
                    )}
                    <style jsx>{`
            .spinner {
            width: 20px;
            height: 20px;
            border: 3px solid #ffffff;
            border-top: 3px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            }

            @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
            }

            .checkmark {
            font-size: 18px;
            color: #ffffff;
            }
        `}</style>
                </button>
                <a href="/thanhtoan" style={{ textDecoration: "none", color: "red" }}>Hủy</a>
            </div>
        </div>
    );
}
