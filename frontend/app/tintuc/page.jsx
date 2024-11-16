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
    <>
      <div className="container">
        <div className="row">
          {tintuc.map((item, index) => (
            <div className="col-md-4" key={index}>
              <Link className="text-decoration-none" href={`/tintuc/${item._id}`}>
                <div className="box hover:no-underline">
                  <div className="box_top">
                    <img
                      src="../../img/0017855.webp"
                      alt="Tin tức"
                      className="img-thumbnail w-100"
                    />
                  </div>
                  <div className="box_botom text-light mt-1">
                    {new Date(item.createdAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                    <p className="box_botom_massage mt-1">{item.title}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>


    </>
  );
}
