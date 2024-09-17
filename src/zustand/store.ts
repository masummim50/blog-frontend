// src/store/useBoundStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createAuthSlice } from "./authSlice";
import { createCommunitySlice } from "./communitySlice";

// Type definition for combined store
type StoreState = ReturnType<typeof createAuthSlice> &
  ReturnType<typeof createCommunitySlice>;

const useBoundStore = create<StoreState>()(
  devtools((set) => ({
    ...createAuthSlice(set),
    ...createCommunitySlice(set),
  }))
);

export default useBoundStore;
