import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Username:', username);
        console.log('Password:', password);
        // You can add your login logic here, e.g., send the data to a server for authentication.
    };

    return (
        <div className="login-page">
            <div className="form">
                <form className="register-form">
                    <input type="text" placeholder="Name" onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <input type="text" placeholder="Email Address" />
                    <button>Create</button>
                    <p className="message">Already registered? <a href="#">Sign In</a></p>
                </form>
                <form className="login-form">
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
