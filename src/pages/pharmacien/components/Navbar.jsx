import React, { useContext } from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { PharmacieContext } from '../context/PharmacieContext';
import '../pages/DashboardLayout.css';

export default function Navbar() {
  const { pharmacieData } = useContext(PharmacieContext);

  return (
    <header className="dash-navbar">
      <div className="dash-nav-left">
        <button className="dash-menu-btn">
          <Menu style={{ width: '1.5rem', height: '1.5rem' }} />
        </button>
        
        <div className="dash-search-container">
          <Search className="dash-search-icon" />
          <input 
            type="text" 
            placeholder="Rechercher une ordonnance, médicament..." 
            className="dash-search-input"
          />
        </div>
      </div>

      <div className="dash-nav-right">
        <button className="dash-bell-btn">
          <Bell style={{ width: '1.25rem', height: '1.25rem' }} />
          <span className="dash-bell-indicator"></span>
        </button>
        
        <div className="dash-nav-divider"></div>
        
        <div className="dash-user-profile">
          <div className="dash-user-info">
            <p className="dash-user-name">{pharmacieData?.nom || 'Pharmacie'}</p>
            <p className="dash-user-role">{pharmacieData?.email || 'Admin'}</p>
          </div>
          <div className="dash-avatar">
            {pharmacieData?.photoUrl ? (
              <img src={pharmacieData.photoUrl} alt="Logo" />
            ) : (
              <span className="dash-avatar-initial">{pharmacieData?.nom?.charAt(0) || 'P'}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
