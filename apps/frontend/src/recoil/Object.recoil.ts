import { atom } from 'recoil';

import { ChatMessage, User } from '../types/types';

export const userProfileState = atom<User | null>({
  key: 'userProfile', 
  default: {
    userId: '',
    firstName: '',
    lastName: '',
    profilePicture: '',
    accessToken: '',
    firstLogin: '',
    lastLogin: '',
  } 
});


export const chatMessagesState = atom<ChatMessage[]>({
  key: 'chatMessages',
  default: [],   
});
