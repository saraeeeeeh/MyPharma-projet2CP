import React from 'react';
import { Outlet } from 'react-router-dom';
import './AuthLayout.css';
export default function AuthLayout() {
  return (
    <div className="auth-layout-container">
      {/* Top Navigation Bar */}
      <header className="auth-header">
        {/* Logo */}
        <div className="auth-logo-group">
          <div className="auth-logo-dots">
            <div className="auth-logo-row">
              <div className="auth-logo-dot filled"></div>
              <div className="auth-logo-dot"></div>
            </div>
            <div className="auth-logo-row">
              <div className="auth-logo-dot filled"></div>
              <div className="auth-logo-dot filled"></div>
            </div>
          </div>
          <span className="auth-logo-text">MyPharma</span>
        </div>

        {/* Right side links */}
        <div className="auth-nav-links">
          <a href="#" className="auth-nav-link">Aide</a>
          <a href="#" className="auth-nav-link">Contact</a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="auth-main-content">
        <Outlet />
      </main>
    </div>
  );
}
