import React from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';

function SkillsForm (){ 

    const [inputValue, setInputValue] = React.useState("");
    const [skill,setSkill] = React.useState([]);
    const [data,setData] = React.useState({});
    const {url} = useContext(StoreContext);
     
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && inputValue.trim() !== "") {
        event.preventDefault();
        setSkill([...skill, inputValue.trim()]); 
        setInputValue(""); // Clear input
      }
    };
  
    const handleRemoveSkill = (index) => {
      setSkill(skill.filter((_, i) => i !== index));
    };


    const handleSubmit = async(e)=>{
      e.preventDefault();
      data['skills'] = skill;
      try {
  
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
       } catch (error) {
         console.error("Update failed:", error);
       }
    };
  
    return (
     <div>
     <form action="" className='p-7 flex flex-col ' onSubmit={handleSubmit}>
      <h1 className='text-xl text-left from-neutral-600 font-medium'>Skills</h1>
      <label htmlFor="" className='mb-4 mt-6'>Skill :</label>
      <input
      type="text" 
      name="sk"
      id=""
      className='p-2 bg-none outline-none  hover:bg-[#97b1f414]  font-medium' 
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      />
      <div className="flex flex-wrap gap-2 mt-3">
          {skill.map((ele, index) => (
            <div key={index} className="flex items-center bg-[#dfebf8] text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {ele} <button onClick={() => handleRemoveSkill(index)} className='ml-2 hover:text-red-700 text-[8px] text-[black]'>❌</button>
            </div>
        ))}
      </div>
      <button type='submit' className='mt-10 bg-black text-white h-12 rounded-md'>Save</button>
    </form>
  </div>)}

export default SkillsForm
