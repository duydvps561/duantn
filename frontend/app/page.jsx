"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Slide from "./components/slide";
import Danhmuc from "./components/danhmuc";

export default function Home() {
  const [moviesNowPlaying, setMoviesNowPlaying] = useState([]);
  const [moviesComingSoon, setMoviesComingSoon] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [nowPlayingResponse, comingSoonResponse] = await Promise.all([
          axios.get("http://localhost:3000/phim/dangchieu"),
          axios.get("http://localhost:3000/phim/sapchieu"),
        ]);
        setMoviesNowPlaying(nowPlayingResponse.data);
        setMoviesComingSoon(comingSoonResponse.data);
      } catch (error) {
        console.error("Không tìm thấy dữ liệu phim:", error);
      }
    };
    fetchMovies();
  }, []);

  const renderMovieCards = (movies) => (
    movies.map((movie) => (
      <div className="col-md-3 mt-3" key={movie._id}>
        <div className="custom-shadow cursor-pointer">
          <Link href={`/filmdetail/${movie._id}`} className="text-decoration-none text-muted">
            <div className="box-product">
              <img src={`http://localhost:3000/img/phims/${movie.img}`} alt="" />
            </div>
            <div className="text-product mt-2">
              <div className="">
                <p className="text-light">{movie.thoiluong} Phút</p>
                <p>ngày:{movie.ngayhieuluc}</p>
              </div>
              <p className="mt-2 text-sm text-xl fw-bold text-light">{movie.tenphim}</p>
            </div>
          </Link>
        </div>
      </div>
    ))
  );
  const renderSection = (title, movies) => (
    <div className="col-md-9">
      <div className="d-flex justify-content-between align-items-center">
        <div className="text d-flex align-items-center gap-2">
          <p className="rounded-5 bg-danger" style={{ width: "20px", height: "20px" }}></p>
          <p className="text-uppercase text-white" style={{ fontSize: "20px" }}>{title}</p>
        </div>
        <p className="text">
          <Link href="#" className="text-decoration-none text-white" style={{ fontSize: "15px" }}>xem tất cả</Link>
        </p>
      </div>
      <div className="box row justify-content-between">
        {renderMovieCards(movies)}
      </div>
    </div>
  );

  return (
    <>
      <Slide />
      <Danhmuc />

      <div className="main-content container">
        <div className="row">
          {renderSection("phim đang chiếu", moviesNowPlaying)}
          <div className="col-md-3">
            <div className="d-flex justify-content-between align-items-center">
              <p className="text-uppercase text-white" style={{ fontSize: "20px" }}>khuyến mãi</p>
              <p className="text">
                <Link href="#" className="text-decoration-none text-white" style={{ fontSize: "15px" }}>xem tất cả</Link>
              </p>
            </div>
            <div  className="box bg-secondary">
              <div className="">
              đây là phần sự kiện 
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          {renderSection("phim sắp chiếu", moviesComingSoon)}
          <div className="col-md-3">
            <div className="d-flex justify-content-between align-items-center">
              <p className="text-uppercase text-white" style={{ fontSize: "20px" }}>Sự Kiện</p>
              <p className="text">
                <Link href="#" className="text-decoration-none text-white" style={{ fontSize: "15px" }}>xem tất cả</Link>
              </p>
            </div>
            {[...Array(3)].map((_, index) => (
              <div className="mt-3" key={index}>
                <img style={{ width: "260px", height: "130px" }} src="/img/image_30.png" alt="sự kiện" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}