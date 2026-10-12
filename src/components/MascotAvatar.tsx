import React from 'react';

export type MascotPose = 'greeting' | 'whisking' | 'platter' | 'thinking' | 'delighted' | 'cupcake';

interface MascotAvatarProps {
  pose?: MascotPose;
  size?: number | string;
  className?: string;
  animate?: boolean;
}

export const MascotAvatar: React.FC<MascotAvatarProps> = ({
  size = 110,
  className = '',
  animate = true,
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center select-none ${
        animate ? 'transition-transform duration-300 hover:scale-105' : ''
      } ${className}`}
      title="Alicat - Mascota Guía de Tortas Alicar"
    >
      <img
        src="/images/alicat.png"
        alt="Alicat - Mascota Repostera de Tortas Alicar"
        className="w-full h-full object-contain drop-shadow-md rounded-full pointer-events-none"
      />
    </div>
  );
};
