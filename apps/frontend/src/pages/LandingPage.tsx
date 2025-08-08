import { Flex, Typography } from '@gmzh/react-ui';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { apiClient } from '../api/api';
import { GoogleLoginButton } from '../components/auth/GoogleLoginButton';

export const LandingPage: React.FC = () => {
  const { error: pingError } = useQuery({
    queryKey: ['pingBackend'],
    queryFn: apiClient.pingBackend,
  });

  if (pingError) return <div>Error fetching data</div>;

  return (
    <Flex direction="column" align="center" justify="center" gap="md" className="min-h-screen">
      <Typography variant="h4">Welcome to Chat & Learn</Typography>
      <GoogleLoginButton />
    </Flex>
  );
};
