import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import img1 from '../../assets/thi-bang-lai-xe-b1-can-chuan-bi-gi-1_0203110522.jpg'
import img2 from '../../assets/ai-nen-thi-lay-bang-lai-xe-b2.jpeg'
import './Carousel.css'

const Carousel = () => {
  return (
    <div class="container-fluid p-0 wow fadeIn" data-wow-delay="0.1s">
        <div id="header-carousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="w-100" src={img1} alt="Image" />
                    <div class="carousel-caption">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-7">
                                    <h1 class="display-2 text-light mb-5 animated slideInDown">Học lái xe với sự tự tin</h1>
                                    <a href="/" class="btn btn-primary py-sm-3 px-sm-5">Tìm hiểu thêm</a>
                                    <a href="/" class="btn btn-light py-sm-3 px-sm-5 ms-3">Khóa học của chúng tôi</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <img class="w-100" src={img2} alt="Image" />
                    <div class="carousel-caption">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-7">
                                    <h1 class="display-2 text-light mb-5 animated slideInDown">Lái xe an toàn là ưu tiên hàng đầu của chúng tôi</h1>
                                    <a href="/" class="btn btn-primary py-sm-3 px-sm-5">Tìm hiểu thêm</a>
                                    <a href="/" class="btn btn-light py-sm-3 px-sm-5 ms-3">Khóa học của chúng tôi</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#header-carousel"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
  )
}

export default Carousel