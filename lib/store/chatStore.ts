// lib/store/chatStore.ts
import { create } from "zustand";

type ChatStore = {
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  input: string;
  setInput: (val: string) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  activeChatId: null,
  setActiveChatId: (id) => set({ activeChatId: id }),
  input: "",
  setInput: (val) => set({ input: val }),
}));
