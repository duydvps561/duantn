const express = require('express');
const router = express();
const nodemailer = require('nodemailer');
require('dotenv').config();
router.post('/sendmail',async (req,res) =>{
    const { to, subject, text, html } = req.body; 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADMIN,
            pass: process.env.EMAIL_PASS,
        },
    });
    const Send = async (to, subject, text, html) => {
        try {
            const options = {
                from: 'tuongphan2004@gmail.com',
                to: to,
                subject: subject,
                text: text,
                html: html,
            };
    
            const info = await transporter.sendMail(options);
            console.log('Email sent: ', info.response);
        } catch (error) {
            console.error('Error sending email: ', error);
        }
    };
//     html = `
// <!DOCTYPE html>
// <html>
// <head>
//     <style>
//     body {
//         font-family: Arial, sans-serif;
//         background-color: #f9f9f9;
//         padding: 20px;
//         margin: 0;
//     }
//     .email-container {
//         max-width: 600px;
//         margin: auto;
//         background: #ffffff;
//         padding: 20px;
//         border-radius: 8px;
//         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     }
//     .email-header {
//         background-color: #007bff;
//         color: #ffffff;
//         text-align: center;
//         padding: 15px;
//         border-radius: 8px 8px 0 0;
//     }
//     .email-body {
//         padding: 20px;
//         color: #333;
//     }
//         .email-footer {
//         text-align: center;
//         font-size: 12px;
//         color: #aaa;
//         padding-top: 10px;
//     }
//     .btn {
//         display: inline-block;
//         padding: 10px 20px;
//         background: #007bff;
//         color: #fff;
//         text-decoration: none;
//         border-radius: 5px;
//         margin-top: 10px;
//     }
//     .ticket-details {
//         margin-top: 20px;
//         border: 1px solid #ddd;
//         padding: 10px;
//         border-radius: 5px;
//         background: #f8f8f8;
//     }
//     .ticket-details p {
//         margin: 5px 0;
//     }
//     </style>
// </head>
// <body>
//     <div class="email-container">
//     <div class="email-header">
//         <h1>ACE Cinema xin chào!</h1>
//     </div>
//     <div class="email-body">
//         <p>Xin chào <strong>Nguyễn Văn A</strong>,</p>
//         <p>Bạn đã đặt vé thành công. Dưới đây là thông tin chi tiết:</p>
//         <div class="ticket-details">
//         <p><strong>Phim:</strong> Avengers: Endgame</p>
//         <p><strong>Suất chiếu:</strong> 19:00, Thứ Bảy, 20/11/2024</p>
//         <p><strong>Rạp:</strong> CGV Hoàng Văn Thụ</p>
//         <p><strong>Phòng chiếu:</strong> Phòng 3</p>
//         <p><strong>Ghế:</strong> A10, A11</p>
//         <p><strong>Mã vé:</strong> ABCD1234</p>
//         </div>
//         <p>Hãy xuất trình mã vé này tại quầy để nhận vé hoặc quét mã QR để vào rạp. Chúc bạn có trải nghiệm xem phim thú vị!</p>
//         <p><a href="http://localhost:3000" class="btn">Truy cập Website</a></p>
//     </div>
//     <div class="email-footer">
//         &copy; 2024 Your Cinema. All rights reserved.
//     </div>
//     </div>
// </body>
// </html>

// `;
if (!to || !subject || !text || !html) {
    return res.status(400).send({ error: 'Missing required fields (to, subject, text, html)' });
}

Send(to, subject, text, html);
})
module.exports = router;