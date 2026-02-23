import { useState, useCallback } from "react";

const HISTORY_KEY = "stoic-reading-history";

function loadHistory(): number[] {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function useReadingHistory(totalQuotes: number) {
  const [seen, setSeen] = useState<number[]>(loadHistory);

  const markSeen = useCallback((id: number) => {
    setSeen((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setSeen([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  return {
    seen,
    markSeen,
    reset,
    seenCount: seen.length,
    totalQuotes,
    progress: Math.round((seen.length / totalQuotes) * 100),
  };
}
