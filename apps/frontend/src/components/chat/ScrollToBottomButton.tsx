import { Button } from '@gmzh/react-ui';
import React from 'react';

interface ScrollToBottomButtonProps {
  onClick: () => void;
  show: boolean;
}

const ScrollToBottomButton: React.FC<ScrollToBottomButtonProps> = ({ onClick, show }) => {
  if (!show) return null;

  return (
    <Button
      variant="contained"
      onClick={onClick}
      size="small"
      className="absolute rounded-full"
      style={{
        bottom: '20px', // Position near bottom of chat area
        left: '50%', // Center horizontally
        transform: 'translateX(-50%)', // Perfect centering
        zIndex: 10,
      }}
    >
      ↓
    </Button>
  );
};

export default ScrollToBottomButton;
