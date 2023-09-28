import React, {useEffect} from 'react'
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import Login from '../../pages/Login'
import { Link } from 'react-router-dom'

const Navbar = () => {

    useEffect(() => {
        $(window).scroll(() => {
            if ($(window).scrollTop() > 300) {
              $('.sticky-top').addClass('shadow-sm').css('top', '0px');
            } else {
              $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
            }
          });
      }, []);

    return (
        <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0" id="header-home-1">
        <a href="/" className="navbar-brand d-flex align-items-center border-end px-4 px-lg-5">
            <h2 className="m-0"><i className="fa fa-car text-primary me-2"></i>Học và thi bằng lái</h2>
        </a>
        <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto p-4 p-lg-0">
                <Link to="/" className="nav-item nav-link active">Trang chủ</Link>
                <Link to="/" className="nav-item nav-link">Khóa học lái xe</Link>
                {/* <div className="nav-item dropdown">
                    <a href="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Dịch vụ đào tạo + học lái xe</a>
                    <div className="dropdown-menu bg-light m-0">
                        <a href="/" className="dropdown-item">Khóa học lái xe hạng B1 17.5TR Cả DAT 710KM</a>
                        <a href="/" className="dropdown-item">Khóa học lái xe hạng B2</a>
                    </div>
                </div> */}
                <Link to="/Quiz" className="nav-item nav-link">Thi lý thuyết bằng lái xe online</Link>
                {/* <div className="nav-item dropdown">
                    <Link to="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Thi lý thuyết bằng lái xe online</Link>
                    <div className="dropdown-menu bg-light m-0">
                        <Link to="/" className="dropdown-item">Thi lý thuyết lái xe ô tô B1</Link>
                        <Link to="/" className="dropdown-item">Thi lý thuyết lái xe ô tô B2</Link>   
                    </div>
                </div> */}
                
            </div>
            <Link to="/Login" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">Đăng nhập<i className="fa fa-arrow-right ms-3"></i></Link>
        </div>
    </nav>
    )
}

export default Navbar