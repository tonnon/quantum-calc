
import React from 'react';
import { cn } from '@/lib/utils';

interface CalcButtonProps {
  label: string;
  value: string;
  type: 'number' | 'operator' | 'function' | 'constant' | 'memory' | 'clear' | 'equals';
  span?: number;
  onClick: (value: string) => void;
  isMemoryActive?: boolean;
}

export const CalcButton: React.FC<CalcButtonProps> = ({
  label,
  value,
  type,
  span = 1,
  onClick,
  isMemoryActive = false
}) => {
  const getButtonStyles = () => {
    const baseStyles = "h-14 rounded-lg font-mono font-semibold transition-all duration-200 border backdrop-blur-sm relative overflow-hidden group";
    
    switch (type) {
      case 'number':
        return cn(baseStyles, "bg-gray-800/80 border-gray-600/50 text-white hover:bg-gray-700/80 hover:border-gray-500 hover:shadow-lg hover:shadow-purple-500/20");
      
      case 'operator':
        return cn(baseStyles, "bg-blue-900/60 border-blue-500/50 text-blue-300 hover:bg-blue-800/80 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/30");
      
      case 'function':
        return cn(baseStyles, "bg-purple-900/60 border-purple-500/50 text-purple-300 hover:bg-purple-800/80 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30 text-sm");
      
      case 'constant':
        return cn(baseStyles, "bg-pink-900/60 border-pink-500/50 text-pink-300 hover:bg-pink-800/80 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/30");
      
      case 'memory':
        return cn(baseStyles, 
          isMemoryActive 
            ? "bg-green-900/60 border-green-500/50 text-green-300 hover:bg-green-800/80 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/30"
            : "bg-gray-700/60 border-gray-500/50 text-gray-400 hover:bg-gray-600/80 hover:border-gray-400 hover:shadow-lg hover:shadow-gray-500/20",
          "text-xs"
        );
      
      case 'clear':
        return cn(baseStyles, "bg-red-900/60 border-red-500/50 text-red-300 hover:bg-red-800/80 hover:border-red-400 hover:shadow-lg hover:shadow-red-500/30");
      
      case 'equals':
        return cn(baseStyles, "bg-gradient-to-r from-purple-700/80 to-pink-700/80 border-purple-400/50 text-white hover:from-purple-600/90 hover:to-pink-600/90 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/40 w-full");
      
      default:
        return baseStyles;
    }
  };

  return (
    <button
      className={getButtonStyles()}
      onClick={() => onClick(value)}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Button content */}
      <span className="relative z-10">{label}</span>
    </button>
  );
};
