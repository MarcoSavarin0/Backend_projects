import React, { useState } from 'react';

type LoginProps = {
    onLogin: (username: string, password: string) => void;
};

const Auth = ({ onLogin }: LoginProps) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    placeholder='user'
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                     placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    )
}

export default Auth