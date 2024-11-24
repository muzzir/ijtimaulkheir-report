import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showName?: boolean;
}

export default function Logo({ size = 'md', className = '', showName = true }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-16'
  };

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src="/logo.png" 
        alt="Ijtimaulkheir Madresa Logo" 
        className={`${sizeClasses[size]} object-contain`}
      />
      {showName && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold text-gray-900 leading-tight`}>
            Ijtimaulkheir Madresa
          </h1>
          <p className="text-sm text-gray-600">Islamic Learning Center</p>
        </div>
      )}
    </div>
  );
}