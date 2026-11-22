"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type IntroContextValue = {
  ready: boolean;
  markReady: () => void;
};

const IntroContext = createContext<IntroContextValue>({
  ready: true,
  markReady: () => undefined,
});

export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(true);
  const markReady = useCallback(() => setReady(true), []);
  const value = useMemo(() => ({ ready, markReady }), [ready, markReady]);
  return (
    <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
  );
}

export function useIntroReady() {
  return useContext(IntroContext).ready;
}

export function useMarkIntroReady() {
  return useContext(IntroContext).markReady;
}
