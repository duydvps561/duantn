'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PhimList() {
    const [phimList, setPhimList] = useState([]);

    const fetchPhim = async () => {
        try {
            const res = await fetch(`http://localhost:3000/phim`);
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            const phim = await res.json();
            setPhimList(phim);
        } catch (error) {
            console.error("Error fetching phim:", error);
        }
    };

    useEffect(() => {
        fetchPhim();
    }, []);

    return (
        <>
            {phimList.map((phim) => {
                return (
                    <>
                        <div className="col-md-3  mt-3">
                            <div className="custom-shadow cursor-pointer ">
                                <Link href={`/filmdetail/${phim._id}`} style={{ textDecoration: "none" }}>
                                    <div className="box-product ">
                                        <img src="/png.png" alt="" />
                                    </div>
                                    <div className="text-product">
                                        <div className="d-flex flex flex-wrap items-center gap-xl-5 text-[#5D6A81] text-sm mt-3">
                                            <p style={{ color: "#363e4e" }}>{phim.theloai}</p>
                                            <p style={{ color: "#363e4e" }}>{phim.ngayhieuluc}</p>
                                        </div>
                                        <p className="mt-2 text-sm text-xl fw-bold text-light">{phim.tenphim}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </>
                )
            })}

        </>
    );
}
