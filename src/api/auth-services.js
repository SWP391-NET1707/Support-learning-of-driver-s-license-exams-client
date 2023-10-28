



import axios from 'axios'
import React from 'react'
import { json } from 'react-router-dom'

const API_URL = "https://drivingschoolapi20231005104822.azurewebsites.net/api"
const Registration_URL = 'https://drivingschoolapi20231005104822.azurewebsites.net/api/User/register/email';
const ConfirmationCode_URL = 'https://drivingschoolapi20231005104822.azurewebsites.net/api/User/otp/email';
const Course_URL = `${API_URL}/Course`;

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
  try{
    const response = await axios
    .post(API_URL + "/Authen/login", {
      email,
      password,
    });
  if (response.data.accessToken) {
    sessionStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;}
  catch (err) {
    alert(err.response.data)
  }
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
    alert("dang ki thanh cong")
    // window.location.href="/home"
    // if (response.status === 200) {
    //   console.log('Registration successful');
    // } else {
    //   console.log('Registration failed');
    // }

    // Reset form fields and errors
    // setRegistrationError('');
  } catch (err) {
    alert(err.response.data)
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

export async function handlePaymentRequest(accessToken, amount) {
  try {
    const response = await axios.post(
      'https://drivingschoolapi20231005104822.azurewebsites.net/api/Transaction/deposit/vnpay',
      {
        amount,
        redirectUrl: 'http://localhost:3000/Schedule',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    if (response.status === 200) {
      const { paymentUrl } = response.data;
      return paymentUrl;
    } else {
      console.error('Payment failed');
      return null;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
}


export async function getLicense() {
  try {
    const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/License');

  

    
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getLicenseById(id) {
  try {
    const response = await axios.get(`https://drivingschoolapi20231005104822.azurewebsites.net/api/License/${id}`);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function DeleteLicenseById(id) {
  try {
    const response = await axios.delete(`https://drivingschoolapi20231005104822.azurewebsites.net/api/License/${id}`);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}


export async function putLicenseById( name, id) {
  try {
    const response = await axios.put(`https://drivingschoolapi20231005104822.azurewebsites.net/api/License/${id}`, {
      name
    });

    console.log('Response:', response);

    if (response.status === 200) {
      console.log('License successfully updated');
    } else {
      console.log('License updating failed');
    }
    return response.data;
  } catch (err) {
    console.error('Error during license update:', err);
  }
}

export async function getSlot() {
  try {
    const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/Slot');
    const data = response.data; // Store the response data in a variable

    // console.log('Slot Data:', data); 

    return data;
  } catch (error) {
    alert(error.response.data)
  }
}

export async function getSlotbyMentor(accessToken) {
  try {
    const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/Slot/get-slot-bymentor', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = response.data; // Store the response data in a variable

    // console.log('Slot Data:', data); // Log the data

    return data;
  } catch (error) {
    console.error('Error fetching slot data:', error);
    throw error; // Rethrow the error to handle it at a higher level
  }
}

export async function getWallet(accessToken) {
  try {
    const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/Wallet/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

   

   
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getSlotTime() {
  try {
    const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/SlotTime');

 

   
    // console.log(response.data);
  } catch (error) {
    alert(error.response.data)
  }
}

export async function getSlotTimeById(id) {
  try {
    const response = await axios.get(`https://drivingschoolapi20231005104822.azurewebsites.net/api/SlotTime/${id}`);
    const { startTime, endTime } = response.data;
   return { startTime, endTime };
 
  } catch (error) {
    alert(error.response.data)
  }
}

export async function postSlotTime(startTime, endTime,id) {
  try {
    const response = await axios.get(`https://drivingschoolapi20231005104822.azurewebsites.net/api/SlotTime/update/${id}`,{
      startTime,
      endTime
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function DeleteSlotTimeById(id) {
  try {
    const response = await axios.delete(`https://drivingschoolapi20231005104822.azurewebsites.net/api/SlotTime/${id}`);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getCourse() {
  try {
    const response = await axios.get(Course_URL);

    return response.data
  } catch (error) {
    alert(error.response.data)
  }
}

export async function getCourseById(id) {
  try {
    const response = await axios.get(Course_URL+ `/${id}`);

 

    
    return(response.data);
  } catch (error) {
    alert(error.response.data)
  }
}

export async function PostCourse(name, price, duration, description, licenseId) {
  try {
    const response = await axios.post(Course_URL, {
      name,
      price,
      duration,
      description,
      licenseId,
    });

    console.log('Response:', response);

    if (response.status === 200) {
      console.log('Course successfully posted');
    } else {
      console.log('Course posting failed');
    }
  } catch (err) {
    console.error('Error during course posting:', err);
  }
}
  
export async function putCourseById(name, price, duration, description, licenseId, id) {
  try {
    const response = await axios.put(Course_URL+ `/${id}`, {
      name,
      price,
      duration,
      description,
      licenseId,
    });

    console.log('Response:', response);

    if (response.status === 200) {
      console.log('Course successfully updated');
    } else {
      console.log('Course updating failed');
    }
  } catch (err) {
    console.error('Error during course update:', err);
  }
}


export async function DeleteCourseById(id) {
  try {
    const response = await axios.put(Course_URL+ `/${id}`);

    console.log('Response:', response);

    if (response.status === 200) {
      console.log('Course successfully deleted');
    } else {
      console.log('Course deletion failed');
    }
  } catch (err) {
    console.error('Error during course update:', err);
  }
}


export async function getMentor() {
  try {
    const response = await axios.get(`https://drivingschoolapi20231005104822.azurewebsites.net/api/User/get/mentor`);
    const data = response.data; // Store the response data in a variable

    console.log('Mentor Data:', data); // Log the data

    return data;
  } catch (error) {
    console.error('Error fetching mentor data:', error);
    throw error; // Rethrow the error to handle it at a higher level
  }
}

export async function postSlot(slotTimeId, courseId, description, monthYear, accessToken) {
  try {
    
    const response = await axios.post(`https://drivingschoolapi20231005104822.azurewebsites.net/api/Slot/mentor`, {
      slotTimeId,
      courseId,
      description,
      monthYear
    },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    // alert(response.data)

    // if (response.status === 200) {
    //   console.log('Slot successfully updated');
    // } else {
    //   console.log('Slot updating failed');
    // }
  } catch (error) {
    if (error.response) {
  
      alert(error.response.data);
  }
  }

 
}

export async function getStudentCourse(accessToken) {
  try {
    const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/StudentCourse',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

 

   
    // console.log(response.data);
  } catch (error) {
    alert(error.response.data)
  }
}


export async function afterPaymentSuccess(id,accessToken) {
  try {
    const response = await axios.get(`https://drivingschoolapi20231005104822.azurewebsites.net/api/StudentCourse/${id}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }
    );

   
     console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getStudentCourseById(id) {
  try {
    const response = await axios.get(`https://drivingschoolapi20231005104822.azurewebsites.net/api/StudentCourse/get-student-course/${id}`);

 

   
    // console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}
export async function getOwnStudentCourse(accessToken) {
  try {
    const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/StudentCourse/get-course-by-me',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });


    return response


  } catch (error) {
    console.error('Error:', error);
  }
}


export async function postStudentSlot( id, accessToken){

try {
    const response = await axios.get(`https://drivingschoolapi20231005104822.azurewebsites.net/api/Slot/register/slot/bystudent/${id}`,
    
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    console.log(response)
    alert("đăng kí thành công")
    return response.data
    
  } catch (error) {
    alert(error.response.data)
  }
}

export async function postTakeAttendant( id, isAttended ,accessToken){

  try {
      const response = await axios.get(`https://drivingschoolapi20231005104822.azurewebsites.net/api/Slot/attendance-report/{id}`,
      
      {
        id,
        isAttended,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      console.log(response)
      alert("điểm danh thành công")
      return response.data
    } catch (error) {
      // alert(error.response.data)
    }
  }