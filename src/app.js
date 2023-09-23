import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ToDo from './components/todo/todo';
import SettingsForm from './components/settingsform/settingsform';
import Header from './components/header/header';
import SettingsProvider from './context/settings/index'; 
import Login from './components/auth/login';
import LoginProvider from './context/auth/context';
import Signup from './components/auth/signup';

function App() {
  return (
    <>
    <LoginProvider>
    <SettingsProvider> 
        {/* <Header /> */}
         
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/settings" element={<SettingsForm />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
    </SettingsProvider>
    </LoginProvider>
    </>
  );
}

export default App;
