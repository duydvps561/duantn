import Link from 'next/link';

export default function Header() {
    return (
    <header class="bg-dark py-3">
        <div class="container d-flex justify-content-between align-items-center">
            <img src="img/A (1) 4.png" alt="Logo" class="img-fluid"/>
            <nav>
                <ul class="nav ">
                    <li class="nav-item"><a href="#" class="nav-link text-light">Trang Chu</a></li>
                    <li class="nav-item"><a href="#" class="nav-link text-light">Lich Chieu</a></li>
                    <li class="nav-item"><a href="#" class="nav-link text-light">Tin Tuc</a></li>
                    <li class="nav-item"><a href="#" class="nav-link text-light">Khuyen Mai</a></li>
                    <li class="nav-item"><a href="#" class="nav-link text-light">Gia Ve</a></li>
                    <li class="nav-item"><a href="#" class="nav-link text-light">Gioi Thieu</a></li>
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
                <img src="img/slide-2.png" class="d-block w-100" alt="Slide 2"/>
            </div>
            <div class="carousel-item">
                <img src="img/slide.png" class="d-block w-100" alt="Slide 3"/>
            </div>
        </div>
    </div>    
    </header>
   
 
 
    );
}