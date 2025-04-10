// src/components/SignupForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext.jsx';
import { useContext } from 'react'

const SignupForm = () => {
    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    let {setId,url} = useContext(StoreContext);

    const handleSignup = async (e) => {
        e.preventDefault();
        // Handle signup logic
        if(password!==confirmPassword){
            alert("Oops Password not matched!!");

        }else{
            const res = await axios.post(`${url}/api/users/register`,{username,email,password});
            if(res){
               console.log(res);
              //  await setId(res.data._id);
               // localStorage.setItem('id' , res.data._id);
               // toast.success("User Registered"); 
                navigate('/auth');
            } 
            else{
                alert(res.data.message);
            }
        }
    };

    return (
        <form onSubmit={handleSignup} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
            <input
                type="user"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
            />
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
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
            />
            <button type="submit" className="w-full bg-[#58B4F0] text-white font-semibold py-2 rounde hover:bg-[#72C8FF] shadow-md">Sign Up</button>
        </form>
    );
};

export default SignupForm;
