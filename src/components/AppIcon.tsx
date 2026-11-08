import React from 'react';

interface AppIconProps {
  type: string;
  className?: string;
  size?: number;
}

export const AppIcon: React.FC<AppIconProps> = ({ type, className = '', size = 32 }) => {
  switch (type) {
    case 'instagram':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-grad)" />
          <rect x="6.5" y="6.5" width="11" height="11" rx="3.5" stroke="#FFFFFF" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.8" stroke="#FFFFFF" strokeWidth="1.8" />
          <circle cx="15.8" cy="8.2" r="0.9" fill="#FFFFFF" />
          <defs>
            <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FCAF45" />
              <stop offset="0.4" stopColor="#E1306C" />
              <stop offset="0.75" stopColor="#C13584" />
              <stop offset="1" stopColor="#833AB4" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'netflix':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#141414" />
          <path d="M6 3H9.5V20.5H6V3Z" fill="#B81D24" />
          <path d="M14.5 3H18V20.5H14.5V3Z" fill="#B81D24" />
          <path d="M6 3L17.8 20.8H14.5L6 7.5V3Z" fill="#E50914" />
        </svg>
      );

    case 'youtube':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#FF0000" />
          <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="#FFFFFF" />
        </svg>
      );

    case 'prime':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#00A8E1" />
          <path d="M6 10C6 8 8 7 10 7H14C16 7 18 8 18 10V14C18 16 16 17 14 17H10C8 17 6 16 6 14V10Z" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
          <path d="M7 16.5C11 18.5 15 18 17 16" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M15.5 15.2L17.2 16.2L16.2 17.8" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'disney':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#040714" />
          <path d="M12 4C7.5 4 4 7.5 4 12C4 16.5 7.5 20 12 20C16.5 20 20 16.5 20 12" stroke="#0063E5" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 7V17M7 12H17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" fill="#00A8E1" />
        </svg>
      );

    case 'spotify':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#1DB954" />
          <circle cx="12" cy="12" r="9" fill="#1DB954" />
          <path d="M6.5 9.5C9.5 8.2 14.5 8 17.5 9.8" stroke="#121212" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7.5 12.3C10 11.2 14 11 16.5 12.5" stroke="#121212" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8.5 15C10.5 14.1 13.5 14 15.5 15.2" stroke="#121212" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );

    case 'twitch':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#9146FF" />
          <path d="M5 4L4 7V18H8V21L11 18H14L19 13V4H5ZM17.5 12L15 14.5H12L9.5 17V14.5H6.5V5.5H17.5V12Z" fill="#FFFFFF" />
          <rect x="13.5" y="8" width="1.8" height="3.5" fill="#9146FF" />
          <rect x="9.5" y="8" width="1.8" height="3.5" fill="#9146FF" />
        </svg>
      );

    case 'plex':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#1F2326" />
          <path d="M12 4L19 12L12 20L5 12L12 4Z" fill="#E5A00D" />
          <path d="M12 8L15.5 12L12 16L8.5 12L12 8Z" fill="#1F2326" />
        </svg>
      );

    case 'apple':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#1C1C1E" />
          <path d="M15.5 12.8C15.5 10.8 17.1 9.8 17.2 9.7C16.2 8.3 14.7 8.1 14.2 8C13 7.9 11.8 8.7 11.2 8.7C10.6 8.7 9.6 8 8.6 8C7.3 8 6.1 8.8 5.4 9.9C4.1 12.3 5 15.8 6.3 17.6C6.9 18.5 7.6 19.5 8.6 19.5C9.5 19.5 9.9 18.9 11 18.9C12.1 18.9 12.4 19.5 13.4 19.5C14.4 19.5 15.1 18.6 15.7 17.7C16.4 16.7 16.7 15.7 16.7 15.6C16.6 15.5 15.5 15.1 15.5 12.8Z" fill="#FFFFFF" />
          <path d="M13.6 6.7C14.1 6.1 14.4 5.3 14.3 4.5C13.6 4.5 12.7 5 12.2 5.6C11.8 6.1 11.4 7 11.5 7.8C12.3 7.8 13.1 7.3 13.6 6.7Z" fill="#FFFFFF" />
        </svg>
      );

    case 'crunchyroll':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#F47521" />
          <circle cx="12" cy="12" r="7" fill="#FFFFFF" />
          <circle cx="13.2" cy="12" r="5" fill="#F47521" />
          <circle cx="14" cy="12" r="3.2" fill="#FFFFFF" />
        </svg>
      );

    case 'steam':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#171A21" />
          <path d="M12 3C7 3 3 7 3 12C3 15.6 5.1 18.7 8.2 20.1L10.3 16.5C10.2 16.2 10.1 15.9 10.1 15.5C10.1 14.1 11.2 13 12.6 13C14 13 15.1 14.1 15.1 15.5C15.1 16.9 14 18 12.6 18C12.4 18 12.1 18 11.9 17.9L9.6 20.8C10.4 20.9 11.2 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z" fill="#66C0F4" />
        </svg>
      );

    case 'retroarch':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#2D3748" />
          <path d="M6 8L8 10H16L18 8H20V16H18L16 14H8L6 16H4V8H6Z" fill="#E2E8F0" />
          <circle cx="8" cy="12" r="1.5" fill="#E1306C" />
          <circle cx="16" cy="12" r="1.5" fill="#00A8E1" />
        </svg>
      );

    case 'kodi':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#12B2E7" />
          <path d="M12 4L19 12L12 20L5 12L12 4Z" fill="#FFFFFF" />
          <path d="M12 8L15 12L12 16L9 12L12 8Z" fill="#12B2E7" />
        </svg>
      );

    case 'browser':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#3B82F6" />
          <circle cx="12" cy="12" r="7.5" stroke="#FFFFFF" strokeWidth="1.8" />
          <ellipse cx="12" cy="12" rx="3.5" ry="7.5" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="4.5" y1="12" x2="19.5" y2="12" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      );

    case 'folder':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#F59E0B" />
          <path d="M4 6H9L11 8H20V18H4V6Z" fill="#FFFFFF" />
        </svg>
      );

    case 'settings':
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
          <rect width="24" height="24" rx="6" fill="#4B5563" />
          <circle cx="12" cy="12" r="3" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M12 4V6M12 18V20M4 12H6M18 12H20M6.3 6.3L7.7 7.7M16.3 16.3L17.7 17.7M6.3 17.7L7.7 16.3M16.3 7.7L17.7 6.3" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
};
