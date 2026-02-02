'use client';

import { useState, useEffect, useCallback } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeConfig {
  mode: ThemeMode;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  contrastRatio: number; // for WCAG compliance
}

const LIGHT_THEME: Omit<ThemeConfig, 'mode' | 'contrastRatio'> = {
  primaryColor: '#3b82f6',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
};

const DARK_THEME: Omit<ThemeConfig, 'mode' | 'contrastRatio'> = {
  primaryColor: '#60a5fa',
  backgroundColor: '#1a1a1a',
  textColor: '#f3f4f6',
};

export const useWidgetTheme = (initialMode: ThemeMode = 'auto') => {
  const [theme, setTheme] = useState<ThemeConfig>({
    mode: initialMode,
    ...DARK_THEME,
    contrastRatio: 4.5,
  });
  const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>('dark');

  // Detect system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches ? 'dark' : 'light');
    };

    // Set initial preference
    setSystemPreference(mediaQuery.matches ? 'dark' : 'light');

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to DOM
  useEffect(() => {
    const isDark = theme.mode === 'auto' ? systemPreference === 'dark' : theme.mode === 'dark';
    
    const root = document.documentElement;
    
    // Set CSS variables for theming
    root.style.setProperty('--widget-primary', theme.primaryColor);
    root.style.setProperty('--widget-background', theme.backgroundColor);
    root.style.setProperty('--widget-text', theme.textColor);
    
    // Apply data-theme attribute
    root.setAttribute('data-widget-theme', isDark ? 'dark' : 'light');
    
    // Apply class for styling
    if (isDark) {
      document.documentElement.classList.add('widget-dark');
      document.documentElement.classList.remove('widget-light');
    } else {
      document.documentElement.classList.add('widget-light');
      document.documentElement.classList.remove('widget-dark');
    }
  }, [theme, systemPreference]);

  // Calculate contrast ratio (simplified WCAG check)
  const calculateContrastRatio = useCallback((color1: string, color2: string): number => {
    const getLuminance = (hex: string): number => {
      const rgb = parseInt(hex.slice(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      const luminance =
        (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.5 ? (luminance + 0.05) / 0.05 : 0.05 / (luminance + 0.05);
    };

    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return parseFloat(contrast.toFixed(2));
  }, []);

  // Set theme mode
  const setThemeMode = useCallback((mode: ThemeMode) => {
    setTheme(prev => ({
      ...prev,
      mode,
    }));
  }, []);

  // Set custom colors
  const setColors = useCallback(
    (colors: { primary?: string; background?: string; text?: string }) => {
      setTheme(prev => {
        const updated = {
          ...prev,
          primaryColor: colors.primary ?? prev.primaryColor,
          backgroundColor: colors.background ?? prev.backgroundColor,
          textColor: colors.text ?? prev.textColor,
        };

        // Update contrast ratio
        updated.contrastRatio = calculateContrastRatio(
          updated.primaryColor,
          updated.backgroundColor
        );

        return updated;
      });
    },
    [calculateContrastRatio]
  );

  // Apply preset theme
  const applyPreset = useCallback((preset: 'light' | 'dark' | 'goldStandard' | 'ocean' | 'forest') => {
    const presets: Record<string, Omit<ThemeConfig, 'mode' | 'contrastRatio'>> = {
      light: LIGHT_THEME,
      dark: DARK_THEME,
      goldStandard: {
        primaryColor: '#F4C430',
        backgroundColor: '#1a1a1a',
        textColor: '#ffffff',
      },
      ocean: {
        primaryColor: '#0EA5E9',
        backgroundColor: '#0f172a',
        textColor: '#f1f5f9',
      },
      forest: {
        primaryColor: '#10b981',
        backgroundColor: '#0f2f1f',
        textColor: '#f0fdf4',
      },
    };

    const selected = presets[preset];
    if (selected) {
      setColors(selected);
    }
  }, [setColors]);

  // Get computed theme (taking into account auto mode)
  const getComputedTheme = useCallback(() => {
    const isDark = theme.mode === 'auto' ? systemPreference === 'dark' : theme.mode === 'dark';
    return {
      isDark,
      isLight: !isDark,
      ...theme,
    };
  }, [theme, systemPreference]);

  // Validate contrast (WCAG compliance)
  const validateContrast = useCallback((minRatio: number = 4.5): boolean => {
    return theme.contrastRatio >= minRatio;
  }, [theme.contrastRatio]);

  // Export theme as CSS
  const exportAsCSS = useCallback((): string => {
    return `
:root {
  --widget-primary: ${theme.primaryColor};
  --widget-background: ${theme.backgroundColor};
  --widget-text: ${theme.textColor};
}

.widget {
  background-color: var(--widget-background);
  color: var(--widget-text);
}

.widget-button {
  background-color: var(--widget-primary);
  color: var(--widget-background);
}
    `.trim();
  }, [theme]);

  return {
    theme,
    systemPreference,
    setThemeMode,
    setColors,
    applyPreset,
    getComputedTheme,
    validateContrast,
    exportAsCSS,
  };
};

export default useWidgetTheme;
