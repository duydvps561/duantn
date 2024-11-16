import '../thanhtoan.css'
export default function ThanhCong() {
    
    return (
        <div className="container d-flex justify-content-center flex-column align-items-center">
            <div className="check-icon-box">
                <div className="circle-icon">
                    <svg width="53" height="53" viewBox="0 0 64 64" fill="#4CAF50" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="32" cy="32" r="30" stroke="#25282E" strokeWidth="0" />
                        <path d="M22 32L28 38L42 24" stroke="#25282E" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            <span className='fs-2 fw-bold text-light mt-1'>Thanh toán thành công!</span>
            <span className='text-light mt-1 fs-5 opacity-1 mb-3'>Cảm ơn bạn đã mua vé tại ACE Cinema</span>
            <div className='navi-btn d-flex gap-3'>
                <button className='btn btn-secondary'>
                    Lịch sử mua vé
                </button>
                <button className='btn btn-secondary'>
                    Xem vé vừa mua
                </button>
            </div>
        </div>
    );
}
