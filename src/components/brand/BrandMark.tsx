import React from 'react';

interface BrandMarkProps {
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ className = 'h-12 w-12' }) => {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="alitche-stroke" x1="10" y1="8" x2="82" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1D5BB8" />
          <stop offset="0.58" stopColor="#2E86FF" />
          <stop offset="1" stopColor="#7DD3FC" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="88" height="88" rx="26" fill="#F8FBFF" />
      <path
        d="M19 71L48 17L77 71"
        stroke="url(#alitche-stroke)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31 49H63"
        stroke="#1D5BB8"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M26 71H70"
        stroke="#1D5BB8"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M49 18C60 27 67 42 70 70"
        stroke="#7DD3FC"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M61 61L69 66L61 72"
        stroke="#2E86FF"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="19" cy="71" r="5.5" fill="#1D5BB8" />
      <circle cx="48" cy="17" r="5.5" fill="#1D5BB8" />
      <circle cx="77" cy="71" r="5.5" fill="#7DD3FC" />
    </svg>
  );
};
