import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Movies from './pages/Movies';
import Signup from './pages/Signup';
import { ThemeProvider } from './theme/themeContext';
import Login from './pages/Login';
import { AuthProvider } from './context';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <AuthProvider>
    <ThemeProvider>
        <Routes>
            <Route path="/movies" element={<Movies />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
        </Routes>
    </ThemeProvider>
</AuthProvider>
   
  );
}

export default App;
