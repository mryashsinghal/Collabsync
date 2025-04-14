import React from 'react';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdDraw } from "react-icons/md";
import { FaTrash } from "react-icons/fa"; // Import trash icon
import ProjectDescription from '../components/ProjectDescription';
import TeamMembers from '../components/TeamMembers';
import JoinRequests from '../components/JoinRequests';
import UpdateProject from '../components/UpdateProject';
import JoinForm from '../components/JoinForm';
import Discuss from '../components/Discuss';
import { useParams, useNavigate } from 'react-router-dom';
import SkeletonLoader from '../components/SkeletonLoader';
import axios from 'axios';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';

function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [section, setSection] = useState("description");
  const [showJoin, setShowJoin] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const {url} = useContext(StoreContext);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('id');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${url}/api/project/get/${id}`);
        setProject(data.project);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project details", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const deleteProject = async () => {
    if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      try {
        await axios.delete(`${url}/api/project/delete/${id}`);
        alert("Project deleted successfully.");
        localStorage.setItem('dashboardSection', 'my_project')
        navigate("/dashboard"); // Redirect to dashboard after deletion
      } catch (error) {
        console.error("Error deleting project", error);
        alert("Failed to delete the project. Please try again.");
      }
    }
  };

  if (loading) {
    return <SkeletonLoader type="particular_project" />;
  }

  if (error) {
    return <p>Error loading project: {error.message}</p>;
  }

  if (!project) return <p>Project not found</p>;

  const formComponents = {
    description: <ProjectDescription project={project} />,
    team_member: <TeamMembers project={project} />,
    discuss: <Discuss project={project} />,
    requests: <JoinRequests project={project} />,
    update: <UpdateProject project={project} />
  };

  const isUserMember = (project) => {
    return project.teamMembers?.some(member => member.userId === userId);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-50 shadow-md rounded-xl w-full max-w-[100vw] mx-auto min-h-[100vh]"
      >
        <div className="relative p-10 h-auto md:h-[400px] w-full bg-gradient-to-r from-[#5EA0EE] to-[#97B2F4] flex flex-col md:flex-row justify-start gap-6 items-center rounded-b-md">
          {/* Delete Button (Visible only to Admin) */}
          {project.createdBy._id === userId && (
            <button
              className="absolute top-4 right-4 bg-[#ff3c35d8] text-white p-2 rounded-lg shadow-md hover:bg-red-600 flex items-center gap-2"
              onClick={deleteProject}
            >
              <FaTrash />
             
            </button>
          )}
          

          <div className="ml-5">
            <img src={project.thumbnail} alt="Project Thumbnail" className="h-[180px] w-[180px] object-cover rounded-md" />
          </div>
          <div className='ml-8'>
            <p className="text-3xl font-bold text-[whitesmoke] mb-4">{project.projectName}
            </p>
            
            <p className='w-full md:w-[40vw] text-black'>{project.description}</p>
            <h2 className='flex items-center text-slate-300 text-xl mt-4'><MdDraw />{project.createdBy.username}</h2>
            {project.createdBy._id !== userId && !isUserMember(project) && (
              <button
                className='bg-[#0e2a507e] p-2 w-[250px] mt-4 rounded-lg text-[#a9d9fe] font-medium'
                onClick={() => { setShowJoin(!showJoin) }}
              >
                Join Request
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-center md:hidden">
          <button
            className="bg-[#5EA0EE] text-white p-4 rounded-lg mt-4"
            onClick={() => setShowOptions(!showOptions)}
          >
            Project More Options
          </button>
        </div>

        <div className={`flex justify-center ${showOptions ? 'block' : 'hidden'} md:flex`}>
          <ul className='md:flex flex-wrap gap-7 text-xl mt-4 cursor-pointer'>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='hover:bg-[#5EA0EE] p-4 rounded-lg hover:text-white transition-colors duration-300'
              onClick={() => { setSection("description"); setShowOptions(false); }}
            >
              Description
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='hover:bg-[#5EA0EE] p-4 rounded-lg hover:text-white transition-colors duration-300'
              onClick={() => { setSection("team_member"); setShowOptions(false); }}
            >
              Team Members
            </motion.li>
            {project.createdBy._id === userId && (
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='hover:bg-[#97B2F4] p-4 rounded-lg hover:text-white transition-colors duration-300'
                onClick={() => { setSection("requests"); setShowOptions(false); }}
              >
                Requests
              </motion.li>
            )}
            {project.createdBy._id === userId && (
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='hover:bg-[#97B2F4] p-4 rounded-lg hover:text-white transition-colors duration-300'
                onClick={() => { setSection("update"); setShowOptions(false); }}
              >
                Update
              </motion.li>
            )}
            {(isUserMember(project) || project.createdBy._id === userId) && (
              <motion.li
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='hover:bg-[#9fb8f7] p-4 rounded-lg hover:text-white transition-colors duration-300'
                onClick={() => { setSection("discuss"); setShowOptions(false); }}
              >
                Discuss
              </motion.li>
            )}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="shadow-blue-950 rounded-md w-full max-w-[100vw] mx-auto p-8 shadow-2xl mt-9"
        >
          <div>
            {formComponents[section]}
          </div>
        </motion.div>
      </motion.div>
      {showJoin && <JoinForm setShowJoin={setShowJoin} id={project._id} />}
    </div>
  );
}

export default Project;