import React, { useState, useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setId, url,setUser } = useContext(StoreContext);
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Send login request
            const res = await axios.post(`${url}/api/users/login`, { email, password });

            if (res.status === 200) {
                // Update context and localStorage
                setId(res.data.user.id);
                localStorage.setItem("authToken", res.data.token);
                localStorage.removeItem("dashboardSection");
                await setUser(res.data.user);
                navigate('/dashboard');
            
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            if (error.response?.data?.message === "Please verify your email first") {
                setMessage("Your email is not verified. Please verify your email.");
              } else {
                setMessage(error.response?.data?.message || "Login failed.");
              }
        }
    };

    const handleResendVerification = async () => {
        try {
          const res = await axios.post(url + "/api/users/resend-verification", { email });
          setMessage(res.data.message);
        } catch (error) {
          setMessage(error.response?.data?.message || "Failed to resend verification email.");
        }
      };

    return (
        <div className="">
        <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
            />
            <button
                type="submit"
                className="w-full py-2 bg-[#1E2D4D] text-[#BCC4D7] font-semibold rounded-md hover:bg-[#2B3C5F] shadow-md"
            >
                Log In
            </button>
        </form>
        {message && <p>{message}</p>}
      {message === "Your email is not verified. Please verify your email." && (
        <button onClick={handleResendVerification}>Resend Verification Email</button>
      )}

        </div>
    );
};

export default LoginForm;