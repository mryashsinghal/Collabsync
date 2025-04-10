import React from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';

function BioForm() {

  const [data,setData] = React.useState({});
  const {url} = useContext(StoreContext);
 // let {setProfile} = useContext(StoreContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
   // setProfile((prev) => ({ ...prev, [name]: value }));
  
    // Track only modified fields
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
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
    <form action="" className='p-7 flex flex-col' onSubmit={handleSubmit}>
    <h1 className='text-xl text-left from-neutral-600 font-medium'>Bio</h1>
    <label htmlFor="" className='mb-4 mt-6'>About :</label>
    <textarea name='bio'   className='p-2 outline-none bg-[#97b1f414] hover:bg-[#97b1f42f]  font-medium h-96' onChange={handleChange}/>
    <button type='submit' className='mt-10 bg-black text-white h-12 rounded-md'>Save</button>
  </form>
      
    </div>
  )
}

export default BioForm
