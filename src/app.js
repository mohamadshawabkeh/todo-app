import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ToDo from './components/todo/todo';
import SettingsForm from './components/settingsform/settingsform';
import Header from './components/header/header';
import SettingsProvider from './context/settings/index'; 

function App() {
  return (
    <SettingsProvider> 
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<ToDo />} />
          <Route path="/settings" element={<SettingsForm />} />
        </Routes>
      </div>
    </SettingsProvider>
  );
}

export default App;
