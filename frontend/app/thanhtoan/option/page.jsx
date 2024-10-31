'use client';
import { useSelector } from "react-redux";

export default function ThanhtoanQR() {
    const qrState = useSelector((state) => state.qr);
    const url = qrState.url;
    // const bankId = 'MB-1911010104-compact.png'; // Thay thế bằng ID ngân hàng của bạn
    // const accountNo = '1911010104'; // Thay thế bằng số tài khoản của bạn
    // const amount = 1200000; // Số tiền cần thanh toán
    // const description = encodeURIComponent('Thanh toán CON CHÓ CON123'); // Mô tả được mã hóa
    // const accountName = encodeURIComponent('PHAN MINH TUONG'); // Tên tài khoản của bạn
    // // Tạo URL VietQR cho mã QR
    // const qrImageUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-TEMPLATE.png?amount=${amount}&addInfo=${description}&accountName=${accountName}`;

    return (
        <div className="container" style={{ color: "#ffffff", marginBottom: '20px', textAlign: 'center' }}>
            <h2>QR Code cho Thanh Toán</h2>
            {url ? (
                <img src={url} alt="QR Code" style={{ width: 350, height: 350 }} />
            ) : (
                <p>Không có dữ liệu để tạo mã QR</p>
            )}
        </div>
    );
}
