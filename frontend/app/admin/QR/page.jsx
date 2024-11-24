'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Tải động để tránh lỗi SSR
const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

const QRScannerPage = () => {
  const [result, setResult] = useState('');

  const handleScan = (data) => {
    if (data) {
      const scannedText = data.text;
      setResult(scannedText); 
      console.log('Kết quả quét:', scannedText);


      if (scannedText.startsWith('http://') || scannedText.startsWith('https://')) {
        window.location.href = scannedText; 
      }
    }
  };

  const handleError = (err) => {
    console.error('Lỗi quét mã QR:', err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Quét mã QR</h1>
      <QrScanner
        delay={300} 
        style={previewStyle} 
        onError={handleError} 
        onScan={handleScan} 
      />
      <p>Kết quả: {result || 'Chưa có kết quả'}</p>
    </div>
  );
};

export default QRScannerPage;
