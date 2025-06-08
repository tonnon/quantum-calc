
import React, { useState, useCallback } from 'react';
import { Display } from './Display';
import { ButtonGrid } from './ButtonGrid';
import { evaluate } from 'mathjs';

export interface CalculatorState {
  display: string;
  equation: string;
  result: string;
  memory: number;
  history: string[];
}

const Calculator = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    equation: '',
    result: '',
    memory: 0,
    history: []
  });

  const [showHistory, setShowHistory] = useState(false);

  const updateState = useCallback((updates: Partial<CalculatorState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const toggleHistory = () => {
    setShowHistory(prev => !prev);
  };

  const handleInput = useCallback((value: string) => {
    console.log('Input received:', value);
    
    try {
      switch (value) {
        case 'C':
          updateState({
            display: '0',
            equation: '',
            result: ''
          });
          break;
          
        case 'CE':
          updateState({ display: '0' });
          break;
          
        case '=':
          if (state.equation) {
            try {
              const result = evaluate(state.equation);
              const resultStr = result.toString();
              updateState({
                result: resultStr,
                display: resultStr,
                history: [`${state.equation} = ${resultStr}`, ...state.history.slice(0, 9)]
              });
            } catch (error) {
              updateState({ display: 'Error', result: 'Error' });
            }
          }
          break;
          
        case 'sin(':
        case 'cos(':
        case 'tan(':
        case 'log(':
        case 'ln(':
        case 'sqrt(':
          updateState({
            equation: state.equation + value,
            display: value
          });
          break;
          
        case 'π':
          updateState({
            equation: state.equation + 'pi',
            display: 'π'
          });
          break;
          
        case 'e':
          updateState({
            equation: state.equation + 'e',
            display: 'e'
          });
          break;
          
        case 'MS':
          updateState({ memory: parseFloat(state.display) || 0 });
          break;
          
        case 'MR':
          updateState({
            display: state.memory.toString(),
            equation: state.equation + state.memory.toString()
          });
          break;
          
        case 'MC':
          updateState({ memory: 0 });
          break;
          
        case '←':
          if (state.equation.length > 0) {
            const newEquation = state.equation.slice(0, -1);
            updateState({
              equation: newEquation,
              display: newEquation || '0'
            });
          }
          break;
          
        default:
          const newEquation = state.equation + value;
          updateState({
            equation: newEquation,
            display: newEquation
          });
      }
    } catch (error) {
      console.error('Calculator error:', error);
      updateState({ display: 'Error' });
    }
  }, [state, updateState]);

  const selectHistoryItem = (historyItem: string) => {
    const result = historyItem.split(' = ')[1];
    updateState({
      display: result,
      equation: result
    });
    setShowHistory(false);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 shadow-2xl shadow-purple-500/20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-center mb-2">
          QUANTUM CALC
        </h1>
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      </div>
      
      <Display state={state} onHistoryToggle={toggleHistory} />
      
      {/* History Panel */}
      {showHistory && (
        <div className="bg-gray-900/80 backdrop-blur-sm border border-blue-500/20 rounded-lg p-3 mb-4 max-h-32 overflow-y-auto">
          {state.history.length === 0 ? (
            <div className="text-gray-500 text-sm text-center py-2 font-mono">Nenhum histórico</div>
          ) : (
            <div className="space-y-1">
              {state.history.map((item, index) => (
                <div 
                  key={index}
                  className="text-xs text-blue-300/70 font-mono hover:text-cyan-300 cursor-pointer px-2 py-1 rounded hover:bg-blue-500/10 transition-colors"
                  onClick={() => selectHistoryItem(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <ButtonGrid onInput={handleInput} memory={state.memory} />
    </div>
  );
};

export default Calculator;
