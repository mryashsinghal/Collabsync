import { useEffect,useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from '../context/StoreContext.jsx';

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");
  const navigate = useNavigate();
  const {setUser } = useContext(StoreContext);

  useEffect(async () => {
    if(error){
      alert(error);
      navigate("/auth");
    }
    else if (token) {
      localStorage.setItem("authToken", token);
      localStorage.removeItem("dashboardSection");
      await setUser(res.data.user);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [token, navigate,error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold">Processing...</h1>
    </div>
  );
};

export default OAuthSuccess;
