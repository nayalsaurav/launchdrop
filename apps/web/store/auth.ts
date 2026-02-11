import { User } from "better-auth";
import { create } from "zustand";

interface AuthStore {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    setUser: (user: User | null) => set({ user }),
}));