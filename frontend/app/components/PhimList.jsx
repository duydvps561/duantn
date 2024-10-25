"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PhimList() {
  const [phimList, setPhimList] = useState([]); // State để lưu danh sách phim

  const fetchPhim = async () => {
    try {
      const res = await fetch(`http://localhost:3000/phim`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const phim = await res.json(); // Chờ dữ liệu từ response
      setPhimList(phim); // Lưu danh sách phim vào state
    } catch (error) {
      console.error("Error fetching phim:", error);
    }
  };

  useEffect(() => {
    fetchPhim(); // Gọi hàm fetch khi component được mount
  }, []);

  return (
    <>
      {phimList.map((phim) => {
        return (
          <>
            <div className="col-md-3  mt-3">
              <div className="custom-shadow cursor-pointer ">
                <Link
                  href={`filmdetail/${phim._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="box-product ">
                    <img src={phim.img} alt="" />
                  </div>
                  <div className="text-product">
                    <div className="d-flex flex flex-wrap items-center gap-xl-5 text-[#5D6A81] text-sm mt-3">
                      <p style={{ color: "#363e4e" }}>{phim.theloai}</p>
                      <p style={{ color: "#363e4e" }}>{phim.ngayhieuluc}</p>
                    </div>
                    <p className="mt-2 text-sm text-xl fw-bold text-light">
                      {phim.tenphim}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
