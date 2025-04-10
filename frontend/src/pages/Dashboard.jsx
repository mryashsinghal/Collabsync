import React from 'react';
import FilterData from '../components/FilterData';
import FilterProject from '../components/FilterProject';
import Explore from '../components/Explore';
import { useNavigate } from 'react-router-dom';
import ExploreUsers from '../components/ExploreUsers';
import {  FaUser, FaProjectDiagram , FaChevronLeft,FaChevronRight} from 'react-icons/fa';
import FeatureComingSoon from '../components/FeatureComingSoon';


function Dashboard() {
  const [see, setSee] = React.useState(false);
  const [filter, setFilter] = React.useState({});
  const [filtershow, setFiltershow] = React.useState(null);
  const [filterUser, setFilterUser] = React.useState({});

  const userId = localStorage.getItem('id');
  const navigate = useNavigate();
  const handleClick = () => {
    setSee(!see);
  };

  const [section, setSection] = React.useState(null);

  const formComponents = {
    explore_project: <Explore filter={{...filter,createdBy : ""}} />,
    explore_user: <ExploreUsers filterUser={filterUser} />,
    my_project:  <Explore filter={{...filter,createdBy : userId}} />,
    notification: <FeatureComingSoon />,
    more: <FeatureComingSoon />,
  };

  return (
    <div className='min-h-[100vh] bg-[rgb(188,220,254)] p-2 flex flex-col md:flex-row gap-7'>
      {/* SIDE BAR */}
      {see && (
        <div className="w-full md:w-1/5 bg-[#ffffff97] h-auto md:h-[100vh] rounded-lg ml-0 shadow-lg p-8">
          <ul className='text-[1.2rem] mt-8 cursor-pointer'>
            <li className='p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection('explore_project') }}>Explore Projects</li>
            <li className='p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection('explore_user') }}>Explore Users</li>
            <li className='p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection('my_project') }}>My Projects</li>
            <li className='p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection('notification') }}>Notifications</li>
            <li className='p-4 hover:bg-[#5EA0EE] hover:text-white text-left rounded-md' onClick={() => { setSection('more') }}>More</li>
          </ul>
        </div>
      )}
      {/* SIDE BLUE DOT */}
      <div className={`w-[40px] h-[40px] bg-[#2892fb] z-10 absolute top-[87px] md:top-24 ${see ? 'left-[18vw]' : 'left-4'} rounded-full shadow-gray-600 shadow-md transition-all flex items-center justify-center text-white`} onClick={handleClick}>
         {see &&  <FaChevronLeft />}
         {!see && <FaChevronRight />}
      </div>

      {/* Middle Content */}
      <div className="w-full md:w-4/5 ml-[auto] mr-auto">
        {/* Search Bar */}
        <div className="bg-[#ffffff97] h-[70px] p-6 flex rounded-md shadow-md overflow-hidden">
          <img src="search_icon.png" alt="" />
          <input type="text" name='search' className='bg-transparent ml-4 w-3/4 p-3 outline-none text-xl' placeholder='Search users and project' 
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setFilter({ ...filter, [e.target.name]: e.target.value });
              setFilterUser({ ...filterUser, [e.target.name]: e.target.value });
            }
          }} />
        </div>

        {/* Filter */}
        <div className="mt-4">
          <div className="filter mb-4 flex flex-wrap gap-4">
            <button className='text-xl  w-[100px] md:w-[220px] p-4 bg-[#142334] text-white text-center rounded-md flex items-center justify-center gap-2' onClick={() => { filtershow !== 'user' ? setFiltershow('user') : setFiltershow('') }}>
              <FaUser className="block md:hidden" />
              <span className="hidden md:block">Filter User</span>
            </button>
            <button className='text-xl w-[100px] md:w-[220px] p-4 bg-[#142334] text-white text-center rounded-md flex items-center justify-center gap-2' onClick={() => { filtershow !== 'project' ? setFiltershow('project') : setFiltershow('') }}>
              <FaProjectDiagram className="block md:hidden" />
              <span className="hidden md:block">Filter Project</span>
            </button>
          </div>
          {filtershow === 'user' ? <FilterData setFilterUser={setFilterUser} /> : <></>}
          {filtershow === 'project' ? <FilterProject setFilter={setFilter} /> : <></>}
        </div>

        {/* Hero Section */}
        <div className="mt-10">
          {!section && (
            <div>
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5EA0EE] to-[#97B2F4] text-wrap">
                Real time collaboration, Seamless syncing
              </h1>
              <p className='max-w-xl text-wrap text-lg text-[#293e6e] mt-7 mb-10'>
                Welcome to the future of collaboration! With CollabSync start working smarter, not harder, with real-time tools at your fingertips
              </p>
              <div className="button flex flex-row">
                <button className='px-6 py-2 mt-6 bg-[#58B4F0] text-white font-semibold rounded-md hover:bg-[#72C8FF] shadow-md' onClick={() => navigate('/create')}>Create Project</button>
                <button className='px-6 py-2 mt-6 bg-[#1E2D4D] text-[#BCC4D7] font-semibold rounded-md hover:bg-[#2B3C5F] shadow-md ml-4'>Search Project</button>
              </div>
            </div>
          )}
          {/* Explore Section */}
          <div className="mt-10" id='explore'>
            {formComponents[section]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;