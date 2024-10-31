import { useEffect, useState } from "react";

export default function Danhmuc() {
    const [listPhim, setListPhim] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch movie categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/theloai');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setListPhim(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full flex justify-center mt-5 ">
            <div className="container">
                <h2 className="text-light">Danh mục phim</h2>
                <div className="d-flex flex w-full justify-center">
                    <div className="container">
                        <ul className="row">
                            {listPhim.map((phim) => (
                                <a href={`/phim/${phim.id}`} key={phim.id} className="col-md-2 my-3 text-decoration-none">
                                    <li className="text-light list-unstyled text-center">{phim.tentheloai}</li>
                                </a>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}