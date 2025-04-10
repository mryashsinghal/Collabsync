import React from 'react';

const Footer = () => {
  return (
    <div className='bg-[#1E2D4D] text-center'>
      <div className='bg-[#1E2D4D] p-10 md:p-20 w-full flex flex-col md:flex-row text-center min-h-16 text-[#BCC4D7] justify-between'>
        <div className="left w-full md:w-[300px] mb-8 md:mb-0 ml-0 md:ml-16">
          <img src="https://res.cloudinary.com/dhvdzhjsd/image/upload/v1743853357/feskq46pnm3he3ewohft.png" width={230} alt="Logo" className="mx-auto md:mx-0" />
          <p className='text-wrap text-start mt-3'>
            Welcome to the future of collaboration! With CollabSync start working smarter, not harder, with real-time tools at your fingertips.
          </p>
          <div className="links flex gap-2 mt-3 justify-center md:justify-start">
            <img src="facebook_icon.png" alt="Facebook" className="h-6 w-6" />
            <img src="linkedin_icon.png" alt="LinkedIn" className="h-6 w-6" />
            <img src="twitter_icon.png" alt="Twitter" className="h-6 w-6" />
          </div>
        </div>
        <div className="company flex flex-col text-start mb-8 md:mb-0">
          <h1 className='text-white mb-4'>Quick Links</h1>
          <a href="/" className="hover:text-white">Home</a>
          <a href="/dashboard" className="hover:text-white">Explore Projects</a>
          <a href="/dashboard" className="hover:text-white">Explore Users</a>
          <a href="/profile" className="hover:text-white">Profile</a>
        </div>
        <div className="contact text-start mr-0 md:mr-14">
          <h1 className='text-white mb-4 mt-2'>Contact Us</h1>
          <p>Have questions or feedback?</p>
          <p>Reach out at</p>
          <p>collabsyncofficial@gmail.com</p>
        </div>
      </div>
      <hr className='w-3/4 mx-auto mb-2' />
      <p className='pb-3 text-[#BCC4D7]'>© 2025 CollabSync. All rights reserved.</p>
    </div>
  );
}

export default Footer;