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
        }).then(() => {
          // Reload lại trang sau khi người dùng nhấn OK
          window.location.reload();
        });
        return;
      }

      const apiUrl = `https://backend-duan-9qb7.onrender.com/checkin/scan-qr/${scannedText}`;
      try {
        const response = await fetch(apiUrl, { method: 'PUT' });

        if (response.ok) {
          const result = await response.json();
          setHoadonInfo(result);

          Swal.fire({
            icon: 'success',
            title: 'Check-in thành công',
            confirmButtonText: 'OK',
          }).then(() => {

          });

          setScanning(false);
        } else {
          const error = await response.json();

          // Check for different error responses
          if (error.message === 'Hóa đơn không tồn tại') {
            Swal.fire({
              icon: 'error',
              title: 'Hóa đơn không tồn tại',
              text: 'Vui lòng kiểm tra lại mã QR.',
              confirmButtonText: 'OK',
            }).then(() => {
              // Reload lại trang sau khi người dùng nhấn OK
              window.location.reload();
            });
          } else if (error.message === 'Hóa đơn đã được check-in trước đó') {
            Swal.fire({
              icon: 'error',
              title: 'Vé đã được checkin',
              text: 'Mã QR này đã được sử dụng để check-in.',
              confirmButtonText: 'OK',
            }).then(() => {
              // Reload lại trang sau khi người dùng nhấn OK
              window.location.reload();
            });
          } else if (error.message === 'Ngày chiếu không trùng khớp với ngày hiện tại') {
            Swal.fire({
              icon: 'error',
              title: 'Ngày chiếu không hợp lệ',
              text: 'Vui lòng kiểm tra lại ngày chiếu.',
              confirmButtonText: 'OK',
            }).then(() => {
              // Reload lại trang sau khi người dùng nhấn OK
              window.location.reload();
            });
          } else if (error.message === 'Thông tin ngày chiếu hoặc giờ bắt đầu không hợp lệ') {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi thông tin chiếu',
              text: 'Ngày chiếu hoặc giờ chiếu không hợp lệ.',
              confirmButtonText: 'OK',
            }).then(() => {
              // Reload lại trang sau khi người dùng nhấn OK
              window.location.reload();
            });
          } else if (error.message === 'Chưa đến thời gian check-in. Vui lòng đợi trong vòng 30 phút trước giờ chiếu') {
            Swal.fire({
              icon: 'error',
              title: 'Chưa đến giờ check-in',
              text: 'Chờ đến 30 phút trước giờ chiếu để check-in.',
              confirmButtonText: 'OK',
            }).then(() => {
              // Reload lại trang sau khi người dùng nhấn OK
              window.location.reload();
            });
          } else if (error.message === 'Đã quá thời gian check-in cho suất chiếu này') {
            Swal.fire({
              icon: 'error',
              title: 'Quá thời gian check-in',
              text: 'Bạn không thể check-in vì đã quá thời gian cho suất chiếu này.',
              confirmButtonText: 'OK',
            }).then(() => {
              // Reload lại trang sau khi người dùng nhấn OK
              window.location.reload();
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi hệ thống',
              text: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
              confirmButtonText: 'OK',
            }).then(() => {
              // Reload lại trang sau khi người dùng nhấn OK
              window.location.reload();
            });
          }

          // Ngừng quét sau khi đã quét thành công hoặc lỗi
          setScanning(false);
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi hệ thống',
          text: 'Không thể kết nối với server.',
          confirmButtonText: 'Thử lại',
        }).then(() => {
          // Reload lại trang sau khi người dùng nhấn OK
          window.location.reload();
        });

        // Ngừng quét sau khi đã quét thành công
        setScanning(false);
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
      // Reload lại trang sau khi người dùng nhấn OK
      window.location.reload();
    });

    // Ngừng quét sau khi đã quét thành công
    setScanning(false);
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
              style={{ width: '100%', maxWidth: '400px' }}
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
                    <th>Ngày chiếu</th>
                    <th>Giờ chiếu</th>
                    <th>Phim</th>
                    <th>Ghế</th>
                    <th>Đồ ăn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{hoadonInfo.tentaikhoan}</td>
                    <td>{hoadonInfo.phong.join(', ')}</td>
                    <td>{new Date(hoadonInfo.ngaychieu).toLocaleDateString()}</td>
                    <td>{hoadonInfo.giobatdau}</td>
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
