import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './About.css'
import img4 from '../../assets/4.jpg'
import img3 from '../../assets/3.jpg'


const About = () => {
    return (
        <div class="container-xxl py-6" id="read-me-1">
            <div class="container">
                <div class="row g-5">
                    <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="position-relative overflow-hidden ps-5 pt-5 h-100 img-height">
                            <img class="position-absolute w-100 h-100 image-fitt" src={img4} alt="" />
                            <img class="position-absolute top-0 start-0 bg-white pe-3 pb-3 image-size-w-h" src={img3} alt=""  />
                        </div>
                    </div>
                    <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                        <div class="h-100">
                            <h6 class="text-primary text-uppercase mb-2">About Us</h6>
                            <h1 class="display-6 mb-4">Đơn vị hàng đầu cung cấp dịch vụ học và thi bằng lái xe tốt nhất</h1>
                            <p>Chúng tôi là đơn vị hàng đầu tại Hồ Chí Minh cung cấp thông tin lái xe và đào tạo sát hạch lái xe các hạng B1, B2. Một trong những điều làm nên uy tín và chất lượng của</p>
                            <p class="mb-4">Khóa học chính là sự quy tụ những chuyên gia hàng đầu có kinh nghiệm về lĩnh vực đào tạo học tập và thi lấy bằng lái xe ở đủ các hạng. Các khóa học không bắt buộc đi kèm, người học tự nguyện lựa chọn nhưng chất lượng giảng dạy luôn được chú trọng….</p>
                            <div class="row g-2 mb-4 pb-2">
                                <div class="col-sm-6">
                                    <i class="fa fa-check text-primary me-2"></i>Được cấp phép đầy đủ
                                </div>
                                <div class="col-sm-6">
                                    <i class="fa fa-check text-primary me-2"></i>Được thi thử online
                                </div>
                                <div class="col-sm-6">
                                    <i class="fa fa-check text-primary me-2"></i>Chi phí hợp lí
                                </div>
                                <div class="col-sm-6">
                                    <i class="fa fa-check text-primary me-2"></i>Giảng viên giỏi
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default About;