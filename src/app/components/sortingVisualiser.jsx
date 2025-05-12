"use client";

import React, { useState, useEffect } from 'react';
import './sortingVisualiser.css';

function SortingVisualiser() {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(5);
  const [size, setSize] = useState(50);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setArray(Array.from({ length: size }, (_, i) => i + 1));
    setIsMounted(true);
  }, [size]);

  const generateRandomArray = () => {
    if (!isMounted) return;
    let shuffledArray = [...array];
    for (let i = 0; i < 3; i++) {
      shuffledArray = [...shuffledArray].sort(() => Math.random() - 0.5);
    }
    setArray(shuffledArray);
  };

  const bubbleSort = async () => {
    const arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 205 - speed));
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
            className="array-bar dynamic"
            key={idx}
            style={{
              '--bar-height': `${value * 3}px`,
              '--bar-width': `${180 / size}%`,
            }}
          ></div>
        ))}
      </div>
      <div className="controls">
        <button onClick={generateRandomArray}>Generate New Array</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
        <div className="slider-container">
          <label htmlFor="speed-slider">Speed: {205 - speed}ms</label>
          <input
            id="speed-slider"
            type="range"
            min="5"
            max="200"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
        <div className="slider-container">
          <label htmlFor="size-slider">Size: {size}</label>
          <input
            id="size-slider"
            type="range"
            min="10"
            max="100"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}

export default SortingVisualiser;
