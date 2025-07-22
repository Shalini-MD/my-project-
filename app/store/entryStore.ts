import { create } from 'zustand';

export type Entry = {
  id: string;
  category: string;
  amount: number;
  note?: string;
  type: 'income' | 'expense';
  date: string; // YYYY-MM-DD format
};

type EntryStore = {
  entries: Entry[];
  addEntry: (entry: Entry) => void;
};

export const useEntryStore = create<EntryStore>((set) => ({
  entries: [],
  addEntry: (entry) => set((state) => ({ entries: [...state.entries, entry] })),
}));
