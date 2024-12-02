'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';
import Layout from "@/app/components/admin/Layout";

// Tải động để tránh lỗi SSR
const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

const QRScannerPage = () => {
  const [result, setResult] = useState('');
  const [scanning, setScanning] = useState(true);
  const [hoadonInfo, setHoadonInfo] = useState(null);

  const handleScan = async (data) => {
    if (data && scanning) {
      const scannedText = data.text;
      setResult(scannedText);

      if (!scannedText || !/^[a-zA-Z0-9]+$/.test(scannedText)) {
        Swal.fire({
          icon: 'error',
          title: 'Mã QR không hợp lệ',
          text: 'Vui lòng quét lại mã QR hợp lệ.',
          confirmButtonText: 'OK',
        });
        return;
      }

      const apiUrl = `http://localhost:3000/checkin/scan-qr/${scannedText}`;
      try {
        const response = await fetch(apiUrl, { method: 'PUT' });

        if (response.ok) {
          const result = await response.json();
          setHoadonInfo(result);

          Swal.fire({
            icon: 'success',
            title: 'Check-in thành công',
            confirmButtonText: 'OK',
          });

          setScanning(false);
        } else {
          const error = await response.json();
          Swal.fire({
            icon: 'error',
            title: 'Vé đã được checkin',
            confirmButtonText: 'Thử lại',
          }).then(() => {
            // Reload lại trang khi nhấn OK
            window.location.reload();
          });

          // Ngừng quét sau khi đã quét thành công
          setScanning(false);;
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi hệ thống',
          text: 'Không thể kết nối với server.',
          confirmButtonText: 'Thử lại',
        }).then(() => {
          // Reload lại trang khi nhấn OK
          window.location.reload();
        });

        // Ngừng quét sau khi đã quét thành công
        setScanning(false);;
      }
    }
  };

  const handleError = (err) => {
    Swal.fire({
      icon: 'error',
      title: 'Lỗi quét mã QR',
      text: 'Không thể quét mã QR. Vui lòng thử lại.',
      confirmButtonText: 'OK',
    }).then(() => {
      // Reload lại trang khi nhấn OK
      window.location.reload();
    });

    // Ngừng quét sau khi đã quét thành công
    setScanning(false);;
  };

  const handleRestartScanning = () => {
    setResult('');
    setHoadonInfo(null);
    setScanning(true);
  };

  return (
    <Layout>
      <div className="container text-center my-5">
        <h1 className="mb-4">Quét mã Checkin</h1>
        {scanning && (
          <div className="d-flex justify-content-center mb-4">
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              facingMode="environment"
              style={{ width: '100%', maxWidth: '320px' }}
            />
          </div>
        )}
        {hoadonInfo && (
          <div className="card mt-4">
            <div className="card-header">
              <h2>Thông tin hóa đơn</h2>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Tên tài khoản</th>
                    <th>Phòng chiếu</th>
                    <th>Phim</th>
                    <th>Ghế</th>
                    <th>Đồ ăn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{hoadonInfo.tentaikhoan}</td>
                    <td>{hoadonInfo.phong.join(', ')}</td>
                    <td>{hoadonInfo.phim}</td>
                    <td>{hoadonInfo.ghe.join(', ')}</td>
                    <td>{hoadonInfo.food.map(item => `${item.tenfood} (x${item.soluong})`).join(', ')}</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="btn btn-primary mt-3"
                onClick={handleRestartScanning}
              >
                Tiếp tục quét
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default QRScannerPage;
