import Film from "./components/film";
import FilmSapChieu from "./components/filmSapChieu";
import Slide from "./components/slide";

export default function Home() {
    return (
        <>
        <Slide/>
        <section className="main-content">
            <h2 className="text-light fw-bold fs-5">Phim dang chieu</h2>
            <div className="top-content d-flex justify-content-center">
                <div className=" d-flex col-12 col-lg-8 left-content">
                    <Film/>
                </div>
                <div className="col-12 col-lg-2 right-content">
                    <div>
                        <h2 className="text-light fw-bold fs-4">Khuyen Mai</h2>
                        <div className="card-item" style={{ width: "18rem" }}>
                            <img src="img/Event_2.png" className="card-img-top" alt="..." />
                        </div>
                        <div className="card-item" style={{ width: "18rem" }}>
                            <img src="img/image 38.png" className="card-img-top" alt="..." />
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="text-light fw-bold fs-5 mt-5">Phim sap chieu</h2>
            <div className="bot-content d-flex justify-content-center">
                <FilmSapChieu/>
                <div className="col-12 col-lg-2 right-content">
                    <div>
                        <h2 className="text-light fw-bold fs-4">Khuyen Mai</h2>
                        <div className="card-item" style={{ width: "18rem" }}>
                            <img src="img/Event_2.png" className="card-img-top" alt="..." />
                        </div>
                        <div className="card-item" style={{ width: "18rem" }}>
                            <img src="img/image 38.png" className="card-img-top" alt="..." />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}
