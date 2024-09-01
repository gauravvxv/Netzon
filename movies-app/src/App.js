import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Movies from './pages/Movies';
import Signup from './pages/Signup';
import { ThemeProvider } from './theme/themeContext';
import Login from './pages/Login';
import { AuthProvider } from './context';

function App() {
  return (
    <AuthProvider>
    <ThemeProvider>
        <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </ThemeProvider>
</AuthProvider>
   
  );
}

export default App;
