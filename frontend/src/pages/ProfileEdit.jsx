import React, { useContext } from 'react';
import AccountForm from '../components/AccountForm';
import BioForm from '../components/BioForm';
import SkillsForm from '../components/SkillsForm';
import ExperienceForm from '../components/ExperienceForm';
import { FaUpload, FaBars } from "react-icons/fa";
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { MdOutlineLogout } from "react-icons/md";
import FeatureComingSoon from '../components/FeatureComingSoon';

const ProfileEdit = () => {
  const [section, setSection] = React.useState("account");
  const [showSidebar, setShowSidebar] = React.useState(false);
  let { image, setImage,user,url } = useContext(StoreContext);

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
      setImage(uploadedImageUrl); // Save image URL in state
      return uploadedImageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleFileUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const img_url = await uploadImageToCloudinary(file);
        setImage(img_url);
        localStorage.setItem('profile', img_url);

        const data = { profilePicture: img_url };

        const userId = localStorage.getItem("id"); // Get user ID from local storage or context

        if (!userId) {
          alert("User not found. Please log in again.");
          return;
        }
        const response = await axios.patch(
          `${url}/api/users/profile/${userId}`, // Send userId in the URL
          data, // Send only modified fields
          {
            headers: { "Content-Type": "application/json" }// If using authentication cookies
          }
        );

        if (response.status === 200) {
          alert("Profile updated successfully!");
        } else {
          alert("Error: " + response.data.message);
        }
      }

    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const formComponents = {
    account: <AccountForm />,
    bio: <BioForm />,
    skills: <SkillsForm />,
    experience: <ExperienceForm />,
    notification: <FeatureComingSoon/>,
    more :<FeatureComingSoon /> ,
  };

  return (
    <div className='min-h-[100vh] relative'>
      <div className="h-[400px] w-[100%] bg-gradient-to-r from-[#5EA0EE] to-[#97B2F4]">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start pt-16 md:pt-32 md:pl-48">
          <div className="relative h-[150px] w-[150px] bg-black border-8 rounded-md group">
            {/* Profile Image */}
            <img
              src={image ? `${image}` : "profile_icon.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />

            {/* Upload Button (Initially Hidden, Appears on Hover) */}
            <label
              className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              <FaUpload className="text-blue-500 text-xl" />
              <span className="text-sm">Upload Profile</span>
              <input type="file" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>

          <div className="mt-4 md:mt-0 md:ml-28 text-3xl text-white flex gap-2 justify-center items-center">
            {user.
username}
            <a href="/profile" className='text-[black] text-2xl'>
              <MdOutlineLogout />
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        {/* SIDE BAR */}
        <div className="w-full md:w-1/3 p-4 md:p-24 hidden md:block">
          <h1 className='text-[1.2rem]'>Basic Info</h1>
          <ul className='text-[1.2rem] mt-8 cursor-pointer'>
            <li className='w-full md:w-[220px] p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection("account") }}>Account</li>
            <li className='w-full md:w-[220px] p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection("bio") }}>Bio</li>
            <li className='w-full md:w-[220px] p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection("skills") }}>Skills</li>
            <li className='w-full md:w-[220px] p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection("experience") }}>Experience</li>
            <li className='w-full md:w-[220px] p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection("notification") }}>Notifications</li>
            <li className='w-full md:w-[220px] p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection("more") }}>More</li>
          </ul>
        </div>
        <div className="w-full md:w-2/3 bg-white md:mt-[-50px] md:mr-36 mb-10 shadow-2xl rounded-md p-4 md:p-8">
          {formComponents[section]}
        </div>
      </div>
      {/* Dropdown Sidebar for Small Screens */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <button
          className="bg-blue-500 text-white p-2 rounded-full shadow-lg"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          More
        </button>
        {showSidebar && (
          <div className="absolute right-0 bottom-12 bg-white shadow-lg rounded-lg p-4">
            <ul className='text-[1.2rem] cursor-pointer'>
              <li className='p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection("account"); setShowSidebar(false); }}>Account</li>
              <li className='p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection("bio"); setShowSidebar(false); }}>Bio</li>
              <li className='p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection("skills"); setShowSidebar(false); }}>Skills</li>
              <li className='p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection("experience"); setShowSidebar(false); }}>Experience</li>
              <li className='p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection("notification"); setShowSidebar(false); }}>Notifications</li>
              <li className='p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection("more"); setShowSidebar(false); }}>More</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileEdit;