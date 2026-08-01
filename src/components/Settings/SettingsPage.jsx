import React from 'react';

const THEME_OPTIONS = [
  { id: 'LIGHT', label: 'Light', icon: '☀️' },
  { id: 'DARK', label: 'Dark', icon: '🌙' },
  { id: 'SYSTEM', label: 'System', icon: '💻' },
];

const ACCENT_OPTIONS = [
  { id: 'BLUE', label: 'Blue', color: '#6366f1' },
  { id: 'GREEN', label: 'Green', color: '#10b981' },
  { id: 'PURPLE', label: 'Purple', color: '#8b5cf6' },
  { id: 'ORANGE', label: 'Orange', color: '#f97316' },
  { id: 'RED', label: 'Red', color: '#ef4444' },
];

const FONT_SIZE_OPTIONS = [
  { id: 'SMALL', label: 'Small', description: 'Compact view' },
  { id: 'MEDIUM', label: 'Medium', description: 'Standard default' },
  { id: 'LARGE', label: 'Large', description: 'Enhanced readability' },
];

export default function SettingsPage({ settings, onThemeChange, onAccentChange, onFontSizeChange }) {
  const { theme, accentColor, fontSize } = settings;

  return (
    <div className="settings-page">
      <div className="section-header">
        <h2>Settings</h2>
        <p className="section-subtitle">Personalize your application appearance and preferences</p>
      </div>

      <div className="settings-container">
        {/* Appearance Category */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h3>🎨 Appearance</h3>
          </div>

          <div className="settings-card-body">
            {/* 1. Theme Setting */}
            <div className="setting-group">
              <label className="setting-label">Theme</label>
              <div className="theme-radio-group">
                {THEME_OPTIONS.map((item) => (
                  <label
                    key={item.id}
                    className={`theme-radio-option ${theme === item.id ? 'active' : ''}`}
                    onClick={() => onThemeChange(item.id)}
                  >
                    <input
                      type="radio"
                      name="theme"
                      value={item.id}
                      checked={theme === item.id}
                      onChange={() => onThemeChange(item.id)}
                    />
                    <span className="theme-icon">{item.icon}</span>
                    <span className="theme-text">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="settings-divider" />

            {/* 2. Accent Color Setting */}
            <div className="setting-group">
              <label className="setting-label">Accent Color</label>
              <div className="color-swatch-group">
                {ACCENT_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`color-swatch-btn ${accentColor === item.id ? 'active' : ''}`}
                    onClick={() => onAccentChange(item.id)}
                    title={item.label}
                  >
                    <span
                      className="swatch-circle"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="swatch-label">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <hr className="settings-divider" />

            {/* 3. Font Size Setting */}
            <div className="setting-group">
              <label className="setting-label">Font Size</label>
              <div className="font-size-group">
                {FONT_SIZE_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`font-size-btn ${fontSize === item.id ? 'active' : ''}`}
                    onClick={() => onFontSizeChange(item.id)}
                  >
                    <span className="font-size-name">{item.label}</span>
                    <span className="font-size-desc">{item.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
