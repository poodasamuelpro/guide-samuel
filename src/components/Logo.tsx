// Professional "GS" monogram logo for Le Guide de Samuel
// Usage: <GSLogo size={40} /> or <GSLogo size={32} variant="white" />

interface GSLogoProps {
  size?: number;
  variant?: 'color' | 'white' | 'navy';
  className?: string;
}

export function GSLogo({ size = 40, variant = 'color', className = '' }: GSLogoProps) {
  const bg = variant === 'color' ? '#1e3a5f' : variant === 'white' ? 'white' : '#1e3a5f';
  const accent = variant === 'color' ? '#f6932a' : variant === 'white' ? '#f6932a' : '#f6932a';
  const text = variant === 'white' ? '#1e3a5f' : 'white';

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
      {/* Orange accent top-right corner triangle */}
      <path d="M26 0 L40 0 L40 14" fill={accent} opacity="0.8" />
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

// Full brand wordmark: logo + text
interface BrandMarkProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  className?: string;
}

export function BrandMark({ size = 'md', variant = 'dark', className = '' }: BrandMarkProps) {
  const logoSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 38;
  const titleSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base';
  const subSize = size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px]';
  const titleColor = variant === 'light' ? 'text-white' : 'text-[#1e3a5f]';
  const subColor = variant === 'light' ? 'text-white/70' : 'text-gray-500';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <GSLogo size={logoSize} variant={variant === 'light' ? 'white' : 'color'} />
      <div className="flex flex-col leading-tight">
        <span className={`font-extrabold tracking-tight ${titleSize} ${titleColor}`}>
          Le Guide de Samuel
        </span>
        <span className={`font-medium uppercase tracking-widest ${subSize} ${subColor}`}>
          Importer depuis la Chine
        </span>
      </div>
    </div>
  );
}
