import React from 'react'
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0" id="header-home-1">
        <a href="/" class="navbar-brand d-flex align-items-center border-end px-4 px-lg-5">
            <h2 class="m-0"><i class="fa fa-car text-primary me-2"></i>Học và thi bằng lái</h2>
        </a>
        <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ms-auto p-4 p-lg-0">
                <a href="/" class="nav-item nav-link active">Trang chủ</a>
                <div class="nav-item dropdown">
                    <a href="/" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Dịch vụ đào tạo + học lái xe</a>
                    <div class="dropdown-menu bg-light m-0">
                        <a href="/" class="dropdown-item">Khóa học lái xe hạng B1 17.5TR Cả DAT 710KM</a>
                        <a href="/" class="dropdown-item">Khóa học lái xe hạng B2</a>
                    </div>
                </div>
               
                <div class="nav-item dropdown">
                    <a href="/" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Thi lý thuyết bằng lái xe online</a>
                    <div class="dropdown-menu bg-light m-0">
                        <a href="/" class="dropdown-item">Thi lý thuyết lái xe ô tô B1</a>
                        <a href="/" class="dropdown-item">Thi lý thuyết lái xe ô tô B2</a>
                        
                    </div>
                </div>
                
            </div>
            <a href="/" class="btn btn-primary py-4 px-lg-5 d-none d-lg-block">Đăng nhập<i class="fa fa-arrow-right ms-3"></i></a>
        </div>
    </nav>
    )
}

export default Navbar