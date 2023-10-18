import React from 'react';
import ReactDOM from 'react-dom';
import AppM from './App';
import { AuthProvider } from './api/Context/AuthProvider';


ReactDOM.render(
  <React.StrictMode>
      <AuthProvider>
      <AppM />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
