import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { apiClient } from '../api/api';
import { GoogleLoginButton } from '../components/auth/GoogleLoginButton';
import { Flex, Typography } from '@gmzh/react-ui';

export const LandingPage: React.FC = () => {
  const { error: pingError } = useQuery({
    queryKey: ['pingBackend'],
    queryFn: apiClient.pingBackend,
  });

  if (pingError) return <div>Error fetching data</div>;

  return (
    <Flex direction="column" align="center" justify="center" gap="lg" width="full" height="screen">
      <Flex direction="column" align="center" gap="lg">
        <Typography variant="h2" align="center">
          Welcome to the template
        </Typography>
        <GoogleLoginButton />
      </Flex>
    </Flex>
  );
};
