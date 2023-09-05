import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ToDo from './components/todo/todo';
import SettingsForm from './components/settingsform/settingsform';
import Header from './components/header/header';
import SettingsProvider from './context/settings/index'; 
import Login from './components/auth/login';
import LoginProvider from './context/auth/context';


function App() {
  return (
    <>
    <LoginProvider>
    <SettingsProvider> 
        {/* <Header /> */}
         
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/settings" element={<SettingsForm />} />
        </Routes>
    </SettingsProvider>
    </LoginProvider>
    </>
  );
}

export default App;
