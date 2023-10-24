import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ condition, component: Component, ...rest }) => (
  <Route
    {...rest}
    element={condition ? <Component /> : <Navigate to="/schedule" />}
  />
);

export default PrivateRoute;
