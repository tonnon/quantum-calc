
import React from 'react';
import { History } from 'lucide-react';
import { CalculatorState } from './Calculator';

interface DisplayProps {
  state: CalculatorState;
  onHistoryToggle: () => void;
}

export const Display: React.FC<DisplayProps> = ({ state, onHistoryToggle }) => {
  return (
    <div className="mb-6 space-y-4">
      {/* Main Display */}
      <div className="bg-black/60 backdrop-blur-lg border-2 border-purple-400/50 rounded-xl p-4 shadow-inner shadow-purple-500/20 relative overflow-hidden">
        {/* History Button */}
        <div className="absolute top-2 right-3 z-10">
          <button 
            onClick={onHistoryToggle}
            className="text-blue-400 hover:text-cyan-300 transition-colors"
          >
            <History size={16} />
          </button>
        </div>

        {/* Equation */}
        <div className="text-sm text-gray-400 font-mono mb-2 h-5 overflow-hidden">
          {state.equation || ' '}
        </div>
        
        {/* Result */}
        <div className="text-right">
          <div className="text-3xl font-mono text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text font-bold leading-tight">
            {state.display}
          </div>
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-xl blur-xl -z-10"></div>
        
        {/* Glowing scanline effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="scanline"></div>
        </div>
      </div>
    </div>
  );
};
