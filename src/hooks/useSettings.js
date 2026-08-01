import { useState, useEffect, useCallback } from 'react';
import { fetchSettings, updateTheme, updateAccentColor, updateFontSize } from '../api/settingsApi';

const DEFAULT_SETTINGS = {
  theme: 'SYSTEM',
  accentColor: 'BLUE',
  fontSize: 'MEDIUM',
};

const LOCAL_STORAGE_KEY = 'study_tracker_user_settings';

export function useSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [loading, setLoading] = useState(true);

  // Apply DOM attributes for Theme, Accent Color, and Font Size
  const applySettingsToDOM = useCallback((currentSettings) => {
    const root = document.documentElement;
    const { theme, accentColor, fontSize } = currentSettings;

    // 1. Accent Color
    root.setAttribute('data-accent', (accentColor || 'BLUE').toLowerCase());

    // 2. Font Size
    root.setAttribute('data-font-size', (fontSize || 'MEDIUM').toLowerCase());

    // 3. Theme (Light, Dark, System)
    const resolveSystemTheme = () => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    let effectiveTheme = (theme || 'SYSTEM').toLowerCase();
    if (effectiveTheme === 'system') {
      effectiveTheme = resolveSystemTheme();
    }
    root.setAttribute('data-theme', effectiveTheme);
  }, []);

  // Sync settings DOM application & system theme media query listener
  useEffect(() => {
    applySettingsToDOM(settings);

    if (settings.theme === 'SYSTEM') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = () => {
        applySettingsToDOM(settings);
      };

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleSystemThemeChange);
      } else {
        mediaQuery.addListener(handleSystemThemeChange);
      }

      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleSystemThemeChange);
        } else {
          mediaQuery.removeListener(handleSystemThemeChange);
        }
      };
    }
  }, [settings, applySettingsToDOM]);

  // Load from backend on startup
  useEffect(() => {
    let isMounted = true;
    fetchSettings()
      .then((data) => {
        if (isMounted && data) {
          setSettings(data);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        }
      })
      .catch((err) => {
        console.warn('Could not load settings from backend, using defaults:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Change Theme
  const changeTheme = async (newTheme) => {
    const updated = { ...settings, theme: newTheme };
    setSettings(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    try {
      const response = await updateTheme(newTheme);
      if (response) setSettings(response);
    } catch (err) {
      console.error('Failed to persist theme:', err);
    }
  };

  // Change Accent Color
  const changeAccentColor = async (newAccent) => {
    const updated = { ...settings, accentColor: newAccent };
    setSettings(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    try {
      const response = await updateAccentColor(newAccent);
      if (response) setSettings(response);
    } catch (err) {
      console.error('Failed to persist accent color:', err);
    }
  };

  // Change Font Size
  const changeFontSize = async (newFontSize) => {
    const updated = { ...settings, fontSize: newFontSize };
    setSettings(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    try {
      const response = await updateFontSize(newFontSize);
      if (response) setSettings(response);
    } catch (err) {
      console.error('Failed to persist font size:', err);
    }
  };

  return {
    settings,
    loading,
    changeTheme,
    changeAccentColor,
    changeFontSize,
  };
}
