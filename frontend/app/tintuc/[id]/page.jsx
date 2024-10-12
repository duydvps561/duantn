"use client"
import '../news.css';
import { useParams } from "next/navigation";

export default function TintucDetail() {
    const { id } = useParams();
    console.log(id);
    return (
        <>
            <div className="container ">
                <h3 className="t-detail-title">Chương trình phim kỉ niệm nhân dịp 70 năm Giải phòng Thủ đô</h3>
                <div>
                    <p>Nhân dịp 70 năm ngày Giải phóng Thủ đô (10/10/1954 – 10/10/2024), Trung tâm Chiếu phim Quốc gia tổ chức chương trình phim kỉ niệm tại Trung tâm.</p>
                    <p>Bộ phim được chọn để trình chiếu miễn phí trong chương trình phim lần này là: “ Đào, phở và Piano”. Tác phẩm tái hiện khung cảnh Hà Nội những ngày cuối cùng trong Trận Hà Nội 1946 và vừa được chọn làm đại diện cho Điện ảnh Việt Nam dự vòng sơ loại Oscar 2025.</p>
                </div>
                <div className='t-detail-content'>
                    <span>1-	Thời gian chiếu phim: Từ 6/10- 10/10/2024</span>
                    <span>2-	Địa điểm: Phòng chiếu số 12</span>
                    <span>3-	Suất chiếu: 10h00 và 20h15</span>
                    <span>4- Hình thức nhận vé: Khách hàng nhận vé 0 đồng trực tiếp tại quầy vé từ 8h00 đến 23h00 hàng ngày, bắt đầu từ ngày 4/10/2024 đến khi hết vé (khán giả có thể nhận vé trước ngày xem phim và mỗi khách nhận tối đa 02 vé/người).</span>
                </div>
                <div>
                    <img src="../../../img/slide-1.png" alt="dasd" width={500} />
                </div>
            </div>
        </>
    )
}