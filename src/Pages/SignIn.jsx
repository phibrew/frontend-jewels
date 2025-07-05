import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';

export default function SignInPage() {
  const {email, setEmail, markOtpSent} = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if(!email){
      return alert('Please enter your email');
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/otp/send-otp", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if(res.ok) {
        markOtpSent();
        navigate('/verify-otp', { state: { email } });
      } else{
        alert(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      alert('Error sending OTP. Please try again later.');
    }
    setLoading(false);
  };

  const handleGoogleResponse = async () => {
    try {
      window.location.href = "http://localhost:8000/auth/google";
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcfa] px-4 pt-16">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Send OTP Button */} 
        <button
          onClick={handleSendOtp}
          className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition mb-6"
          disabled={loading}
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>

        {/* Divider */}
        <div className="flex items-center justify-between mb-4">
          <hr className="w-1/3 border-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <hr className="w-1/3 border-gray-300" />
        </div>

        {/* Google Sign-In Button */}
        <button onClick={ handleGoogleResponse } > Google </button>
      </div>
    </div>
  );
}
