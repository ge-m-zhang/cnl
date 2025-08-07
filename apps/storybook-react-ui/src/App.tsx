import { ThemeProvider } from '@gmzh/react-ui';
import React from 'react';

import { Component } from './Component';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">React UI Component Library</h1>
        <Component />
      </div>
    </ThemeProvider>
  );
};

export default App;
