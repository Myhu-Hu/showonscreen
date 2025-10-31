import React from 'react';

interface SettingsIconProps {
  className?: string;
}

export const SettingsIcon: React.FC<SettingsIconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 5.85c-.09.55-.525.955-1.074 1.056L5.85 7.084c-.918.151-1.568.933-1.568 1.85v5.132c0 .917.65 1.699 1.568 1.85l2.126.178c.549.101.984.506 1.074 1.056l.178 2.126c.151.918.933 1.567 1.85 1.567h1.844c.917 0 1.699-.65 1.85-1.567l.178-2.126c.09-.55.525-.955 1.074-1.056l2.126-.178c.918-.151 1.568-.933 1.568-1.85v-5.132c0-.917-.65-1.699-1.568-1.85l-2.126-.178a1.125 1.125 0 01-1.074-1.056l-.178-2.126A1.875 1.875 0 0012.922 2.25h-1.844zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
      clipRule="evenodd"
    />
  </svg>
);
