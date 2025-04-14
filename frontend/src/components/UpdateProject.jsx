import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';

export default function UpdateProject({ project }) {
  const [formData, setFormData] = useState({ ...project, endDate: project.timeline?.endDate || "" });
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const {url} = useContext(StoreContext);


  const uploadImageToCloudinary = async (file) => {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", "picture"); // Replace with your actual preset
  
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dhvdzhjsd/image/upload`,
          form
        );
        const uploadedImageUrl = response.data.secure_url;
        setThumbnail(uploadedImageUrl); // Save image URL in state
        return uploadedImageUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };
  
    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const url = await uploadImageToCloudinary(file);
        setThumbnail(url);
      }
    };

  useEffect(() => {
    setFormData({ ...project, endDate: project.timeline?.endDate || "" });
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDate = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, endDate: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedProject = {
        ...formData,
        timeline: {
          ...(project.timeline || {}), // Ensure timeline is an object
          endDate: formData.endDate, // Update only endDate
        },thumbnail : thumbnail
      };

      const response = await axios.patch(`${url}/api/project/update/${project._id}`, updatedProject,
        {
          headers: { "Content-Type": "application/json" }// If using authentication cookies
        }
      );
      console.log("Project updated successfully:", response.data);
      alert("Project updated successfully!");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update the project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-[#7ba2e2] to-[#0d2349] p-6 rounded-xl shadow-md mt-6"
    >
      <h3 className="text-xl font-bold flex items-center gap-2 text-[white] mb-4">
        <FaEdit /> Update Project
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          placeholder="Project Name"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          placeholder="Project Description"
        />
       <div className="flex">
          <label className="block text-sm font-medium text-white mr-1">End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleDate}
            className="w-full p-2 border rounded-lg"
            placeholder="End Date"
          />
       </div>
        
        <select name="collaborationMode" value={formData.collaborationMode} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="In-Person">In-Person</option>
        </select>
        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded-lg">
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
        <input
    type="url"
    name="website"
    value={formData.website}
    onChange={handleChange}
    className="w-full p-2 border rounded-lg"
    placeholder="Website Link"
  />

  {/* GitHub Repository Link */}
  <input
    type="url"
    name="repositoryLink"
    value={formData.repositoryLink}
    onChange={handleChange}
    className="w-full p-2 border rounded-lg"
    placeholder="GitHub Repository Link"
  />
        <label className="flex items-center gap-2 cursor-pointer">
                    <FaUpload className="text-[#142951]" /> Upload Thumbnail
                    <input type="file" className="hidden" onChange={handleFileUpload} />
                  </label>
        <button
          type="submit"
          className="w-full bg-[#89b5e8] text-white p-2 rounded-lg hover:bg-[#d1e8f7] hover:text-black transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Project"}
        </button>
      </form>
    </motion.div>
  );
}