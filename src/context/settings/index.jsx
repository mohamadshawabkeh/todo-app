import React, { useContext, useState } from 'react';

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

  const [settings] = useState(defaultSettings);

  return (
    <SettingsContext.Provider value={{ settings }}>
      {children}
    </SettingsContext.Provider>
  );
}
