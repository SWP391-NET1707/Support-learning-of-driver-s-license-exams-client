import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
import img1 from '../../assets/thi-bang-lai-xe-b1-can-chuan-bi-gi-1_0203110522.jpg'
import img2 from '../../assets/ai-nen-thi-lay-bang-lai-xe-b2.jpeg'
import './Carousel.css'
import { Link } from 'react-router-dom'

const Carousel = () => {


  return (
    <div className="container-fluid p-0 wow fadeIn" data-wow-delay="0.1s">
        <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="w-100" src={img1} alt="Image" />
                    <div className="carousel-caption">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-7">
                                    <h1 className="display-2 text-light mb-5 animated slideInDown">Học lái xe với sự tự tin</h1>
                                    <Link to="/" className="btn btn-primary py-sm-3 px-sm-5">Tìm hiểu thêm</Link>
                                    <Link to="/" className="btn btn-light py-sm-3 px-sm-5 ms-3">Khóa học của chúng tôi</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="w-100" src={img2} alt="Image" />
                    <div className="carousel-caption">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-7">
                                    <h1 className="display-2 text-light mb-5 animated slideInDown">Lái xe an toàn là ưu tiên hàng đầu của chúng tôi</h1>
                                    <Link to="/" className="btn btn-primary py-sm-3 px-sm-5">Tìm hiểu thêm</Link>
                                    <Link to="/" className="btn btn-light py-sm-3 px-sm-5 ms-3">Khóa học của chúng tôi</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#header-carousel"
                data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>
  )
}

export default Carousel