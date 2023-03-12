import type { FC } from 'react';

const HamburgerIcon: FC<{ className: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M4 6h16M4 12h16M4 18h16"></path>
  </svg>
);

export default HamburgerIcon;
