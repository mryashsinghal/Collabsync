import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const ProjectsList = ({ projects ,created}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  // Calculate the current projects to display
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  // Handle pagination
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#13213f] p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-xl font-bold text-[#a0bff8] mb-4">{created? "Projects Created" :"Enrolled Projects"}</h3>
      {currentProjects.map((project) => (
        <motion.div
          key={project._id}
          whileHover={{ scale: 1.05 }}
          className="bg-[#1e2a47] p-4 rounded-md mb-4 shadow-md"
        >
          <div className="flex items-center gap-4">
            <img
              src={project.thumbnail || "https://via.placeholder.com/50"}
              alt={project.projectName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h4 className="text-lg font-semibold text-white">{project.projectName}</h4>
              <p className="text-sm text-[#a0bff8]">{project.description}</p>
            </div>
          </div>
          
            <a
            href={`/project/${project._id}`}
            className="text-blue-400  mt-2 block"
          >
           <FaExternalLinkAlt/>
          </a>
          
          
          
        </motion.div>
      ))}

      {/* Pagination Controls */}
      {projects.length > projectsPerPage && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectsList;