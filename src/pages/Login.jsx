import React, { useState } from 'react';
import '../style/login.css';
import { Link } from 'react-router-dom';

function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const validateEmail = (email) => {
        return String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    
    return (
        <div className="login-page">
            <section className="vh-100 bg-image bg-colo">
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div
                            className="row d-flex justify-content-center align-items-center h-100"
                        >
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card card-border-radius">
                                    <div className="card">
                                        <div className="card-header bg-warning">
                                            <h4 className="text-center">Đăng Nhập</h4>
                                        </div>
                                        <div className="card-body">
                                            <form id="loginForm">
                                                <div className="mb-4">
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        className="form-control form-control-lg"
                                                        placeholder="Nhập email của bạn"
                                                        required
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        className="form-control form-control-lg"
                                                        placeholder="Nhập mật khẩu của bạn"
                                                        required
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        
                                                    />
                                                </div>

                                                <div
                                                    className="form-check d-flex justify-content-center mb-5"
                                                >
                                                    <input
                                                        className="form-check-input me-2"
                                                        type="checkbox"
                                                        value=""
                                                        id="agree-terms"
                                                        required
                                                    />
                                                    <label className="form-check-label" for="agree-terms">
                                                        Tôi đồng ý với tất cả điều khoản trong
                                                        <Link to="/" className="text-body"
                                                        ><u>Thỏa thuận sử dụng</u></Link
                                                        >
                                                    </label>
                                                </div>

                                                <div className="d-flex justify-content-center mt-3">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-lg gradient-custom-4 text-body"
                                                    >
                                                        Đăng Nhập
                                                    </button>
                                                </div>

                                                <div className="mb-3 text-center">
                                                    < Link to="/ForgotPassword" className="text-muted">Quên mật khẩu?</Link>
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