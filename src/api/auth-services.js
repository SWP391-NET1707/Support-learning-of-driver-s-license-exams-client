



import axios from 'axios'
import React from 'react'
import { act } from 'react-dom/test-utils';
import { json } from 'react-router-dom'

const API_URL = "https://drivingschoolswp391.azurewebsites.net/api"
const Registration_URL = 'https://drivingschoolswp391.azurewebsites.net/api/User/register/email';
const ConfirmationCode_URL = 'https://drivingschoolswp391.azurewebsites.net/api/User/otp/email';
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
  // console.log(email);
  // Use a regular expression to validate the email format
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailPattern.test(email);
}

export async function handlePaymentRequest(accessToken, amount) {
  try {
    const response = await axios.post(
      `${API_URL}/Transaction/deposit/vnpay`,
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

export async function postLicense(license, accessToken) {
  try {
    const response = await axios.post(`${API_URL}/License`,
    license,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    alert("Tao thanh cong")
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getLicense() {
  try {
    const response = await axios.get(`${API_URL}/License`);

    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getLicenseById(id) {
  try {
    const response = await axios.get(`${API_URL}/License/${id}`);

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function DeleteLicenseById(id, accessToken) {
  try {
    const response = await axios.delete(`${API_URL}/License/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    // console.log(response.data);
    alert("Xóa Thành C")
    return response.data;

  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}


export async function putLicenseById( id, name, accessToken) {
  try {
    const response = await axios.put(`${API_URL}/License/${id}`, 
      name,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    // console.log('Response:', response);

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
    const response = await axios.get(`${API_URL}/Slot`);
    const data = response.data; // Store the response data in a variable

    // console.log('Slot Data:', data); 

    return data;
  } catch (error) {
    alert(error.response.data)
  }
}

export async function getSlotbyMentor(accessToken) {
  try {
    const response = await axios.get(`${API_URL}/Slot/get-slot-bymentor`, {
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
    const response = await axios.get(`${API_URL}/Wallet/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

   

   
    // console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getSlotTime() {
  try {
    const response = await axios.get(`${API_URL}/SlotTime`);
    return response.data
    // console.log(response.data);
  } catch (error) {
    alert(error.response.data)
  }
}

export async function getSlotTimeById(id) {
  try {
    const response = await axios.get(`${API_URL}/SlotTime/${id}`);
    const { startTime, endTime } = response.data;
   return { startTime, endTime };
 
  } catch (error) {
    alert(error.response.data)
  }
}

export async function postSlotTime(startTime, endTime,id) {
  try {
    const response = await axios.get(`${API_URL}/SlotTime/update/${id}`,{
      startTime,
      endTime
    });

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function deleteSlotTimeById(id) {
  try {
    const response = await axios.delete(`${API_URL}/SlotTime/${id}`);

    // console.log(response.data);
    return response.data
  } catch (error) {
    alert(error.response.data)

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

export async function postCourse(name, price, duration, description, licenseId) {
  try {
    const response = await axios.post(Course_URL, {
      "name":name,
      "price":price,
      "duration":duration,
      "description":description,
      "licenseId":licenseId,
    });

    if (response.status === 200) {
      alert('Course successfully posted');
    } else {
      alert('Course posting failed');
    }
  } catch (err) {
    console.error('Error during course posting:', err);
  }
}
  
export async function putCourseById(id,name, price, duration, description, licenseId) {
  try {
    const response = await axios.put(`${API_URL}/Course/update/${id}`, {
      name,
      price,
      duration,
      description,
      licenseId,
    });

    if (response.status === 200) {
      alert('Course successfully updated');
    } else {
      alert('Course updating failed');
    }
  } catch (err) {
    console.error('Error during course update:', err);
  }
}


export async function DeleteCourseById(id, accessToken) {
  try {
    const response = await axios.delete(Course_URL+ `/delete/${id}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    // console.log('Response:', response);

    if (response.status === 200) {
      alert('Course successfully deleted');
    } else {
      alert('Course deletion failed');
    }
  } catch (err) {
    console.error('Error during course update:', err);
  }
}


export async function getMentor() {
  try {
    const response = await axios.get(`${API_URL}/User/get/mentor`);
    const data = response.data; // Store the response data in a variable

    const transformedData = data.map(mentor => ({
      id: mentor.id,
      name: mentor.name,
      email: mentor.email,
      password: mentor.password,
      active: mentor.active,
      mentorLicenses: mentor.mentorLicenses,
    }));

    return transformedData;
  } catch (error) {
    console.error('Error fetching mentor data:', error);
    throw error; // Rethrow the error to handle it at a higher level
  }
}

export async function postSlot(slotTimeId, courseId, description, monthYear, accessToken) {
  try {
    
    const response = await axios.post(`${API_URL}/Slot/mentor`, {
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

    alert("Tạo thành công")

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
    const response = await axios.get(`${API_URL}/StudentCourse`,{
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
    const response = await axios.get(`${API_URL}/StudentCourse/${id}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }
    );

   
    //  console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getStudentCourseById(id) {
  try {
    const response = await axios.get(`${API_URL}/StudentCourse/get-student-course/${id}`);

 

   
    // console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}
export async function getOwnStudentCourse(accessToken) {
  try {
    const response = await axios.get(`${API_URL}/StudentCourse/get-course-by-me`,{
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
    const response = await axios.get(`${API_URL}/Slot/register/slot/bystudent/${id}`,
    
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    // console.log(response)
    alert("đăng kí thành công")
    return response.data
    
  } catch (error) {
    alert(error.response.data)
  }
}

export async function postTakeAttendant(id, isAttended, accessToken) {
  try {
    const response = await axios.get(`${API_URL}/Slot/attendance-report/${id}?attendance=${isAttended}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    alert("Điểm danh thành công");
    return response.data;
  } catch (error) {
    alert(error.response.data);
  }
}


  export async function postMentor(name,email,password,mentorLicenseId, accessToken) {
    try {
      const response = await axios.post(`${API_URL}/User/register/mentor`,
      {
      "name" : name,
      "email": email,
      "password":password,
      "mentorLicenseId":mentorLicenseId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      alert("Tao thanh cong")
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export async function putMentorById(id, name, password, active, mentorLicenseId, accessToken) {
    try {
      const response = await axios.put(
        `${API_URL}/User/update/mentor/${id}`,
        {
          "name": name,
          "password": password,
          "active": active,
          "mentorLicenseId": mentorLicenseId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      alert(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Error Response Data:', error.response.data);
      } else {
        console.error('Error:', error);
      }
    }
  }

  export async function DeleteMentorbyID(id, accessToken) {
    try {
      const response = await axios.put(`${API_URL}/User/delete/mentor/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      alert("xoa thanh cong")
    } catch (error) {
      console.error('Error:', error);
    }
  }
  export async function getQuestionInQuizz(quizId, accessToken){
    try{
      const response = await axios.get(`${API_URL}/Question/quiz-staff/${quizId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return response.data;
    }catch(error){
      console.error('Error:', error);
    }
  }
  export async function postQuestion(accessToken, dataToAdd){
    try {
      // console.log(dataToAdd);
      const response = await axios.post(`${API_URL}/Question/create`, dataToAdd, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      alert("Them cau hoi thanh cong");
    } catch (error) {
      console.error('Error:', error);
    }
  }




  export async function updateQuestion(questionId, accessToken, dataToUpdate) {
    try {
      const response = await axios.put(
        `${API_URL}/Question/update/${questionId}`,
        dataToUpdate, 
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'accept': '*/*',
          },
        }
      );
  
      if (response.status === 200) {
        alert('Cập nhật câu hỏi thành công');
        return response.data; 
      } else {
        console.error('Lỗi: Không thành công');
        
      }
    } catch (error) {
      console.error('Lỗi:', error);
      
    }
  }
  export async function deleteQuestion(questionId, accessToken){
    try {
      const response = await axios.delete(
        `${API_URL}/Question/delete/${questionId}`, 
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Cập nhật câu hỏi thành công');
    } catch (error) {
      console.error('Lỗi:', error);
    }
  }

  export async function getQuizz(accessToken) {
    try {
      const response = await axios.get(`${API_URL}/Quizz`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      return response.data
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export async function getQuizzbyId(accessToken, id) {
    try {
      const response = await axios.get(`${API_URL}/Quizz/${id}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      return response.data
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export async function postQuizz(name, licenseId, accessToken) {
    try {
      const response = await axios.post(`${API_URL}/Quizz/create`,
      {
      "name" : name,
      "licenseId": licenseId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      alert("Tạo Bài Quiz thành công")
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export async function putQuizzById(id, name, licenseId, accessToken) {
    try {
      const response = await axios.put(
        `${API_URL}/Quizz/${id}`,
      {
      "name" : name,
      "licenseId": licenseId,
      },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      alert("Sửa đổi thành công");
    } catch (error) {
      if (error.response) {
        console.error('Error Response Data:', error.response.data);
      } else {
        console.error('Error:', error);
      }
    }
  }

  export async function deleteQuizzById(id, accessToken) {
    try { 
      const response = await axios.delete(`${API_URL}/Quizz/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      alert("Xóa thanh cong")
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export async function getStaff(accessToken){
    try {
      const response = await axios.get(`${API_URL}/User/get/staff`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = response.data;
      const transformedData = data.map(staff => ({
        id: staff.id,
        name: staff.name,
        email: staff.email,
        password: staff.password,
        active: staff.active,
        
      }));
      
      return transformedData;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export async function putStaff(id, name, password, active){
    try {
      const response = await axios.put(`${API_URL}/User/update/staff/${id}`,
      {
       "name" : name,
       "password" : password,
       "active" : active  
      },
      {
        
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${accessToken}`
        // }
      });
  
      return response.data
    } catch (error) {
      console.error('Error:', error);
    }
  }

   export async function postStaff(accessToken,name,email,password){
    try {
      const response = await axios.post(`${API_URL}/User/register/staff`,
      {
       "name" : name,
       "email" : email,
       "password" : password,
       
      },
      {
        
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
      return response.data
    } catch (error) {
      console.error('Error:', error);
    }
   }

export async function getQuestionById(id, accessToken) {
  try {
    const response = await axios.get(`${API_URL}/Question/quiz-staff/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        // Add any other headers you need here
      },
    });
    // console.log(response)

    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('API response is not an array:', response.data);
      throw new Error('API response is not as expected');
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}
  
  export async function getRegisteredSlots(accessToken) {
    try {
      const response = await axios.get(`${API_URL}/Slot/get/slot/by-student-registered`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          // Add any other headers you need here
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error; // You can handle the error as needed in your application
    }
  }

  export async function getStudentById(id, accessToken) {
    try {
      const response = await axios.get(`${API_URL}/User/get/student/${id}`, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          // Add any other headers you need here
        },
      }
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error; // You can handle the error as needed in your application
    }
  }

  export async function postStudentQuiz(accessToken, dataToAdd) {
    try {
      // console.log(dataToAdd);
      const response = await axios.post(`${API_URL}/StudentQuiz`, dataToAdd, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export async function putStudentProfile(name, password, accessToken) {
    try {
      const response = await axios.put(`${API_URL}/User/update/student`, 
      {
        "name": name,
        "password": password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          // Add any other headers you need here
        },
      }
      );
       alert("Đổi thành công, Xin hãy đăng nhập lại")
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export async function postForgotpwd(email, password, confirmPassword,  emailToken) {
    try {
      const response = await axios.post(`${API_URL}/User/forgot-password/student`, 
      {
        "email": email,
        "password": password,
        "confirmPassword": confirmPassword,
        "emailToken": emailToken
      }
      );
       alert("Lấy lại mật khẩu thành công, Xin hãy đăng nhập lại")
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export async function getOtpResetPwd(email){
    try {
      const response = await axios.post(`${API_URL}/User/otp/email/forgotpassword`, email,
      {headers: { 'Content-Type': 'application/json' }}
      );
       alert("Gửi mã thành công")
    } catch (error) {
      console.error('Error:', error);
    }
  }

  export async function getPointByQuizId(accessToken, id){
    try{
      const response = await axios.get(`${API_URL}/StudentQuiz/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          // Add any other headers you need here
        }}
      )
      console.log(response.data)
      return response.data;
    }
    catch (error) {
      console.error('Error:', error);
    }
  }

  export async function postStudentScorebyQuizId(accessToken, quizId, score){
    try{
      const response = await axios.post(`${API_URL}/StudentQuiz`, quizId, score,  {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
          // Add any other headers you need here
        }}
      )
      
    }
    catch (error) {
      console.error('Error:', error);
    }
  }


