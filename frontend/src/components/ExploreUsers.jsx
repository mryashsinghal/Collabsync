import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import SkeletonLoader from "./SkeletonLoader";
import { FaAngleLeft,FaAngleRight } from "react-icons/fa";
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';

const ExploreUsers = ({filterUser}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null);
    const [currentPage,setCurrentPage] = useState(1);
    const {url} = useContext(StoreContext);
    const usersPerPage = 3;

    useEffect(() => {
        //console.log(filterUser);
        fetchUsers();
    }, [filterUser]);

    const fetchUsers = async () => {
        try {
            setLoading(true); 
            const response = await axios.get(`${url}/api/users/all/`, {params: filterUser});
            setUsers(response.data);
           // console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError(error); 
            setLoading(false);
        }
    };
    if (loading) {
        return <SkeletonLoader type="user"/> ;
      }
    
      if (error) {
        return <p>Error loading users: {error.message}</p>;
      }

      const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
      };
    
      const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
      };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currUsers = users.slice(indexOfFirstUser,indexOfLastUser);
    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div className="p-6 bg-[#fff] rounded-md shadow-md shadow-[#d8d6d6]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {currUsers.map((user) => (
                    <UserCard key={user._id} user={user} />
                ))}
            </div>
            {users.length > usersPerPage && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
           <FaAngleLeft/>
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            <FaAngleRight />
          </button>
        </div>
      )}
        </div>
    );
};

export default ExploreUsers;

