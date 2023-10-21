import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/bootstrap.scss';
import 'animate.css';

import { CreateSlot, Navbar, Schedule, TakeAttend, Timetable } from './components';
import { Footer } from './containers';
import { Home, Register, Quiz, Login, Courses, ForgotPassword, QuizPage, User, PaySuccess, Mentor, Payment, PaymentFail } from './pages';
import app from './pages/admin/App';
import Dashboard from './pages/admin/scenes/dashboard';
import { Layout } from 'antd';
import authHeader from './api/auth-header';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import authService from './api/auth-services';
import TakeSlot from './components/TakeSlot/TakeSlot';


function AppM() {
    // const { auth } = useAuth();



    const userToken = sessionStorage.getItem("user");
    let role = null

    if (userToken) {
        role = jwtDecode(userToken).role;
    }

    console.log(role);

    return (
        <main className="App">
            <Navbar />
            <Routes>
                {/* public */}
                <Route path="/Home" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Quiz" element={<Quiz />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/TakeSlot" element={<TakeSlot/>} />
                

                {(role === 'Student') && (
                    <>
                    <Route path="/PaySuccess" element={<PaySuccess />} />
                    <Route path="/PayFail" element={<PaymentFail />} />
                    <Route path="/payment" element={<Payment/>}/>
                    </>
                )}

                {(role === 'Mentor') && (
                    <>
                        <Route path="/Mentor" element={<Mentor />}>
                            <Route path="schedule" element={<Schedule />} />
                            <Route path="takeattend" element={<TakeAttend />} />
                            <Route path="createslot" element={<CreateSlot />} />
                        </Route>
                        <Route path="/QuizPage" element={<QuizPage />} />
                        <Route path="/User" element={<User />} />

                    </>
                )}
                {/*Admin page start*/}
                <Route path="/admin" element={<Dashboard />} />
            </Routes>
            {(role === 'User' || role === null) && <Footer />}
        </main>
    );
}

export default AppM;
