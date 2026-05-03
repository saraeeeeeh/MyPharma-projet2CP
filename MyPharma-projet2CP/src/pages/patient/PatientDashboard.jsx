import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import './PatientDashboard.css';

function PatientDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [initials, setInitials] = useState('..');

  useEffect(() => {
    try {
      const patientData = localStorage.getItem('patient');
      if (patientData) {
        const patient = JSON.parse(patientData);
        if (patient.nom) {
          const names = patient.nom.split(' ');
          let inits = names[0][0];
          if (names.length > 1) {
            inits += names[names.length - 1][0];
          } else if (names[0].length > 1) {
            inits += names[0][1];
          }
          setInitials(inits.toUpperCase());
        } else {
          setInitials('JD'); // Jean Dupont
        }
      } else {
        setInitials('AH');
      }
    } catch (e) {
      setInitials('AH');
    }
  }, []);

  // Déterminer le menu actif en fonction de l'URL
  const getActiveMenu = () => {
    const path = location.pathname;
    if (path.includes('ordonnances')) return 'ordonnances';
    if (path.includes('medicaments')) return 'medicaments';
    if (path.includes('commandes')) return 'commandes';
    if (path.includes('medecins')) return 'medecins';
    if (path.includes('pharmacies')) return 'pharmacies';
    if (path.includes('profil')) return 'profil';
    return 'overview'; // défaut
  };

  const activeMenu = getActiveMenu();

  return (
    <div className="dash">

      {/* ===== SIDEBAR ===== */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">⊕</span>
          <div>
            <p className="logo-name">MyPharma</p>
            <p className="logo-sub">Espace Patient</p>
          </div>
        </div>

        {[
          { id: 'overview', label: 'Tableau de bord', path: '/patient/dashboard/overview', icon: <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/> },
          { id: 'ordonnances', label: 'Mes ordonnances', path: '/patient/dashboard/ordonnances', icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></> },
          { id: 'medicaments', label: 'Mes médicaments', path: '/patient/dashboard/medicaments', icon: <><rect x="3" y="8" width="18" height="8" rx="4"/><line x1="12" y1="8" x2="12" y2="16"/></> },
          { id: 'commandes', label: 'Commander', path: '/patient/dashboard/commandes', icon: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></> },
          { id: 'pharmacies', label: 'Pharmacies', path: '/patient/dashboard/pharmacies', icon: <><path d="M10 4V2a1 1 0 011-1h2a1 1 0 011 1v2"/><path d="M4 10h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10z"/><path d="M12 14v4M10 16h4"/></> },
          { id: 'medecins', label: 'Mes médecins', path: '/patient/dashboard/medecins', icon: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></> },
          { id: 'profil', label: 'Mon profil santé', path: '/patient/dashboard/profil', icon: <><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></> },
        ].map(item => (
          <div
            key={item.id}
            className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {item.icon}
            </svg>
            {item.label}
          </div>
        ))}

        <div className="sidebar-bottom">
          <div className="nav-item" onClick={() => navigate('/')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Déconnexion
          </div>
        </div>
      </div>

      {/* ===== MAIN ===== */}
      <div className="main">
        {/* Header commun à toutes les pages */}
        <div className="topbar">
          <div className="welcome">
            <h2>Espace Patient 👋</h2>
            <p>Mercredi 18 mars 2026 — Bienvenue sur MyPharma</p>
          </div>
          <div 
            className="avatar" 
            style={{ cursor: 'pointer', transition: 'transform 0.2s' }} 
            onClick={() => navigate('/patient/dashboard/profil')}
            title="Mon profil santé"
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {initials}
          </div>
        </div>

        {/* C'est ici que les sous-pages s'affichent */}
        <Outlet />
      </div>
    </div>
  );
}

export default PatientDashboard;
