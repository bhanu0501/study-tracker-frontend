import React from 'react';
import { ACTIVITY_TYPES, STATUSES } from '../../utils/constants';

export default function ActivityFilters({ filters, onFilterChange, onClearFilters, topics = [] }) {
  return (
    <div className="filters-bar">
      <div className="filter-group">
        <input 
          type="date" 
          name="date"
          className="filter-input"
          value={filters.date || ''}
          onChange={(e) => onFilterChange('date', e.target.value)}
        />
      </div>
      <div className="filter-group">
        <select 
          name="topic" 
          className="filter-input"
          value={filters.topic || ''}
          onChange={(e) => onFilterChange('topic', e.target.value)}
        >
          <option value="">All Topics</option>
          {topics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <select 
          name="status" 
          className="filter-input"
          value={filters.status || ''}
          onChange={(e) => onFilterChange('status', e.target.value)}
        >
          <option value="">All Statuses</option>
          {STATUSES.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <select 
          name="type" 
          className="filter-input"
          value={filters.type || ''}
          onChange={(e) => onFilterChange('type', e.target.value)}
        >
          <option value="">All Types</option>
          {ACTIVITY_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      <div className="filter-group flex-grow">
        <input 
          type="text" 
          placeholder="Search activities..." 
          className="filter-input w-full"
          value={filters.search || ''}
          onChange={(e) => onFilterChange('search', e.target.value)}
        />
      </div>
      <button className="btn-secondary clear-filters-btn" onClick={onClearFilters}>
        Clear
      </button>
    </div>
  );
}
