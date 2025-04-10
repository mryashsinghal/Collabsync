import React from 'react'
import { useNavigate } from 'react-router-dom'



const Landing = ({ showLogin, setShowLogin }) => {
    const navigate = useNavigate();
    let handle = (value) => {
        setShowLogin(value);
        navigate("/auth")
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0D1A33] to-[#1A2B4D]  flex flex-col justify-center items-center">

            <div className="">
                <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5EA0EE] to-[#97B2F4] text-wrap">
                    Real time collabration,Seamless syncing
                </h1>

                <p className='text-center max-w-4xl text-wrap text-lg text-[#BCC4D7] mt-4'>Welcome to the future of collaboration! Create your account on CollabSync and start working smarter, not harder, with real-time tools at your fingertips</p>

                <div className="button flex flex-row justify-center items-center">
                    <button onClick={() => { handle(false) }} className='px-6 py-2 mt-6 bg-[#58B4F0] text-white font-semibold rounded-md hover:bg-[#72C8FF] shadow-md'>Sign Up</button>
                    <button onClick={() => { handle(true) }} className='px-6 py-2 mt-6 bg-[#1E2D4D] text-[#BCC4D7] font-semibold rounded-md hover:bg-[#2B3C5F] shadow-md ml-4'>Login</button>
                </div>
            </div>

        </div>
    )
}

export default Landing

