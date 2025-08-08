import { Button, Flex, TextField } from '@gmzh/react-ui';
import React, { useState } from 'react';

import { validateMessage } from '../../utils/chatUtils';

interface InputFieldProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ onSendMessage, disabled = false }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!validateMessage(inputValue)) return;

    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Flex
      align="center"
      gap="sm"
      className="w-full bg-white border-t border-gray-300 p-3"
      style={{ height: '72px' }}
    >
      <TextField
        type="text"
        placeholder="Type a message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        fullWidth
        size="medium"
      />
      <Button
        variant="contained"
        onClick={handleSendMessage}
        disabled={disabled || !validateMessage(inputValue)}
      >
        Send
      </Button>
    </Flex>
  );
};

export default InputField;
