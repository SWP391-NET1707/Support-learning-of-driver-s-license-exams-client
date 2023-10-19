import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/bootstrap.scss';
import 'animate.css';

import { Navbar, TakeAttend, Timetable } from './components';
import { Footer } from './containers';
import { Home, Register, Quiz, Login, Courses, ForgotPassword, QuizPage, User, PaySuccess } from './pages';
import app from './pages/admin/App';
import Dashboard from './pages/admin/scenes/dashboard';
import { Layout } from 'antd';
import RequiredAuth from './components/RequiredAuth';
import useAuth from './Hooks/useAuth';
import authHeader from './api/auth-header';

function AppM() {
    // const { auth } = useAuth();

    // console.log(authHeader());

    return (
        <main className="App">
            <Navbar />
            <Routes>
            
                <Route path="/Home" element={<Home />} />
                <Route path="/Login" element={<Login />} />                            <Route path="/Quiz" element={<Quiz />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                {/* User */}
                <Route element={<RequiredAuth allowedRoles={"Mentor"}/>}>
                    <Route path="/Timetable" element={<Timetable />} />
                    <Route path="/QuizPage" element={<QuizPage />} />
                    <Route path="/User" element={<User />} />
                    {/* Mentor */}
                    <Route path="/takeattend" element={<TakeAttend />} />


                    {/* <Route path="/PaySuccess" element={<PaySuccess />} /> */}

                  {/*Admin page start*/}
                  <Route path="/admin" element={<Dashboard />} />
                </Route>
            </Routes>
            <Footer />
        </main>
    );
}

export default AppM;
