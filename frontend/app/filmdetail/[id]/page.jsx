'use client'
import { useEffect, useState } from 'react';
import './fimdetail.css'
import { useRef } from 'react';
import { useRouter } from 'next/router';
export default function filmdetail({ params }) {
  const id = params.id;
  const [show, setShow] = useState(false);
  const [phimChitiet, setPhimChitiet] = useState([]);
  const [cachieu, setCaChieu] = useState([]);
  const [gheData, setGheData] = useState([]);
  const [loaighe, setloaiGhe] = useState([]);
  const [timeleft,setTimeLeft] = useState(10*60);
  useEffect(() => {
    if (timeleft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1); 
      }, 1000);
  

      return () => clearTimeout(timer);
    } else {

      setShow(false);
    }
  }, [timeleft]);
  
  // const [ghetheoPhong, setGheTheoPhong] = useState([]);
  const [phongchieuid, setPhongChieuid] = useState([]);
  const [phimCachieu, setPhimCachieu] = useState([]);
  const [phongchieu, setPhongChieu] = useState([]);
  const [phongchieudata, setPhongChieudata] = useState([]);
  const [giochieu, setgiochieu] = useState([]);
  const [foodshow, setFoodShow] = useState(false);
  const [seatSelected, setSeatSelected] = useState([]);
  const rollRef = useRef();
  if (show) {
    setTimeout(() => {
      rollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }
  const minutes = Math.floor(timeleft / 60);
  const seconds = timeleft % 60;
  const handleSeatClick = (seat) => {
    if (seatSelected.includes(seat)) {
      setSeatSelected(seatSelected.filter(s => s !== seat));
    } else {
      setSeatSelected([...seatSelected, seat]);
    }
  };
  const fetchPhimChitiet = async () => {
    try {
      const response = await fetch(`http://localhost:3000/phim/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPhimChitiet(data);
    } catch (error) {
      console.error('Error fetching film details:', error);
    }
  }

  const fetchCaChieu = async () => {
    try {
      const response = await fetch(`http://localhost:3000/xuatchieu`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCaChieu(data);
    } catch (error) {
      console.error('Error fetching film details:', error);
    }
  }
  const fetchPhongchieu = async () => {
    try {
      const response = await fetch(`http://localhost:3000/phongchieu`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPhongChieu(data);
    } catch (error) {
      console.error('Error fetching film details:', error);
    }
  };
  const fetchSeat = async () => {
    try {
      const response = await fetch(`http://localhost:3000/ghe`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGheData(data);
    } catch (error) {
      console.error('Error fetching seat data:', error);
    }
  }
  const fetchSeatModel = async () => {
    try {
      const response = await fetch(`http://localhost:3000/loaighe`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setloaiGhe(data);
    } catch (error) {
      console.error('Error fetching seat data:', error);
    }
  }
  useEffect(() => {
    fetchPhimChitiet();
    fetchCaChieu();
    fetchPhongchieu();
    fetchSeat();
    fetchSeatModel();
  }, [id]);
  useEffect(() => {
    if (id && cachieu && Array.isArray(cachieu)) {
      const foundPhim = cachieu.find((item) => item.phim_id === id);
      setPhimCachieu(foundPhim || null);
    } else {
      setPhimCachieu(null);
    }

  }, [id, cachieu]);
  useEffect(() => {
    if (phimCachieu) {
      setPhongChieuid(phimCachieu.phongchieu_id);
    }
  }, [phimCachieu]);
  useEffect(() => {
    const phongchieudata = phongchieu.find((item) => item._id === phongchieuid);
    setPhongChieudata(phongchieudata);
  }, [phongchieu]);

  useEffect(() => {
    const gheMap = {};
    gheData.forEach((ghe) => {

      if (!gheMap[phongchieuid]) {
        gheMap[phongchieuid] = [];
      }
      gheMap[phongchieuid].push(ghe);
    });

    // setGheTheoPhong(gheMap);
  }, [gheData]);
  return (
    <>
      <section className="film-detail justify-content-center">
        <div className="card bg-dark ">
          <img src="img/0017840_0 1-3.png" className="card-img object-fit-cover" alt="..sad." />
          <div className="card-img-overlay d-lg-flex justify-content-center">
            <div className="img-overlay">
              <img src={`../../../img/${phimChitiet.img}`} alt="" style={{ width: '250', height: '350px' }} />
            </div>
            <div className="title-overlay ms-3">
              <h1 className="card-title">{phimChitiet.tenphim}</h1>
              <ul>
                <li>
                  <a href="">Kinh di</a>
                  <a href="">America</a>
                  <a href="">{phimChitiet.thoiluong}</a>
                  <a href="">{phimChitiet.daodien}</a>
                </li>
              </ul>
              <p className="card-text">{phimChitiet.dienvien}</p>
              <p className="card-text">Khởi chiếu: {phimChitiet.ngayhieuluc}</p>
              <p className="card-text"><small>{phimChitiet.noidung}</small></p>
              <p className="card-text text-danger">Kiểm duyệt: T18 - Phim được phổ biến đến người xem từ đủ 18 tuổi trở lên (18+)</p>
              <div className="view-detail d-flex">
                <p className="card-text mt-2">Chi tiet noi dung</p>
                <button className="btn ms-3 rounded-pill bg-dark text-warning border border-warning">Xem Trailer</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="date-order">
        <div className="date text-light">
          {phimCachieu ? (

            <div className="text ms-3 mt-3">
              <p>Th {new Date(phimCachieu.ngaychieu).getMonth() + 1}</p> {/* Lấy tháng (0-11), cộng thêm 1 */}
              <h2>{new Date(phimCachieu.ngaychieu).getDate()}</h2> {/* Lấy ngày (1-31) */}
              <p>{['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][new Date(phimCachieu.ngaychieu).getDay()]}</p> {/* Lấy thứ (0-6) */}
            </div>
          ) : (
            <p>Không tìm thấy thông tin phim.</p>
          )}
        </div>
        <div className="note">
          <p>Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và Khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.</p>
          <div className='thoigian_chieu'>
            {phimCachieu ? (
              <button className='chonthoigian' type='button' onClick={() => { setShow(true); setgiochieu(phimCachieu.giobatdau) }}>
                {phimCachieu.giobatdau}
              </button>
            ) : (
              <p>Chưa có thông tin phim.</p>
            )}
          </div>
        </div>
      </div>
      {show && (
        <>
          <section className="film-sit-order">
            <div className="sit-header d-flex justify-content-around">
              <span className='fs-5 font-monsterat'>Giờ chiếu : <strong>{giochieu}</strong></span>
              <p className="s-p-2">{minutes.toString().padStart(2, '0')} : {seconds.toString().padStart(2, '0')}</p>
            </div>
            <div className="sit-img d-flex justify-content-center">
              <img src="../../img/image 35.png" alt="decorimg" />
            </div>
            <div className="seat-content">
              <p className="seat-title">{phongchieudata.tenphong}</p>
              <div className="siting-order" >
                <table className="siting-table">
                  <tbody>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)' }}>
                      {gheData.map((ghe) => {
                        const seat = `${ghe.hang}${ghe.cot}`;
                        const isSelected = seatSelected.includes(seat);
                        const loaigheItem = loaighe.find((item) => item._id === ghe.loaighe_id);
                        let style = {};
                        if (loaigheItem) {
                          style.backgroundColor = loaigheItem.mau;
                        }
                        if (isSelected) {
                          style.backgroundColor = '#005AD8';
                          style.color = 'white';
                        }
                        return (
                          <tr key={ghe._id}>
                            <td
                              style={style}
                              className="text-center" 
                              onClick={() => {
                                if (isSelected) {
                                  setSeatSelected(seatSelected.filter(selected => selected !== seat));
                                } else {
                                  setSeatSelected([...seatSelected, seat]);
                                }
                              }}
                            >
                              {seat}
                            </td>
                          </tr>
                        );
                      })}


                    </div>
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
                  <p className="seat-selected">Ghế đã chọn: <span>{seatSelected.join(', ')}</span></p>
                  <p className="seat-total-price">Tổng tiền: <span>0đ</span></p>
                </div>
                <div className="seat-btn">
                  <button className="back-btn" onClick={() => { setShow(false);setTimeLeft(10*60) }}>Quay lại</button>
                  <button className="continue-btn" onClick={() => { setFoodShow(true) }}>Tiếp tục</button>
                </div>
              </div>
            </div>
          </section>
          {foodshow && (
            <>
              <section className="food-section">
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
                  <button className="btn btn-danger">Thanh toan</button>
                </div>
              </section>
            </>
          )}
        </>
      )}

    </>
  )
}