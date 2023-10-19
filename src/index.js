import React from 'react';
import ReactDOM from 'react-dom';
import AppM from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/*' element={<AppM />}/>
        </Routes>
    </BrowserRouter>


  </React.StrictMode>,
  document.getElementById('root')
);
