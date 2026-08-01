import React from 'react';

export default function SummaryCard({ icon, label, value, variant = 'teal', children }) {
  return (
    <div className={`summary-card variant-${variant}`}>
      <div className="card-glass">
        <div className="card-content">
          <div className="card-icon">{icon}</div>
          <div className="card-info">
            <div className="card-value">{value}</div>
            <div className="card-label">{label}</div>
          </div>
        </div>
        {children && <div className="card-extra">{children}</div>}
      </div>
    </div>
  );
}
