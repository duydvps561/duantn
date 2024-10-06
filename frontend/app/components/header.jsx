'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '../../public/img/logo.png'; // Adjust the path if necessary

export default function Header() {
    const pathname = usePathname(); // Lấy đường dẫn hiện tại

    return (
        <header>
            <Link href="/"><img src="http://localhost:3000/img/logo.png" alt="anh logo" /></Link>
            <nav>
                <ul className='nav-list'>
                    <li>
                        <Link 
                            href="/" 
                            className={pathname === '/' ? 'active' : ''}
                        >
                            Trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/lichchieu" 
                            className={pathname === '/some-path' ? 'active' : ''} 
                        >
                            Lịch chiếu
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/tin-tuc" 
                            className={pathname === '/some-path' ? 'active' : ''} 
                        >
                            Tin tức
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/khuyenmai" 
                            className={pathname === '/some-path' ? 'active' : ''} 
                        >
                            Khuyến mãi
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/ticket" 
                            className={pathname === '/some-path' ? 'active' : ''}
                        >
                            Giá vé
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="#" 
                            className={pathname === '/some-path' ? 'active' : ''} 
                        >
                            Liên hoan phim
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="#" 
                            className={pathname === '/some-path' ? 'active' : ''} 
                        >
                            Giới thiệu
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className='btn-section'>
                <button className='regist-btn'>Đăng Ký</button>
                <button className="login-btn">Đăng Nhập</button>
            </div>
        </header>
    );
}
