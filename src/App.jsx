import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Layout from './Layouts/Layout'
import SignIn from './Pages/SignIn'
import UserProfile from './Pages/UserProfile'
import VerifyOtpPage from './Pages/VerifyOtp'
import Dashboard from './Pages/Dashboard'
import useAuthStore from './store/AuthStore'

const App = () => {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const fetchUser = async()=>{
      if(user){
        setLoading(false);
        return;
      }
      
      try {
          //first fetch the data 
          const res = await fetch("http://localhost:8000/login", {
              method: 'GET',
              credentials: 'include',}
          );

          const data = await res.json();
          if (res.ok && data?.user) {
            setUser(data.user);
          } else{
            if (!location.pathname.startsWith('/signin') && !location.pathname.startsWith('/verify-otp')) {
              navigate('/signin');
            }
          }
      } catch (error) {
          console.error("Error fetching user data:", error);
      } finally {
          setLoading(false);
      }
  };
  fetchUser();
  }, [user, setUser, navigate, location.pathname]);
  return (
    <Layout>
     <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/signin" element={<SignIn /> } />
        <Route path='/verify-otp' element={<VerifyOtpPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/:name' element={<UserProfile />} />
      </Routes>
    </Layout>
  )
}

export default App