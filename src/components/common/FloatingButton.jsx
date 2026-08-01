import React from 'react';

export default function FloatingButton({ onClick, label = '+ Add Activity' }) {
  return (
    <button className="fab" onClick={onClick}>
      <span className="fab-icon">+</span>
      <span className="fab-label">{label.replace('+ ', '')}</span>
    </button>
  );
}
