"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";

export default function Chitiettintuc({ params }) {
    const [isVisible, setIsVisible] = useState(false);
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: tintuc, error: errortintuc } = useSWR(`http://localhost:3000/tintuc/${params.id}`, fetcher);

    useEffect(() => {
        setIsVisible(true);
    }, []);
    if (!tintuc && !errortintuc) return <div>Loading...</div>;
    if (errortintuc) return <div>Error loading data. Please try again later.</div>;

    return (
        <>
            <div className={`w-100 ${isVisible ? 'slide-in' : ''}`}>
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <h1>
                            <p className="text-light">{tintuc?.title}</p>
                        </h1>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <p className="text-light">{tintuc?.describe}</p>
                            <div className="text-light" dangerouslySetInnerHTML={{ __html: tintuc.content }} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Link href={`/tintuc`}>
                    Quay lại
                </Link>
            </div>
        </>
    );
}