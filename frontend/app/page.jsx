<<<<<<< HEAD
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
=======
// import Film from "./components/film";
// import FilmSapChieu from "./components/filmSapChieu";
import PhimList from "./components/PhimList";
>>>>>>> dd0f13c081b371200bffdb251ae3f7040e4be134
import Slide from "./components/slide";

export default function Home() {
    const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
    const [moviesComingSoon, setMoviesComingSoon] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/phim/dangchieu')
            .then(response => {
                setMoviesNowPlaying(response.data);
            })
            .catch(error => {
                console.error('không tìm thấy dữ liệu phim đang chiếu', error);
            });

        axios.get('http://localhost:3000/phim/sapchieu')
            .then(response => {
                setMoviesComingSoon(response.data);
            })
            .catch(error => {
                console.error('không tìm thấy phim sắp chiếu', error);
            });
    }, []);

    const renderMovieCards = (movies) => {
        return movies.map(movie => (
            <div className="col-md-3 mt-3" key={movie.id}>
                <div className="custom-shadow cursor-pointer">
                    <div className="box-product">
                        <img src={movie.img || "/img/0017840_0 1-1.png"} alt={movie.tenphim} />
                    </div>
                    <div className="text-product">
                        <div className="d-flex flex flex-wrap items-center gap-xl-5 text-[#5D6A81] text-sm mt-3">
                            <p>{movie.thoiluong}</p>
                            <p>{movie.ngayhieuluc}</p>
                        </div>
                        <p className="mt-2 text-sm text-xl fw-bold text-light">{movie.tenphim}</p>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <>
            <Slide />
            <div className="main-content container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text d-flex align-items-center gap-2">
                                <p style={{ width: "20px", height: "20px" }} className="rounded-5 bg-danger"></p>
                                <p className="text-uppercase text-white" style={{ fontSize: "20px" }}>phim đang chiếu</p>
                            </div>
                            <div className="text">
                                <p style={{ fontSize: "15px" }}>
                                    <a className="text-decoration-none text-white" href="">xem tất cả</a>
                                </p>
                            </div>
                        </div>
                        <div className="box row justify-content-between">
<<<<<<< HEAD
                            {renderMovieCards(moviesNowPlaying)}
=======
                            {/* <div className="col-md-3  mt-3">
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
                             */}
                            <PhimList/>
>>>>>>> dd0f13c081b371200bffdb251ae3f7040e4be134
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text d-flex align-items-center gap-2">
                                <p className="text-uppercase text-white" style={{ fontSize: "20px" }}>khuyến mãi</p>
                            </div>
                            <div className="text">
                                <p style={{ fontSize: "15px" }}>
                                    <a className="text-decoration-none text-white" href="">xem tất cả</a>
                                </p>
                            </div>
                        </div>
                        {[...Array(3)].map((_, index) => (
                            <div className="mt-3" key={index}>
                                <img style={{ width: "260px", height: "130px" }} src="/img/image_30.png" alt="" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-9">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text d-flex align-items-center gap-2">
                                <p style={{ width: "20px", height: "20px" }} className="rounded-5 bg-danger"></p>
                                <p className="text-uppercase text-white" style={{ fontSize: "20px" }}>phim sắp chiếu</p>
                            </div>
                            <div className="text">
                                <p style={{ fontSize: "15px" }}>
                                    <a className="text-decoration-none text-white" href="">xem tất cả</a>
                                </p>
                            </div>
                        </div>
                        <div className="box row justify-content-between">
                            {renderMovieCards(moviesComingSoon)}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text d-flex align-items-center gap-2">
                                <p className="text-uppercase text-white" style={{ fontSize: "20px" }}>Sự Kiện</p>
                            </div>
                            <div className="text">
                                <p style={{ fontSize: "15px" }}>
                                    <a className="text-decoration-none text-white" href="">xem tất cả</a>
                                </p>
                            </div>
                        </div>
                        {[...Array(3)].map((_, index) => (
                            <div className="mt-3" key={index}>
                                <img style={{ width: "260px", height: "130px" }} src="/img/image_30.png" alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
