import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Form, Input, Checkbox } from 'antd';

import './Navbar.css';
import jwtDecode from 'jwt-decode';
import authService from '../../api/auth-services';
import { useEffect } from 'react';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  // const showLoginModal = () => {
  //   setLoginModalVisible(true);
  // };
// 
  // const handleLoginModalOk = () => {
  //   // In a real application, you would perform authentication here
  //   // For this example, we simulate successful login when email is "test@example.com" and password is "password"
  //   if (email === "test@example.com" && password === "password") {
  //     setIsLoggedIn(true);
  //     setLoginModalVisible(false);
  //   } else {
  //     // Handle incorrect login credentials (e.g., display an error message)
  //     // For this example, we simply alert the user
  //     alert("Incorrect email or password. Please try again.");
  //   }
  // };

  // const handleLoginModalCancel = () => {
  //   setLoginModalVisible(false);
  // };

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
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0" id="header-home-1">
        <Link to="/home" className="navbar-brand d-flex align-items-center border-end px-4 px-lg-5">
          <h2 className="m-0"><i className="fa fa-car text-primary me-2"></i>Học và thi bằng lái</h2>
        </Link>
        <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="/home" className="nav-item nav-link active">Trang chủ</Link>
            <Link to="/Quiz" className="nav-item nav-link">Khóa học lái xe</Link>
            <Link to="/Quiz" className="nav-item nav-link">Thi lý thuyết bằng lái xe online</Link>
            {isLoggedIn ? (
              <Link to="/User" className="nav-item nav-link">Profile</Link>
            ) : (
              <button className="nav-item nav-link" ><Link to="/login" className="nav-item nav-link active">Đăng nhập</Link></button>
              // <button className="nav-item nav-link" onClick={showLoginModal}>Đăng nhập</button>
            )}
          </div>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn btn-danger">Đăng xuất</button>
          ) : null}
        </div>
      </nav>

      {/* <Modal
        title="Đăng nhập"
        visible={isLoginModalVisible}
        onOk={handleLoginModalOk}
        onCancel={handleLoginModalCancel}
        footer={null}
      >
        <Form name="loginForm">
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form>
      </Modal> */}
    </div>
  );
}

export default App;
