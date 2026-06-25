"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import ResumeModal from "./ResumeModal";

type ResumeContextValue = {
  openResume: () => void;
  closeResume: () => void;
  isOpen: boolean;
};

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openResume = useCallback(() => setIsOpen(true), []);
  const closeResume = useCallback(() => setIsOpen(false), []);

  return (
    <ResumeContext.Provider value={{ openResume, closeResume, isOpen }}>
      {children}
      {isOpen && <ResumeModal onClose={closeResume} />}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within ResumeProvider");
  }
  return context;
}
