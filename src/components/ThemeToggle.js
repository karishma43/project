import React from 'react';
import { Switch, FormControl, FormLabel } from '@chakra-ui/react';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel htmlFor="theme-toggle" mb="0">
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </FormLabel>
      <Switch id="theme-toggle" isChecked={darkMode} onChange={setDarkMode} />
    </FormControl>
  );
};

export default ThemeToggle;
