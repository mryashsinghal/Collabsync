// src/pages/Home.js
import React, { useState,useEffect } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import SignupForm from '../components/SignupForm.jsx';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';


const Auth = ({ showLogin, setShowLogin }) => {
    // const [showLogin, setShowLogin] = useState(b);
    const {url} = useContext(StoreContext);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#0D1A33] to-[#1A2B4D]">
            <h1 className="text-4xl mb-8 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5EA0EE] to-[#97B2F4] " >Welcome to CollabSync</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                {showLogin ? <LoginForm /> : <SignupForm />}
                <div className="mt-4">
                    {showLogin ? (
                        <button onClick={() => setShowLogin(false)} className="text-[#BCC4D7]">Need an account? Sign Up</button>
                    ) : (
                        <button onClick={() => setShowLogin(true)} className="text-[#BCC4D7]">Already have an account? Log In</button>
                    )}
                </div>
                <div className="mt-4 ">
                <a
        href = {`${url}/api/auth/google`}
        className="px-4 py-2 bg-[#6c87c3] text-white rounded md"
      >
        Continue with Google
      </a>
                </div>
            </div>
        </div>
    );
};

export default Auth;
