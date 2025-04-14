import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";
import axios from "axios";
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';
import Modal from "./Modal";

export default function JoinRequests({ id, project }) {
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [designation, setDesignation] = useState("");
  const {url} = useContext(StoreContext);
  const [summary, setSummary] = useState("");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${url}/api/project/request/${project._id}`);
      setRequests(response.data.joinRequests);
    } catch (error) {
      console.log("Error fetching requests", error);
    }
  };

  const handleAccept = async (id) => {
    setSelectedRequestId(id);
    setIsModalOpen(true);
  };

  const handleReject = async (id) => {
    setRequests(requests.filter((request) => request.id !== id));
    try {
      await axios.post(`${url}/api/project/reject/${id}`, { project_id: project._id });
    } catch (error) {
      console.log("Error rejecting requests", error);
    }
  };

  const handleModalSubmit = async () => {
    setIsModalOpen(false);
    setRequests(requests.filter((request) => request._id !== selectedRequestId));
    try {
      await axios.post(`${url}/api/project/accept/${selectedRequestId}`, {
        project_id: project._id,
        designation,
        summary,
      });
    } catch (error) {
      console.log("Error accepting requests", error);
    }
  };

  if (project.createdBy._id !== userId) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-[#7ba2e2] to-[#0d2349] p-6 rounded-xl shadow-lg text-white"
    >
      <div className="bg-white text-blue-700 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <FaUsers /> Join Requests
        </h3>
        {/* Scrollable Container */}
        <div
          className="space-y-4 max-h-[400px] overflow-y-auto"
          style={{
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none", // For IE and Edge
          }}
        >
          <style>
            {`
              /* Hide scrollbar for Chrome, Safari, and Edge */
              .space-y-4::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {requests &&
            requests.map((request) => (
              <motion.li
                key={request._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-blue-100 text-blue-800 p-3 rounded-md shadow-sm"
              >
                <p className="font-medium">{request.userId.username}</p>
                <p className="text-sm">Tech Stack: {request.techStack.join(", ")}</p>
                <p className="text-xs text-gray-600 mt-1">{request.message}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleAccept(request.id)}
                    className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    <FaUserCheck /> Accept
                  </button>
                  <button
                    onClick={() => handleReject(request.id)}
                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    <FaUserTimes /> Reject
                  </button>
                </div>
              </motion.li>
            ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      >
        <h3 className="text-lg font-semibold mb-4 text-[#153062] text-center">
          Enter Designation and Summary
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
            placeholder="Enter designation"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
            placeholder="Enter summary"
            rows="3"
            required
          />
        </div>
      </Modal>
    </motion.div>
  );
}