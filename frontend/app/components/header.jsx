import Link from 'next/link';
export default function Header() {
    return (
        <header className=" py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <div classNameName="logo">Logo</div>
                <nav>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link href="/" className="nav-link text-light">
                                Trang Chu
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="#" className="nav-link text-light">
                                Lich Chieu
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="#" className="nav-link text-light">
                                Tin Tuc
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="#" className="nav-link text-light">
                                Khuyen Mai
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/ticket" className="nav-link text-light">
                                Gia Ve
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="#" className="nav-link text-light">
                                Gioi Thieu
                            </Link>
                        </li>
                    </ul>
                </nav>
                <button className='regist-btn'>Đăng Ký</button>
                <button className="btn btn-danger fw-bold">Dang Nhap</button>
            </div>
        </header>
    );
}