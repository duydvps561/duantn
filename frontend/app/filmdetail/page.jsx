import './fimdetail.css'
export default function filmdetail() {
    return(
        <>
        <slide/>
        <section class="film-detail justify-content-center">
        <div class="card bg-dark">
            <img src="img/0017840_0 1-3.png" class="card-img object-fit-cover" alt="..."/>
            <div class="card-img-overlay d-lg-flex justify-content-center">
                <div class="img-overlay">
                    <img src="img/0017840_0 1-3.png" alt="" style={{width: '250', height: '350px'}}/>
                </div>
              <div class="title-overlay ms-3">
                <h1 class="card-title">THE CROW: BÁO THÙ-T18</h1>
              <ul>
                <li>
                    <a href="">Kinh di</a>
                    <a href="">America</a>
                    <a href="">110 phut</a>
                    <a href="">Đạo diễn: Alexs Stadermann</a>
                </li>
              </ul>
              <p class="card-text">Diễn viên: Ilai Swindells, Elizabeth Nabben, Jennifer Saunders,…</p>
              <p class="card-text">Khởi chiếu: 30/08/2024</p>
              <p class="card-text"><small>Sau khi Eric cùng vị hôn thê Shelly bị sát hại dã man, anh được trao cơ hội để trở lại trần thế. Eric bắt đầu bước vào con đường báo thù những kẻ đã hủy hoại cuộc đời anh và người mình yêu.</small></p>
              <p class="card-text text-danger">Kiểm duyệt: T18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)</p>
              <div class="view-detail d-flex">
                <p class="card-text mt-2">Chi tiet noi dung</p>
                <button class="btn ms-3 rounded-pill bg-dark text-warning border border-warning">Xem Trailer</button>
              </div>
              </div>
            </div>
          </div>
    </section>
    <div>
    <div class="date text-light">
    <div class="text mt-3">
        <p>Th. 09</p>
        <h2>14</h2>
        <p>Thu bay</p>
    </div>
    <div class="text ms-3 mt-3">
        <p>Th. 09</p>
        <h2>15</h2>
        <p>Chu nhat</p>
    </div>
    <div class="text ms-3 mt-3">
        <p>Th. 09</p>
        <h2>16</h2>
        <p>Thu hai</p>
    </div>
  </div>
  <div class="note">
    <p>Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.</p>
  </div>
    </div>
        </>
    )
}