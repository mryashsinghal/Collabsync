import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SkillsDisplay from '../components/SkillsDisplay';
import ExperienceTimeline from '../components/ExperienceTimeline.jsx';
import { StoreContext } from '../context/StoreContext.jsx';
import SkeletonLoader from '../components/SkeletonLoader.jsx';
import axios from 'axios';
import ProjectEnrolled from '../components/ProjectEnrolled.jsx';

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState(null);
  const [image, setImage] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [showCompleteProfileMessage, setShowCompleteProfileMessage] = React.useState(false); // New state for the message
  let userId = localStorage.getItem("id");
  const {url} = useContext(StoreContext);
  const { id } = useParams();
  const isOwnProfile = !id || id === userId;

  useEffect(() => {
    handledata();
  }, [userId, id]);

  const handledata = async () => {
    if (!isOwnProfile) {
      userId = id;
    }

    try {
      const res = await axios.get(`${url}/api/users/profile/${userId}`, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.status === 200) {
        const fetchedProfile = res.data[0];
       // console.log(fetchedProfile);
        setProfile(fetchedProfile);
        setImage(fetchedProfile.profilePicture);
        setLoading(false);

        // Check if bio, skills, or experience are empty
        if (!fetchedProfile.bio || !fetchedProfile.skills?.length || !fetchedProfile.experience?.length) {
          setShowCompleteProfileMessage(true); // Show the message if any field is empty
        }
      } else {
        alert("Error: " + res.data.message);
      }
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  };

  if (loading) {
    return <SkeletonLoader type="profile" />;
  }

  return (
    <div className='bg-[#c0d3fc] flex flex-col md:flex-row'>
      <div className=" md:w-1/3 bg-[#13213f]  m-7 p-8 rounded-md shadow-2xl shadow-[#00ffff48] ">
        <div className="flex flex-col items-center">
          <img src={image} width={100} height={100} alt="" className='border-4 rounded-full object-cover' />
          <p className='text-[#a0bff8] mt-6 font-medium text-3xl'>{profile.user}</p>
          <p className='text-[#00ffffa9] mt-6  text-xl'>{profile.college? profile.college : ""}</p>
          {isOwnProfile && <button className='bg-[#00ffff45] p-2 w-[80%] mt-4 rounded-lg text-[cyan] font-medium' onClick={() => navigate("/edit")}>Edit Profile</button>}
          <p className='m-4 text-[#cef1f993] text-xl text-center break-words max-w-full'>{profile.bio}</p>
        </div>
        <div className="">
          <SkillsDisplay profile={profile} />
        </div>
        
      </div>
      <div className=" md:w-2/3 m-7 text-white">
        {/* Show the message to complete the profile */}
        {showCompleteProfileMessage && isOwnProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#25899d] text-center p-6 rounded-lg shadow-lg w-[90%] max-w-md">
              <p className="text-lg font-semibold text-[white] mb-4">
                Your profile is incomplete. Please add your bio, skills, and experience to complete your profile.
              </p>
              <button
                className="bg-[black] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                onClick={() => navigate("/edit")}
              >
                Complete Profile
              </button>
            </div>
          </div>
        )}
        {showCompleteProfileMessage && !isOwnProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#25899d] text-center p-6 rounded-lg shadow-lg w-[90%] max-w-md">
              <p className="text-lg font-semibold text-[white] mb-4">
              This user has an incomplete profile. Wait untill he/she update their details for better collaboration!
              </p>
              
            </div>
          </div>
        )}
        <div className="min-h-[100px] bg-[#13213f] mb-5 shadow-xl shadow-[#00ffff48] rounded-lg p-5">
          <ExperienceTimeline profile={profile} />
        </div>
        <div className="min-h-[100px] bg-[#13213f] mb-5 shadow-xl shadow-[#00ffff48] rounded-md p-5">
        {profile.projectsCreated?.length > 0 ? (
          <ProjectEnrolled projects={profile.projectsCreated} created={true}/>
        ): (
          <p className="text-center text-[#a0bff8]">No projects created yet.</p>
        )}
        </div>
        
        <div className="min-h-[100px] bg-[#13213f] mb-5 shadow-xl shadow-[#00ffff48] rounded-md">
        {profile.projectsJoined?.length > 0 ? (
          <ProjectEnrolled projects={profile.projectsJoined} created = {false}/>
        ): (
          <p className="text-center text-[#a0bff8] pt-6">No projects joined yet.</p>
        )}

        </div>
      </div>
    </div>
  );
}

export default Profile;