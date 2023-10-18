import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext, { AuthProvider } from '../api/Context/AuthProvider';
import axiosClient from '../api/axios';

import '../style/login.css';
import axios from 'axios';

const Authens_URL = 'https://drivingschoolapi20231005104822.azurewebsites.net/api/Authen/login';

const Login = () => {
    // const userRef = useRef()
    // const errRef = useRef()

    const {setAuth} = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // userRef.current.focus()
    }, [])
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(Authens_URL,
                                             JSON.stringify({email,password}),
                                             {
                                                headers: {'Content-type': 'application/json'},
                                                // withCredentials : true
                                             })
        console.log(JSON.stringify(response?.data))
        const accessToken = response?.data?.accessToken;
        setAuth({email, password, accessToken})                 //email : tranthequanganime@gmail.com  password: Anhquang123
        setEmail('')
        setPassword('')
        setSuccess(true)
        }catch(err){
                if(!err?.response){
                    setErrMsg('Error')
                } else if(err.response?.status ===400 ){
                    setErrMsg('Missing')
                }else if(err.response?.status ===401 ){
                    setErrMsg('Unauthorize')
                }else {
                    setErrMsg('Login failed')
                }
                // errRef.current.focus()
    };
    }

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
