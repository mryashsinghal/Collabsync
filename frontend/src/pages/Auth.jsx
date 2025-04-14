import React, { useContext } from 'react';
import LoginForm from '../components/LoginForm.jsx';
import SignupForm from '../components/SignupForm.jsx';
import { StoreContext } from '../context/StoreContext.jsx';
import { FcGoogle } from 'react-icons/fc'; // Import Google Icon

const Auth = ({ showLogin, setShowLogin }) => {
    const { url } = useContext(StoreContext);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#0D1A33] to-[#1A2B4D] z-[1]">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
                onError={(e) => {
                    e.target.style.display = 'none'; // Hide the video if it fails to load
                }}
            >
                <source src="/background-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Content */}
            <h1 className="text-4xl mb-8 font-bold text-transparent bg-clip-text bg-gradient-to-r  from-[#5aa2f9] to-[#638bf0] z-10">
                Welcome to CollabSync
            </h1>
            <div className="bg-white p-6 rounded-lg shadow-md z-10">
                {showLogin ? <LoginForm /> : <SignupForm />}
                <div className="mt-4">
                    {showLogin ? (
                        <button
                            onClick={() => setShowLogin(false)}
                            className="text-[#BCC4D7]"
                        >
                            Need an account? Sign Up
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowLogin(true)}
                            className="text-[#BCC4D7]"
                        >
                            Already have an account? Log In
                        </button>
                    )}
                </div>
                <div className="mt-4 flex items-center justify-center">
                    <a
                        href={`${url}/api/auth/google`}
                        className="flex items-center gap-2 px-4 py-2 bg-[#6c87c3] text-white rounded-md hover:bg-[#5a75b0] transition-all"
                    >
                        <FcGoogle className="text-xl" /> {/* Google Icon */}
                        Continue with Google
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Auth;