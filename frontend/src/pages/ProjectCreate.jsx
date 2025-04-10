import { useState } from "react";
import { motion } from "framer-motion";
import { Listbox } from "@headlessui/react";
import { FaUpload } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';
import axios from 'axios';

const techStacks = ["React", "Node.js", "Python", "Java", "C++", "Django", "Flutter"];
const projectTypes = ["Open Source", "Startup", "Research", "Hackathon", "Freelance"];
const collaborationModes = ["Remote", "Hybrid", "In-Person"];
const roles = ["Frontend Developer", "Backend Developer", "UI/UX Designer", "Project Manager", "Full Stack Developer"];

export default function ProjectCreate() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [projectType, setProjectType] = useState("Open Source");
  const [collaborationMode, setCollaborationMode] = useState("Remote");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const {url} = useContext(StoreContext);
  
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem("id");
      if (!userId) {
        alert("User not found. Please log in again.");
        return;
      }

      const res = await axios.post(`${url}/api/project/create/`,
        { projectName, description, techStack: selectedTechStacks, projectType, collaborationMode, availableRoles: selectedRoles, thumbnail, timeline: { startDate, endDate }, createdBy: userId },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 201) {
        alert("Project Created Successfully");
        navigate('/dashboard');
      } else {
        alert("Error: " + res.data.message);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleTechStackChange = (tech) => {
    setSelectedTechStacks((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleRoleChange = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "picture"); // Replace with your actual preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dhvdzhjsd/image/upload`,
        formData
      );
      const uploadedImageUrl = response.data.secure_url;
      setThumbnail(uploadedImageUrl); // Save image URL in state
      return uploadedImageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleFileUpload = async (e) => {
    setThumbnail(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    if (file) {
      const img_url = await uploadImageToCloudinary(file);
      setThumbnail(img_url);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-50 shadow-md rounded-xl w-full max-w-[100vw] mx-auto"
    >
      <div className="h-[400px] w-full bg-gradient-to-r from-[#5EA0EE] to-[#97B2F4] flex flex-col justify-center items-center rounded-b-md shadow-[#0077ff76] shadow-xl">
        <div className="">
          {thumbnail && <img src={thumbnail} alt="Project Thumbnail" className="h-[180px] w-[180px] object-cover rounded-md" />}
        </div>
        <div className="text-3xl font-bold text-[whitesmoke] mt-5">
          {projectName && <h1>{projectName}</h1>}
        </div>
      </div>
      <div className="text-5xl font-bold mb-4 mt-[-25px] mx-auto flex flex-row justify-center items-center">
        <span className="text-[#26acf9]"><IoCreate /></span>
        <h2> New Project</h2>
      </div>

      <div className="p-4 md:p-12">
        {/* Project Name */}
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md focus:outline-blue-500"
        />

        {/* Project Description */}
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md focus:outline-blue-500"
        />

        {/* Tech Stack Selection */}
        <div className="mb-4">
          <h3 className="text-sm font-medium">Tech Stack:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {techStacks.map((tech) => (
              <motion.button
                key={tech}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleTechStackChange(tech)}
                className={`px-3 py-1 rounded-full border ${selectedTechStacks.includes(tech) ? "bg-[#142951] text-white" : "bg-gray-100"}`}
              >
                {tech}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Project Type */}
        <div className="mb-4">
          <h3 className="text-sm font-medium">Project Type:</h3>
          <Listbox value={projectType} onChange={setProjectType}>
            <Listbox.Button className="border rounded-md py-2 px-3 w-full text-left">
              {projectType}
            </Listbox.Button>
            <Listbox.Options className="absolute bg-white border rounded-md mt-1 shadow-lg">
              {projectTypes.map((type) => (
                <Listbox.Option key={type} value={type} className="p-2 cursor-pointer hover:bg-gray-100">
                  {type}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>

        {/* Collaboration Mode */}
        <div className="mb-4">
          <h3 className="text-sm font-medium">Collaboration Mode:</h3>
          <Listbox value={collaborationMode} onChange={setCollaborationMode}>
            <Listbox.Button className="border rounded-md py-2 px-3 w-full text-left">
              {collaborationMode}
            </Listbox.Button>
            <Listbox.Options className="absolute bg-white border rounded-md mt-1 shadow-lg">
              {collaborationModes.map((mode) => (
                <Listbox.Option key={mode} value={mode} className="p-2 cursor-pointer hover:bg-gray-100">
                  {mode}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>

        {/* Timeline */}
        <div className="mb-4">
          <h3 className="text-sm font-medium">Duration:</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center">
              <span>From</span>
              <input type="date" name="fromDate" placeholder='dd/mm/yyyy' className='p-2 bg-none outline-none ml-2 md:ml-4 hover:bg-[#97b1f414] font-medium' onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="flex items-center">
              <span>To</span>
              <input type="date" name="toDate" placeholder='dd/mm/yyyy' className='p-2 bg-none outline-none ml-2 md:ml-4 hover:bg-[#97b1f414] font-medium' onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <h3 className="text-sm font-medium">Available Roles:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {roles.map((role) => (
              <motion.button
                key={role}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRoleChange(role)}
                className={`px-3 py-1 rounded-full border ${selectedRoles.includes(role) ? "bg-[#142951] text-white" : "bg-gray-100"}`}
              >
                {role}
              </motion.button>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <FaUpload className="text-[#142951]" /> Upload Thumbnail
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-2 bg-[#142951] text-white rounded-md mt-4"
          onClick={handleSubmit}
        >
          Create Project
        </motion.button>
      </div>
    </motion.div>
  );
}