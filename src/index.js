import React from 'react';
import ReactDOM from 'react-dom';
import AppM from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<AppM />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
