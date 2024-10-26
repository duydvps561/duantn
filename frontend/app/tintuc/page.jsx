"use client";
import Link from "next/link";
import "./news.css";
import { useEffect, useState } from "react";

export default function Tintuc() {
  const [tintuc, setTintuc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/tintuc");
        if (!res.ok) {
          throw new Error(`Could not fetch data: ${res.status}`);
        }
        const data = await res.json();
        setTintuc(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h3 className="n-title">Tin tức</h3>
      <div className="n-flex-box">
        {tintuc.map((item, index) => (
          <div className="f-box" key={index}>
            <Link href={`/tintuc/${item._id}`}>
              <div className="box-img">
                <img
                  src="../../img/0017855.webp"
                  alt="Tin tức"
                  className="img-fluid"
                />
              </div>
              <div className="f-box-content">
                <p className="fs-7">
                  {new Date(item.createdAt).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </p>
                <p className="fs-5">{item.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
