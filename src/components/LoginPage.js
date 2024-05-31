import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Input, Button } from '@chakra-ui/react';

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      setIsAuthenticated(true);
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        mb={2}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        mb={2}
      />
      <Button onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default LoginPage;
