import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylepageprofile.css';

const ParametresPage = () => {
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
    { icon: "fa-gear",           label: "Paramètres",        path: "/parametres", active: true }
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
            <h2>Paramètres</h2>
            <p>Gérez vos préférences et informations personnelles</p>
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
          <div className="form-card" style={{ maxWidth: "800px", margin: "0 auto", padding: "30px" }}>
            <h3 style={{ marginBottom: "20px", color: "#1e293b", borderBottom: "1px solid #e2e8f0", paddingBottom: "15px" }}>
                <i className="fa-solid fa-user-gear" style={{ marginRight: "10px", color: "#137FEC" }}></i>
                Informations du compte
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div className="champ-formulaire">
                    <label>Nom complet</label>
                    <input type="text" className="c-input" defaultValue={data.nom || ""} disabled style={{backgroundColor: "#f8fafc"}} />
                </div>
                <div className="champ-formulaire">
                    <label>Spécialité</label>
                    <input type="text" className="c-input" defaultValue={data.specialite || ""} disabled style={{backgroundColor: "#f8fafc"}} />
                </div>
                <div className="champ-formulaire">
                    <label>Téléphone</label>
                    <input type="text" className="c-input" defaultValue={data.telephone || ""} disabled style={{backgroundColor: "#f8fafc"}} />
                </div>
                <div className="champ-formulaire">
                    <label>Email</label>
                    <input type="email" className="c-input" defaultValue={data.email || "docteur@mypharma.dz"} disabled style={{backgroundColor: "#f8fafc"}} />
                </div>
                <div className="champ-formulaire" style={{gridColumn: "1 / -1"}}>
                    <label>Adresse du cabinet</label>
                    <input type="text" className="c-input" defaultValue={data.adresse || ""} disabled style={{backgroundColor: "#f8fafc"}} />
                </div>
            </div>

            <h3 style={{ marginTop: "40px", marginBottom: "20px", color: "#1e293b", borderBottom: "1px solid #e2e8f0", paddingBottom: "15px" }}>
                <i className="fa-solid fa-shield-halved" style={{ marginRight: "10px", color: "#137FEC" }}></i>
                Sécurité
            </h3>
            
            <button className="voir-btn" style={{ width: "auto", margin: 0 }}>
                Changer de mot de passe
            </button>
            <p style={{marginTop: "10px", fontSize: "14px", color: "#64748b"}}>Vous recevrez un email avec les instructions pour réinitialiser votre mot de passe.</p>
            
            <div className="ligne-horizontale" style={{marginTop: "40px"}}>
                <button className="FIN" style={{ width: "auto", margin: 0, padding: "12px 30px" }}>Enregistrer les modifications</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParametresPage;
