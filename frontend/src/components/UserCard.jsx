import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className="p-4 border rounded-lg shadow-lg bg-gradient-to-r from-[#5EA0EE] to-[#97B2F4] text-white shadow-[grey]">
            {/* Background Banner */}
            <div className="w-full h-24 bg-gradient-to-r from-[#142951] to-[#1E3A5F] rounded-t-lg"></div>

            {/* Profile Picture */}
            <div className="relative -mt-12 flex justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg animate-bounce">
                    {user.profilePicture ? (
                        <img
                            src={user.profilePicture || profile_icon.png} 
                            alt={user.user}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-[#a1baf6]"></div>
                    )}
                </div>
            </div>

            {/* User Information */}
            <div className="text-center mt-4">
                <h3 className="text-lg font-semibold">{user.user}</h3>
                <p className="text-[#E3F2FD]">{user.college ? user.college : "No College Info"}</p>
                <p className="text-[#D1E8FF]"> {user.skills.slice(0, 5).join(", ")}{user.skills.length > 5 && " ..."}</p>
                <button
                    onClick={() => navigate(`/profile/${user.userId}`)}
                    className="mt-4 bg-[#1E3A5F] text-white px-4 py-2 rounded-md hover:bg-[#2B4C6F] transition-all"
                >
                    View Profile
                </button>
            </div>
        </div>
    );
};

export default UserCard;