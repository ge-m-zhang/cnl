import { Box, Flex, Typography } from '@gmzh/react-ui';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { apiClient } from '../api/api';
import profileImage from '../assets/images/profile-img.png';
import { userProfileState } from '../recoil/Object.recoil';
import { useUserState } from '../utils/userHelpers';
import ChatInterface from './ChatInterface';

const ProfilePage: React.FC = () => {
  const { error, isLoading } = useUserState();
  const [user] = useRecoilState(userProfileState);

  useEffect(() => {
    if (user?.userId) {
      apiClient.updateUserProfile(user);
    }
  }, [user]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="danger">Error fetching profile data</Typography>;

  return (
    <Flex align="center" justify="center" className="min-h-screen bg-gray-50 p-3">
      {/* Main container */}
      <Box
        className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8"
        style={{ height: '90vh' }}
      >
        <Flex direction="column" className="h-full space-y-6">
          {/* Profile image and name */}
          <Flex direction="column" align="center">
            <Box className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src={user?.profilePicture}
                alt={profileImage}
                className="w-full h-full object-cover"
              />
            </Box>
            <Typography variant="h4" className="font-semibold m-1">
              Hello, {user?.firstName}
            </Typography>
          </Flex>

          {/* Chat interface */}
          <Box className="flex-grow" style={{ minHeight: '0' }}>
            <ChatInterface />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProfilePage;
