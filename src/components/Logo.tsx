import React from 'react';

export type LogoVariant = 'color' | 'white' | 'dark' | 'monochrome';
export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface LogoProps {
  className?: string;
  size?: LogoSize;
  variant?: LogoVariant;
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'color',
  showSubtitle = true,
}) => {
  // Height per size
  const heightClass = {
    xs: 'h-9',
    sm: 'h-11',
    md: 'h-14 sm:h-16',
    lg: 'h-20 sm:h-24',
    xl: 'h-28 sm:h-32',
  }[size];

  // Variant filter
  const filterClass = {
    color: '',
    white: 'brightness-0 invert drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]',
    dark: 'brightness-0',
    monochrome: 'grayscale',
  }[variant];

  const subtitleColor = variant === 'white' ? 'text-white/80' : 'text-[#8C5E47]';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <img
        src="/images/logo.png"
        alt="Tortas Alicar"
        className={`w-auto object-contain transition-transform duration-200 hover:scale-[1.02] ${heightClass} ${filterClass}`}
      />
      {showSubtitle && (
        <span
          className={`text-[9px] sm:text-[11px] font-medium tracking-[0.2em] uppercase -mt-0.5 font-serif ${subtitleColor}`}
        >
          Repostería Artesanal &bull; Maracay
        </span>
      )}
    </div>
  );
};
