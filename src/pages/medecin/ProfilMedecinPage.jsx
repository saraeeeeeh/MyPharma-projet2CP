import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylepageprofile.css';

const ProfilMedecinPage = () => {
  const navigate = useNavigate();


  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("medecinConnecte");
    return saved ? JSON.parse(saved) : null;
  });

  
  useEffect(() => {
    if (!data) navigate("/connect");
  }, [data, navigate]);

  if (!data) return <div className="loading">Chargement...</div>;

  const nomAffiche = data.nom || "Docteur";
  const initiales = nomAffiche
    .replace(/dr\./gi, "").trim()
    .split(" ").filter(w => w.length > 0)
    .map(w => w[0]).join("").slice(0, 2).toUpperCase() || "DR";

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  const rdvList = [
    { heure: "09h00", nom: "Karim Belhadj",   motif: "Consultation générale", couleur: "#22c55e" },
    { heure: "10h30", nom: "Amina Saidi",      motif: "Suivi diabète",         couleur: "#22c55e" },
    { heure: "11h00", nom: "Mohamed Ait",      motif: "Renouvellement ordo",   couleur: "#f59e0b" },
    { heure: "14h00", nom: "Sara Benmoussa",   motif: "1ère consultation",     couleur: "#137FEC" },
  ];

  const patients = [
    { initiales: "KB", nom: "Karim Belhadj",   pathologie: "Diabète type 2",  tag: "Suivi",   tagStyle: { background: "#fef3c7", color: "#92400e" } },
    { initiales: "AS", nom: "Amina Saidi",      pathologie: "Hypertension",    tag: "RDV",     tagStyle: { background: "#E6F1FB", color: "#0C447C" } },
    { initiales: "MA", nom: "Mohamed Ait",      pathologie: "Asthme",          tag: "Suivi",   tagStyle: { background: "#fef3c7", color: "#92400e" } },
    { initiales: "SB", nom: "Sara Benmoussa",   pathologie: "Nouveau patient", tag: "Nouveau", tagStyle: { background: "#e6f9f0", color: "#065f46" } },
  ];

  const ordonnances = [
    { nom: "Karim Belhadj",  med: "Metformine 500mg",  tag: "Active",         tagStyle: { background: "#e6f9f0", color: "#065f46" } },
    { nom: "Amina Saidi",    med: "Amlodipine 5mg",    tag: "Expire bientôt", tagStyle: { background: "#fef3c7", color: "#92400e" } },
    { nom: "Mohamed Ait",    med: "Salbutamol spray",  tag: "Active",         tagStyle: { background: "#e6f9f0", color: "#065f46" } },
  ];

  const messages = [
    { initiales: "KB", nom: "Karim Belhadj",      apercu: "Résultats analyses reçus...",  avStyle: { background: "#E6F1FB", color: "#0C447C" } },
    { initiales: "PC", nom: "Pharmacie Centrale",  apercu: "Stock Metformine disponible",  avStyle: { background: "#fef3c7", color: "#92400e" } },
    { initiales: "MP", nom: "Admin MyPharma",      apercu: "Mise à jour système v2.1",     avStyle: { background: "#f3f4f6", color: "#555" } },
  ];

  const handleDeconnexion = () => {
    localStorage.removeItem("medecinConnecte");
    setData(null); 
    navigate("/connect");
  };

  return (
    <div className="app-layout">

      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h1>MyPharma</h1>
          <p>Espace Médecin</p>
        </div>
        <nav className="sidebar-nav">
          {[
            { icon: "fa-house",          label: "Tableau de bord",  path: "/profil",       active: true  },
            { icon: "fa-calendar-days",  label: "Planning",          path: "/planning"               },
            { icon: "fa-users",          label: "Mes patients",      path: "/patients"               },
            { icon: "fa-file-medical",   label: "Mes ordonnances",   path: "/ordonnances"            },
            { icon: "fa-envelope",       label: "Messagerie",        path: "/messagerie"             },
            { icon: "fa-gear",           label: "Paramètres",        path: "/parametres" }
          ].map((item, i) => (
            <div
              key={i}
              className={`nav-item ${item.active ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
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

      {/* ── MAIN ── */}
      <div className="main-area">
        <div className="topbar">
          <div>
            <h2>Bonjour, {data.nom}</h2>
            <p>{today} — Tableau de bord</p>
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

          {/* Hero */}
          <div className="hero-card">
            <div className="av-big">{initiales}</div>
            <div className="hero-info">
              <h2>{data.nom || "Docteur"}</h2>
              <p>{data.specialite || "Médecin"} · {data.wilaya || "Alger"} · {data.experience || "0"} ans d'expérience</p>
              <div className="badges">
                <span className="badge bb">{data.specialite || "Médecin"}</span>
                <span className="badge bg">Profil validé</span>
                <span className="badge bgr">{data.sexe === "F" ? "Femme" : "Homme"}</span>
              </div>
            </div>
            <div className="hero-right">
              <span className="status-pill">Compte actif</span>

            </div>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-card"><div className="stat-num">248</div><div className="stat-label">Patients</div><div className="stat-sub">enregistrés</div></div>
            <div className="stat-card"><div className="stat-num">12</div><div className="stat-label">RDV aujourd'hui</div><div className="stat-sub">4 restants</div></div>
            <div className="stat-card"><div className="stat-num">36</div><div className="stat-label">Ordonnances</div><div className="stat-sub">ce mois</div></div>
            <div className="stat-card"><div className="stat-num red">3</div><div className="stat-label">Messages</div><div className="stat-sub">non lus</div></div>
          </div>

          {/* Grid 4 fonctions */}
          <div className="funcs-grid">

            {/* Planning */}
            <div className="func-card">
              <div className="func-head">
                <div className="func-icon green-bg">
                  <i className="fa-solid fa-calendar-days" style={{ color: "#065f46" }}></i>
                </div>
                <div><div className="func-title">Planning du jour</div><div className="func-sub">{today}</div></div>
              </div>
              {rdvList.map((r, i) => (
                <div key={i} className="rdv-item">
                  <span className="rdv-time">{r.heure}</span>
                  <span className="rdv-dot" style={{ background: r.couleur }}></span>
                  <div><div className="rdv-name">{r.nom}</div><div className="rdv-motif">{r.motif}</div></div>
                </div>
              ))}
              <button className="voir-btn" onClick={() => navigate("/planning")}>
                Voir le planning complet →
              </button>
            </div>

            {/* Patients */}
            <div className="func-card">
              <div className="func-head">
                <div className="func-icon purple-bg">
                  <i className="fa-solid fa-users" style={{ color: "#534AB7" }}></i>
                </div>
                <div><div className="func-title">Mes patients</div><div className="func-sub">248 enregistrés</div></div>
              </div>
              {patients.map((p, i) => (
                <div key={i} className="patient-item">
                  <div className="p-av">{p.initiales}</div>
                  <div><div className="p-name">{p.nom}</div><div className="p-path">{p.pathologie}</div></div>
                  <span className="p-tag" style={p.tagStyle}>{p.tag}</span>
                </div>
              ))}
              <button className="voir-btn" onClick={() => navigate("/patients")}>
                Voir tous les patients →
              </button>
            </div>

            {/* Ordonnances */}
            <div className="func-card">
              <div className="func-head">
                <div className="func-icon blue-bg">
                  <i className="fa-solid fa-file-medical" style={{ color: "#185FA5" }}></i>
                </div>
                <div><div className="func-title">Mes ordonnances</div><div className="func-sub">3 en attente · 36 ce mois</div></div>
              </div>
              {ordonnances.map((o, i) => (
                <div key={i} className="ordo-item">
                  <div className="ordo-icon"><i className="fa-solid fa-file" style={{ color: "#185FA5", fontSize: "12px" }}></i></div>
                  <div><div className="ordo-name">{o.nom}</div><div className="ordo-med">{o.med}</div></div>
                  <span className="ordo-tag" style={o.tagStyle}>{o.tag}</span>
                </div>
              ))}
              <button className="voir-btn blue-btn" onClick={() => navigate("/ordonnances", { state: { viewMode: 'create' } })}>
                + Nouvelle ordonnance
              </button>
            </div>

            {/* Messagerie */}
            <div className="func-card">
              <div className="func-head">
                <div className="func-icon green-bg">
                  <i className="fa-solid fa-envelope" style={{ color: "#065f46" }}></i>
                </div>
                <div><div className="func-title">Messagerie</div><div className="func-sub">3 messages non lus</div></div>
              </div>
              {messages.map((m, i) => (
                <div key={i} className="msg-item">
                  <div className="msg-av" style={m.avStyle}>{m.initiales}</div>
                  <div style={{ flex: 1 }}>
                    <div className="msg-from">{m.nom}</div>
                    <div className="msg-prev">{m.apercu}</div>
                  </div>
                  <span className="unread-dot"></span>
                </div>
              ))}
              <button className="voir-btn" onClick={() => navigate("/messagerie")}>
                Ouvrir la messagerie →
              </button>
            </div>
          </div>

          {/* Bas de page */}
          <div className="bottom-row">
            <div className="mini-card" onClick={() => navigate("/statistiques")}>
              <div className="mini-icon amber-bg"><i className="fa-solid fa-chart-bar" style={{ color: "#92400e" }}></i></div>
              <div><div className="mini-title">Statistiques</div><div className="mini-sub">Activité du cabinet</div></div>
            </div>
            <div className="mini-card" onClick={() => navigate("/ordonnances")}>
              <div className="mini-icon red-bg"><i className="fa-solid fa-bell" style={{ color: "#dc2626" }}></i></div>
              <div><div className="mini-title">Notifications</div><div className="mini-sub">Nouvelles ordonnances</div><span className="mini-badge">3 nouvelles</span></div>
            </div>
            <div className="mini-card" onClick={() => navigate("/parametres")}>
              <div className="mini-icon gray-bg"><i className="fa-solid fa-gear" style={{ color: "#555" }}></i></div>
              <div><div className="mini-title">Paramètres</div><div className="mini-sub">Compte & sécurité</div></div>
            </div>
          </div>

          {/* Infos compte */}
          <div className="info-card">
            <div className="sec-title">Informations du compte</div>
            <div className="info-row"><span className="il">Email</span><span className="iv blue">{data.email || "Non renseigné"}</span></div>
            <div className="info-row"><span className="il">Téléphone</span><span className="iv">{data.telephone || "Non renseigné"}</span></div>
            <div className="info-row"><span className="il">Wilaya</span><span className="iv">{data.wilaya || "Alger"}</span></div>
            <div className="info-row"><span className="il">N° Ordre / RPPS</span><span className="iv">{data.rpps || "Non renseigné"}</span></div>
            <div className="info-row"><span className="il">Cabinet</span><span className="iv">{data.adresse || "Non renseigné"}</span></div>
            <div className="info-row"><span className="il">Membre depuis</span><span className="iv">{data.membreDepuis || "Aujourd'hui"}</span></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilMedecinPage;