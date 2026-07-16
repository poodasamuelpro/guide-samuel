// Professional turquoise "GS" monogram logo for Le Guide de Samuel
// Usage: <GSLogo size={40} /> or <GSLogo size={32} variant="white" />

interface GSLogoProps {
  size?: number;
  variant?: 'color' | 'white' | 'navy';
  className?: string;
}

export function GSLogo({ size = 40, variant = 'color', className = '' }: GSLogoProps) {
  const bg = variant === 'white' ? 'white' : '#073b4c';
  const accent = variant === 'white' ? '#8bd346' : '#8bd346';
  const text = variant === 'white' ? '#073b4c' : 'white';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Le Guide de Samuel — Logo"
      role="img"
    >
      {/* Background rounded square */}
      <rect width="40" height="40" rx="10" fill={bg} />
      {/* Turquoise accent top-right corner triangle */}
      <path d="M26 0 L40 0 L40 14" fill="#0ea8d4" opacity="0.85" />
      {/* Lime accent bottom-left */}
      <path d="M0 30 L10 40 L0 40 Z" fill={accent} opacity="0.7" />
      {/* G letter */}
      <text
        x="7"
        y="27"
        fontFamily="'Inter', system-ui, sans-serif"
        fontWeight="800"
        fontSize="17"
        fill={text}
        letterSpacing="-0.5"
      >
        G
      </text>
      {/* S letter */}
      <text
        x="20"
        y="27"
        fontFamily="'Inter', system-ui, sans-serif"
        fontWeight="800"
        fontSize="17"
        fill={accent}
        letterSpacing="-0.5"
      >
        S
      </text>
    </svg>
  );
}

// Full brand wordmark: logo + text only (NO subtitle/tagline)
interface BrandMarkProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  className?: string;
}

export function BrandMark({ size = 'md', variant = 'dark', className = '' }: BrandMarkProps) {
  const logoSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 38;
  const titleSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';
  const titleColor = variant === 'light' ? 'text-white' : 'text-[#073b4c]';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <GSLogo size={logoSize} variant={variant === 'light' ? 'white' : 'color'} />
      <span className={`font-extrabold tracking-tight ${titleSize} ${titleColor}`}>
        Guide Samuel
      </span>
    </div>
  );
}
