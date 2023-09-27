
import './App.css';
import React from 'react';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/bootstrap.scss';
import 'animate.css';

import {  Course, Navbar } from './components';
import { Footer } from './containers';
import { Home , Register , Quiz , Login , Courses , ForgotPassword } from './pages';

function App() {

  return (
    <Router>
    <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Courses" element={<Courses/>} />
          <Route path="/Quiz" element={<Quiz/>} />
          <Route path="/Register" element={<Register/>} />
        </Routes>
        <Footer />
    </div>
    </Router>
  );
}

export default App;
