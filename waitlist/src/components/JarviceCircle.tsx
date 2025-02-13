import React from 'react';

interface JarviceCircleProps {
  rotation: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const JarviceCircle: React.FC<JarviceCircleProps> = ({ 
  rotation, 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-40 h-40',
    md: 'w-60 h-60',
    lg: 'w-80 h-80'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Arc Reactor Rings */}
      {[0, 1, 2, 3].map((index) => (
        <div 
          key={index}
          className="absolute rounded-full border-2 border-sky-400/50 animate-arcReactor"
          style={{ 
            inset: `${index * 8}%`,
            animationDelay: `${index * 0.2}s`,
            transform: `rotate(${rotation + (index * 30)}deg)`,
          }}
        />
      ))}
      
      {/* Scanning Lines */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i}
            className="absolute inset-0 bg-gradient-to-t from-transparent via-sky-400/20 to-transparent animate-scan"
            style={{ 
              animationDelay: `${i * 0.7}s`,
              transform: `rotate(${120 * i}deg)`,
            }}
          />
        ))}
      </div>

      {/* Triangular Patterns */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 h-[120%] origin-bottom"
          style={{
            transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
          }}
        >
          <div className="w-px h-full bg-gradient-to-t from-sky-400/60 to-transparent" />
        </div>
      ))}
      
      {/* Center Core */}
      <div className="absolute inset-[30%] flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Core Layers */}
          <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-xl animate-arcReactor" />
          <div className="absolute inset-[15%] rounded-full bg-sky-400/30 blur-lg animate-arcReactor" style={{ animationDelay: '0.2s' }} />
          <div className="absolute inset-[30%] rounded-full bg-sky-400/40 blur-md animate-arcReactor" style={{ animationDelay: '0.4s' }} />
          <div className="absolute inset-[45%] rounded-full bg-sky-500/50 animate-pulse" />
        </div>
      </div>

      {/* HUD Elements */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-8 h-1 bg-gradient-to-r from-transparent via-sky-400/50 to-transparent"
          style={{
            transform: `rotate(${i * 90}deg)`,
            transformOrigin: i % 2 === 0 ? 'left center' : 'right center',
            left: i % 2 === 0 ? '0' : 'auto',
            right: i % 2 === 0 ? 'auto' : '0',
            top: i < 2 ? '45%' : '55%',
          }}
        />
      ))}
    </div>
  );
};

export default JarviceCircle;
