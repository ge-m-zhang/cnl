import React from 'react';

import googleIcon from '../../assets/icons/google-icon.png';
import { environment } from '../../config/environments';
import { Button } from '@gmzh/react-ui';

export const GoogleLoginButton: React.FC = () => {
  const { backendUrl } = environment.app;

  const handleLogin = () => {
    // -- backend's Google login route
    // !!
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return (
    <Button
      onClick={handleLogin}
      variant="contained"
      size="large"
      startIcon={<img src={googleIcon} alt="Google Icon" className="h-5 w-5" />}
    >
      Sign in with Google
    </Button>
  );
};
