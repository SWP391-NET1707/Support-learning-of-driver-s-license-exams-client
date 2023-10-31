import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import '../style/mentor.css'

const handleLogout = () => {
  // Clear the session storage and log the user out
  sessionStorage.removeItem('user');
  window.location.href = '/home'
};

const Staff = () => {
  return (
    <div>
      <div id="wrapper">

        {/* sidebar */}
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <Link to="/Staff">
                Staff
              </Link>
            </li>
            <li>
              <Link to="MentorList">Danh sách Mentor</Link>
            </li>
            <li>
              <Link to="License">Bằng lái</Link>
            </li>
            <li>
              <Link to="StaffCourse">Khóa học</Link>
            </li>
            <li>
              <Link to="StaffQuiz">Quiz</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="btn btn-danger">Đăng xuất</button>
            </li>
          </ul>
        </div>
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">

                <Outlet />
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Staff;