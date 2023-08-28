import React from 'react';
import ToDo from './components/todo/todo';
import SettingsProvider from './context/settings/index';

export default function App() {
  return (
    <SettingsProvider>
      <ToDo />
    </SettingsProvider>
  );
}
