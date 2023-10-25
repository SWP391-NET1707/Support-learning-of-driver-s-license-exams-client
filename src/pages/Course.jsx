import React, { useState, useEffect } from 'react';

import { handlePaymentRequest, getCourse } from '../api/auth-services';

import '../components/TakeSlot/TakeSlot.css';

import { useLocation, useNavigate } from 'react-router-dom';




const Course = () => {

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

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

    if (location.search) {

      handleRedirect();

    }

    async function fetchData() {

      try {

        const courseData = await getCourse();

        setCourses(courseData);

      } catch (error) {

        console.error('Error:', error);

      } finally {

        setLoading(false);

      }

    }

    fetchData();

  }, [location.search, transactionStatus]);




  const handleDeposit = async (selectedCourse) => {

    const user = JSON.parse(sessionStorage.getItem("user"));

    try {

      const accessToken = user.accessToken;

      const paymentUrl = await handlePaymentRequest(accessToken, selectedCourse.price);

      if (paymentUrl) {

        setPaymentUrl(paymentUrl);

        window.location.href = paymentUrl;

      } else {

        console.error('Payment failed');

      }

    } catch (error) {

      console.error('An error occurred:', error);

    }

  };




  return (

    <div>

      <div className="event-schedule-area-two bg-color pad100">

        <div className="container">

          <div className="row">

            <div className="col-lg-12">

              <div className="table-responsive">

                <table className="table">

                  <thead>

                    <tr>

                      <th className="text-center" scope="col">Course Name</th>

                      <th scope="col">Description</th>

                      <th scope="col">Price</th>

                      <th scope="col">Button</th>

                    </tr>

                  </thead>

                  <tbody>

                    {loading ? (

                      <tr>

                        <td colSpan="4">Loading...</td>

                      </tr>

                    ) : (

                      courses.map((course) => (

                        <tr key={course.id} className="inner-box">

                          <td>{course.name || 'N/A'}</td>

                          <td>{course.description || 'N/A'}</td>

                          <td>{course.price ? `$${course.price}` : 'N/A'}</td>

                          <td>

                            <div className="primary-btn">

                              <a className="btn btn-primary" onClick={() => handleDeposit(course)}>Button</a>

                            </div>

                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};




export default Course;