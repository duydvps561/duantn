import Image from "next/image";
import { useEffect } from "react";
export default function Slide() {
  return (
    <>
      <div className="w-full flex justify-center mt-3 ms-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 p-0">
              <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <Image
                      src="/img/image 47.png"
                      alt="Ảnh slider 3"
                      width={879}
                      height={420}
                      className="d-block w-100"
                    />
                  </div>
                  <div class="carousel-item">
                    <Image
                      src="/img/image 47.png"
                      alt="Ảnh slider 3"
                      width={879}
                      height={420}
                      className="d-block w-100"
                    />
                  </div>
                  <div class="carousel-item">
                    <Image
                      src="/img/image 47.png"
                      alt="Ảnh slider 3"
                      width={879}
                      height={420}
                      className="d-block w-100"
                    />
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>

            <div className="col-md-4">
              <div className="w-full">
                <Image
                  src="/img/food-banner-1.jpg" // Đường dẫn tới hình ảnh
                  alt="ảnh slider"
                  width={350} // Chiều rộng hình ảnh
                  height={202} // Chiều cao hình ảnh
                  // Tùy chọn để tải hình ảnh ưu tiên
                />
              </div>
              <div className="w-full mt-3">
                <Image
                  src="/img/food-banner-1.jpg" // Đường dẫn tới hình ảnh
                  alt="ảnh slider"
                  width={350} // Chiều rộng hình ảnh
                  height={202} // Chiều cao hình ảnh
                  // Tùy chọn để tải hình ảnh ưu tiên
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
