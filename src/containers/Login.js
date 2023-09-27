// LoginForm.js
import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styles

function LoginForm() {
  // State variables for email, password, and terms checkbox
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation here (similar to the JavaScript code provided)
    if (!isValidEmail(email)) {
      // Handle invalid email
      return;
    }

    if (!termsAgreed) {
      // Handle terms not agreed
      return;
    }

    if (!isValidPassword(password)) {
      // Handle invalid password
      return;
    }

    // If all validation passes, you can proceed with form submission
    console.log('Form submitted with email:', email, 'and password:', password);
  };

  // Helper functions for validation
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPassword(password) {
    return /^[A-Za-z0-9]{8,30}$/.test(password);
  }

  return (
    <section className="vh-100 bg-image" style={{ background: '#f8f8f8' }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-header bg-warning">
                  <h4 className="text-center">Đăng Nhập</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <input
                        type="email"
                        className={`form-control form-control-lg ${
                          !isValidEmail(email) ? 'is-invalid' : ''
                        }`}
                        placeholder="Nhập email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="password"
                        className={`form-control form-control-lg ${
                          !isValidPassword(password) ? 'is-invalid' : ''
                        }`}
                        placeholder="Nhập mật khẩu của bạn"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        checked={termsAgreed}
                        onChange={() => setTermsAgreed(!termsAgreed)}
                        required
                      />
                      <label className="form-check-label" htmlFor="agree-terms">
                        Tôi đồng ý với tất cả điều khoản trong{' '}
                        <a href="#!" className="text-body">
                          <u>Thỏa thuận sử dụng</u>
                        </a>
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
                      <a href="#" className="text-muted">
                        Quên mật khẩu?
                      </a>
                    </div>
                    <p className="text-center text-muted mt-4">
                      Chưa có tài khoản?{' '}
                      <a href="signup.html" className="fw-bold text-body">
                        <u>Đăng Ký tại đây</u>
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
