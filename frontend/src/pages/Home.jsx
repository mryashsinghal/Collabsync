import React from 'react';
import { useNavigate } from 'react-router-dom';
import HexagonIconsSection from '../components/HexagonIconsSection';

const Home = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem('id');
  return (
    <div className='bg-gradient-to-r from-[#bcd3ff] to-[#bcd3ff] relative overflow-hidden'>
      <div>
        {!id && <div className="absolute z-30 flex justify-between p-3 w-full bg-[#e8f0f78b]">
          <div className="ml-4 md:ml-24">
            <img src="https://res.cloudinary.com/dhvdzhjsd/image/upload/v1743853357/feskq46pnm3he3ewohft.png" width={180} alt="LOGO" />
          </div>
          <div className="mr-4 md:mr-20 md:block  hidden">
            <ul className='flex justify-between text-[#17437d] font-serif'>
              <li className='mr-4 md:mr-10 hover:border-b-2 h-8'>Explore</li>
              <li className='mr-4 md:mr-10 hover:border-b-2'>Home</li>
              <li className='mr-4 md:mr-10 hover:border-b-2'>Features</li>
              <li className='text-amber-500 hover:border-b-2 hover:border-e-slate-700 cursor-pointer' onClick={() => { navigate("/landing") }}>Sign Up</li>
            </ul>
          </div>
        </div>}
      </div>
      <div className="h-[65vh] skew-y-12 bg-[#2dbcff]"></div>
      <div className='h-[200px] w-[90vw] bg-[#2dbcff] top-6 absolute right-0'></div>
      <img src="https://res.cloudinary.com/dhvdzhjsd/image/upload/v1743853442/oadhahf6zygl29vjubom.webp" alt="" className='w-[300px] md:w-[390px] h-[200px] md:h-[270px] absolute top-52 left-4 md:left-28 -skew-y-12 rounded-[20px] skew-x-12 z-[3] hidden lg:block mr-5' />
      <div className="md:mt-0 z-10 top-28 text-white absolute md:top-52  md:right-36 flex flex-col text-center items-center">
        <h1 className='text-center font-sans text-[1.5rem] md:text-[2.3rem] text-[#0d2442] font-bold mb-6 md:mb-11'>A New Way To Collaborate</h1>
        <p className='text-center md:text-right  mb-4 md:mb-8'>CollabSync is the best platform to help you enhance your skills, expand<br className='hidden md:block' /> your knowledge and connection for technical expertise.</p>
        <button className='bg-[#9ad2ff] w-[140px] align-middle rounded-[25px] p-2' onClick={!id? () => { navigate("/landing") } : ()=>{navigate("/dashboard")}}>{!id ? "Create Account" : "Get Started"}</button>
      </div>
      <div className="z-[3] h-[150vh] -skew-y-12 bg-[#a2cbff] mt-96"></div>
      <div className="z-10 absolute text-[black] top-[32%] md:top-1/3  left-4 md:left-[7vw] text-center md:text-right">
        <h1 className='text-[1.5rem] text-[#2888f6] mb-6 font-bold text-center md:text-right'>Create & Join Projects</h1>
        <p className='mb-4 text-center md:text-right'>The Create & Join Projects section allows users to initiate new projects or join existing ones.  <br className='hidden md:block' />Collaborate with like-minded individuals, contribute skills,<br className='hidden md:block' /> and build impactful projects effortlessly.</p>
        <button className='  text-[#234f7b]' onClick={() => { navigate("/create") }}>Get Started</button>
      </div>
      <div className="absolute top-[20%] lg:top-[30%] left-[60%]  lg:left-3/4 transform -translate-x-1/2 ">
        {/* Decorative bars for the topmost block */}
        <div className="absolute top-2  md:left-[-60px] left-[-70px] flex flex-col gap-2 z-10">
          <div className="h-10 w-32 md:w-40 bg-white opacity-80 rounded-md"></div>
          <div className="h-7 w-14 md:w-32 bg-white opacity-60 rounded-md"></div>
        </div>

        {/* Main Animated Blocks */}
        <div className="h-[100px] w-[60px] md:h-[130px] md:w-[80px] bg-[#2888f6] rounded-md absolute left-[-10rem] top-3 animate-bounce shadow-lg z-0"></div>
        <div className="h-[160px] w-[70px] md:h-[210px] md:w-[90px] bg-[#529fec] rounded-md absolute left-[-8rem] -top-2 animate-bounce shadow-md z-1"></div>
        <div className="h-[220px] w-[180px] md:h-[280px] md:w-[250px] bg-[#71b1fb] rounded-md z-[3] absolute left-[-6rem] -top-10 animate-bounce shadow-xl"></div>
      </div>


      <div className="top-[50%] absolute flex flex-col lg:flex-row justify-between w-full pl-4 lg:pl-24 pr-4 lg:pr-24">
        <div className="mb-8 md:mb-0 text-center lg:text-left">
          
          <h1 className=''><HexagonIconsSection  sectionName = "Interactive Dashboard"/></h1>
          <p className='mb-4 text-blue-900 '>The Interactive Dashboard provides a seamless experience for discovering projects,<br className='hidden md:block' />connecting with users, and managing collaborations. With real-time updates<br className='hidden md:block' /> and intuitive navigation, streamline your workflow and <br className='hidden md:block' /> enhance productivity effortlessly.</p>
          <a href="/dashboard" className='text-blue-600'>View Page</a>
        </div>
        <div className="h-[3px] w-full md:h-[300px] md:w-[3px] bg-[#f5f5f567] mb-8 lg:mb-0 hidden lg:block mr-4"></div>
        <div className="text-center lg:text-left">
          <h1 className=''> <HexagonIconsSection  sectionName = "Tech-Stack & College Based Search"/></h1>
          <p className='mb-4 text-blue-900'>The Tech-Stack & College Based User Search feature allows you to find collaborators  <br className='hidden md:block' />based on their skills and expertise. Filter users by programming languages<br className='hidden md:block' />  frameworks, and tools to build the perfect project<br className='hidden md:block' /> team efficiently.</p>
          <a href="/dashboard" className='text-blue-600'>View Page</a>
        </div>
      </div>
      <div className="absolute top-[85%] md:top-3/4 text-center items-center w-full z-10">
        <h1 className=''><HexagonIconsSection  sectionName = "Real-time Collaboration"/></h1>
        <p className='mb-4 md:mb-8'>The Real-time Collaboration & Discussions section enables seamless communication among project members.<br className='hidden md:block' /> Users can engage in live discussions, share ideas, view past conversations, <br className='hidden md:block' />  and see who's online, ensuring smooth and efficient teamwork.</p>
       
      </div>
      <div className='h-[200px] w-[90vw] bg-[#a2cbff] bottom-0 absolute right-0'></div>
    </div>
  );
}

export default Home;