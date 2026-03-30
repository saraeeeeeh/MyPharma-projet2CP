import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { PharmacieContext } from '../context/PharmacieContext';
import '../PharmacienDashboard.css';

export default function Dashboard() {
  const { isLogged, pharmacieData } = useContext(PharmacieContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate('/pharmacien/login');
    }
  }, [isLogged, navigate]);

  if (!isLogged) return null;

  return (
    <div className="dash">
      <Sidebar />
      <div className="main">
        {/* Topbar inside the main layout */}
        <div className="topbar">
          <div className="welcome">
            <h2>Bonjour, {pharmacieData?.pharmacien?.nom || 'Pharmacien'} 👋</h2>
            <p>Aujourd'hui — Votre espace professionnel</p>
          </div>
          <div className="avatar">
            {pharmacieData?.pharmacien?.nom ? pharmacieData.pharmacien.nom.substring(0,2).toUpperCase() : 'PH'}
          </div>
        </div>
        
        {/* Subpages will be injected here */}
        <Outlet />
      </div>
    </div>
  );
}
