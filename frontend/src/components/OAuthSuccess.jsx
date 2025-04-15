import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from '../context/StoreContext.jsx';
import axios from 'axios';

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");
  const navigate = useNavigate();
  const { setUser , url } = useContext(StoreContext);

  useEffect(() => {
    const handleOAuthSuccess = async () => {
      if (error) {
        alert(error);
        navigate("/auth");
      } else if (token) {
        try {
          // Save the token to localStorage
          localStorage.setItem("authToken", token);
          localStorage.removeItem("dashboardSection");

          // Fetch user data using the token
          const {data} = await axios.get(url + "/api/user/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Update user context
          await setUser(data);
          localStorage.setItem('id',data._id);
          // Redirect to dashboard
          navigate("/dashboard");
        } catch (err) {
          console.error("Error fetching user data:", err);
          alert("Failed to fetch user data. Please try again.");
          navigate("/auth");
        }
      } else {
        navigate("/auth");
      }
    };

    handleOAuthSuccess();
  }, [token, error, navigate, setUser]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold">Processing...</h1>
    </div>
  );
};

export default OAuthSuccess;