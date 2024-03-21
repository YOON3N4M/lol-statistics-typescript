import { MatchInfoObj, RiotId, UserDocument } from "@/types/types";
import { create } from "zustand";

export type ContentsType = "전적" | "인게임 정보";

interface SummonerStore {
  userDocument: UserDocument | null;
  riotId: RiotId | null;
  matchHistory: MatchInfoObj[] | null;
  selectedContents: ContentsType;
  actions: {
    setUserDocument: (userDoc: UserDocument | null) => void;
    setRiotId: (riotId: RiotId | null) => void;
    setMatchHistory: (history: MatchInfoObj[] | null) => void;
    setSelectedContents: (content: ContentsType) => void;
  };
}

const useSummonerStore = create<SummonerStore>((set) => ({
  userDocument: null,
  riotId: null,
  matchHistory: null,
  selectedContents: "전적",
  actions: {
    setUserDocument: (userDoc) => set({ userDocument: userDoc }),
    setRiotId: (riotId) =>
      set({
        riotId: riotId,
      }),
    setMatchHistory: (history) => set({ matchHistory: history }),
    setSelectedContents: (content) => set({ selectedContents: content }),
  },
}));

export const useUserDocument = () =>
  useSummonerStore((state) => state.userDocument);
export const useRiotId = () => useSummonerStore((state) => state.riotId);
export const useMatchHistory = () =>
  useSummonerStore((state) => state.matchHistory);
export const useSelectedContents = () =>
  useSummonerStore((state) => state.selectedContents);

export const useSummonerActions = () =>
  useSummonerStore((state) => state.actions);
