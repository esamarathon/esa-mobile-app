import React from 'react';

interface IProps {
  className?: string;
}

export function ChevronRight({className}: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="12"
      fill="none"
      viewBox="0 0 8 12"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M.6 1.4L2 0l6 6-6 6-1.4-1.4L5.2 6 .6 1.4z"
        clipRule="evenodd"
        opacity="0.54"
      />
    </svg>
  );
}

export function MenuIcon({className}: IProps) {
  return (
    <svg
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
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

export function LocationIcon({className}: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 1.333A4.663 4.663 0 003.333 6C3.333 9.5 8 14.667 8 14.667S12.667 9.5 12.667 6A4.663 4.663 0 008 1.333zM4.667 6a3.335 3.335 0 016.666 0c0 1.92-1.92 4.793-3.333 6.587C6.613 10.807 4.667 7.9 4.667 6zm1.666 0a1.667 1.667 0 113.334 0 1.667 1.667 0 01-3.334 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ScheduleIcon({className}: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 6H6V5H4v3h16V5h-2v1h-2V5H8v1zm12 4H4v10h16V10zm-4-7H8V2H6v1H4a2 2 0 00-2 2v15a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2h-2V2h-2v1zM7 14v-2h2v2H7zm4 0h2v-2h-2v2zm4 0v-2h2v2h-2zm-8 2v2h2v-2H7zm6 2h-2v-2h2v2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function HeartIcon({className}: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="currentColor"
        strokeWidth="2"
        d="M12 21.175l-1.45-1.32C5.4 15.185 2 12.105 2 8.325c0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.175z"
      />
    </svg>
  );
}

export function UserIcon({className}: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 11a4 4 0 100-8 4 4 0 000 8z"
        clipRule="evenodd"
      />
    </svg>
  );
}
