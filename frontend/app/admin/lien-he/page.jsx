"use client";
import React, { useState } from "react";
import Layout from "@/app/components/admin/Layout"; // Có thể thay đổi theo cấu trúc thư mục của bạn
import './lienhe.css'; // Import CSS custom nếu cần
import '../../globals.css';
import '../../admin_header.css'; // Import global styles

const ContactUs = () => {
  

  return (
    <Layout>
        <div class="container">
        <h2>Quản Lý Liên Hệ</h2>
        <p>Đây là trang quản lý liên hệ.</p>
        </div>
    </Layout>
  );
};

export default ContactUs;