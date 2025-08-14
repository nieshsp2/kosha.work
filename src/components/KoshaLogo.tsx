import React from 'react';

interface KoshaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const KoshaLogo: React.FC<KoshaLogoProps> = ({ 
  size = 'md', 
  className = '',
  onClick = () => window.location.reload()
}) => {
  const sizeClasses = {
    sm: 'text-sm font-bold',
    md: 'text-base md:text-lg font-bold',
    lg: 'text-lg md:text-xl font-bold'
  };

  return (
    <button 
      onClick={onClick} 
      className={`${sizeClasses[size]} bg-gradient-hero bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer ${className}`}
    >
      Kosha
    </button>
  );
};

export default KoshaLogo;
