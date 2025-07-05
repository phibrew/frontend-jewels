import { useState } from "react";
import useAuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

export default function VerifyOtpPage() {
  const navigate = useNavigate();

  // Zustand state & actions
  const email = useAuthStore(state => state.email);
  const resetAuth = useAuthStore(state => state.resetAuth);
  const setLogin = useAuthStore(state => state.setLogin);

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp) {
      return alert("Please enter the OTP sent to your email");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/otp/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
        credentials: "include", // For cookies if needed
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to verify OTP");
      }

      // ✅ Use setLogin method from Zustand to store user & token
      setLogin({ token: data.token, user: data.user });

      alert("Login successful!");
      navigate("/dashboard");
      resetAuth(); // Optional: clear email/otp flags
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fdfcfa] px-4 pt-20">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Enter OTP</h2>
        <input
          type="text"
          placeholder="Enter the OTP sent to your email"
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          onClick={handleVerify}
          className="w-full bg-black text-white py-2 rounded-md hover:opacity-90 transition"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
