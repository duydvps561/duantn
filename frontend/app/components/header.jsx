'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname(); // Lấy đường dẫn hiện tại

    return (
        <header>
            <Link href="/"><img src="img/logo.png" alt="anh logo" /></Link>
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
                            href="/news" 
                            className={pathname === '/news' ? 'active' : ''} 
                        >
                            Tin tức
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="#" 
                            className={pathname === '/some-path' ? 'active' : ''} 
                        >
                            Khuyến mãi
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/ticket" 
                            className={pathname === '/ticket' ? 'active' : ''}
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
