import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Course.css'
import course1 from '../../assets/courses-1.jpg'
import course2 from '../../assets/courses-2.jpg'
import course3 from '../../assets/pexels-ingo-joseph-543605.jpg'
import axios from 'axios'


const Course = () => {

    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [duration,setDuration] = useState('')
    const [description,setDescription] = useState('')
    const [licenseid,setLicenseID] = useState('')

    useEffect(() => {
        const Course_URL = 'https://drivingschoolapi20231005104822.azurewebsites.net/api/Course';

      axios.get(Course_URL).then(response =>{
        const courseData = response.data;
        setName(courseData[0].name);
        setPrice(Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(courseData[0].price));
        setDuration(courseData[0].duration);
        setDescription(courseData[0].description);
        setLicenseID(courseData[0].licenseid);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
    


  return (
    <div className="container-xxl courses my-6 py-6 pb-0">
        <div className="container">
            <div className="text-center mx-auto mb-5 wow fadeInUp content-max-w" data-wow-delay="0.1s" >
                <h6 className="text-primary text-uppercase mb-2">Khóa học hiện tại</h6>
                <h1 className="display-6 mb-4">Dịch vụ của chúng tôi</h1>
            </div>
            <div className="row g-4 justify-content-center">
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                        <div className="text-center p-4 pt-0">
                            <div className="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4">{price}</div>
                            <h5 className="mb-3">{name}</h5>
                            <p>{description}</p>
                            <ol className="breadcrumb justify-content-center mb-0">
                                
                                <li className="breadcrumb-item small"><i className="fa fa-calendar-alt text-primary me-2"></i>{duration} Tuần</li>
                            </ol>
                        </div>
                        <div className="position-relative mt-auto">
                            <img className="img-fluid" src={course1} alt="" />
                            <div className="courses-overlay">
                                <a className="btn btn-outline-primary border-2" href="/">Đăng kí</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                        <div className="text-center p-4 pt-0">
                            <div className="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4">17.480.000 VNĐ</div>
                            <h5 className="mb-3">Học & Thi bằng lái xe B2</h5>
                            <p>Hỗ trợ đào tạo và đăng ký thi bằng lái xe hạng B2</p>
                            <ol className="breadcrumb justify-content-center mb-0">
                                
                                <li className="breadcrumb-item small"><i className="fa fa-calendar-alt text-primary me-2"></i>3 Tuần</li>
                            </ol>
                        </div>
                        <div className="position-relative mt-auto">
                            <img className="img-fluid" src={course2} alt="" />
                            <div className="courses-overlay">
                                <a className="btn btn-outline-primary border-2" href="/">Đăng kí</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div className="courses-item d-flex flex-column bg-white overflow-hidden h-100">
                        <div className="text-center p-4 pt-0">
                            <div className="d-inline-block bg-primary text-white fs-5 py-1 px-4 mb-4">16.500.000 VNĐ</div>
                            <h5 className="mb-3">Học & Thi bằng lái xe Hạng C</h5>
                            <p>Hỗ trợ đào tạo và đăng ký thi bằng lái xe hạng C</p>
                            <ol className="breadcrumb justify-content-center mb-0">
                                
                                <li className="breadcrumb-item small"><i className="fa fa-calendar-alt text-primary me-2"></i>3 Tuần</li>
                            </ol>
                        </div>
                        <div className="position-relative mt-auto">
                            <img className="img-fluid" src={course3} alt="" />
                            <div className="courses-overlay">
                                <a className="btn btn-outline-primary border-2" href="/">Đăng kí</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Course