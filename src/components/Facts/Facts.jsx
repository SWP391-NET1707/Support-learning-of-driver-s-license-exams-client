import React from 'react'
import './Facts.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Facts = () => {
  return (
    <div className="container-fluid facts py-5 pt-lg-0">
        <div className="container py-5 pt-lg-0">
            <div className="row gx-0">
                <div className="col-lg-4 wow fadeIn" data-wow-delay="0.1s">
                    <div className="bg-white shadow d-flex align-items-center h-100 p-4 container-height">
                        <div className="d-flex">
                            <div className="flex-shrink-0 btn-lg-square bg-primary">
                                <i className="fa fa-car text-white"></i>
                            </div>
                            <div className="ps-4">
                                <h5>Học lái xe dễ dàng</h5>
                                {/* <!-- <span>Clita erat ipsum lorem sit sed stet duo justo erat amet</span> --> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
                    <div className="bg-white shadow d-flex align-items-center h-100 p-4 txt-min-height">
                        <div className="d-flex">
                            <div className="flex-shrink-0 btn-lg-square bg-primary">
                                <i className="fa fa-users text-white"></i>
                            </div>
                            <div className="ps-4">
                                <h5>Giảng viên nhiệt tình</h5>
                                {/* <!-- <span>Clita erat ipsum lorem sit sed stet duo justo erat amet</span> --> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
                    <div className="bg-white shadow d-flex align-items-center h-100 p-4 txt-min-heght-2">
                        <div className="d-flex">
                            <div className="flex-shrink-0 btn-lg-square bg-primary">
                                <i className="fa fa-file-alt text-white"></i>
                            </div>
                            <div className="ps-4">
                                <h5>Giá cả hợp lí</h5>
                                {/* <!-- <span>Clita erat ipsum lorem sit sed stet duo justo erat amet</span> --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Facts