import React from 'react';
import { Button } from '@mui/material';

function LoginButton() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleLogin}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        marginTop: '20px'
      }}
    >
      Login with Google
    </Button>
  );
}

export default LoginButton;

