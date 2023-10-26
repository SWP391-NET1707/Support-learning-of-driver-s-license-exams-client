import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Course.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import course1 from '../../assets/courses-1.jpg';
import { getOwnStudentCourse, handlePaymentRequest, getCourse } from '../../api/auth-services';

const Course = () => {
  const [id, setId] = useState();
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [licenseid, setLicenseID] = useState('');
  const [userRegisteredCourses, setUserRegisteredCourses] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;

  const [paymentUrl, setPaymentUrl] = useState('');

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const transactionStatus = searchParams.get('vnp_TransactionStatus');

  const navigate = useNavigate();

  const handleRedirect = () => {
    if (transactionStatus === '00') {
      navigate('/paysuccess');
    } else {
      navigate('/payfail');
    }
  };

  useEffect(() => {
    // Fetch course data only when it hasn't been fetched yet
    if (user && accessToken && courseData.length === 0) {
      const Course_URL = 'https://drivingschoolapi20231005104822.azurewebsites.net/api/Course';
      axios
        .get(Course_URL)
        .then((response) => {
          const courseData = response.data;
          setCourseData(courseData);
          setId(courseData.id);
          setName(courseData.name);
          setPrice(courseData.price);
          setDuration(courseData.duration);
          setDescription(courseData.description);
          setLicenseID(courseData.licenseid);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }

    if (location.search) {
      handleRedirect();
    }

    // Fetch user's registered courses using the API service function if user and accessToken exist
    if (user && accessToken && userRegisteredCourses.length === 0) {
      getOwnStudentCourse(accessToken)
        .then((response) => {
          const registeredCourses = response.data.map((course) => course.courseId);
          setUserRegisteredCourses(registeredCourses);
        })
        .catch((error) => {
          console.error('Error fetching user registered courses:', error);
        });
    }
  }, [user, accessToken, courseData, location.search, userRegisteredCourses]);

  const handleRegistrationClick = async (selectedCourse,price) => {
    if (userRegisteredCourses.includes(selectedCourse)) {
      alert('Bạn đã đăng ký khóa này');
    } else {
      try {
        sessionStorage.setItem('courseId', selectedCourse);
        const accessToken = user.accessToken;
        const paymentUrl = await handlePaymentRequest(accessToken, price);
        if (paymentUrl) {
          setPaymentUrl(paymentUrl);
          window.location.href = paymentUrl;
        } else {
          console.error('Payment failed');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  };

  return (
    <div className="container-xxl courses my-6 py-6 pb-0">
      <div className="container">
        <div className="text-center mx-auto mb-5 wow fadeInUp content-max-w" data-wow-delay="0.1s">
          <h6 className="text-primary text-uppercase mb-2">Khóa học hiện tại</h6>
          <h1 className="display-6 mb-4">Dịch vụ của chúng tôi</h1>
        </div>
        <div className="row g-4 justify-content-center">
          {courseData.map((course) => (
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={course.id}>
              <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                <div className="text-center p-4 pt-0">
                  <div className="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4">{ Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}</div>
                  <h5 className="mb-3">{course.name}</h5>
                  <p>{course.description}</p>
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item small">
                      <i className="fa fa-calendar-alt text-primary me-2"></i>
                      {course.duration} Buổi
                    </li>
                  </ol>
                </div>
                <div className="position-relative mt-auto">
                  <img className="img-fluid" src={course1} alt="" />
                  <div className="courses-overlay">
                    <button
                      className="btn btn-outline-primary border-2"
                      onClick={() => handleRegistrationClick(course.id,course.price)}
                      disabled={userRegisteredCourses.includes(course.id)}
                    >
                      Đăng ký
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;