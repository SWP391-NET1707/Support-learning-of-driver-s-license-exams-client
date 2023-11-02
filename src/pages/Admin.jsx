import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import '../style/mentor.css'

const handleLogout = () => {
  // Clear the session storage and log the user out
  sessionStorage.removeItem('user');
  window.location.href = '/home'
};

const Admin = () => {
  return (
    <div>
      <div id="wrapper">

        {/* sidebar */}
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <Link to="/Admin">
                Admin
              </Link>
            </li>
            <li>
              <Link to="MentorList">Danh sách Mentor</Link>
            </li>
            <li>
              <Link to="StaffList">Danh sách Staff</Link>
            </li>
            <li>
              <Link to="CourseList">Danh sách Course</Link>
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

export default Admin;