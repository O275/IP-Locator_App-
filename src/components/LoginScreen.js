import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import LoginButton from './LoginButton';

function LoginScreen() {


  return (
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: '20px',
          backgroundColor: 'background.default',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box mt={3} sx={{ textAlign: 'center' }}>
          <LoginButton />
        </Box>
        <Box
          position="absolute"
          bottom={20}
          left="50%"
          sx={{ transform: 'translateX(-50%)', display: 'flex', alignItems: 'center' }}
        >
          <Typography variant="body2" sx={{ mr: 2 }}>
            Dark Mode
          </Typography>

        </Box>
      </Container>
  );
}

export default LoginScreen;
