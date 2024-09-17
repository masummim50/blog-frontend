import { create } from "zustand";
import { devtools } from "zustand/middleware";

type authStore = {
  auth: {
    token: string | null;
    id: string | null;
    userName: string | null;
    email: string | null;

    image: string | null;
  };

  setUser: (payload: payloadType) => void;
  setUserImage: (payload: string) => void;
  removeUser: () => void;
};

type payloadType = {
  token: string;
  id: string;
  userName: string;
  email: string;
  image: string | null;
};

const useBoundStore = create<authStore>()(
  devtools((set) => ({
    auth: {
      token: null,
      id: null,
      userName: null,
      email: null,

      image: null,
    },
    setUser: (payload: payloadType) => set(() => ({ auth: payload })),
    setUserImage: (payload: string) =>
      set((state) => ({
        auth: { ...state.auth, image: payload },
      })),
    removeUser: () =>
      set({
        auth: {
          token: null,
          id: null,
          userName: null,
          email: null,
          image: null,
        },
      }),
  }))
);

export default useBoundStore;
