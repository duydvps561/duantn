import Slide from "./components/slide";

export default function Home() {
    return (
        <>
        <Slide/>
        <section className="main-content">
            <div className="top-content d-flex justify-content-center">
                <div className="title d-flex">
                <i class="fa fa-circle" style={{color: 'red', fontsize: '30px'}}></i>
                    <h2 className="text-light fw-bold">Phim đang chiếu</h2>
                </div>
                <a class="showall-left" href="">Xem tất cả</a>
                <div className=" d-flex col-12 col-lg-8 left-content">
                    <div className="card bg-transparent" style={{ width: "280px", height: "auto" }}>
                        <img src="img/0017840_0 1.png" className="card-img-top" alt="..." />
                        <div className="card-body text-start">
                            <a href="#" className="card-link">
                                Hanh Dong
                            </a>
                            <a href="#" className="card-link ms-4 ps-4">
                                30/08/2024
                            </a>
                            <div className="card-title text-light fw-bold">
                                <h2>HELLBOY: ĐẠI CHIẾN QUỶ DỮ-T161</h2>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-transparent" style={{ width: "280px", height: "auto" }}>
                        <img
                            src="img/0017840_0 1-1.png"
                            className="card-img-top"
                            alt="..."
                        />
                        <div className="card-body text-start">
                            <a href="#" className="card-link">
                                Hanh Dong
                            </a>
                            <a href="#" className="card-link ms-4 ps-4">
                                30/08/2024
                            </a>
                            <div className="card-title text-light fw-bold">
                                <h2>HELLBOY: ĐẠI CHIẾN QUỶ DỮ-T16</h2>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-transparent" style={{ width: "280px", height: "auto" }}>
                        <img
                            src="img/0017840_0 1-2.png"
                            className="card-img-top"
                            alt="..."
                        />
                        <div className="card-body text-start">
                            <a href="#" className="card-link">
                                Hanh Dong
                            </a>
                            <a href="#" className="card-link ms-4 ps-4">
                                30/08/2024
                            </a>
                            <div className="card-title text-light fw-bold">
                                <h2>HELLBOY: ĐẠI CHIẾN QUỶ DỮ-T16</h2>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-transparent" style={{ width: "280px", height: "auto" }}>
                        <img
                            src="img/0017840_0 1-3.png"
                            className="card-img-top"
                            alt="..."
                        />
                        <div className="card-body text-start">
                            <a href="#" className="card-link">
                                Hanh Dong
                            </a>
                            <a href="#" className="card-link ms-4 ps-4">
                                30/08/2024
                            </a>
                            <div className="card-title text-light fw-bold">
                                <h2>HELLBOY: ĐẠI CHIẾN QUỶ DỮ-T16</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-2 right-content">
                    <div className="title-right">
                        <p>Khuyến Mãi</p>
                        <a href="/khuyenmai">Xem tất cả</a>
                    </div>  
                    <div className="item">
                        <div className="card-item" style={{ width: "18rem"}}>
                            <img src="img/Event_2.png" className="card-img-top" alt="..." />
                        </div>
                        <div className="card-item" style={{ width: "18rem"}}>
                            <img src="img/image 38.png" className="card-img-top" alt="..." />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bot-content d-flex justify-content-center">
                <div className="title d-flex">
                <i class="fa fa-circle" style={{color: 'red', fontsize: '30px'}}></i>
                <h2 className="text-light fw-bold">Phim sắp chiếu</h2>
                </div>
                <div className="d-flex col-12 col-lg-8 left-content">
                    <div className="card bg-transparent" style={{ width: "280px", height: "auto" }}>
                        <img src="img/0017840_0 1.png" className="card-img-top" alt="..." />
                        <div className="card-body text-start">
                            <a href="#" className="card-link">
                                Hanh Dong
                            </a>
                            <a href="#" className="card-link ms-4 ps-4">
                                30/08/2024
                            </a>
                            <div className="card-title text-light fw-bold">
                                <h2>HELLBOY: ĐẠI CHIẾN QUỶ DỮ-T16</h2>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-transparent" style={{ width: "280px", height: "auto" }}>
                        <img
                            src="img/0017840_0 1-1.png"
                            className="card-img-top"
                            alt="..."
                        />
                        <div className="card-body text-start">
                            <a href="#" className="card-link">
                                Hanh Dong
                            </a>
                            <a href="#" className="card-link ms-4 ps-4">
                                30/08/2024
                            </a>
                            <div className="card-title text-light fw-bold">
                                <h2>HELLBOY: ĐẠI CHIẾN QUỶ DỮ-T16</h2>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-transparent" style={{ width: "280px", height: "auto" }}>
                        <img
                            src="img/0017840_0 1-2.png"
                            className="card-img-top"
                            alt="..."
                        />
                        <div className="card-body text-start">
                            <a href="#" className="card-link">
                                Hanh Dong
                            </a>
                            <a href="#" className="card-link ms-4 ps-4">
                                30/08/2024
                            </a>
                            <div className="card-title text-light fw-bold">
                                <h2>HELLBOY: ĐẠI CHIẾN QUỶ DỮ-T16</h2>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-transparent" style={{ width: "280px", height: "auto" }}>
                        <img
                            src="img/0017840_0 1-3.png"
                            className="card-img-top"
                            alt="..."
                        />
                        <div className="card-body text-start">
                            <a href="#" className="card-link">
                                Hanh Dong
                            </a>
                            <a href="#" className="card-link ms-4 ps-4">
                                30/08/2024
                            </a>
                            <div className="card-title text-light fw-bold">
                                <h2>HELLBOY: ĐẠI CHIẾN QUỶ DỮ-T16</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-2 right-content">
                    <div>
                        <div className="title-right">
                            <p>Sự kiện</p>
                            <a href="">Xem tất cả</a>
                        </div>
                        <div className="card-item" style={{ width: "18rem"}}>
                            <img src="img/Event_2.png" className="card-img-top" alt="..." />
                        </div>
                        <div className="card-item" style={{ width: "18rem"}}>
                            <img src="img/image 38.png" className="card-img-top" alt="..." />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}
