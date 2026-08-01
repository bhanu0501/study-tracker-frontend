import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children, currentPage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="app-layout">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={onNavigate} 
        mobileOpen={mobileOpen}
        onCloseMobile={closeMobile}
      />
      <div className="main-area">
        <Header 
          currentPage={currentPage}
          onToggleMobile={toggleMobile}
        />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
