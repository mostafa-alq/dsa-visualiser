"use client";

import React, { useState, useEffect } from 'react';
import './sortingVisualiser.css';

function SortingVisualiser() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(50); // Speed in milliseconds

  useEffect(() => {
    const orderedArray = Array.from({ length: 100 }, (_, i) => i + 1);
    setArray(orderedArray);
  }, []);

  const generateRandomArray = () => {
    const shuffledArray = [...array].sort(() => Math.random() - 0.5);
    setArray(shuffledArray);
  };

  const bubbleSort = async () => {
    const arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          // Swap elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]); // Update state to reflect changes
          await new Promise((resolve) => setTimeout(resolve, speed)); // Use speed for delay
        }
      }
    }
  };

  return (
    <div className="sorting-visualiser">
      <h1>Sorting Visualiser</h1>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value * 3}px` }}
          ></div>
        ))}
      </div>
      <div className="controls">
        <button onClick={generateRandomArray}>Generate New Array</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
        <div className="slider-container">
          <label htmlFor="speed-slider">Speed: {speed}ms</label>
          <input
            id="speed-slider"
            type="range"
            min="10"
            max="200"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}

export default SortingVisualiser;
