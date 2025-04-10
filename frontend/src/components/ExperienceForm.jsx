import React from 'react'
import axios from 'axios'

import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';


function ExperienceForm() {
  const [exp,setExp] = React.useState({
  });
  const [techi, setTechi] = React.useState("");
  const [selectedTechStacks, setSelectedTechStacks] = React.useState([]);
  const {url} = useContext(StoreContext);
 // let {setProfile} = useContext(StoreContext);

 const handleChange = (e) => {
  const { name, value } = e.target;
 // setProfile((prev) => ({ ...prev, [name]: value }));

  // Track only modified fields
  setExp((prev) => ({ ...prev, [name]: value }));
};

  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    const updatedExp = { ...exp, techStack: selectedTechStacks };
    setExp(updatedExp);
    const updatedData = { experience: updatedExp };
    
    
    try {

      const userId = localStorage.getItem("id"); // Get user ID from local storage or context

      if (!userId) {
        alert("User not found. Please log in again.");
        return;
      }
      const response = await axios.patch(
         `${url}/api/users/profile/${userId}`, // Send userId in the URL
         updatedData, // Send only modified fields
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

  

  const handleAddTechStack = (e) => {
    if (e.key === "Enter" && techi.trim()) {
      e.preventDefault();

      // Limit to 4 stacks & prevent duplicates
      if (selectedTechStacks.length < 4 && !selectedTechStacks.includes(techi)) {
        setSelectedTechStacks([...selectedTechStacks, techi]);
        setTechi(""); // Clear input after adding
      }
    }
  };

  const handleRemoveTechStack = (stack) => {
    setSelectedTechStacks(selectedTechStacks.filter((item) => item !== stack));
  };



  return (
    <div>
        <form action="" className='p-7 flex flex-col' onSubmit={handleSubmit}>
                <h1 className='text-xl text-left from-neutral-600 font-medium'>Experience</h1>
                        <label htmlFor="" className='mb-4 mt-6'>Company Name :</label>
                        <input type="text" name="companyName" value={exp['companyName']} onChange={handleChange}  className='p-2 outline-none hover:bg-[#97b1f414]  font-medium' required/>
                        <hr />
                        <label htmlFor="" className='mb-4 mt-1'>Role :</label>
                        <input type="text" name="role" id=""  value={exp['role']} onChange={handleChange}  className='p-2 outline-none hover:bg-[#97b1f414]  font-medium' required/>
                        <hr />
                        <label htmlFor="" className='mb-4 mt-1'>Year :</label>
                        <input type="number" name="year" value={exp['year']} onChange={handleChange}  className='p-2 outline-none hover:bg-[#97b1f414]  font-medium' required/>
                       <hr />
                        <div className="">
                        From
                        <input type="date" name="fromDate" value={exp['fromDate']} id="" placeholder='dd/mm/yyyy' onChange={handleChange}  className='p-2 bg-none outline-none ml-20 mr-10  hover:bg-[#97b1f414]  font-medium' required/>
                        To
                        <input type="date" name="toDate" value={exp['toDate']} id="" placeholder='dd/mm/yyyy' onChange={handleChange}  className='p-2 bg-none outline-none ml-20  hover:bg-[#97b1f414]  font-medium' required/>
                        
                        </div>
                        <hr />
                        <label htmlFor="" className='mb-4 mt-1'>Tech Stack :</label>
                        <div className="flex flex-wrap items-center border border-gray-300 rounded-lg p-2">
                        {selectedTechStacks.map((stack, index) => (
                         <div key={index} className="flex items-center bg-[#9cc8f7] text-white px-3 py-1 m-1 rounded-full">
                         <span>{stack}</span>
                         <button
                            className="ml-2 text-white bg-[transparent] rounded-full px-2"
                             onClick={() => handleRemoveTechStack(stack)}
                            >
                           ❌
                              </button>
                            </div>
                          ))}
                          {selectedTechStacks.length < 5 && (
                            <input
                              type="text"
                              value={techi}
                              onChange={(e) => setTechi(e.target.value)}
                              onKeyDown={handleAddTechStack}
                              placeholder="Add Tech Stack..."
                              className="p-2 outline-none border-none flex-1"
                            />
                          )}
                        </div>
                        <hr />
                        <label htmlFor="" className='mb-4 mt-1'> Project Summary :</label>
                        <textarea name="projectSummary" value={exp['projectSummary']} onChange={handleChange}  className='p-2 outline-none bg-[#97b1f414] hover:bg-[#97b1f42f]  font-medium h-20' required/><hr />
                    
                <button type='submit'  className='mt-10 bg-black text-white h-12 rounded-md'>Save</button>
      </form>
      
    </div>
  )
}

export default ExperienceForm
