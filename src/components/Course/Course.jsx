import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Course.css';
import axios from 'axios';
import course1 from '../../assets/courses-1.jpg';
import { getOwnStudentCourse } from '../../api/auth-services';

const Course = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [licenseid, setLicenseID] = useState('');
  const [userRegisteredCourses, setUserRegisteredCourses] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;

  useEffect(() => {
    const Course_URL = 'https://drivingschoolapi20231005104822.azurewebsites.net/api/Course';

    axios
      .get(Course_URL)
      .then((response) => {
        const courseData = response.data;
        setCourseData(courseData);
        setName(courseData[0].name);
        setPrice(
          Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(courseData[0].price)
        );
        setDuration(courseData[0].duration);
        setDescription(courseData[0].description);
        setLicenseID(courseData[0].licenseid);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // Fetch user's registered courses using the API service function if user and accessToken exist
    if (user && accessToken) {
      getOwnStudentCourse(accessToken)
        .then((response) => {
          const registeredCourses = response.data.map((course) => course.courseId);
          setUserRegisteredCourses(registeredCourses);
          console.log(registeredCourses);
        })
        .catch((error) => {
          console.error('Error fetching user registered courses:', error);
        });
    }
  }, [user, accessToken]);

  const handleRegistrationClick = (courseId) => {
    if (userRegisteredCourses.includes(courseId)) {
      alert('Bạn có thể đăng ký khóa này');
    } else {
      alert('Bạn không thể đăng ký khóa này');
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
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={course.courseId}>
              <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                <div className="text-center p-4 pt-0">
                  <div className="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4">{price}</div>
                  <h5 className="mb-3">{course.name}</h5>
                  <p>{course.description}</p>
                  <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item small">
                      <i className="fa fa-calendar-alt text-primary me-2"></i>
                      {course.duration} Tuần
                    </li>
                  </ol>
                </div>
                <div className="position-relative mt-auto">
                  <img className="img-fluid" src={course1} alt="" />
                  <div className="courses-overlay">
                    <button
                      className="btn btn-outline-primary border-2"
                      onClick={() => handleRegistrationClick(course.courseId)}
                      disabled={userRegisteredCourses.includes(course.courseId)}
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