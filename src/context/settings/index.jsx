import React, { useContext, useState, useEffect } from 'react';

const SettingsContext = React.createContext();

export function useSettings() {
  return useContext(SettingsContext);
}

export default function SettingsProvider({ children }) {
  const defaultSettings = {
    displayCount: 3,
    hideCompleted: true,
    sortWord: 'difficulty',
  };

  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
