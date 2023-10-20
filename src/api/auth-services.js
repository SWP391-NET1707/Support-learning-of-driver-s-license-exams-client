

import axios from 'axios';

const Authens_URL = 'https://drivingschoolapi20231005104822.azurewebsites.net/api/Authen/login';
const Registration_URL = 'https://drivingschoolapi20231005104822.azurewebsites.net/api/User/register/email';
const ConfirmationCode_URL = 'https://drivingschoolapi20231005104822.azurewebsites.net/api/User/otp/email';

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

export async function handleRegistrationRequest(name, email, emailToken, password, confirmPassword, setRegistrationError) {
  try {
    const response = await axios.post(Registration_URL, {
      name,
      email,
      emailToken,
      password,
      confirmPassword,
    });

    if (response.status === 200) {
      console.log('Registration successful');
    } else {
      console.log('Registration failed');
    }

    // Reset form fields and errors
    setRegistrationError('');
  } catch (err) {
    console.error('Error during registration:', err);
    if (!err.response) {
      setRegistrationError('Error');
    } else {
      setRegistrationError('Registration successful');
    }
  }
}

export async function handleConfirmationCodeRequest(email, setConfirmationCodeError) {
  if (!email || !isValidEmail(email)) {
    console.log('Invalid or missing email.');
    return;
  }

  try {
    const response = await axios.post(ConfirmationCode_URL, email, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      console.log('Email sent successfully');
    } else if (response.status === 409) {
      console.log('Email is already in use.');
    } else {
      console.log('Error sending email.');
    }
  } catch (err) {
    console.error('Error sending email:', err);
    if (!err.response) {
      setConfirmationCodeError('Error');
    } else {
      setConfirmationCodeError('Failed to request confirmation code.');
    }
  }
}

const isValidEmail = (email) => {
  console.log(email);
  // Use a regular expression to validate the email format
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailPattern.test(email);
}




  
  // const authService = {
  //   signup,
  //   login,
  //   logout,
  //   getCurrentUser,
  // };
  
