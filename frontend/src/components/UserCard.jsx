import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className="p-4 border rounded-lg shadow-lg bg-[#afd1ff] text-white shadow-[grey]">
            <div className="w-full h-40 bg-[#a1baf6] rounded-lg overflow-hidden">
                {user.profilePicture ? (
                    <img src={user.profilePicture} alt={user.user} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-[#a1baf6]"></div>
                )}
            </div>
            <h3 className="text-lg font-semibold mt-2">{user.user}</h3>
            <p className="text-[#102945]">{user.college? user.college : ""}</p>
            <p className="text-blue">{ user.skills.join(', ')}</p>
            <button 
                onClick={() => navigate(`/profile/${user.userId}`)} 
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                View Profile
            </button>
        </div>
    );
};

export default UserCard;