'use client';
import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { type AIError } from '@/types/ai';

export interface GeneralContextType {
  state: GeneralState;
}

export type Theme = "light" | "light-mobile" | "light-high-contrast-experimental" | "dark-experimental";

export interface GeneralActionsType {
  setIsLoading: (value: boolean) => void;
  setError: (value: string) => void;
  setAiErrors: (value: AIError[]) => void;
  setTheme: (theme: Theme) => void;
}

class GeneralState {
  isLoading: boolean = false;
  error: string = '';
  aiErrors: AIError[] = [];
  theme: Theme = "light";

  constructor(init?: Partial<GeneralState>) {
    Object.assign(this, init);
  }
}

const InitialValues: GeneralContextType = {
  state: new GeneralState(),
};

const GeneralContext = createContext<GeneralContextType>(InitialValues);
const GeneralActionsContext = createContext<GeneralActionsType | undefined>(undefined);

export const GeneralContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GeneralState>(new GeneralState());

  const setIsLoading = useCallback((value: boolean) =>
    setState(prev => ({ ...prev, isLoading: value })), []);

  const setError = useCallback((value: string) =>
    setState(prev => ({ ...prev, error: value })), []);

  const setAiErrors = useCallback((value: AIError[]) =>
    setState(prev => ({ ...prev, aiErrors: value })), []);

  const setTheme = useCallback((theme: Theme) => {
    setState(prev => ({ ...prev, theme }));
    localStorage.setItem('theme', theme);
  }, []);

  return (
    <GeneralContext.Provider value={{ state }}>
      <GeneralActionsContext.Provider value={{
        setIsLoading,
        setError,
        setAiErrors,
        setTheme,
      }}>
        {children}
      </GeneralActionsContext.Provider>
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error('useGeneralContext must be used within a ContextProvider');
  }
  return context;
};

export const useGeneralActions = () => {
  const context = useContext(GeneralActionsContext);
  if (!context) {
    throw new Error('useGeneralActions must be used within a GeneralActionsProvider');
  }
  return context;
};


