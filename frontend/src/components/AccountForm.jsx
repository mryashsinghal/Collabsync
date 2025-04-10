import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

function AccountForm() {
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
            <h1 className='text-xl text-left from-neutral-600 font-medium'>Account</h1>
            <label htmlFor="" className='mb-4 mt-6'>Name :</label>
            <input type="text" name="user" id="" value={data['user']}  className='p-2 outline-none hover:bg-[#97b1f414]  font-medium' placeholder={data.name? data.name : ''}
               onChange={handleChange}
            />
            <hr />
            <label htmlFor="" className='mb-4 mt-1'>Gender :</label>
            <input type="text" name="gender" id="" value={data['gender']}   className='p-2 bg-none outline-none  hover:bg-[#97b1f414]  font-medium' placeholder={data.gender? data.gender : ''}
               onChange={handleChange}
            />
            <hr />
            <label htmlFor="" className='mb-4 mt-1'>College :</label>
            <input type="text" name="college" id="" value={data['college']}  className='p-2 bg-none outline-none  hover:bg-[#97b1f414]  font-medium' placeholder={data.college? data.college : ''}
               onChange={handleChange}
            />
            <hr />
            <label htmlFor="" className='mb-4 mt-1'>Address :</label>
            <input type="text" name="address" id="" value={data['address']}  className='p-2 bg-none outline-none  hover:bg-[#97b1f414]  font-medium' placeholder={data.address? data.address : ''}
                onChange={handleChange}
            />
            <hr />
            <label htmlFor="" className='mb-4 mt-1'>Contact :</label>
            <input type="text" name="contact" id="" value={data['contact']} className='p-2 bg-none outline-none  hover:bg-[#97b1f414]  font-medium' placeholder={data.contact? data.contact : ''}
                 onChange={handleChange}
             />
            <hr />
            <button type='submit' className='mt-10 bg-black text-white h-12 rounded-md'>Save</button>
          </form>
      
    </div>
  )
}

export default AccountForm
