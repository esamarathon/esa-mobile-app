import React from 'react';

interface IProps {
  className?: string;
}

export function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" fill="none" viewBox="0 0 8 12">
      <path
        fill="#881AE8"
        fillRule="evenodd"
        d="M.6 1.4L2 0l6 6-6 6-1.4-1.4L5.2 6 .6 1.4z"
        clipRule="evenodd"
        opacity="0.54"
      />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 11.9529H10V10.0235H0V11.9529ZM0 7.12941H18V5.2H0V7.12941ZM0 0.376465V2.30588H18V0.376465H0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function NotificationIcon({className}: IProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 15.75V10.75C18 7.68 16.37 5.11 13.5 4.43V3.75C13.5 2.92 12.83 2.25 12 2.25C11.17 2.25 10.5 2.92 10.5 3.75V4.43C7.64003 5.11 6.00003 7.67 6.00003 10.75V15.75L4.00003 17.75V18.75H20V17.75L18 15.75ZM12 21.75C13.1 21.75 14 20.85 14 19.75H10C10 20.85 10.9 21.75 12 21.75ZM8.00003 16.75H16V10.75C16 8.27 14.49 6.25 12 6.25C9.51003 6.25 8.00003 8.27 8.00003 10.75V16.75ZM7.58003 3.83L6.15003 2.4C3.75003 4.23 2.17003 7.05 2.03003 10.25H4.03003C4.18003 7.6 5.54003 5.28 7.58003 3.83ZM21.97 10.25H19.97C19.82 7.6 18.45 5.28 16.43 3.83L17.85 2.4C20.24 4.23 21.82 7.05 21.97 10.25Z"
        fill="currentColor"
      />
    </svg>
  );
}
