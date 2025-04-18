import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [prof_nav, setProf_nav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  let { setId } = useContext(StoreContext);
  let { icon } = useContext(StoreContext);

  const handleLogout = () => {
    //console.log("Hello");
    localStorage.removeItem('id');
    localStorage.removeItem('authToken');
    navigate('/auth');
    setId(null);
  };

  return (
    <div className="min-w-full flex flex-row justify-between items-center bg-gradient-to-r from-[#0D1A33] to-[#1A2B4D] p-3 pt-4 z-10 top-0">
      <img src="https://res.cloudinary.com/dhvdzhjsd/image/upload/v1743853357/feskq46pnm3he3ewohft.png" width={200} alt="Logo" className="cursor-pointer" onClick={() => navigate('/')} />
      <div className="hidden md:flex flex-row gap-5 items-center text-[#7daddb] text-[1.1rem]">
        <a href="/">Home</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/create">Create</a>
        <div
          className=""
          onMouseEnter={() => setProf_nav(true)}
          onMouseLeave={() => setProf_nav(false)}
        >
          <img src={icon ? `${icon}` : `profile_icon.png`} alt="profile" className='h-8 rounded-[50%] object-cover' />
        </div>
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#7daddb]">
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gradient-to-r from-[#0D1A33] to-[#1A2B4D] flex flex-col items-center text-[#7daddb] text-[1.1rem] md:hidden z-20">
          <a href="/" className="py-2" onClick={() => setMenuOpen(false)}>Home</a>
          <div className="h-[1px] w-full  bg-[#f5f5f567] "></div>
          <a href="/dashboard" className="py-2" onClick={() => setMenuOpen(false)}>Dashboard</a>
          <div className="h-[1px] w-full  bg-[#f5f5f567] "></div>
          
          <a href="/create" className="py-2" onClick={() => setMenuOpen(false)}>Create</a>
          <div className="h-[1px] w-full  bg-[#f5f5f567] "></div>
          
          <a href="/profile" className="py-2" onClick={() => setMenuOpen(false)}>Profile</a>
          <div className="h-[1px] w-full  bg-[#f5f5f567] "></div>
          
          <a href="/edit" className="py-2" onClick={() => setMenuOpen(false)}>Profile Edit</a>
          <div className="h-[1px] w-full  bg-[#f5f5f567] "></div>
          
          <a href="" className="py-2 pb-2" onClick={() => {setMenuOpen(false),handleLogout()}}>Logout</a>
          
        </div>
      )}
      {prof_nav && (
        <div className="z-30 min-w-28 bg-[#ffffffb1] absolute right-0 rounded-md top-12 pt-2 pb-2 text-[#163257] font-medium" onMouseEnter={() => setProf_nav(true)}
          onMouseLeave={() => setProf_nav(false)}>
          <p className='w-full text-center h-10 hover:bg-[#63adeaba] hover:text-white  cursor-pointer rounded-md' onClick={() => { navigate('/profile') }}>Profile</p>
          <hr className='text-white'/>
          <p className='w-full text-center h-10 hover:bg-[#63adeaba] hover:text-white  cursor-pointer  rounded-md' onClick={() => { navigate('/edit') }}>Profile Edit</p>
          <hr/>
          <p className='w-full text-center h-10 hover:bg-[#63adeaba] hover:text-white cursor-pointer  rounded-md' onClick={handleLogout}>Logout</p>
        </div>
      )}
    </div>
  );
};

export default Header;