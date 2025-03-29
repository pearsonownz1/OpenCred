import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const isWhiteText = className.includes('text-white');
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        {/* Main rocket body */}
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg transform rotate-3 relative overflow-hidden">
          {/* Rocket fins */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-blue-400"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-blue-400"></div>
          
          {/* Rocket window */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
          
          {/* Rocket exhaust */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-orange-500"></div>
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 w-8 h-8 bg-gradient-to-br from-indigo-400/30 to-blue-400/30 rounded-lg transform -rotate-3 blur-sm"></div>
        
        {/* Particle effects */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full animate-pulse delay-75"></div>
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-150"></div>
      </div>
      <span className={`text-xl font-bold ${isWhiteText ? 'text-white' : 'bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent'} tracking-tight`}>
        OpenEval
      </span>
    </div>
  );
}; 