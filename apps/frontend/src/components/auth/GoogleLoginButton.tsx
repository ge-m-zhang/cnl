import { Button, Flex, Typography } from '@gmzh/react-ui';
import React from 'react';

import googleIcon from '../../assets/icons/google-icon.png';
import { environment } from '../../config/environments';

export const GoogleLoginButton: React.FC = () => {
  const { backendUrl } = environment.app;

  const handleLogin = () => {
    // -- backend's Google login route
    // !!
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  return (
    <Button variant="contained" onClick={handleLogin} className="my-6">
      <Flex align="center" gap="sm">
        <img src={googleIcon} alt="Google Icon" className="h-5 w-5" />
        <Typography bold>Sign in with Google</Typography>
      </Flex>
    </Button>
  );
};
