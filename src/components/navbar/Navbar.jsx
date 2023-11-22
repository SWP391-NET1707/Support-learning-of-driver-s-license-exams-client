import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import authService from '../../api/auth-services';
import { Dropdown, Menu } from 'antd';

function App() {
  let username = null;
  const user = sessionStorage.getItem("user");
  if (user !== null) {
    username = jwtDecode(user).name;
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there is a current user
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear the session storage and log the user out
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/home';
  };
  const menu = (
    <Menu>
      <Menu.Item>
      <div className='center-btn'>
        <Link to="/Schedule" className="nav-item btn">Đăng ký học buổi học thực hành</Link></div>
      </Menu.Item>
      <Menu.Item >
      <div className='center-btn'>
        <Link to="/User" className="nav-item btn" >Thời khóa biểu</Link></div>
      </Menu.Item>
      <Menu.Item >
        <div className='center-btn'>
        <Link type="link" className="btn btn-danger" onClick={handleLogout}>
          Đăng xuất
        </Link></div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0" id="header-home-1">
        <Link to="/home" className="navbar-brand d-flex align-items-center border-end px-4 px-lg-5">
          <h2 className="m-0"><i className="fa fa-car text-primary me-2"></i>HỌC LÁI XE</h2>
        </Link>
        <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="/home" className="nav-item nav-link active">Trang chủ</Link>
            <Link to="/Quiz" className="nav-item nav-link">Thi lý thuyết bằng lái xe online</Link>
            {isLoggedIn ? (
               <Dropdown overlay={menu} placement="bottomRight">
                <button
                  className="nav-item nav-link"
                >
                  {username}
                </button>
                </Dropdown>
            ) : (
              <Link to="/login" className="nav-item nav-link active">Đăng nhập</Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;
