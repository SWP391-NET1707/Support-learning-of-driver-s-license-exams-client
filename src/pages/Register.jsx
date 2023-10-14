import React from 'react'
import { Link } from 'react-router-dom';
import '../style/home.css'
import '../style/register.css'

const Register = () => {
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
                      {/* <!-- <h2 className="text-uppercase text-center mb-5">Tạo tài khoản</h2> --> */}
                    </div>
                    <div className="card-body">
                      <form id="registrationForm">

                      <div className="form-outline mb-4">
                          <input
                            type="name"
                            id="name"
                            className="form-control form-control-lg"
                            placeholder="Nhập tên của bạn"
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg"
                            placeholder="Nhập email của bạn"
                            required
                          />
                        </div>

                        <div className="form-outline mb-4 position-relative">
                          <input
                            type="text"
                            id="confirmation-code"
                            className="form-control form-control-lg"
                            placeholder="Nhập mã xác nhận"
                            required
                          />
                          {/* <!-- Thêm phần tử HTML để hiển thị thông báo lỗi --> */}
                          <div
                            id="confirmation-code-error"
                            className="text-danger small"
                          ></div>
                          <button
                            type="button"
                            className="btn btn-primary btn-lg gradient-custom-4 text-body position-absolute top-0 end-0"
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
                            minlength="8"
                            maxlength="30"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="confirm-password"
                            className="form-control form-control-lg"
                            placeholder="Nhập lại mật khẩu của bạn"
                            required
                            minlength="8"
                            maxlength="30"
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
                            <a href="#!" className="text-body"
                            ><u>Thỏa thuận sử dụng</u></a
                            >
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
                          <Link to="/Login" className="fw-bold text-body"
                          ><u>Đăng Nhập tại đây</u></Link
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
  )
}

export default Register;