"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ClickContextType {
  clickCount: number;
}

const ClickContext = createContext<ClickContextType>({
  clickCount: 0,
});

export function ClickProvider({ children }: { children: React.ReactNode }) {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleClick = () => {
      setClickCount(prev => {
        const newCount = prev + 1;
        console.log("Total clicks:", newCount);
        return newCount;
      });
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <ClickContext.Provider value={{ clickCount }}>
      {children}
    </ClickContext.Provider>
  );
}

export function useClicks() {
  return useContext(ClickContext);
} 