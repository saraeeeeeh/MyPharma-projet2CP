import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylepageprofile.css';

const StatistiquesPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("medecinConnecte");
    return saved ? JSON.parse(saved) : { nom: "Docteur" };
  });

  const initiales = (data.nom || "Docteur").replace(/dr\./gi, "").trim().split(" ").filter(w=>w.length>0).map(w=>w[0]).join("").slice(0,2).toUpperCase() || "DR";

  const handleDeconnexion = () => {
    window.localStorage.removeItem("medecinConnecte");
    setData(null);
    navigate("/connect");
  };

  const navItems = [
    { icon: "fa-house",          label: "Tableau de bord",  path: "/profil" },
    { icon: "fa-calendar-days",  label: "Planning",          path: "/planning" },
    { icon: "fa-users",          label: "Mes patients",      path: "/patients" },
    { icon: "fa-file-medical",   label: "Mes ordonnances",   path: "/ordonnances" },
    { icon: "fa-star",           label: "Avis Patients",     path: "/avis" },
    { icon: "fa-envelope",       label: "Messagerie",        path: "/messagerie" },
    { icon: "fa-gear",           label: "Paramètres",        path: "/parametres" }
  ];

  return (
    <div className="app-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo" onClick={() => navigate('/profil')}>
          <h1>MyPharma</h1>
          <p>Espace Médecin</p>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item, i) => (
            <div key={i} className={`nav-item ${item.active ? "active" : ""}`} onClick={() => navigate(item.path)}>
              <i className={`fa-solid ${item.icon}`}></i>
              {item.label}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer" onClick={handleDeconnexion}>
          <i className="fa-solid fa-right-from-bracket"></i>
          Se déconnecter
        </div>
      </aside>

      {/* MAIN */}
      <div className="main-area">
        <div className="topbar">
          <div>
            <h2>Statistiques globales</h2>
            <p>Vue d'ensemble de l'activité de votre cabinet</p>
          </div>
          <div className="topbar-right">
            <div className="notif-btn" onClick={() => navigate("/ordonnances")}>
              <i className="fa-solid fa-bell"></i>
              <span className="notif-dot"></span>
            </div>
            <div className="av-small">{initiales}</div>
          </div>
        </div>

        <div className="page-content">
          <div className="stats-row" style={{marginBottom: "30px"}}>
            <div className="stat-card">
                <div className="stat-num">248</div>
                <div className="stat-label">Patients Totaux</div>
                <div className="stat-sub">+12% ce mois</div>
            </div>
            <div className="stat-card">
                <div className="stat-num">1,204</div>
                <div className="stat-label">Consultations</div>
                <div className="stat-sub">Cette année</div>
            </div>
            <div className="stat-card">
                <div className="stat-num">890</div>
                <div className="stat-label">Ordonnances</div>
                <div className="stat-sub">Générées</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div className="form-card" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#64748b" }}>
               <i className="fa-solid fa-chart-line" style={{fontSize: "40px", marginBottom: "15px", color: "#137FEC"}}></i>
               <h3>Évolution des consultations</h3>
               <p>Données non disponibles pour le moment</p>
            </div>
            <div className="form-card" style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#64748b" }}>
               <i className="fa-solid fa-chart-pie" style={{fontSize: "40px", marginBottom: "15px", color: "#10b981"}}></i>
               <h3>Répartition des patients par âge</h3>
               <p>Données non disponibles pour le moment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistiquesPage;
