"use client";

import React, { useState, useEffect } from 'react';
import './sortingVisualiser.css';

function SortingVisualiser() {
  const [array, setArray] = useState([]);
  const [barColors, setBarColours] = useState([]);
  const [speed, setSpeed] = useState(200);
  const [size, setSize] = useState(25);
  const [isMounted, setIsMounted] = useState(false);
  const [animateBars, setAnimateBars] = useState(false);
  const [timeComplexity, setTimeComplexity] = useState('');
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    setArray(Array.from({ length: size }, (_, i) => i + 1));
    setBarColours(Array(size).fill(''));
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
    setBarColours(Array(shuffledArray.length).fill(''));
    setAnimateBars(true);
    setTimeComplexity('');
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    setTimeComplexity('Bubble Sort:\nBest: O(n)\nAverage: O(n^2)\nWorst: O(n^2)');
    const arr = [...array];
    const colours = Array(arr.length).fill('');
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        // highlight compared bars
        colours[j] = 'orange';
        colours[j + 1] = 'orange';
        setBarColours([...colours]);
        await new Promise((resolve) => setTimeout(resolve, 205 - speed));
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          // highlight swapped bars
          colours[j] = 'red';
          colours[j + 1] = 'red';
          setBarColours([...colours]);
          await new Promise((resolve) => setTimeout(resolve, 205 - speed));
        }
        // reset colours after comparison
        colours[j] = '';
        colours[j + 1] = '';
        setBarColours([...colours]);
      }
      // mark the last sorted bar
      colours[arr.length - i - 1] = 'green';
      setBarColours([...colours]);
    }
    // mark the first bar as sorted at the end
    colours[0] = 'green';
    setBarColours([...colours]);
    setIsSorting(false);
  };

  const insertionSort = async () => {
    setIsSorting(true);
    setTimeComplexity('Insertion Sort:\nBest: O(n)\nAverage: O(n^2)\nWorst: O(n^2)');
    const arr = [...array];
    const colours = Array(arr.length).fill('');
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      // highlight the current bar being inserted
      colours[i] = 'orange';
      setBarColours([...colours]);
      await new Promise((resolve) => setTimeout(resolve, 255 - speed));

      while (j >= 0 && arr[j] > key) {
        // highlight compared bars
        colours[j] = 'red';
        colours[j + 1] = 'red';
        setBarColours([...colours]);
        await new Promise((resolve) => setTimeout(resolve, 255 - speed));

        arr[j+1] = arr[j];
        setArray([...arr]);

        // // reset colour after shifting
        // colours[j + 1] = '';
        // colours[j] = '';
        // setBarColours([...colours]);
        j--;
      }
      arr[j+1] = key;
      setArray([...arr]);

      // mark sorted portion
      for (let k = 0; k <= i; k++) {
        colours[k] = 'green';
      }
      setBarColours([...colours]);
      await new Promise((resolve) => setTimeout(resolve, 255 - speed));
    }

    // mark all the final bars as sorted
    for (let k = 0; k < arr.length; k++) {
      colours[k] = 'green';
    }
    setBarColours([...colours]);
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
        <button onClick={insertionSort} disabled={isSorting}>Insertion Sort</button>
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