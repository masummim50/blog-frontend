// src/store/communitySlice.ts
// type CommunityState = {
//   community: {
//     id: string | null;
//     name: string | null;
//   };
//   setCommunity: (payload: CommunityPayload) => void;
//   removeCommunity: () => void;
// };

type CommunityPayload = {
  id: string;
  name: string;
};

export const createCommunitySlice = (set: any) => ({
  community: {
    id: null,
    name: null,
  },
  setCommunity: (payload: CommunityPayload) =>
    set(() => ({ community: payload })),
  removeCommunity: () =>
    set({
      community: {
        id: null,
        name: null,
      },
    }),
});
