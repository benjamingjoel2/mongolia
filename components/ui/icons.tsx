type P = { className?: string };

export const ArrowDown = ({ className }: P) => (
  <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 4v16M5 13l7 7 7-7" />
  </svg>
);

export const ArrowRight = ({ className }: P) => (
  <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 12h16M13 5l7 7-7 7" />
  </svg>
);

export const ArrowLeft = ({ className }: P) => (
  <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 12H4M11 5l-7 7 7 7" />
  </svg>
);

export const Close = ({ className }: P) => (
  <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

export const Plus = ({ className }: P) => (
  <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 4v16M4 12h16" />
  </svg>
);

export const Check = ({ className }: P) => (
  <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4">
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

export const MenuIcon = ({ className }: P) => (
  <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 8h18M3 16h18" />
  </svg>
);

export const SoundOff = ({ className }: P) => (
  <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 9h4l5-4v14l-5-4H4zM16 9l5 6M21 9l-5 6" />
  </svg>
);

export const SoundOn = ({ className }: P) => (
  <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 9h4l5-4v14l-5-4H4zM16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12" />
  </svg>
);

