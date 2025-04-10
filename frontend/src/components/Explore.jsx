import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JoinForm from "./JoinForm";
import SkeletonLoader from "./SkeletonLoader";
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';

import { FaAngleLeft,FaAngleRight } from "react-icons/fa";

export default function Explore({ filter }) {
  const navigate = useNavigate();

  const [projects, setProjects] = useState(null);
  const [showJoin, setShowJoin] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const projectsPerPage = 3; // Number of projects per page
  const {url} = useContext(StoreContext);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const handleView = (id) => {
    navigate(`/project/${id}`);
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${url}/api/project/`, { params: filter });
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching projects", error);
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <SkeletonLoader type="project" />;
  }

  if (error) {
    return <p>Error loading projects: {error.message}</p>;
  }

  const isUserMember = (project) => {
    return project.teamMembers?.some((member) => member.userId === userId);
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-xl w-full">
      {/* Projects Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {currentProjects.map((project) => (
          <motion.div
            key={project._id}
            className="border p-4 rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-2">{project.projectName}</h2>
            <p className="text-gray-500 text-sm">{project.description}</p>
            <p className="text-blue-500 mt-1">
              {project.teamMembers?.length + 1 + " Members"} | {project.status}
            </p>
            <div className="flex gap-2 mt-3">
              <motion.button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  handleView(project._id);
                }}
              >
                View Details
              </motion.button>
              {!isUserMember(project) && project.createdBy !== userId && (
                <motion.button
                  className="px-4 py-2 border rounded-md"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setShowJoin(!showJoin), setProjectId(project._id);
                  }}
                >
                  Join Request
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      {projects.length > projectsPerPage && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            <FaAngleLeft/>
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white `}
          >
            <FaAngleRight/>
          </button>
        </div>
      )}

      {showJoin && <JoinForm setShowJoin={setShowJoin} id={projectId} />}
    </div>
  );
}