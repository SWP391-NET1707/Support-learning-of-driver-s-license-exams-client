import React from 'react';
import { Link } from 'react-router-dom';
import '../style/User.css';
import jwtDecode from 'jwt-decode';

// const userToken = jwtDecode(sessionStorage.getItem("user"));
// console.log(userToken);
    const user = sessionStorage.getItem("user");
    let userToken = null;
if (user) {
    userToken = jwtDecode(user);
    }

const User = () => {
    return (
        <div className="user-container">
            <div className="user-banner">
                <img
                    src="https://via.placeholder.com/1200x200"
                    alt="Banner"
                    className="banner-image"
                />
            </div>
            <div className="user-content">
                <div className="user-avatar">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="User Avatar"
                        className="avatar-image"
                    />
                </div>
                <div className="user-details">
                    <h1 className="user-name">{userToken.name}</h1>
                    <p className="user-email">{userToken.email}</p>
                    <p className="user-bio">
                        {userToken.role}
                    </p>
                    <Link to="/Schedule" className="btn btn-primary">
                        Go to Schedule
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default User;