import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login,error,isLoading} = useLogin()

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await login(email,password)

    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <div className="error">{error}</div>}
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
                <button type="submit" disabled={isLoading}>Login</button>
                
            </form>
        </div>
    );
}

export default LoginPage;
