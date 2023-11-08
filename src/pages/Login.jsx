import React, {  useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';


import '../style/login.css';

import authService from '../api/auth-services';
import jwtDecode from 'jwt-decode';



const Login = () => {

    const navigate = useNavigate();


    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await authService.login(email, password).then(
            () => {
                const userRole = jwtDecode(sessionStorage.getItem("user")).role
                if (userRole === "Student") {
                    navigate("/home");
                    window.location.reload();
                  } else if (userRole === "Mentor") {
                    navigate("/Mentor");
                    window.location.reload();
                  } else if (userRole === "Staff"){
                    navigate("/Staff")
                    window.location.reload();
                  }else if (userRole === "Admin"){
                    navigate("/Admin")
                    window.location.reload();
                  }

              
            },
            (error) => {
              console.log(error);
            }
          );
        } catch (err) {
          console.log(err);
        }
      };
    

    return (
        <div className="login-page">
            <section className="vh-100 bg-image bg-colo">
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card card-border-radius">
                                    <div className="card">
                                        <div className="card-header bg-warning">
                                            <h4 className="text-center">Đăng Nhập</h4>
                                        </div>
                                        <div className="card-body">
                                            <form id="loginForm" onSubmit={handleSubmit}>
                                                <div className="mb-4">
                                                    <input
                                                        // type="email"
                                                        id="email"
                                                        className="form-control form-control-lg"
                                                        placeholder="Nhập email của bạn"
                                                        required
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        value={email}
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        className="form-control form-control-lg"
                                                        placeholder="Nhập mật khẩu của bạn"
                                                        required
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        value={password}
                                                    />
                                                </div>

                                                {/* <div className="form-check d-flex justify-content-center mb-5">
                                                    <input
                                                        className="form-check-input me-2"
                                                        type="checkbox"
                                                        value=""
                                                        id="agree-terms"
                                                        required
                                                    />
                                                    <label className="form-check-label" htmlFor="agree-terms">
                                                        Tôi đồng ý với tất cả điều khoản trong
                                                        <Link to="/" className="text-body"
                                                        ><u>Thỏa thuận sử dụng</u></Link
                                                        >
                                                    </label>
                                                </div> */}

                                                <div className="d-flex justify-content-center mt-3">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-lg gradient-custom-4 text-body"
                                                    >
                                                        Đăng Nhập
                                                    </button>
                                                </div>

                                                <div className="mb-3 text-center">
                                                    <Link to="/ForgotPassword" className="text-muted">Quên mật khẩu?</Link>
                                                </div>

                                                <p className="text-center text-muted mt-4">
                                                    Chưa có tài khoản?
                                                    <Link to="/Register" className="fw-bold text-body"
                                                    ><u>Đăng Ký tại đây</u></Link
                                                    >
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
