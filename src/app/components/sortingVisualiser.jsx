"use client";

import React, { useState, useEffect } from 'react';
import './sortingVisualiser.css';

function SortingVisualiser() {
  const [array, setArray] = useState([]);
  const [barColors, setBarColors] = useState([]);
  const [speed, setSpeed] = useState(200);
  const [size, setSize] = useState(25);
  const [isMounted, setIsMounted] = useState(false);
  const [animateBars, setAnimateBars] = useState(false);
  const [timeComplexity, setTimeComplexity] = useState('');
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    setArray(Array.from({ length: size }, (_, i) => i + 1));
    setBarColors(Array(size).fill(''));
    setIsMounted(true);
    setAnimateBars(false);
  }, [size]);

  const generateRandomArray = () => {
    if (!isMounted) return;
    let shuffledArray = [...array];
    for (let i = 0; i < 3; i++) {
      shuffledArray = [...shuffledArray].sort(() => Math.random() - 0.5);
    }
    setArray(shuffledArray);
    setBarColors(Array(shuffledArray.length).fill(''));
    setAnimateBars(true);
    setTimeComplexity('');
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    setTimeComplexity('Bubble Sort:\nBest: O(n)\nAverage: O(n^2)\nWorst: O(n^2)');
    const arr = [...array];
    const colors = Array(arr.length).fill('');
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        // Highlight compared bars
        colors[j] = 'orange';
        colors[j + 1] = 'orange';
        setBarColors([...colors]);
        await new Promise((resolve) => setTimeout(resolve, 205 - speed));
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          // Highlight swapped bars
          colors[j] = 'red';
          colors[j + 1] = 'red';
          setBarColors([...colors]);
          await new Promise((resolve) => setTimeout(resolve, 205 - speed));
        }
        // Reset colors after comparison
        colors[j] = '';
        colors[j + 1] = '';
        setBarColors([...colors]);
      }
      // Mark the last sorted bar
      colors[arr.length - i - 1] = 'green';
      setBarColors([...colors]);
    }
    // Mark the first bar as sorted at the end
    colors[0] = 'green';
    setBarColors([...colors]);
    setIsSorting(false);
  };

  return (
    <div className="sorting-visualiser">
      <h1>Sorting Visualiser</h1>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className={`array-bar dynamic${animateBars ? ' animated' : ''}`}
            key={idx}
            style={{
              '--bar-height': `${(value / array.length) * 300}px`,
              '--bar-width': `${180 / size}%`,
              backgroundColor: barColors[idx] || '',
            }}
          ></div>
        ))}
      </div>
      <div className="controls">
        <button onClick={generateRandomArray} disabled={isSorting}>Generate New Array</button>
        <button onClick={bubbleSort} disabled={isSorting}>Bubble Sort</button>
        <div className="slider-container">
          <label htmlFor="speed-slider">Speed: {205 - speed}ms</label>
          <input
            id="speed-slider"
            type="range"
            min="5"
            max="200"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSorting}
          />
        </div>
        <div className="slider-container">
          <label htmlFor="size-slider">Size: {size}</label>
          <input
            id="size-slider"
            type="range"
            min="10"
            max="50"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            disabled={isSorting}
          />
        </div>
        <div className="time-complexity-text">
          <pre>{timeComplexity}</pre>
        </div>
      </div>
    </div>
  );
}

export default SortingVisualiser;
