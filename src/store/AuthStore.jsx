import { create } from 'zustand';

const useAuthStore = create((set) => ({
  email: '',
  isOtpSent: false,
  user: null,
  setUser: (user) => set({ user }),
  setEmail: (email) => set({ email }),
  markOtpSent: () => set({ isOtpSent: true }),
  resetAuth: () => set({ email: '', isOtpSent: false }),
}));

export default useAuthStore;