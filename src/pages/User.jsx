import React from 'react';
import { Link } from 'react-router-dom';
import '../style/User.css';

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
                    <h1 className="user-name">John Doe</h1>
                    <p className="user-email">johndoe@example.com</p>
                    <p className="user-bio">
                        HE HE HAHA
                    </p>
                    <Link to="/timetable" className="btn btn-primary">
                        Go to Timetable
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default User;