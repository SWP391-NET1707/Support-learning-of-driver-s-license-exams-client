import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { Sidebar, TakeAttend } from '../components';
import '../style/mentor.css'
import jwtDecode from 'jwt-decode';
const Mentor = () => {
  const user = sessionStorage.getItem("user");
  const mentor= jwtDecode(user).email

  const handleLogout = () => {
    // Clear the session storage and log the user out
    sessionStorage.removeItem('user');

  };

  return (
    <div>
      <div id="wrapper">

        {/* sidebar */}
        <div id="sidebar-wrapper">
          <ul class="sidebar-nav">
            <li class="sidebar-brand">
              <a href="#">
                {mentor}
              </a>
            </li>
            <li>
              <Link to="takeattend">Điểm danh</Link>
            </li>
            <li>
              <Link to="createslot">Tạo slot</Link>
            </li>
            <li>
            <button onClick={handleLogout} className="btn btn-danger">Đăng xuất</button>
            </li>
          </ul>
        </div>
        <div id="page-content-wrapper">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12">
                
                <Outlet/>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
};
export default Mentor;