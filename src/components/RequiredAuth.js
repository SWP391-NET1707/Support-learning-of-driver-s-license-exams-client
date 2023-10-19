

import React from 'react'
import useAuth from '../Hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequiredAuth = ({allowedRoles}) => {
  const {auth} = useAuth()
  const location = useLocation();
    return (
      auth?.role && (auth.role === "mentor" || auth.role === "student")
      // auth?.role?.find(role => allowedRoles?.include(role))
        ?<Outlet/>
        :<Navigate to="/login" state={{from:location}} replace />
  )
}

export default RequiredAuth