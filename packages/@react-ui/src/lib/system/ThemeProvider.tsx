// packages/ui/src/lib/system/ThemeProvider.tsx

import React, { createContext, useContext, useEffect, useState } from 'react';

// Theme configuration (moved to TypeScript for JS access)
export const themeConfig = {
  zIndices: {
    menu: 1000,
    dropDown: 1100,
    modalBackdrop: 1500,
    modal: 1600,
    toast: 2600,
    tooltip: 1300,
    tooltipContent: 1350,
  },
  portals: {
    modal: {
      id: 'modal-entry',
      zIndex: 1600,
    },
    toast: {
      id: 'toast-entry',
      zIndex: 2600,
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// Theme context for runtime values (dark mode, etc.)
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  enableSystem?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  enableSystem = true,
}) => {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(defaultTheme);
  const [isDark, setIsDark] = useState(false);

  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (theme === 'system') {
        setIsDark(mediaQuery.matches);
      }
    };

    handleChange(); // Set initial value

    if (enableSystem) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, enableSystem]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
      setIsDark(systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', theme === 'dark');
      setIsDark(theme === 'dark');
    }
  }, [theme]);

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (stored) {
      setThemeState(stored);
    }
  }, []);

  const value: ThemeContextType = {
    isDark,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className="min-h-screen bg-background text-foreground transition-colors">
        {children}

        {/* Portal containers */}
        <div
          id={themeConfig.portals.modal.id}
          style={{ zIndex: themeConfig.portals.modal.zIndex }}
        />
        <div
          id={themeConfig.portals.toast.id}
          style={{ zIndex: themeConfig.portals.toast.zIndex }}
        />
      </div>
    </ThemeContext.Provider>
  );
};
