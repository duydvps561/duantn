import Link from 'next/link';

export default function Header() {
    return (
    <header className="bg-dark py-3">
        <div className="container d-flex justify-content-between align-items-center">
            <img src="img/A (1) 4.png" alt="Logo" className="img-fluid"/>
            <nav>
                <ul className="nav ">
                    <li className="nav-item"><a href="#" className="nav-link text-light">Trang Chu</a></li>
                    <li className="nav-item"><a href="#" className="nav-link text-light">Lich Chieu</a></li>
                    <li className="nav-item"><a href="#" className="nav-link text-light">Tin Tuc</a></li>
                    <li className="nav-item"><a href="#" className="nav-link text-light">Khuyen Mai</a></li>
                    <li className="nav-item"><a href="#" className="nav-link text-light">Gia Ve</a></li>
                    <li className="nav-item"><a href="#" className="nav-link text-light">Gioi Thieu</a></li>
                </ul>
            </nav>
            <button class="btn btn-danger fw-bold">Dang Nhap</button>
        </div>
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src="img/slide-1.png" className="d-block w-100" alt="Slide 1"/>
            </div>
            <div className="carousel-item">
                <img src="img/slide-2.png" className="d-block w-100" alt="Slide 2"/>
            </div>
            <div className="carousel-item">
                <img src="img/slide.png" className="d-block w-100" alt="Slide 3"/>
            </div>
        </div>
    </div>    
    </header>
   
 
 
    );
}