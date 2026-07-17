import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface SpendingEntry {
  id: string;
  amount: number;
  category: string;
  mood: string;
  note: string;
  date: string; // ISO string
}

export interface ChallengeProgress {
  [id: number]: number; // 0-100
}

interface UserDataContextType {
  entries: SpendingEntry[];
  challengeProgress: ChallengeProgress;
  addEntry: (entry: Omit<SpendingEntry, 'id' | 'date'>) => void;
  removeEntry: (id: string) => void;
  setChallengeProgress: (id: number, value: number) => void;
  totalSpent: number;
  emotionalSpendingPct: number;
  moodTotals: Record<string, number>;
}

const UserDataContext = createContext<UserDataContextType | null>(null);

const STORAGE_KEY = 'tawazon_entries_v1';
const CHALLENGE_KEY = 'tawazon_challenges_v1';

const EMOTIONAL_MOODS = ['stressed', 'sad', 'bored', 'متوتر', 'حزين', 'bored-ar'];

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<SpendingEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [challengeProgress, setChallengeProgressState] = useState<ChallengeProgress>(() => {
    try {
      const saved = localStorage.getItem(CHALLENGE_KEY);
      return saved ? JSON.parse(saved) : { 1: 57, 2: 60, 3: 67 };
    } catch { return { 1: 57, 2: 60, 3: 67 }; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem(CHALLENGE_KEY, JSON.stringify(challengeProgress));
  }, [challengeProgress]);

  const addEntry = useCallback((entry: Omit<SpendingEntry, 'id' | 'date'>) => {
    setEntries(prev => [{
      ...entry,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    }, ...prev]);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  }, []);

  const setChallengeProgress = useCallback((id: number, value: number) => {
    setChallengeProgressState(prev => ({ ...prev, [id]: Math.min(100, Math.max(0, value)) }));
  }, []);

  const totalSpent = entries.reduce((sum, e) => sum + e.amount, 0);

  const emotionalEntries = entries.filter(e => EMOTIONAL_MOODS.includes(e.mood));
  const emotionalSpendingPct = entries.length > 0
    ? Math.round((emotionalEntries.length / entries.length) * 100)
    : 0;

  const moodTotals = entries.reduce((acc, e) => {
    acc[e.mood] = (acc[e.mood] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <UserDataContext.Provider value={{
      entries, challengeProgress,
      addEntry, removeEntry, setChallengeProgress,
      totalSpent, emotionalSpendingPct, moodTotals,
    }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const ctx = useContext(UserDataContext);
  if (!ctx) throw new Error('useUserData must be used within UserDataProvider');
  return ctx;
}
