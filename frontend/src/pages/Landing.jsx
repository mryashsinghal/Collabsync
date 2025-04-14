import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = ({ showLogin, setShowLogin }) => {
    const navigate = useNavigate();

    const handle = (value) => {
        setShowLogin(value);
        navigate("/auth");
    };

    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#9fc6f6] z-[1]">
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
            <div className="w-full max-w-6xl px-4 md:px-8 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left Section */}
                    <motion.div
                        className="text-center md:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5aa2f9] to-[#638bf0]">
                            Real-time Collaboration, Seamless Syncing
                        </h1>
                        <p className="text-lg md:text-xl text-[#cad3e7] mt-4">
                            Welcome to the future of collaboration! Create your account on CollabSync and start working smarter, not harder, with real-time tools at your fingertips.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center mt-6 gap-4">
                            <motion.button
                                onClick={() => handle(false)}
                                className="px-6 py-3 bg-[#58B4F0] text-white font-semibold rounded-md hover:bg-[#72C8FF] shadow-md"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Sign Up
                            </motion.button>
                            <motion.button
                                onClick={() => handle(true)}
                                className="px-6 py-3 bg-[#1E2D4D] text-[#BCC4D7] font-semibold rounded-md hover:bg-[#2B3C5F] shadow-md"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Login
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right Section */}
                    <motion.div
                        className="hidden md:block"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="/collaboration-illustration.png"
                            alt="Collaboration Illustration"
                            className="w-full h-auto"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Landing;