"use client"
import Link from "next/link";
import useSWR from "swr";

export default function Chitiettintuc({ params }) {
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: tintuc, error: errortintuc } = useSWR(`http://localhost:3000/tintuc/${params.id}`, fetcher);

    // Determine loading state
    if (!tintuc && !errortintuc) return <div>Loading...</div>;
    return (
        <>
        <div>
            <h1>{tintuc?.title}</h1>
            <p>{tintuc?.describe}</p>
            <p>{tintuc?.content}</p>
            <p>Loại: {tintuc?.loai}</p>
            <p>Trạng thái: {tintuc?.trangthai}</p>
            <img src={`http://localhost:3000/img/tintuc/${tintuc?.image}`} alt={tintuc?.title} />
            <Link href={`/tintuc`}>
               quây lại
            </Link>

        </div>
        </>
    );
}