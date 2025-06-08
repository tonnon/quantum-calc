
import React from 'react';
import { CalcButton } from './CalcButton';

interface ButtonGridProps {
  onInput: (value: string) => void;
  memory: number;
}

interface ButtonConfig {
  label: string;
  value: string;
  type: 'number' | 'operator' | 'function' | 'constant' | 'memory' | 'clear' | 'equals';
  span?: number;
}

export const ButtonGrid: React.FC<ButtonGridProps> = ({ onInput, memory }) => {
  const buttons: ButtonConfig[][] = [
    // Row 1
    [
      { label: 'sin(', value: 'sin(', type: 'function' },
      { label: 'cos(', value: 'cos(', type: 'function' },
      { label: 'tan(', value: 'tan(', type: 'function' },
      { label: 'π', value: 'π', type: 'constant' },
      { label: 'e', value: 'e', type: 'constant' }
    ],
    // Row 2
    [
      { label: 'log(', value: 'log(', type: 'function' },
      { label: 'ln(', value: 'ln(', type: 'function' },
      { label: '√(', value: 'sqrt(', type: 'function' },
      { label: '^', value: '^', type: 'operator' },
      { label: '!', value: '!', type: 'operator' }
    ],
    // Row 3
    [
      { label: 'MC', value: 'MC', type: 'memory' },
      { label: 'MR', value: 'MR', type: 'memory' },
      { label: 'MS', value: 'MS', type: 'memory' },
      { label: '(', value: '(', type: 'operator' },
      { label: ')', value: ')', type: 'operator' }
    ],
    // Row 4
    [
      { label: 'C', value: 'C', type: 'clear' },
      { label: 'CE', value: 'CE', type: 'clear' },
      { label: '←', value: '←', type: 'clear' },
      { label: '÷', value: '/', type: 'operator' },
      { label: '×', value: '*', type: 'operator' }
    ],
    // Row 5
    [
      { label: '7', value: '7', type: 'number' },
      { label: '8', value: '8', type: 'number' },
      { label: '9', value: '9', type: 'number' },
      { label: '-', value: '-', type: 'operator' },
      { label: '+', value: '+', type: 'operator' }
    ],
    // Row 6
    [
      { label: '4', value: '4', type: 'number' },
      { label: '5', value: '5', type: 'number' },
      { label: '6', value: '6', type: 'number' },
      { label: '.', value: '.', type: 'number' },
      { label: '0', value: '0', type: 'number' }
    ],
    // Row 7
    [
      { label: '1', value: '1', type: 'number' },
      { label: '2', value: '2', type: 'number' },
      { label: '3', value: '3', type: 'number' }
    ]
  ];

  return (
    <div className="space-y-2">
      {/* Grid normal com 5 colunas */}
      <div className="grid grid-cols-5 gap-2">
        {buttons.map((row, rowIndex) => 
          row.map((button, colIndex) => (
            <CalcButton
              key={`${rowIndex}-${colIndex}`}
              label={button.label}
              value={button.value}
              type={button.type}
              span={button.span}
              onClick={onInput}
              isMemoryActive={button.type === 'memory' && button.value === 'MR' && memory !== 0}
            />
          ))
        )}
      </div>
      
      {/* Botão de igual com largura completa */}
      <div className="w-full">
        <CalcButton
          label="="
          value="="
          type="equals"
          onClick={onInput}
        />
      </div>
    </div>
  );
};
