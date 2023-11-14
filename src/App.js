import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/bootstrap.scss';
import 'animate.css';

import { CreateSlot, License, MentorList, Navbar, Schedule, StaffCourse, StaffQuiz, TakeAttend, Timetable, NavbarStaff,StaffList,CourseList, GuestNavBar} from './components';
import { Footer } from './containers';
import { Home, Register, Quiz, Login, Courses, ForgotPassword, QuizPage, User, PaySuccess, Mentor, Payment, PaymentFail, Test, Mophong, Staff,Admin } from './pages';

import jwtDecode from 'jwt-decode';
import TakeSlot from './components/TakeSlot/TakeSlot';




function AppM() {




    const userToken = sessionStorage.getItem("user");
    let role = null

    if (userToken) {
        role = jwtDecode(userToken).role;
    }

    console.log(role);

    return (
        <main className="App">
            {(role === 'Student' ) && <Navbar />}
            {(role === null) && <GuestNavBar /> }
         
            <Routes>
                {/* public */}
                <Route path="/Home" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Quiz" element={<Quiz />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/Mophong" element={<Mophong />} />
                <Route path="/TakeSlot" element={<TakeSlot />} />
                <Route path="/QuizPage" element={<QuizPage />} />

                {/*Test function page*/}
                <Route path="/test" element={<Test />} />
                <Route path="/test" element={<Test />} />

                {(role === 'Student') && (
                    <>
                        <Route path="/PaySuccess" element={<PaySuccess />} />
                        <Route path="/PayFail" element={<PaymentFail />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/schedule" element={<Schedule />} />
                        <Route path="/QuizPage/:id" element={<QuizPage />} />
                        <Route path="/User" element={<User />} />
                        <Route path="/PaySuccess" element={<PaySuccess />} />
                        <Route path="/PayFail" element={<PaymentFail />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/schedule" element={<Schedule />} />
                       
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
                {(role === 'Admin') &&(
                    <>
                <Route path="/Admin" element={<Admin />} >
                    {/* <Route path="MentorList" element={<MentorList/>}/> */}
                    <Route path="StaffList" element={<StaffList/>}/>
                    <Route path="CourseList" element={<CourseList/>}/>
                </Route>    
                </>
                )}





            </Routes>
            {(role === 'Student' || role === null) && <Footer />}
        </main>
    );
}

export default AppM;
