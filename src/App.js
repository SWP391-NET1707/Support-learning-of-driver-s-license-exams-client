import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/bootstrap.scss';
import 'animate.css';

import { CreateSlot, License, MentorList, Navbar, Schedule, StaffCourse, StaffQuiz, TakeAttend, Timetable, NavbarStaff } from './components';
import { Footer } from './containers';
import { Home, Register, Quiz, Login, Courses, ForgotPassword, QuizPage, User, PaySuccess, Mentor, Payment, PaymentFail, Test, Mophong, Staff } from './pages';
import app from './pages/admin/App';
import Dashboard from './pages/admin/scenes/dashboard';
import { Layout } from 'antd';
import authHeader from './api/auth-header';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import authService from './api/auth-services';
import TakeSlot from './components/TakeSlot/TakeSlot';

import StudentCourseList from './components/Staff/StudentList';



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
            {(role === 'Student' || role === null) && <Navbar />}
            {/* {(role === 'Staff') && <NavbarStaff />} */}
            <Routes>
                {/* public */}
                <Route path="/Home" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Quiz" element={<Quiz />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/Mophong" element={<Mophong />} />
                <Route path="/TakeSlot" element={<TakeSlot />} />

                {/*Test function page*/}
                <Route path="/test" element={<Test />} />
                <Route path="/test" element={<Test />} />

                {(role === 'Student') && (
                    <>
                        <Route path="/PaySuccess" element={<PaySuccess />} />
                        <Route path="/PayFail" element={<PaymentFail />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/schedule" element={<Schedule />} />
                        <Route path="/QuizPage" element={<QuizPage />} />
                        <Route path="/User" element={<User />} />
                        <Route path="/PaySuccess" element={<PaySuccess />} />
                        <Route path="/PayFail" element={<PaymentFail />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/schedule" element={<Schedule />} />
                        <Route path="/QuizPage" element={<QuizPage />} />
                        <Route path="/User" element={<User />} />
                    </>
                )}

                {(role === 'Mentor') && (
                    <>
                        <Route path="/Mentor" element={<Mentor />}>
                            <Route path="takeattend" element={<TakeAttend />} />
                            <Route path="createslot" element={<CreateSlot />} />
                        </Route>
                        <Route path="/QuizPage" element={<QuizPage />} />
                        <Route path="/User" element={<User />} />

                    </>
                )}
                {(role === 'Staff') && (
                    <>
                        <Route path="/Staff" element={<Staff />} >
                            <Route path="License" element={<License />} />
                            <Route path="MentorList" element={<MentorList />} />
                            <Route path="StaffCourse" element={<StaffCourse />} />
                            <Route path="StaffQuiz" element={<StaffQuiz />} />
                        </Route>
                    </>
                )}
                {/*Admin page start*/}
                <Route path="/admin" element={<Dashboard />} />






            </Routes>
            {(role === 'Student' || role === null) && <Footer />}
        </main>
    );
}

export default AppM;
