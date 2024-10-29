// app/thanhtoan/page.jsx
'use client';
import { useSelector } from "react-redux";
import QRCode from "qrcode.react";
export default function ThanhtoanQR() {
    const qrState = useSelector((state) => state.qr);
    const url = qrState.url;
    return (
        <div className="container" style={{ color: "#ffffff" }}>
            <div style={{ color: '#ffffff' }}>
                <h2>QR Code cho Thanh Toán</h2>
                {url ? (
                    <QRCode value={url} size={256} />
                ) : (
                    <p>Không có dữ liệu để tạo mã QR</p>
                )}
            </div>
        </div>
    );
}
