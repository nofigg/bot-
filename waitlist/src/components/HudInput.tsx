import React, { useState } from 'react';

interface HudInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  error?: string;
}

const HudInput: React.FC<HudInputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  disabled = false,
  error
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      {/* Background Effects */}
      <div 
        className={`
          absolute inset-0 
          bg-sky-100 
          rounded-full 
          transition-opacity duration-300
          ${isFocused ? 'opacity-100' : 'opacity-0'}
        `} 
      />

      {/* Input Field */}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full
          bg-white
          border-2
          ${error ? 'border-red-500' : isFocused ? 'border-sky-500' : 'border-sky-400/50'}
          text-sky-900
          px-6
          py-3
          rounded-full
          focus:outline-none
          placeholder-blue-400/30
          transition-all
          duration-300
          backdrop-blur-sm
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        placeholder={placeholder}
      />
      
      {/* Focus Effects */}
      <div 
        className={`
          absolute 
          inset-0 
          border-2 
          border-blue-400/0 
          rounded-full 
          transition-all 
          duration-300
          ${isFocused ? 'border-blue-400/30 scale-110' : ''}
        `}
      />
      
      {/* Scanning Effect */}
      <div 
        className={`
          absolute 
          inset-0 
          overflow-hidden 
          rounded-full
          pointer-events-none
          ${isFocused ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/0 via-blue-400/10 to-blue-400/0 animate-scan" />
      </div>

      {/* Error Message */}
      {error && (
        <p className="absolute -bottom-6 left-0 text-red-400 text-sm">
          {error}
        </p>
      )}
    </div>
  );
};

export default HudInput;
