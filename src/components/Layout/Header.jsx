import React from 'react';

export default function Header({ currentPage, onToggleMobile }) {
  const getTitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Dashboard';
      case 'activities': return 'Daily Activities';
      case 'settings': return 'Settings';
      default: return 'Study Tracker';
    }
  };
  const title = getTitle();
  
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="hamburger-btn" onClick={onToggleMobile}>
          ☰
        </button>
        <h1 className="page-title">{title}</h1>
      </div>
      <div className="header-right">
        <div className="date-display">{formattedDate}</div>
      </div>
    </header>
  );
}
