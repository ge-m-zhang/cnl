// src/components/auth/GoogleLoginButton.spec.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GoogleLoginButton } from './GoogleLoginButton';

vi.mock('../../environments/environments', () => ({
  environment: {
    app: {
      backendUrl: 'http://localhost:4000',
    },
  },
}));

vi.mock('../../assets/icons/google-icon.png', () => ({
  default: 'google-icon-mock',
}));

describe('GoogleLoginButton', () => {
  it('renders a button with the Google icon and correct text', () => {
    render(<GoogleLoginButton />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    const icon = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', 'google-icon-mock');

    expect(button).toHaveTextContent('Sign in with Google');
  });
});
