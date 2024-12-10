'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './history.css'
import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHoadon } from '@/redux/slice/hoadonSlice'
import { getVe, setHoadonnguoidung, setVetheoHoadon } from '@/redux/slice/ticket'

export default function Yourticket() {
    const dispatch = useDispatch();
    const userID = useSelector((state) => state.auth.user?.id);

    const { hoadonlist } = useSelector((state) => state.hoadon);
    const { velist, hoadonnguoidung, vetheoHoadon } = useSelector((state) => state.ticket);

    useEffect(() => {
        dispatch(getHoadon());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getVe());
    }, [dispatch]);

    const [cachieudata, setCachieuData] = useState([]);
    const [phimdata, setPhimData] = useState([]);
    const [phongchieudata, setPhongchieudata] = useState([]);

    const [selectedStatus, setSelectedStatus] = useState('All');
    const [hisdropdown, setHisdropdown] = useState(false);
    const [movieSearchQuery, setMovieSearchQuery] = useState('');

    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [modal, setModal] = useState(false);
    const [seatName, setSeatName] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const fetchData = async () => {
        try {
            setLoading(true);

            const [cachieuResponse, phimResponse, phongchieuResponse] = await Promise.all([
                fetch('http://localhost:3000/xuatchieu'),
                fetch('http://localhost:3000/phim'),
                fetch('http://localhost:3000/phongchieu'),
            ]);

            if (!cachieuResponse.ok || !phimResponse.ok || !phongchieuResponse.ok) {
                throw new Error('Một trong các API không thành công');
            }
            const cachieuData = await cachieuResponse.json();
            const phongchieuData = await phongchieuResponse.json();
            const phimData = await phimResponse.json();

            setCachieuData(cachieuData);
            setPhimData(phimData);
            setPhongchieudata(phongchieuData);

        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, [userID]);

    useEffect(() => {
        if (hoadonlist.length > 0 && velist.length > 0) {
            const hoadon = hoadonlist.filter((item) => item.taikhoan_id._id === userID);
            if (hoadon.length > 0) {
                const hoadonIDSet = new Set(hoadon.map(item => item._id));
                const ve = velist.filter((item) => hoadonIDSet.has(item.hoadon_id));
                dispatch(setHoadonnguoidung(hoadon));
                dispatch(setVetheoHoadon(ve));
            }
        }

    }, [hoadonlist, velist, userID, dispatch]);


    const handleModal = (ticket) => {
        setSelectedTicket(ticket);
        setModal(true);
        setSeatName([]);
        getSeatName(ticket.ghe_id);
    };
    //loc data theo ngay
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    //phan trang
    useEffect(() => {
        setTotalPages(Math.ceil(vetheoHoadon.length / itemsPerPage));
    }, [vetheoHoadon, itemsPerPage]);
    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    const getPhimName = (cachieuId) => {
        const phim_id = cachieudata.find(cachieu => cachieu._id === cachieuId)?.phim_id;
        return phimdata.find(phim => phim._id === phim_id)?.tenphim || "Không tìm thấy phim";
    }

    const getPhongchieuName = (cachieuId) => {
        const phongchieu_id = cachieudata.find(cachieu => cachieu._id === cachieuId)?.phongchieu_id;
        return phongchieudata.find(phongchieu => phongchieu._id === phongchieu_id)?.tenphong || 'Không tìm thấy phòng chiếu';
    }

    const getCachieuTime = (cachieuId) => {
        const selectedCachieu = cachieudata.find(cachieu => cachieu._id === cachieuId);
        if (selectedCachieu) {
            const { giobatdau, ngaychieu } = selectedCachieu;
    
            // Chuyển đổi ngaychieu thành định dạng ngày
            const formattedDate = new Date(ngaychieu).toLocaleDateString('vi-VN'); // Chuyển thành định dạng ngày Việt Nam
    
            return `${giobatdau} - ${formattedDate}`;
        }
        return "Thông tin không có sẵn";
    }
    

    const getSeatName = async (gheid) => {
        try {
            if (!gheid || gheid.length === 0) {
                console.log("Không có ghế được chọn.");
                setSeatName([]);
                return;
            }

            const ghePromises = gheid.map(async (id) => {
                const response = await fetch(`http://localhost:3000/ghe/${id}`);
                if (!response.ok) throw new Error(`Không tìm thấy ghế với ID ${id}`);
                return await response.json();
            });

            const gheResults = await Promise.all(ghePromises);

            setSeatName(gheResults);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin ghế:", error.message);
        }
    };

    const removeDiacritics = (str) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[đĐ]/g, 'd');
    };

    const filteredTickets = vetheoHoadon.filter((ticket) => {
        const ticketDate = new Date(ticket.createdAt);
        const ticketDateString = ticketDate.toISOString().split('T')[0];

        // Lấy trạng thái từ hoadonlist
        const status = hoadonlist.find((item) => item._id === ticket.hoadon_id)?.trangthai || "Chưa xác định";
        const ticketStatus = status === 1 ? "Đã sử dụng" : "Chưa sử dụng";

        // Kiểm tra ngày
        const isDateMatch = selectedDate ? ticketDateString === selectedDate : true;

        // Kiểm tra trạng thái
        const isStatusMatch = selectedStatus && selectedStatus !== "All" ? ticketStatus === selectedStatus : true;

        // Kiểm tra tên phim
        const cachieu = cachieudata.find(cachieu => cachieu._id === ticket.cachieu_id);
        const phim = cachieu ? phimdata.find(phim => phim._id === cachieu.phim_id) : null;
        const movieName = phim ? phim.tenphim : "Không tìm thấy phim";
        const normalizedMovieName = removeDiacritics(movieName.toLowerCase());
        const normalizedSearchQuery = removeDiacritics(movieSearchQuery.toLowerCase());

        const isMovieNameMatch = movieSearchQuery
            ? normalizedMovieName.includes(normalizedSearchQuery)
            : true;

        return isDateMatch && isStatusMatch && isMovieNameMatch;
    });

    // Phân trang
    const currentTickets = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);

    // Sắp xếp theo ngày
    const sortedTickets = [...currentTickets].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


    return (
        <>
            <div className="container" style={{ color: "#fff" }}>
                <h3 align="center">Lịch sử vé</h3>
                <div className="his-header d-flex justify-content-around">
                    <div className="his-box-tool">
                        <div className="his-tool-day">
                            <input type="date" aria-label="date chosing" onChange={handleDateChange} />
                        </div>
                        <div
                            className="his-tool-status"
                            onMouseEnter={() => setHisdropdown(true)}
                            onMouseLeave={() => setHisdropdown(false)}
                        >
                            <span>{selectedStatus}</span>
                            <FontAwesomeIcon
                                icon={faCaretDown}
                                style={{ color: "#ffffff", fontSize: "30px" }}
                            />
                            {hisdropdown && (
                                <div className="his-dropdown-content">
                                    <button onClick={() => { setSelectedStatus('All'); setHisdropdown(false); }}>All</button>
                                    <button onClick={() => { setSelectedStatus('Chưa sử dụng'); setHisdropdown(false); }}>Chưa sử dụng</button>
                                    <button onClick={() => { setSelectedStatus('Đã sử dụng'); setHisdropdown(false); }}>Đã sử dụng</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="his-tool-search">
                        <input
                            type="text"
                            placeholder="Tìm kiếm vé"
                            aria-label="###"
                            value={movieSearchQuery}
                            onChange={(e) => setMovieSearchQuery(e.target.value)}
                        />
                        <FontAwesomeIcon icon={faSearch} className="his-search-icon" />
                    </div>
                </div>
                <div className="his-table-content">
                    {currentTickets.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "20px" }}>
                            <h4>Không có dữ liệu để hiển thị</h4>
                        </div>
                    ) : (
                        <>
                            <table className="his-table">
                                <thead className="p-3">
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã vé</th>
                                        <th>Phim</th>
                                        <th>Ngày mua</th>
                                        <th>Trạng thái</th>
                                        <th>Tùy chọn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedTickets.map((ve, index) => {
                                        const status = hoadonlist.find((item) => item._id === ve.hoadon_id)?.trangthai;
                                        const ticketStatus = status == 2 ? "Đã sử dụng" : "Chưa sử dụng";
                                        console.log(ticketStatus);
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{ve._id}</td>
                                                <td>{getPhimName(ve.cachieu_id)}</td>
                                                <td>{new Date(ve.createdAt).toLocaleDateString()}</td>
                                                <td className={ticketStatus === "Chưa sử dụng" ? "status unused" : "status used"}>
                                                    {ticketStatus}
                                                </td>
                                                <td>
                                                    <span onClick={() => handleModal(ve)}>Chi tiết</span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>

                            </table>
                            <div className="page-btn">
                                <div className="pagination">
                                    <button
                                        className="first"
                                        onClick={() => setCurrentPage(1)}
                                        disabled={currentPage === 1}
                                    >
                                        Đầu
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Trước
                                    </button>
                                    <span>Trang {currentPage} / {totalPages}</span>
                                    <button
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Sau
                                    </button>
                                    <button
                                        className="last"
                                        onClick={() => setCurrentPage(totalPages)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Cuối
                                    </button>
                                </div>
                            </div>

                        </>
                    )}

                    {modal && selectedTicket && (
                        <div className="ticket-modal-container">
                            <div className="ticket-modal-content">
                                <div className="ticket-header">
                                    <h2>Vé Ace Cinema</h2>

                                    {selectedTicket && selectedTicket.__v === 0 && (
                                        <>
                                            <h5>Mã vé</h5>
                                            <div className="qr">
                                                <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${selectedTicket._id}&size=200x200`} alt="qr" />
                                            </div>
                                        </>
                                    )}


                                </div>
                                <div className="ticket-body">
                                    <p><strong>Phim:</strong> {getPhimName(selectedTicket.cachieu_id)}</p>
                                    <p>
                                        <strong>Ghế:</strong>{" "}
                                        {seatName.length > 0
                                            ? seatName.map(seat => `${seat.hang}${seat.cot}`).join(", ")
                                            : "Không có ghế"}
                                    </p>
                                    <p><strong>Xuất chiếu:</strong> {getCachieuTime(selectedTicket.cachieu_id)}</p>
                                    <p><strong>Phòng Chiếu:</strong> {getPhongchieuName(selectedTicket.cachieu_id)}</p>
                                </div>
                                <div className="ticket-footer">
                                    <button className="close-btn" onClick={() => setModal(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}
