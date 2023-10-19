

import axios from 'axios'
import React from 'react'
import { json } from 'react-router-dom'
import useAuth from '../Hooks/useAuth';

const API_URL = "https://drivingschoolapi20231005104822.azurewebsites.net/api"

const signup = (email,password) => {
  return axios.post('',{
    email,
    password,
  })
  .then((response)=>{
    if (response.data.accessToken){
        localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data
  })
}

const login = (email, password) => {
    return axios
      .post(API_URL + "/Authen/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  };

  const logout = () => {
    localStorage.removeItem("user");
  };
  
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  
  const authService = {
    signup,
    login,
    logout,
    getCurrentUser,
  };
  
  export default authService;