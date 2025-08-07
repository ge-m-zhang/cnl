import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { apiClient } from '../api/api';
import profileImage from '../assets/images/profile-img.png';
import { userProfileState } from '../recoil/Object.recoil';
import { useUserState } from '../utils/userHelpers';
import ChatInterface from './ChatInterface';
import { Box, Flex, Typography } from '@gmzh/react-ui';

const ProfilePage: React.FC = () => {
  const { error, isLoading } = useUserState();
  const [user] = useRecoilState(userProfileState);

  useEffect(() => {
    if (user?.userId) {
      apiClient.updateUserProfile(user);
    }
  }, [user]);

  if (isLoading)
    return (
      <Flex align="center" justify="center" height="screen">
        <Typography variant="body1" color="muted">
          Loading...
        </Typography>
      </Flex>
    );

  if (error)
    return (
      <Flex align="center" justify="center" height="screen">
        <Typography variant="body1" color="danger">
          Error fetching profile data
        </Typography>
      </Flex>
    );

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="screen"
      className="bg-gray-50 p-4"
    >
      <Flex
        direction="column"
        className="w-full max-w-4xl bg-white shadow-lg rounded-lg h-[90vh] p-8 space-y-6"
      >
        <Flex direction="column" align="center">
          <Box className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src={user?.profilePicture}
              alt={profileImage}
              className="w-full h-full object-cover"
            />
          </Box>
          <Typography variant="h3" className="mt-4">
            Hello, {user?.firstName}
          </Typography>
        </Flex>

        <Box width="full" className="h-1 bg-gray-200" />

        <Box className="flex-grow overflow-auto">
          <ChatInterface />
        </Box>
      </Flex>
    </Flex>
  );
};

export default ProfilePage;
