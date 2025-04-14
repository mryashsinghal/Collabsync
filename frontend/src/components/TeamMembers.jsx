import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';

export default function TeamMembers({ project }) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState([]);
  const userId = localStorage.getItem("id"); // Get the logged-in user's ID
  const {url} = useContext(StoreContext);

  useEffect(() => {
    fetchMembers();
  }, [project._id]);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${url}/api/project/team/${project._id}`);
      setMembers(response.data.teamMembers);
    } catch (error) {
      console.log("Error fetching team members", error);
    }
  };

  const removeMember = async (memberId) => {
    if (window.confirm("Are you sure you want to remove this member from the project?")) {
      try {
        await axios.post(`${url}/api/project/removeMember/${project._id}`, {
          memberId,userId
        });
        setMembers(members.filter((member) => member.userId._id !== memberId)); // Update the UI
        alert("Member removed successfully.");
      } catch (error) {
        console.error("Error removing member", error);
        alert("Failed to remove the member. Please try again.");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-[#7ba2e2] to-[#0d2349] p-6 rounded-xl shadow-lg text-white"
    >
      {/* Team Members Section */}
      <div className="bg-white text-blue-700 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <FaUsers /> Team Members
        </h3>
        <ul className="space-y-2">
          {members &&
            members.map((member, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMember(member)}
                className="cursor-pointer bg-blue-100 text-blue-800 px-3 py-2 rounded-md shadow-sm hover:bg-blue-200"
              >
                {member.userId.username} - {member.role}
              </motion.li>
            ))}
        </ul>
      </div>

      {/* Selected Team Member Profile */}
      {selectedMember && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mt-4 bg-white text-blue-700 p-4 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold">{selectedMember.userId.username}</h3>
          <p className="text-md font-medium">{selectedMember.role}</p>
          <p className="text-sm mt-2 text-gray-700">{selectedMember.summary}</p>

          {/* Remove Member Button (Visible only to Admin) */}
          {project.createdBy._id === userId && (
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
              onClick={() => removeMember(selectedMember.userId._id)}
            >
              Remove Member
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}