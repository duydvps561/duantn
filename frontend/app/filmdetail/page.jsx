'use client'
import { useState } from 'react';
import './fimdetail.css'
import { useRef } from 'react';
import ModalPayMoment from '../thanhtoan/page';

export default function filmdetail() {
  const [show, setShow] = useState(false);
  const [foodshow, setFoodShow] = useState(false);
  const [seatSelected, setSeatSelected] = useState([]);
  const rollRef = useRef();
  if (show) {
    setTimeout(() => {
      rollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }
  const Aseat = [
    ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14"],
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14"],
    ["C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "C11", "C12", "C13", "C14"],
    ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13", "D14"],
    ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12", "E13", "E14"],
    ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "F13", "F14"],
    ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "G12", "G13", "G14"],
    ["H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "H11", "H12", "H13", "H14"],
    ["I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10", "I11", "I12", "I13", "I14"],
    ["J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9", "J10", "J11", "J12", "J13", "J14"],
    ["K1", "K2", "K3", "K4", "K5", "K6", "K7", "K8", "K9", "K10", "K11", "K12"],

  ];
  const handleSeatClick = (seat) => {
    if (seatSelected.includes(seat)) {
      setSeatSelected(seatSelected.filter(s => s !== seat));
    } else {
      setSeatSelected([...seatSelected, seat]);
    }
  };
  const [showTrailer, setShowTrailer] = useState(false);
  const toggleTrailer = () => {
    setShowTrailer(!showTrailer);
  };
  const [showPay, setShowPay] = useState(false);
  const handleOpenPay = () => setShowPay(true);
  const handleClosePay = () => setShowPay(false);


  return (
    <>
      <slide />
      <section className="film-detail justify-content-center">
        <div className="card bg-dark ">
          <img src="img/0017840_0 1-3.png" className="card-img object-fit-cover" alt="..sad." />
          <div className="card-img-overlay d-lg-flex justify-content-center">
            <div className="img-overlay">
              <img src="img/0017840_0 1-3.png" alt="" style={{ width: '250', height: '350px' }} />
            </div>
            <div className="title-overlay ms-3">
              <h1 className="card-title">THE CROW: BÁO THÙ-T18</h1>
              <ul>
                <li>
                  <a href="">Kinh di</a>
                  <a href="">America</a>
                  <a href="">110 phut</a>
                  <a href="">Đạo diễn: Alexs Stadermann</a>
                </li>
              </ul>
              <p className="card-text">Diễn viên: Ilai Swindells, Elizabeth Nabben, Jennifer Saunders,…</p>
              <p className="card-text">Khởi chiếu: 30/08/2024</p>
              <p className="card-text"><small>Sau khi Eric cùng vị hôn thê Shelly bị sát hại dã man, anh được trao cơ hội để trở lại trần thế. Eric bắt đầu bước vào con đường báo thù những kẻ đã hủy hoại cuộc đời anh và người mình yêu.</small></p>
              <p className="card-text text-danger">Kiểm duyệt: T18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)</p>
              <div className="view-detail d-flex">
                <p className="card-text mt-2">Chi tiet noi dung</p>
                <button onClick={toggleTrailer} className="btn ms-3 rounded-pill bg-dark text-warning border border-warning">Xem Trailer</button>
              </div>
            </div>
          </div>
        </div>

      {showTrailer && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Trailer: THE CROW</h5>
                <button type="button" className="btn-close" onClick={toggleTrailer}></button>
              </div>
              <div className="modal-body">
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    width="100%"
                    height="400px"
                    src="https://youtu.be/djSKp_pwmOA?si=t2Tg7PcbZBzjzVNq&t=25"
                    title="The Crow Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </section>
      <div className="date-order">
        <div className="date text-light">
          <div className="text mt-3" onClick={() => setShow(!show)}>
            <p>Th. 09</p>
            <h2>14</h2>
            <p>Thu bay</p>
          </div>
          <div className="text ms-3 mt-3" onClick={() => setShow(!show)}>
            <p>Th. 09</p>
            <h2>15</h2>
            <p>Chu nhat</p>
          </div>
          <div className="text ms-3 mt-3" onClick={() => setShow(!show)}>
            <p>Th. 09</p>
            <h2>16</h2>
            <p>Thu hai</p>
          </div>
        </div>
        <div className="note">
          <p>Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.</p>
        </div>
      </div>
      {show && (
        <>
          <section className="film-sit-order" ref={rollRef}>
            <div className="sit-header d-flex justify-content-around">
              <p>Gio chieu</p>
              <p className="s-p-2">Thoi gian chon ghe</p>
            </div>
            <div className="sit-img d-flex justify-content-center">
              <img src="../../img/image 35.png" alt="decorimg" />
            </div>
            <div className="seat-content">
              <p className="seat-title">Phong chieu so 1 </p>
              <div className="siting-order" >
                <table className="siting-table">
                  <tbody>
                    {Aseat.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((seat, seatIndex) => (
                          <td className={`${seatSelected.includes(seat) ? 'bg-primary' : ''}`} key={seatIndex} onClick={() => handleSeatClick(seat)}>{seat}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="seat-notice d-flex justify-content-center gap-5 mt-3 align-center">
                <div className="note d-flex gap-2">
                  <p className="box-color-1">X</p>
                  <p>Đã đặt</p>
                </div>
                <div className="note d-flex gap-2">
                  <p className="box-color-2"></p>
                  <p>Ghế bạn chọn</p>
                </div>
                <div className="note d-flex gap-2">
                  <p className="box-color-3"></p>
                  <p>ghế thường</p>
                </div>
                <div className="note d-flex gap-2">
                  <p className="box-color-4"></p>
                  <p>Ghế VIP</p>
                </div>
                <div className="note d-flex gap-2">
                  <p className="box-color-5"></p>
                  <p>Ghế đôi</p>
                </div>
              </div>
              <div className="seat-checkout d-flex justify-content-around gap-3 mt-3 align-items-center ">
                <div className="seat-bill">
                  <p className="seat-selected">Ghế đã chọn: <span>H3</span></p>
                  <p className="seat-total-price">Tổng tiền: <span>0đ</span></p>
                </div>
                <div className="seat-btn">
                  <button className="back-btn" onClick={() => { setShow(false) }}>Quay lại</button>
                  <button className="continue-btn" onClick={() => { setFoodShow(true) }}>Tiếp tục</button>
                </div>
              </div>
            </div>
          </section>
          {foodshow && (
            <>
              <section className="food-section" ref={rollRef}>
                <div className="container">
                  <div className="food-cb">
                    <p className="food-cb-title">Combo</p>
                    <div className="d-flex gap-3 justify-content-center mb-2">
                      <div className="cb-box">
                        <div className='box-img'>
                          <img src="../../img/bong-ngo-3.png" alt="hinh anh bong ngo nong hoi" />
                          <div className="plus"><i className="fa-solid fa-plus"></i></div>
                        </div>
                        <div className="cb-content d-flex justify-content-around">
                          <div className="cb-descript">
                            <h2>Combo 1</h2>
                            <p>Món 1, Món 2, Món 3</p>
                          </div>
                          <div className="cb-price">
                            <p>Gia : <br /><span>99999</span></p>
                          </div>
                        </div>
                      </div>
                      <div className="cb-box">
                        <div className='box-img'>
                          <img src="../../img/bong-ngo-3.png" alt="hinh anh bong ngo nong hoi" />
                          <div className="plus"><i className="fa-solid fa-plus"></i></div>
                        </div>
                        <div className="cb-content d-flex justify-content-around">
                          <div className="cb-descript">
                            <h2>Combo 1</h2>
                            <p>Món 1, Món 2, Món 3</p>
                          </div>
                          <div className="cb-price">
                            <p>Gia : <br /><span>99999</span></p>
                          </div>
                        </div>
                      </div>
                      <div className="cb-box">
                        <div className='box-img'>
                          <img src="../../img/bong-ngo-3.png" alt="hinh anh bong ngo nong hoi" />
                          <div className="plus"><i className="fa-solid fa-plus"></i></div>
                        </div>
                        <div className="cb-content d-flex justify-content-around">
                          <div className="cb-descript">
                            <h2>Combo 1</h2>
                            <p>Món 1, Món 2, Món 3</p>
                          </div>
                          <div className="cb-price">
                            <p>Gia : <br /><span>99999</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="food-corn">
                    <p className="food-corn-title">Corn</p>
                    <div className="corn-container d-flex gap-3 justify-content-center mb-2">
                      <div className="corn-box">
                        <div className='corn-content'>
                          <h2>Corn 1</h2>
                          <p>Món 1, Món 2, Món 3</p>
                        </div>
                        <div className="corn-box-img">
                          <img src="../../img/bong-ngo-3.png" alt="" />
                          <div className="corn-plus"><i className="fa-solid fa-plus"></i></div>
                        </div>
                      </div>
                      <div className="corn-box">
                        <div className='corn-content'>
                          <h2>Corn 1</h2>
                          <p>Món 1, Món 2, Món 3</p>
                        </div>
                        <div className="corn-box-img">
                          <img src="../../img/bong-ngo-3.png" alt="" />
                          <div className="corn-plus"><i className="fa-solid fa-plus"></i></div>
                        </div>
                      </div>
                      <div className="corn-box">
                        <div className='corn-content'>
                          <h2>Corn 1</h2>
                          <p>Món 1, Món 2, Món 3</p>
                        </div>
                        <div className="corn-box-img">
                          <img src="../../img/bong-ngo-3.png" alt="" />
                          <div className="corn-plus"><i className="fa-solid fa-plus"></i></div>
                        </div>
                      </div>
                      <div className="corn-box">
                        <div className='corn-content'>
                          <h2>Corn 1</h2>
                          <p>Món 1, Món 2, Món 3</p>
                        </div>
                        <div className="corn-box-img">
                          <img src="../../img/bong-ngo-3.png" alt="" />
                          <div className="corn-plus"><i className="fa-solid fa-plus"></i></div>
                        </div>
                      </div>
                      <div className="corn-box">
                        <div className='corn-content'>
                          <h2>Corn 1</h2>
                          <p>Món 1, Món 2, Món 3</p>
                        </div>
                        <div className="corn-box-img">
                          <img src="../../img/bong-ngo-3.png" alt="" />
                          <div className="corn-plus"><i className="fa-solid fa-plus"></i></div>
                        </div>
                      </div>
                      <div className="corn-box">
                        <div className='corn-content'>
                          <h2>Corn 1</h2>
                          <p>Món 1, Món 2, Món 3</p>
                        </div>
                        <div className="corn-box-img">
                          <img src="../../img/bong-ngo-3.png" alt="" />
                          <div className="corn-plus"><i className="fa-solid fa-plus"></i></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="drink">
                    <p className="food-corn-title">Drink</p>
                    <div className="corn-container d-flex gap-3 justify-content-center mb-2">
                      <div className="corn-box">
                        <div className='corn-content'>
                          <h2>CDrink 1</h2>
                          <p>Món 1, Món 2, Món 3</p>
                        </div>
                        <div className="corn-box-img">
                          <img src="../../img/bong-ngo-3.png" alt="" />
                          <div className="corn-plus"><i className="fa-solid fa-plus"></i></div>
                        </div>
                      </div>
                      <div className="corn-box">
                        <div className='corn-content'>
                          <h2>CDrink 1</h2>
                          <p>Món 1, Món 2, Món 3</p>
                        </div>
                        <div className="corn-box-img">
                          <img src="../../img/bong-ngo-3.png" alt="" />
                          <div className="corn-plus"><i className="fa-solid fa-plus"></i></div>
                        </div>
                      </div>
                      <div className="corn-box">
                        <div className='corn-content'>
                          <h2>CDrink 1</h2>
                          <p>Món 1, Món 2, Món 3</p>
                        </div>
                        <div className="corn-box-img">
                          <img src="../../img/bong-ngo-3.png" alt="" />
                          <div className="corn-plus"><i className="fa-solid fa-plus"></i></div>
                        </div>
                      </div>
                      <div className="corn-box">
                        <div className='corn-content'>
                          <h2>CDrink 1</h2>
                          <p>Món 1, Món 2, Món 3</p>
                        </div>
                        <div className="corn-box-img">
                          <img src="../../img/bong-ngo-3.png" alt="" />
                          <div className="corn-plus"><i className="fa-solid fa-plus"></i></div>
                        </div>
                      </div>
                      <div className="corn-box">
                        <div className='corn-content'>
                          <h2>CDrink 1</h2>
                          <p>Món 1, Món 2, Món 3</p>
                        </div>
                        <div className="corn-box-img">
                          <img src="../../img/bong-ngo-3.png" alt="" />
                          <div className="corn-plus"><i className="fa-solid fa-plus"></i></div>
                        </div>
                      </div>
                      <div className="corn-box">
                        <div className='corn-content'>
                          <h2>CDrink 1</h2>
                          <p>Món 1, Món 2, Món 3</p>
                        </div>
                        <div className="corn-box-img">
                          <img src="../../img/bong-ngo-3.png" alt="" />
                          <div className="corn-plus"><i className="fa-solid fa-plus"></i></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container d-flex justify-content-between mt-2 mb-2">
                  <p className="fs-2 fw-bold text-white">Tong tien: <span>197.000d</span></p>
                  <button onClick={handleOpenPay} className="btn btn-danger">Thanh toan</button>
                </div>
                <ModalPayMoment show={showPay} handleClose={handleClosePay}/>
              </section>
            </>
          )}
        </>
      )}

    </>
  )
}