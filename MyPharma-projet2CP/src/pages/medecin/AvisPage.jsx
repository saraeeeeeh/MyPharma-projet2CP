import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylepageprofile.css';
import './styleavis.css';

const AvisPage = () => {
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
    { icon: "fa-star",           label: "Avis Patients",     path: "/avis", active: true },
    { icon: "fa-envelope",       label: "Messagerie",        path: "/messagerie" },
    { icon: "fa-gear",           label: "Paramètres",        path: "/parametres" },
  ];

  const avisList = [
      { id: 1, auteur: "K. Belhadj", note: 5, date: "30 Mars 2026", texte: "Très bon médecin, à l'écoute et prend le temps d'expliquer les choses. Le cabinet est très propre. Je recommande !" },
      { id: 2, auteur: "A. Saidi", note: 4, date: "25 Mars 2026", texte: "Rendez-vous à l'heure, accueil chaleureux. Seul bémol sur le stationnement un peu difficile autour du cabinet." },
      { id: 3, auteur: "M. Ait", note: 5, date: "12 Mars 2026", texte: "Consultation de qualité. Le docteur est très professionnel et m'a beaucoup rassuré." },
      { id: 4, auteur: "Patient Anonyme", note: 5, date: "05 Mars 2026", texte: "Rapide et efficace. Rien à dire, traitement adapté immédiatement." },
      { id: 5, auteur: "S. Benmoussa", note: 3, date: "20 Février 2026", texte: "Bon médecin mais un peu de retard lors de mon passage (15 min)." },
  ];

  const renderStars = (note) => {
      const stars = [];
      for(let i=1; i<=5; i++){
          if(i <= note) stars.push(<i key={i} className="fa-solid fa-star" style={{color: "#f59e0b"}}></i>);
          else stars.push(<i key={i} className="fa-regular fa-star" style={{color: "#d1d5db"}}></i>);
      }
      return stars;
  };

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
            <h2>Réputation du Cabinet</h2>
            <p>Gérez et consultez les retours de vos patients</p>
          </div>
          <div className="topbar-right">
            <div className="notif-btn" onClick={() => navigate("/ordonnances")}>
              <i className="fa-solid fa-bell"></i>
              <span className="notif-dot"></span>
            </div>
            <div className="av-small">{initiales}</div>
          </div>
        </div>

        <div className="page-content avis-content">
          <div className="avis-wrapper">
              <h3 style={{marginBottom: "20px", color: "#333"}}>Avis récents</h3>
              <div className="avis-list">
                  {avisList.map(avis => (
                      <div key={avis.id} className="avis-card form-card">
                          <div className="ac-top">
                              <div className="ac-user">
                                  <div className="ac-avatar">{avis.auteur.charAt(0)}</div>
                                  <div>
                                      <h4>{avis.auteur}</h4>
                                      <span className="ac-date">{avis.date}</span>
                                  </div>
                              </div>
                              <div className="ac-stars">
                                  {renderStars(avis.note)}
                              </div>
                          </div>
                          <p className="ac-text">"{avis.texte}"</p>
                      </div>
                  ))}
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AvisPage;
