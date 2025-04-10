// src/components/LoginForm.js
import React, { useState } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';
import { useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setId,url} = useContext(StoreContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        // Handle login logic
        const res = await axios.post(`${url}/api/users/login`,{email,password});
        if(res){
           // console.log(res);
            setId(res.data._id);
            //toast.success("User Logged in");
            localStorage.setItem("authToken", res.data.token); 
            navigate('/dashboard');
        }
        else{
            alert(res.data.message);
        }
    };

    return (
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
            <button type="submit" className="w-full py-2 bg-[#1E2D4D] text-[#BCC4D7] font-semibold rounded-md hover:bg-[#2B3C5F] shadow-md ">Log In</button>
        </form>
    );
};

export default LoginForm;
