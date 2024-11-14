'use client'
import { useRouter } from "next/router";  // Sử dụng next/router thay vì next/navigation
import { useEffect } from "react";

export default function Cancel() {
    const router = useRouter();
    useEffect(() => {
        const { code, id, cancel, status, orderCode } = router.query;

        if (status === 'CANCELLED' && cancel === 'true') {
            // Xử lý logic khi đơn hàng bị hủy
            setTimeout(() => {
                alert('Đơn hàng đã hủy!');
                router.push(`/thanhtoan`); // Chuyển hướng đến trang thất bại
            }, 10000); // Hiển thị thông báo sau 10 giây
        }
    }, [router.query]);  // Chạy lại khi `router.query` thay đổi

    return (
        <>
            <h1 className="text-danger">Cancel Order success</h1>
        </>
    );
}
