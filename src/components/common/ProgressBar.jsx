import React from 'react';

export default function ProgressBar({ percentage }) {
  const validPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${validPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
