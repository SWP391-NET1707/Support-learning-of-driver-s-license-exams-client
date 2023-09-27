import React from 'react';

import './App.css';

import Login from '../../containers/Login';

import Home from '../../containers/Home';

import { BrowserRouter, Route, Switch, Routes } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';

import Preferences from '../Preferences/Preferences';

function App() {

  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/Login" element={<Login />} />
    </Routes>
  );

}

export default App;