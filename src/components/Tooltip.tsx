import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className={`relative inline-block ${className} text-left`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span 
        className="relative opacity-100 hover:opacity-80 transition-opacity inline"
        style={{
          backgroundImage: 'repeating-linear-gradient(to right, #9ca3af 0px, #9ca3af 2px, transparent 2px, transparent 4px)',
          backgroundSize: '4px 2px',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: '0 100%',
          paddingBottom: '3px',
          boxDecorationBreak: 'clone',
          WebkitBoxDecorationBreak: 'clone'
        }}
      >
        {children}
      </span>
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-gray-900 text-white text-sm rounded-lg py-2 px-3 shadow-lg w-64 text-center">
            {content}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
}; 