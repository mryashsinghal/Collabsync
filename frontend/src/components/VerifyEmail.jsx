import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying your email...");
  const navigate = useNavigate();
  const {url} = useContext(StoreContext);

  useEffect(() => {
    if (!token) {
      setMessage("Invalid verification link.");
      return;
    }

    // Send token to backend for verification
    axios
      .get(`${url}/api/users/verify-email?token=${token}`)
      .then((response) => {
        setMessage(response.data.message);
        setTimeout(() => navigate("/auth"), 3000); // Redirect to login after success
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || "Verification failed.");
      });
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold">{message}</h1>
    </div>
  );
};

export default VerifyEmail;
