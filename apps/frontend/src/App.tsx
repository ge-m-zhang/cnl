import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '@gmzh/react-ui/styles';
import { ThemeProvider } from '@gmzh/react-ui';
import { LandingPage } from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';

const App: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
