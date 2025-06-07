"use client";

import React, { useState, useEffect } from "react";

export default function Counter() {
  // Variables and State
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [isAutoIncrementing, setIsAutoIncrementing] = useState(false);

  // Arrays for step options
  const stepOptions = [1, 2, 5, 10, 20];

  // Functions
  const handleIncrement = () => {
    setCount(prev => prev + step);
  };

  const handleDecrement = () => {
    setCount(prev => prev - step);
  };

  const handleReset = () => {
    setCount(0);
    setStep(1);
    setIsAutoIncrementing(false);
  };

  const toggleAutoIncrement = () => {
    setIsAutoIncrementing(prev => !prev);
  };

  // Auto-increment effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isAutoIncrementing) {
      intervalId = setInterval(() => {
        setCount(prev => prev + step);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoIncrementing, step]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white">Count: {count}</h2>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <button
            onClick={handleDecrement}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Decrease
          </button>
          <button
            onClick={handleIncrement}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Increase
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={toggleAutoIncrement}
            className={`flex-1 font-semibold py-2 px-4 rounded transition-colors ${
              isAutoIncrementing
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isAutoIncrementing ? "Stop Auto" : "Start Auto"}
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-white">Step Size:</label>
          <div className="flex gap-2 flex-1">
            {stepOptions.map((option) => (
              <button
                key={option}
                onClick={() => setStep(option)}
                className={`flex-1 py-1 px-2 rounded ${
                  step === option
                    ? "bg-blue-600 text-white"
                    : "bg-gray-600 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 