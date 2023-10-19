
import axios from 'axios'
import React from 'react'
import { json } from 'react-router-dom'

const API_URL = "https://drivingschoolapi20231005104822.azurewebsites.net/api"

const signup = async (email,password) => {
  const response = await axios.post('', {
    email,
    password,
  });
  if (response.data.accessToken) {
    sessionStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
}

const login = async (email, password) => {
    const response = await axios
    .post(API_URL + "/Authen/login", {
      email,
      password,
    });
  if (response.data.accessToken) {
    sessionStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
  };

  const logout = () => {
    sessionStorage.removeItem("user");
  };
  
  const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem("user"));
  };
  
  const authService = {
    signup,
    login,
    logout,
    getCurrentUser,
  };
  
  export default authService;