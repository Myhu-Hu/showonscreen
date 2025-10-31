import React from 'react';

interface MicrophoneIconProps {
  isListening: boolean;
  className?: string;
}

export const MicrophoneIcon: React.FC<MicrophoneIconProps> = ({ isListening, className }) => {
  if (isListening) {
    // A square "stop" icon
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
      >
        <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
      </svg>
    );
  }

  // A standard microphone icon for "ready to listen"
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
      <path d="M6 10.5a.75.75 0 01.75.75v1.5a4.5 4.5 0 109 0v-1.5a.75.75 0 011.5 0v1.5a6 6 0 11-12 0v-1.5A.75.75 0 016 10.5z" />
    </svg>
  );
};
