import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Course.css'

const Course = () => {
  return (
    <div class="container-xxl courses my-6 py-6 pb-0">
        <div class="container">
            <div class="text-center mx-auto mb-5 wow fadeInUp content-max-w" data-wow-delay="0.1s" >
                <h6 class="text-primary text-uppercase mb-2">Khóa học hiện tại</h6>
                <h1 class="display-6 mb-4">Dịch vụ của chúng tôi</h1>
            </div>
            <div class="row g-4 justify-content-center">
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                        <div class="text-center p-4 pt-0">
                            <div class="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4">17.480.000 VNĐ</div>
                            <h5 class="mb-3">Học & Thi bằng lái xe B1</h5>
                            <p>Hỗ trợ đào tạo và đăng ký thi bằng lái xe hạng B1</p>
                            <ol class="breadcrumb justify-content-center mb-0">
                                
                                <li class="breadcrumb-item small"><i class="fa fa-calendar-alt text-primary me-2"></i>3 Tuần</li>
                            </ol>
                        </div>
                        <div class="position-relative mt-auto">
                            <img class="img-fluid" src="img/courses-1.jpg" alt="" />
                            <div class="courses-overlay">
                                <a class="btn btn-outline-primary border-2" href="/">Đăng kí</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                        <div class="text-center p-4 pt-0">
                            <div class="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4">17.480.000 VNĐ</div>
                            <h5 class="mb-3">Học & Thi bằng lái xe B2</h5>
                            <p>Hỗ trợ đào tạo và đăng ký thi bằng lái xe hạng B2</p>
                            <ol class="breadcrumb justify-content-center mb-0">
                                
                                <li class="breadcrumb-item small"><i class="fa fa-calendar-alt text-primary me-2"></i>3 Tuần</li>
                            </ol>
                        </div>
                        <div class="position-relative mt-auto">
                            <img class="img-fluid" src="img/courses-2.jpg" alt="" />
                            <div class="courses-overlay">
                                <a class="btn btn-outline-primary border-2" href="/">Đăng kí</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div class="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                        <div class="text-center p-4 pt-0">
                            <div class="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4">16.500.000 VNĐ</div>
                            <h5 class="mb-3">Học & Thi bằng lái xe Hạng C</h5>
                            <p>Hỗ trợ đào tạo và đăng ký thi bằng lái xe hạng C</p>
                            <ol class="breadcrumb justify-content-center mb-0">
                                
                                <li class="breadcrumb-item small"><i class="fa fa-calendar-alt text-primary me-2"></i>3 Tuần</li>
                            </ol>
                        </div>
                        <div class="position-relative mt-auto">
                            <img class="img-fluid" src="img/pexels-ingo-joseph-543605.jpg" alt="" />
                            <div class="courses-overlay">
                                <a class="btn btn-outline-primary border-2" href="/">Đăng kí</a>
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