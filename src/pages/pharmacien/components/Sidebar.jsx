import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { PharmacieContext } from '../context/PharmacieContext';
import '../PharmacienDashboard.css';

export default function Sidebar() {
  const { logout, pharmacieData } = useContext(PharmacieContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/pharmacien/login');
  };

  const navItems = [
    { name: "Tableau de bord", path: '/pharmacien/dashboard/overview', icon: <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/> },
    { name: "Ordonnances", path: '/pharmacien/dashboard/ordonnances', icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></> },
    { name: "Commandes", path: '/pharmacien/dashboard/commandes', icon: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></> },
    { name: "Stock", path: '/pharmacien/dashboard/stock', icon: <><rect x="3" y="8" width="18" height="8" rx="4"/><line x1="12" y1="8" x2="12" y2="16"/></> },
    { name: "Paramètres", path: '/pharmacien/dashboard/parametres', icon: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">⊕</span>
        <div>
          <p className="logo-name">MyPharma</p>
          <p className="logo-sub">Espace Pharmacie</p>
        </div>
      </div>

      <nav>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            style={{ textDecoration: 'none' }}
            children={({ isActive }) => (
              <div className={`nav-item ${isActive ? 'active' : ''}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {item.icon}
                </svg>
                {item.name}
              </div>
            )}
          />
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="nav-item" onClick={handleLogout} style={{color: '#fdecea'}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Déconnexion
        </div>
      </div>
    </div>
  );
}
