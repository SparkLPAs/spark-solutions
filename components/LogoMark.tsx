export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" fill="url(#spark-mark-gradient)" />
      <path
        d="M17.5 6.5 10 18h5.2l-1 7.5L22 13h-5.2l0.7-6.5Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="spark-mark-gradient"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1D4ED8" />
          <stop offset="1" stopColor="#1E3A5F" />
        </linearGradient>
      </defs>
    </svg>
  );
}
