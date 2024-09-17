// src/store/authSlice.ts
type AuthState = {
  auth: {
    token: string | null;
    id: string | null;
    userName: string | null;
    email: string | null;
    image: string | null;
  };
  setUser: (payload: AuthPayload) => void;
  setUserImage: (payload: string) => void;
  removeUser: () => void;
};

type AuthPayload = {
  token: string;
  id: string;
  userName: string;
  email: string;
  image: string | null;
};

export const createAuthSlice = (set: any) => ({
  auth: {
    token: null,
    id: null,
    userName: null,
    email: null,
    image: null,
  },
  setUser: (payload: AuthPayload) => set(() => ({ auth: payload })),
  setUserImage: (payload: string) =>
    set((state: AuthState) => ({ auth: { ...state.auth, image: payload } })),
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
});
