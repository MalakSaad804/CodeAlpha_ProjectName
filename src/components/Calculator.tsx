import { useState, useEffect, useCallback } from 'react';
import { Delete, History, RotateCcw, Calculator as CalcIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HistoryItem {
  expression: string;
  result: string;
}

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const deleteLastChar = () => {
    if (waitingForNewValue) return;
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
  };

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (op: string) => {
    const currentValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const prev = parseFloat(previousValue);
      let result: number;
      
      switch (operation) {
        case '+': result = prev + currentValue; break;
        case '-': result = prev - currentValue; break;
        case '×': result = prev * currentValue; break;
        case '÷': result = prev / currentValue; break;
        default: result = currentValue;
      }
      
      const resultStr = result.toString();
      setPreviousValue(resultStr);
      setDisplay(resultStr);
      
      setHistory(prev => [{
        expression: `${previousValue} ${operation} ${currentValue}`,
        result: resultStr
      }, ...prev].slice(0, 10));
    }
    
    setOperation(op);
    setWaitingForNewValue(true);
  };

  const calculate = () => {
    if (operation === null || previousValue === null) return;
    
    const currentValue = parseFloat(display);
    const prev = parseFloat(previousValue);
    let result: number;
    
    switch (operation) {
      case '+': result = prev + currentValue; break;
      case '-': result = prev - currentValue; break;
      case '×': result = prev * currentValue; break;
      case '÷': result = prev / currentValue; break;
      default: result = currentValue;
    }
    
    const resultStr = result.toString();
    setHistory(prev => [{
      expression: `${previousValue} ${operation} ${currentValue}`,
      result: resultStr
    }, ...prev].slice(0, 10));
    
    setDisplay(resultStr);
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(true);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key >= '0' && e.key <= '9') inputNumber(e.key);
    if (e.key === '.') inputDecimal();
    if (e.key === '+') performOperation('+');
    if (e.key === '-') performOperation('-');
    if (e.key === '*') performOperation('×');
    if (e.key === '/') performOperation('÷');
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Escape') clear();
    if (e.key === 'Backspace') deleteLastChar();
  }, [display, previousValue, operation, waitingForNewValue]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const buttons = [
    { label: 'C', onClick: clear, className: 'bg-red-500/20 text-red-400 hover:bg-red-500/30' },
    { label: '⌫', onClick: deleteLastChar, className: 'bg-gray-700/50 text-gray-300' },
    { label: '÷', onClick: () => performOperation('÷'), className: 'bg-purple-500/20 text-purple-400' },
    { label: '×', onClick: () => performOperation('×'), className: 'bg-purple-500/20 text-purple-400' },
    { label: '7', onClick: () => inputNumber('7'), className: 'bg-gray-800/50 text-white' },
    { label: '8', onClick: () => inputNumber('8'), className: 'bg-gray-800/50 text-white' },
    { label: '9', onClick: () => inputNumber('9'), className: 'bg-gray-800/50 text-white' },
    { label: '-', onClick: () => performOperation('-'), className: 'bg-purple-500/20 text-purple-400' },
    { label: '4', onClick: () => inputNumber('4'), className: 'bg-gray-800/50 text-white' },
    { label: '5', onClick: () => inputNumber('5'), className: 'bg-gray-800/50 text-white' },
    { label: '6', onClick: () => inputNumber('6'), className: 'bg-gray-800/50 text-white' },
    { label: '+', onClick: () => performOperation('+'), className: 'bg-purple-500/20 text-purple-400' },
    { label: '1', onClick: () => inputNumber('1'), className: 'bg-gray-800/50 text-white' },
    { label: '2', onClick: () => inputNumber('2'), className: 'bg-gray-800/50 text-white' },
    { label: '3', onClick: () => inputNumber('3'), className: 'bg-gray-800/50 text-white' },
    { label: '=', onClick: calculate, className: 'bg-gradient-to-b from-purple-500 to-pink-500 text-white row-span-2' },
    { label: '0', onClick: () => inputNumber('0'), className: 'bg-gray-800/50 text-white col-span-2' },
    { label: '.', onClick: inputDecimal, className: 'bg-gray-800/50 text-white' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <CalcIcon className="w-6 h-6 text-purple-400" />
              <span className="text-white font-semibold">Calculator</span>
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-xl transition-colors ${showHistory ? 'bg-purple-500/30 text-purple-400' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              <History className="w-5 h-5" />
            </button>
          </div>

          {/* Display */}
          <div className="bg-gray-800/50 rounded-2xl p-6 mb-6 text-right">
            <div className="text-gray-400 text-sm h-6">
              {previousValue} {operation}
            </div>
            <div className="text-4xl md:text-5xl font-bold text-white overflow-hidden text-ellipsis">
              {display}
            </div>
          </div>

          {/* History Panel */}
          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-4"
              >
                <div className="bg-gray-800/30 rounded-xl p-4 max-h-40 overflow-y-auto">
                  {history.length === 0 ? (
                    <p className="text-gray-500 text-center text-sm">No history yet</p>
                  ) : (
                    history.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm py-1 border-b border-gray-700/50 last:border-0">
                        <span className="text-gray-400">{item.expression}</span>
                        <span className="text-purple-400 font-semibold">= {item.result}</span>
                      </div>
                    ))
                  )}
                  {history.length > 0 && (
                    <button
                      onClick={() => setHistory([])}
                      className="w-full mt-2 text-xs text-red-400 hover:text-red-300 flex items-center justify-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Clear History
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons Grid */}
          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn) => (
              <motion.button
                key={btn.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={btn.onClick}
                className={`${btn.className} ${btn.label === '=' ? 'row-span-2' : ''} ${btn.label === '0' ? 'col-span-2' : ''} 
                  p-4 rounded-2xl font-semibold text-xl transition-all duration-200 
                  shadow-lg active:shadow-md flex items-center justify-center`}
              >
                {btn.label === '⌫' ? <Delete className="w-5 h-5" /> : btn.label}
              </motion.button>
            ))}
          </div>

          {/* Keyboard hint */}
          <p className="text-center text-gray-500 text-xs mt-4">
            Keyboard shortcuts supported
          </p>
        </div>
      </motion.div>
    </div>
  );
}