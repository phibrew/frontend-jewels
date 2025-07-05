import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  user: null,
  email: "",
  otpSent: false,
  isLoggedIn: false,
  markOtpSent: () => set({ otpSent: true }),
  setEmail: (email) => set({ email }),
  setLogin: ({token, user}) => {
    localStorage.setItem("token", token);
    localStorage.setItem("currUser", JSON.stringify(user));
    set({ isLoggedIn: true, user: {...user, token} });
  },
  resetAuth: () => set({ email: "", otpSent: false }),
  setLogout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currUser");
    set({ isLoggedIn: false, user: null });
  },
  loadUserFromStorage: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("currUser");  

    if(token && user) {
      if(get().isTokenValid(token)){
        set({ isLoggedIn: true, user: {...JSON.parse(user), token }});
        return true;
      } else {
        get().setLogout();
        return false;
      }
    } else {
      set({ isLoggedIn: false, user: null });
      return false;
    }
  },

  isTokenValid: (token) => {
    try {
      const decode = jwtDecode(token);
      const currTime = Date.now() / 1000;
  
      return decode.exp > currTime;
    } catch (err) {
      console.error("Invalid token:", err);
      return false;
    }
  }
}));

export default useAuthStore;