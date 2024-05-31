import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import LoginPage from './components/LoginPage';
import HomePage from './pages/HomePage';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const { colorMode, setColorMode, toggleColorMode } = useColorMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (storedDarkMode && colorMode !== 'dark') {
      setColorMode('dark');
    } else if (!storedDarkMode && colorMode !== 'light') {
      setColorMode('light');
    }
  }, [colorMode, setColorMode]);

  const handleDarkModeToggle = () => {
    const newDarkMode = colorMode === 'light';
    localStorage.setItem('darkMode', newDarkMode);
    toggleColorMode();
  };

  const themeText = useColorModeValue('Dark Mode', 'Light Mode');

  return (
    <Box p={4}>
      <ThemeToggle darkMode={colorMode === 'dark'} setDarkMode={handleDarkModeToggle} />
      <Button onClick={handleDarkModeToggle}>{themeText}</Button>
      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Box>
  );
}

export default App;
