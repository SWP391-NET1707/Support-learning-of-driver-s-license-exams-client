import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { Sidebar } from '../components';

const Mentor = () => {
  return( <div> 
    <Link to="/takeattend">Take Attendant</Link>
    <br/>
    <Link to="takeattend">Create a practical training trip</Link>
    <br/>
    <Link to="/timetable">Timetable</Link>
</div>)
};
export default Mentor;