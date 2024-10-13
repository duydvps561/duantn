// import Film from "./components/film";
// import FilmSapChieu from "./components/filmSapChieu";
import Slide from "./components/slide";

export default function Home() {
    return (
        <>
            <Slide />
            <div className="main-content container">
                <div className="row ">
                    <div className="col-md-9">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text d-flex align-items-center gap-2 ">
                                <p style={{ width: "20px", height: "20px" }} className="rounded-5 bg-danger"></p>
                                <p className="text-uppercase text-white" style={{ fontSize: "20px" }}>phim đang chiếu</p>
                            </div>
                            <div className="text">
                                <p className="" style={{ fontSize: "15px" }}> <a className="text-decoration-none  text-white" href="">xem tất cả</a></p>
                            </div>
                        </div>
                        <div className="box row justify-content-between">
                            <div className="col-md-3  mt-3">
                                <div className="custom-shadow cursor-pointer ">
                                    <div className="box-product ">
                                        <img src="/img/0017840_0 1-1.png" alt="" />
                                    </div>
                                    <div className="text-product">
                                        <div className="d-flex flex flex-wrap items-center gap-xl-5 text-[#5D6A81] text-sm mt-3">
                                            <p>Kinh dị</p>
                                            <p>17/01/2004</p>
                                        </div>
                                        <p className="mt-2 text-sm text-xl fw-bold text-light">TEE YOD: QUỶ ĂN TẠNG PHẦN 2-T18</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-3  mt-3 ">
                                <div className="custom-shadow cursor-pointer ">
                                    <div className="box-product ">
                                        <img src="/img/0017840_0 1-1.png" alt="" />
                                    </div>
                                    <div className="text-product">
                                        <div className="d-flex flex flex-wrap items-center gap-xl-5 text-[#5D6A81] text-sm mt-3">
                                            <p>Kinh dị</p>
                                            <p>17/01/2004</p>
                                        </div>
                                        <p className="mt-2 text-sm text-xl fw-bold text-light">TEE YOD: QUỶ ĂN TẠNG PHẦN 2-T18</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3  mt-3 ">
                                <div className="custom-shadow cursor-pointer ">
                                    <div className="box-product ">
                                        <img src="/img/0017840_0 1-1.png" alt="" />
                                    </div>
                                    <div className="text-product">
                                        <div className="d-flex flex flex-wrap items-center gap-xl-5 text-[#5D6A81] text-sm mt-3">
                                            <p>Kinh dị</p>
                                            <p>17/01/2004</p>
                                        </div>
                                        <p className="mt-2 text-sm text-xl fw-bold text-light">TEE YOD: QUỶ ĂN TẠNG PHẦN 2-T18</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3  mt-3 ">
                                <div className="custom-shadow cursor-pointer ">
                                    <div className="box-product ">
                                        <img src="/img/0017840_0 1-1.png" alt="" />
                                    </div>
                                    <div className="text-product">
                                        <div className="d-flex flex flex-wrap items-center gap-xl-5 text-[#5D6A81] text-sm mt-3">
                                            <p>Kinh dị</p>
                                            <p>17/01/2004</p>
                                        </div>
                                        <p className="mt-2 text-sm text-xl fw-bold text-light">TEE YOD: QUỶ ĂN TẠNG PHẦN 2-T18</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3  mt-3 ">
                                <div className="custom-shadow cursor-pointer ">
                                    <div className="box-product ">
                                        <img src="/img/0017840_0 1-1.png" alt="" />
                                    </div>
                                    <div className="text-product">
                                        <div className="d-flex flex flex-wrap items-center gap-xl-5 text-[#5D6A81] text-sm mt-3">
                                            <p>Kinh dị</p>
                                            <p>17/01/2004</p>
                                        </div>
                                        <p className="mt-2 text-sm text-xl fw-bold text-light">TEE YOD: QUỶ ĂN TẠNG PHẦN 2-T18</p>
                                    </div>
                                </div>
                            </div>
                            

                        </div>
                    </div>
                    <div className="col-md-3 ">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text d-flex align-items-center gap-2 ">
                                <p className="text-uppercase text-white" style={{ fontSize: "20px" }}>khuyến mãi</p>
                            </div>
                            <div className="text">
                                <p className="" style={{ fontSize: "15px" }}> <a className="text-decoration-none  text-white" href="">xem tất cả</a></p>
                            </div>
                        </div>
                        <div className="mt-3">
                            <img className="" style={{width:"260px",height:"130px"}} src="/img/image_30.png" alt="" />
                            
                        </div>
                        <div className="mt-2">
                            <img className="" style={{width:"260px",height:"130px"}} src="/img/image_30.png" alt="" />
                            
                        </div>
                        <div className="mt-2">
                            <img className="" style={{width:"260px",height:"130px"}} src="/img/image_30.png" alt="" />
                            
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-9">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text d-flex align-items-center gap-2 ">
                                <p style={{ width: "20px", height: "20px" }} className="rounded-5 bg-danger"></p>
                                <p className="text-uppercase text-white" style={{ fontSize: "20px" }}>phim sắp chiếu</p>
                            </div>
                            <div className="text">
                                <p className="" style={{ fontSize: "15px" }}> <a className="text-decoration-none  text-white" href="">xem tất cả</a></p>
                            </div>
                        </div>
                        <div className="box row justify-content-between">
                            <div className="col-md-3  mt-3 ">
                                <div className="custom-shadow cursor-pointer ">
                                    <div className="box-product ">
                                        <img src="/img/0017840_0 1-1.png" alt="" />
                                    </div>
                                    <div className="text-product">
                                        <div className="d-flex flex flex-wrap items-center gap-xl-5 text-[#5D6A81] text-sm mt-3">
                                            <p>Kinh dị</p>
                                            <p>17/01/2004</p>
                                        </div>
                                        <p className="mt-2 text-sm text-xl fw-bold text-light">TEE YOD: QUỶ ĂN TẠNG PHẦN 2-T18</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3  mt-3 ">
                                <div className="custom-shadow cursor-pointer ">
                                    <div className="box-product ">
                                        <img src="/img/0017840_0 1-1.png" alt="" />
                                    </div>
                                    <div className="text-product">
                                        <div className="d-flex flex flex-wrap items-center gap-xl-5 text-[#5D6A81] text-sm mt-3">
                                            <p>Kinh dị</p>
                                            <p>17/01/2004</p>
                                        </div>
                                        <p className="mt-2 text-sm text-xl fw-bold text-light">TEE YOD: QUỶ ĂN TẠNG PHẦN 2-T18</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3  mt-3 ">
                                <div className="custom-shadow cursor-pointer ">
                                    <div className="box-product ">
                                        <img src="/img/0017840_0 1-1.png" alt="" />
                                    </div>
                                    <div className="text-product">
                                        <div className="d-flex flex flex-wrap items-center gap-xl-5 text-[#5D6A81] text-sm mt-3">
                                            <p>Kinh dị</p>
                                            <p>17/01/2004</p>
                                        </div>
                                        <p className="mt-2 text-sm text-xl fw-bold text-light">TEE YOD: QUỶ ĂN TẠNG PHẦN 2-T18</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3  mt-3 ">
                                <div className="custom-shadow cursor-pointer ">
                                    <div className="box-product ">
                                        <img src="/img/0017840_0 1-1.png" alt="" />
                                    </div>
                                    <div className="text-product">
                                        <div className="d-flex flex flex-wrap items-center gap-xl-5 text-[#5D6A81] text-sm mt-3">
                                            <p>Kinh dị</p>
                                            <p>17/01/2004</p>
                                        </div>
                                        <p className="mt-2 text-sm text-xl fw-bold text-light">TEE YOD: QUỶ ĂN TẠNG PHẦN 2-T18</p>
                                    </div>
                                </div>
                            </div>
                            

                        </div>
                    </div>
                    <div className="col-md-3 ">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text d-flex align-items-center gap-2 ">
                                <p className="text-uppercase text-white" style={{ fontSize: "20px" }}>Sự Kiện</p>
                            </div>
                            <div className="text">
                                <p className="" style={{ fontSize: "15px" }}> <a className="text-decoration-none  text-white" href="">xem tất cả</a></p>
                            </div>
                        </div>
                        <div className="mt-3">
                            <img className="" style={{width:"260px",height:"130px"}} src="/img/image_30.png" alt="" />
                            
                        </div>
                        <div className="mt-2">
                            <img className="" style={{width:"260px",height:"130px"}} src="/img/image_30.png" alt="" />
                            
                        </div>
                        <div className="mt-2">
                            <img className="" style={{width:"260px",height:"130px"}} src="/img/image_30.png" alt="" />
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
