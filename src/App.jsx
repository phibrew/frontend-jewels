import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Layout from './Layouts/Layout';
import SignIn from './Pages/SignIn';
import Protected from './Layouts/AuthLayout';
import UserProfile from './Pages/UserProfile';
import VerifyOtpPage from './Pages/VerifyOtp';
import Dashboard from './Pages/Dashboard';
import useAuthStore from './store/AuthStore';
import GoogleCallback from './Pages/GoogleCallback';
import AddProduct from './Pages/AddProduct';

const App = () => {
  const loadUserFromStorage = useAuthStore(state => state.loadUserFromStorage);

  const [loading, setLoading] = useState(true);

  //Always run hooks first

  useEffect(() => {
  loadUserFromStorage();
  setLoading(false); // whether or not success, loading must end
}, []);

  //Now conditionally render based on loading and routes
  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
  <>
    <Routes>
      <Route path="/google-callback" element={<GoogleCallback />} />
    </Routes>

    {loading ? (
      <div className="text-center mt-10 text-xl">Loading...</div>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signin" element={<Protected authenticated={false}><SignIn /></Protected>} />
            <Route path="/verify-otp" element={<Protected authenticated={false}><VerifyOtpPage /></Protected>} />
            <Route path="/dashboard" element={<Protected authenticated={true}><Dashboard /></Protected>} />
            <Route path="/:name" element={<Protected authenticated={true}><UserProfile /></Protected>} />
            <Route path="/admin/add-product" element={<Protected authenticated={true}><AddProduct /></Protected>} />
          </Routes>
        </Layout>
      )}
    </>
  );
};



export default App;
