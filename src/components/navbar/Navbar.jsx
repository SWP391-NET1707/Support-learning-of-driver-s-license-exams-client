import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in based on session storage
        const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        // Clear the session storage and log the user out
        sessionStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        navigate("/");
    };

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
                    <Link to="/Quiz" className="nav-item nav-link">Khóa học lái xe</Link>
                    <Link to="/Quiz" className="nav-item nav-link">Thi lý thuyết bằng lái xe online</Link>
                    {isLoggedIn ? (
                        <Link to="/User" className="nav-item nav-link">Profile</Link>
                    ) : (
                        <Link to="/Login" className="nav-item nav-link">Đăng nhập</Link>
                    )}
                </div>
                {isLoggedIn && (
                    <button onClick={handleLogout} className="btn btn-danger">Đăng xuất</button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
