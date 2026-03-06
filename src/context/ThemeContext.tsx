import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@theme_mode';

type ThemeMode = 'light' | 'dark';

interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryLight: string;
  danger: string;
  shadow: string;
}

const lightColors: ThemeColors = {
  background:    '#F0F9FF',
  surface:       '#FFFFFF',
  surfaceAlt:    '#E0F2FE',
  border:        '#BAE6FD',
  text:          '#0C1A2E',
  textSecondary: '#64748B',
  textMuted:     '#94A3B8',
  primary:       '#38BDF8',
  primaryLight:  '#E0F2FE',
  danger:        '#EF4444',
  shadow:        '#38BDF8',
};

const darkColors: ThemeColors = {
  background:    '#0F172A',
  surface:       '#1E293B',
  surfaceAlt:    '#0F172A',
  border:        '#334155',
  text:          '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted:     '#64748B',
  primary:       '#38BDF8',
  primaryLight:  '#1E3A5F',
  danger:        '#EF4444',
  shadow:        '#000000',
};

interface ThemeContextType {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  colors: lightColors,
  toggleTheme: () => {},
  isDark: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY).then(stored => {
      if (stored === 'dark' || stored === 'light') setMode(stored);
    });
  }, []);

  const toggleTheme = async () => {
    const next = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    await AsyncStorage.setItem(THEME_KEY, next);
  };

  return (
    <ThemeContext.Provider value={{
      mode,
      colors: mode === 'dark' ? darkColors : lightColors,
      toggleTheme,
      isDark: mode === 'dark',
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);