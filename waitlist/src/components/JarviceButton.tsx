import React, { useState } from 'react';

interface JarviceButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
}

const JarviceButton: React.FC<JarviceButtonProps> = ({
  onClick,
  disabled = false,
  children,
  type = 'button',
  variant = 'primary'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = `
    relative
    w-full
    py-3
    px-8
    rounded-full
    text-sm
    font-medium
    tracking-[0.2em]
    uppercase
    transition-all
    duration-300
    focus:outline-none
    backdrop-blur-sm
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  const variantStyles = {
    primary: `
      text-sky-600
      border-2
      border-sky-400
      bg-sky-100
      hover:bg-sky-200
      hover:border-sky-500
      ${isHovered ? 'shadow-[0_0_15px_rgba(14,165,233,0.5)]' : ''}
    `,
    secondary: `
      text-sky-500
      border-2
      border-sky-300
      bg-white
      hover:bg-gray-400/10
      hover:border-gray-400
      ${isHovered ? 'shadow-[0_0_15px_rgba(156,163,175,0.5)]' : ''}
    `
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {/* Button Content */}
      <span className="relative z-10">{children}</span>

      {/* Hover Effects */}
      <div 
        className={`
          absolute 
          inset-0 
          rounded-full 
          transition-opacity 
          duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-400/50 rounded-tl" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blue-400/50 rounded-tr" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-blue-400/50 rounded-bl" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-400/50 rounded-br" />
      </div>
    </button>
  );
};

export default JarviceButton;
