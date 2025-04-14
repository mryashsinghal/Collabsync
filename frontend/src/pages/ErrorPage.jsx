import React from 'react';
import { motion } from 'framer-motion';

function ErrorPage() {
  return (
    <div className='h-[100vh] w-full flex flex-col justify-center items-center bg-[#cee0f8]'>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='font-bold text-7xl text-[#afafaf2f] text-center'
      >
        <p>OOPS! Page Not Found</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className='mt-4 text-2xl text-[#afafaf2f]'
      >
        <p>We can't seem to find the page you're looking for.</p>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className='mt-8 px-6 py-3 bg-[#1E2D4D] text-white rounded-lg shadow-lg'
        onClick={() => window.location.href = '/dashboard'}
      >
        Go Back Home
      </motion.button>
    </div>
  );
}

export default ErrorPage;
