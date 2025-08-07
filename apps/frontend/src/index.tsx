import './styles/global.css'; // Import Tailwind CSS

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import App from './App';

// Create a QueryClient instance
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    {/* Provide TanStack Query context */}
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Router>
          <App />
        </Router>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
);
