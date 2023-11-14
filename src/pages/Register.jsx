import { Link } from 'react-router-dom';
import '../style/home.css';
import '../style/register.css';

import { handleRegistrationRequest, handleConfirmationCodeRequest } from '../api/auth-services';

import React, { useState } from 'react';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailToken, setEmailToken] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationCodeError, setConfirmationCodeError] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const handleConfirmationCode = () => {
    console.log('Email:', email);
    handleConfirmationCodeRequest(email, setConfirmationCodeError);
    alert("da gui OTP thanh cong")
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    handleRegistrationRequest(name, email, emailToken, password, confirmPassword, setRegistrationError);

  };

  return (
    <div>
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
                      <h4 className="text-center">Đăng Ký Email</h4>
                    </div>
                    <div className="card-body">
                      <form id="registrationForm" onSubmit={handleRegistration}>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="name"
                            className="form-control form-control-lg"
                            placeholder="Nhập tên của bạn"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
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

                        <div className="form-outline mb-4 position-relative">
                          <input
                            type="text"
                            id="confirmation-code"
                            className="form-control form-control-lg"
                            placeholder="Nhập mã xác nhận"
                            required
                            value={emailToken}
                            onChange={(e) => setEmailToken(e.target.value)}
                          />
                          <div
                            id="confirmation-code-error"
                            className="text-danger small"
                          >
                            {confirmationCodeError}
                          </div>
                          <button
                            type="button"
                            className="btn btn-primary btn-lg gradient-custom-4 text-body position-absolute top-0 end-0"
                            onClick={handleConfirmationCode}
                          >
                            Lấy Mã
                          </button>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password"
                            className="form-control form-control-lg"
                            placeholder="Nhập mật khẩu của bạn (8-30 ký tự)"
                            required
                            minLength="8"
                            maxLength="30"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="confirm-password"
                            className="form-control form-control-lg"
                            placeholder="Nhập lại mật khẩu của bạn"
                            required
                            minLength="8"
                            maxLength="30"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="agree-terms"
                            required
                          />
                          <label className="form-check-label" htmlFor="agree-terms">
                            Tôi đồng ý với tất cả điều khoản trong
                            <Link to="#" className="text-body">
                              <u>Thỏa thuận sử dụng</u>
                            </Link>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mt-3">
                          <button
                            type="submit"
                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                          >
                            Đăng Ký
                          </button>
                        </div>

                        <p className="text-center text-muted mt-5 mb-0">
                          Đã có tài khoản?
                          <Link to="/Login" className="fw-bold text-body">
                            <u>Đăng Nhập tại đây</u>
                          </Link>
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
};

export default Register;
