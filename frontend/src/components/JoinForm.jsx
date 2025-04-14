import { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';

export default function JoinForm({ id,setShowJoin }) {
  const [formData, setFormData] = useState({ techStack: "", message: "" });
  const {url} = useContext(StoreContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const userId = localStorage.getItem("id");
    e.preventDefault();
    try {
         const result = await axios.post(`${url}/api/project/join/${id}`,{userId : userId ,techStack:formData.techStack,message:formData.message},
            {
                headers: { "Content-Type": "application/json" }// If using authentication cookies
            }
        );
          if (result.status === 200) {
            alert("Request Made successfully!");
          } else {
            alert("Error: " + result.data.message);
          }
        
    } catch (error) {
        alert("Error in joining projects");
    }
   
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }} 
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50"
    >
      <div className="bg-blue-100 p-6 rounded-lg shadow-xl w-96 relative">
        {/* Close Button */}
        <button onClick={()=>{setShowJoin(false)}} className="absolute top-3 right-3 text-gray-600 hover:text-red-500">
          <FaTimes size={18} />
        </button>
        
        {/* Title */}
        <h2 className="text-xl font-semibold text-blue-700 text-center mb-4">Request to Join Project</h2>
        
        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tech Stack</label>
            <input 
              type="text" 
              name="techStack" 
              value={formData.techStack} 
              onChange={handleChange} 
              className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your tech stack"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Why do you want to join?"
              rows="3"
              required
            />
          </div>
          
          {/* Submit Button */}
          <motion.button 
            type="submit" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600"
          >
            Submit Request
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
