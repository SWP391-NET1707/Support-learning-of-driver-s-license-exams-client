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

function AppM() {
  return (
      <Router>
          <div className="App">
              <Navbar />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Login" element={<Login />} />                              {/* <Route path="/Courses" element={<Courses />} /> */}
                  <Route path="/Quiz" element={<Quiz />} />
                  <Route path="/Register" element={<Register />} />
                  <Route path="/Timetable" element={<Timetable />} />
                  <Route path="/ForgotPassword" element={<ForgotPassword />} />
                  <Route path="/QuizPage" element={<QuizPage />} />
                  <Route path="/User" element={<User />} />
                  {/* <Route path="/PaySuccess" element={<PaySuccess />} /> */}

                  {/*Admin page start*/}
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/takeattend" element={<TakeAttend />} />
              </Routes>
              <Footer />
          </div>
      </Router>
  );
}

export default AppM;
