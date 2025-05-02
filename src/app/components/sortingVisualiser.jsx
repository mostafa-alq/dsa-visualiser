"use client";

import React, { useState, useEffect } from 'react';
import './sortingVisualiser.css';

function SortingVisualiser() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    const orderedArray = Array.from({ length: 100 }, (_, i) => i + 1);
    setArray(orderedArray);
  }, []);

  const generateRandomArray = () => {
    const shuffledArray = [...array].sort(() => Math.random() - 0.5);
    setArray(shuffledArray);
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
          >
          </div>
        ))}
      </div>
      <button onClick={generateRandomArray}>Generate New Array</button>
    </div>
  );
}

export default SortingVisualiser;
