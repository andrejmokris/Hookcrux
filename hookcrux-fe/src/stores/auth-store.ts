import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  signOut: () => void;
  signIn: (user: User) => void;
}

const authStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  signOut: () => {
    set({ isAuthenticated: false, user: null });
  },
  signIn: (user: User) => {
    set({ isAuthenticated: true, user: user });
  },
}));

export default authStore;
