import { create } from "zustand";
import { devtools } from "zustand/middleware";

type authStore = {
  auth: {
    token: string | null;
    id: string | null;
    userName: string | null;
    email: string | null;
  };

  setUser: (paylaod: payloadType) => void;
  removeUser: () => void;
};

type payloadType = {
  token: string;
  id: string;
  userName: string;
  email: string;
};

const useAuthStore = create<authStore>()(
  devtools((set) => ({
    auth: {
      token: null,
      id: null,
      userName: null,
      email: null,
    },
    setUser: (payload: payloadType) => set(() => ({ auth: payload })),
    removeUser: () =>
      set({ auth: { token: null, id: null, userName: null, email: null } }),
  }))
);

export default useAuthStore;
