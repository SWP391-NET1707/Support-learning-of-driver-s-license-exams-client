import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Course.css'
import course1 from '../../assets/courses-1.jpg'
import course2 from '../../assets/courses-2.jpg'
import course3 from '../../assets/pexels-ingo-joseph-543605.jpg'


const Course = () => {
  return (
    <div className="container-xxl courses my-6 py-6 pb-0">
        <div className="container">
            <div className="text-center mx-auto mb-5 wow fadeInUp content-max-w" data-wow-delay="0.1s" >
                <h6 className="text-primary text-uppercase mb-2">Khóa học hiện tại</h6>
                <h1 className="display-6 mb-4">Dịch vụ của chúng tôi</h1>
            </div>
            <div className="row g-4 justify-content-center">
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                        <div className="text-center p-4 pt-0">
                            <div className="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4">17.480.000 VNĐ</div>
                            <h5 className="mb-3">Học & Thi bằng lái xe B1</h5>
                            <p>Hỗ trợ đào tạo và đăng ký thi bằng lái xe hạng B1</p>
                            <ol className="breadcrumb justify-content-center mb-0">
                                
                                <li className="breadcrumb-item small"><i className="fa fa-calendar-alt text-primary me-2"></i>3 Tuần</li>
                            </ol>
                        </div>
                        <div className="position-relative mt-auto">
                            <img className="img-fluid" src={course1} alt="" />
                            <div className="courses-overlay">
                                <a className="btn btn-outline-primary border-2" href="/">Đăng kí</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                        <div className="text-center p-4 pt-0">
                            <div className="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4">17.480.000 VNĐ</div>
                            <h5 className="mb-3">Học & Thi bằng lái xe B2</h5>
                            <p>Hỗ trợ đào tạo và đăng ký thi bằng lái xe hạng B2</p>
                            <ol className="breadcrumb justify-content-center mb-0">
                                
                                <li className="breadcrumb-item small"><i className="fa fa-calendar-alt text-primary me-2"></i>3 Tuần</li>
                            </ol>
                        </div>
                        <div className="position-relative mt-auto">
                            <img className="img-fluid" src={course2} alt="" />
                            <div className="courses-overlay">
                                <a className="btn btn-outline-primary border-2" href="/">Đăng kí</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                        <div className="text-center p-4 pt-0">
                            <div className="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4">16.500.000 VNĐ</div>
                            <h5 className="mb-3">Học & Thi bằng lái xe Hạng C</h5>
                            <p>Hỗ trợ đào tạo và đăng ký thi bằng lái xe hạng C</p>
                            <ol className="breadcrumb justify-content-center mb-0">
                                
                                <li className="breadcrumb-item small"><i className="fa fa-calendar-alt text-primary me-2"></i>3 Tuần</li>
                            </ol>
                        </div>
                        <div className="position-relative mt-auto">
                            <img className="img-fluid" src={course3} alt="" />
                            <div className="courses-overlay">
                                <a className="btn btn-outline-primary border-2" href="/">Đăng kí</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Course