import { useContext, useState,useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes,useNavigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Header from './components/Header.jsx';
import Landing from './pages/Landing.jsx';
import Footer from './components/Footer.jsx';
import Auth from './pages/Auth.jsx';
import { StoreContext } from './context/StoreContext.jsx';
import Profile from './pages/Profile.jsx';
import ProfileEdit from './pages/ProfileEdit.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProjectCreate from './pages/ProjectCreate.jsx';
import Project from './pages/Project.jsx';
import VerifyEmail from './components/VerifyEmail.jsx';
import OAuthSuccess from './components/OAuthSuccess.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import SkeletonLoader from './components/SkeletonLoader.jsx';
import HomePage from './pages/HomePage.jsx'
import axios from 'axios';

function App() {

  const [showLogin, setShowLogin] = useState(true);
  const {user, setUser,url} = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
        const fetchUser = async () => {
          const token = localStorage.getItem("authToken"); // Get token from localStorage

          if (!token) {
            setLoading(false); // Redirect if no token
              return;
          }
            try {
                const { data } = await axios.get(url + "/api/user/me",{
                  headers: { Authorization: `Bearer ${token}` },});
                  await setUser(data);
                  localStorage.setItem('id',data._id);
                //console.log(user);
            } catch (error) {
                console.error('Error fetching user:', error);
                localStorage.removeItem('id');
                localStorage.removeItem('authToken');
                setUser(null);

            } finally{
              setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
      return  <SkeletonLoader type="dashboard"/>; // Show a loading indicator while fetching user data
    }
  return (
    <>
      {user && <Header />}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth showLogin={showLogin} setShowLogin={setShowLogin} />} />
        <Route path="/landing" element={<Landing showLogin={showLogin} setShowLogin={setShowLogin} />} /> 
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/profile/:id?" element={<ProtectedRoute user={user} />}>
                <Route index element={<Profile/>} />
        </Route>
        <Route path="/edit" element={<ProtectedRoute user={user} />}>
                <Route index element={<ProfileEdit />} />
        </Route>
        <Route path="/create" element={<ProtectedRoute user={user} />}>
                <Route index element={<ProjectCreate />} />
        </Route>
        <Route path="/project/:id" element={<ProtectedRoute user={user} />}>
                <Route index element={<Project />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoute user={user} />}>
                <Route index element={<Dashboard />} />
        </Route>
        <Route path="/*" element={<ErrorPage/>} />  
      </Routes>
      <Footer />
    </>
  )
}

export default App
