import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const RegisterPage = ()=> {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup,isLoading,error}= useSignup();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //setError('');
        //setMessage('');

        await signup(username,email,password)

    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                {error && <div className="error">{error}</div>}
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
