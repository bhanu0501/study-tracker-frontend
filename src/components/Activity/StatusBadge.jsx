import React from 'react';
import { getStatusLabel, STATUS_COLORS, STATUSES } from '../../utils/constants';

export default function StatusBadge({ status, onChange }) {
  const colorClass = STATUS_COLORS[status] || 'default';
  
  if (!onChange) {
    return (
      <span className={`badge badge-${colorClass}`}>
        {getStatusLabel(status)}
      </span>
    );
  }

  return (
    <select
      className={`badge badge-${colorClass} status-select-badge`}
      value={status}
      onChange={(e) => onChange(e.target.value)}
      title="Click to quick-change status"
    >
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
