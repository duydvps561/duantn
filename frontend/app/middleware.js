// app/middleware.js
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = request.cookies.get('token');

  // Kiểm tra xem người dùng có token hợp lệ hay không
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url)); // Chuyển hướng đến trang đăng nhập
  }

  try {
    // Gọi API để xác thực token
    const res = await fetch('http://localhost:3000/login/checktoken', {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL('/login', request.url)); // Chuyển hướng nếu token không hợp lệ
    }

    // Nếu token hợp lệ, cho phép yêu cầu tiếp tục
    return NextResponse.next();
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.redirect(new URL('/login', request.url)); // Chuyển hướng nếu có lỗi
  }
}

export const config = {
  matcher: ['/tintuc'], // Áp dụng middleware cho các route cần bảo vệ
};