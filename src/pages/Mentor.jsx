import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { Sidebar, TakeAttend } from '../components';
import '../style/mentor.css'
const Mentor = () => {

  return (
    <div>
      <div id="wrapper">

        {/* sidebar */}
        <div id="sidebar-wrapper">
          <ul class="sidebar-nav">
            <li class="sidebar-brand">
              <a href="#">
                Start Bootstrap
              </a>
            </li>
            <li>
              <Link to="takeattend">Take Attendant</Link>
            </li>
            <li>
              <Link to="createslot">Create slot</Link>
            </li>
            <li>
              <Link to="schedule">Timetable</Link>
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