import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';

export default function GoogleCallback() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const setLogin = useAuthStore(state => state.setLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/signin');
      return;
    }
    localStorage.setItem("token", token);
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/login", {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        const data = await res.json();

        if (res.ok && data.user) {
          localStorage.setItem("currUser", JSON.stringify(data.user));
          
          setLogin({ token, user: data.user });
          navigate("/dashboard");
        } else {
          navigate("/signin");
        }
      } catch (err) {
        console.error("Failed to verify Google login:", err);
        navigate("/signin");
      }
    };

    fetchUser();
  }, [token, navigate, setLogin]);

  return <div className="text-center mt-10 text-xl">Logging you in with Google...</div>;
}
