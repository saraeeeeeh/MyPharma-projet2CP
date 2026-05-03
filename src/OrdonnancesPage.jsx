import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './stylepageprofile.css';
import './styleordonnances.css';

const OrdonnancesPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(() => {
    let combined = { 
        nom: "Dr. Jean Dupont", 
        telephone: "05 45 12 30 11", 
        specialite: "Médecine Générale",
        rpps: "A renseigner",
        adresse: "Cabinet Médical"
    };
    try {
        const savedEtape1 = localStorage.getItem("medecinEtape1");
        if (savedEtape1) combined = { ...combined, ...JSON.parse(savedEtape1) };
        const saved = localStorage.getItem("medecinConnecte");
        if (saved) combined = { ...combined, ...JSON.parse(saved) };
    } catch {
        // ignore
    }
    return combined;
  });

  // Mode: 'list' ou 'create'
  const location = useLocation();
  const [viewMode, setViewMode] = useState(location.state?.viewMode || 'list');

  const todayStr = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const [ordonnances, setOrdonnances] = useState([]);

  useEffect(() => {
    if (data && data.id) {
      fetch(`/api/ordonnances?medecinId=${data.id}`)
        .then(res => res.json())
        .then(fetchedOrdos => {
          const formatted = fetchedOrdos.map(o => {
              const meds = JSON.parse(o.medicaments || "[]");
              return {
                  ...o,
                  patient: o.patientNom || "Patient Inconnu", // On va modifier saveOrdonnance pour envoyer patientNom dans medecinId 
                  nbMedicaments: meds.length
              };
          });
          setOrdonnances(formatted);
        })
        .catch(err => console.error("Erreur chargement ordonnances:", err));
    }
  }, [data]);

  const [currentOrdo, setCurrentOrdo] = useState({
      patient: "",
      age: "",
      date: todayStr,
      medicaments: [] // { nom: "", posologie: "" }
  });

  const [medInput, setMedInput] = useState({ nom: "", posologie: "" });
  const [signatureActive, setSignatureActive] = useState(false);

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
    { icon: "fa-file-medical",   label: "Mes ordonnances",   path: "/ordonnances", active: true },
    { icon: "fa-star",           label: "Avis Patients",     path: "/avis" },
    { icon: "fa-envelope",       label: "Messagerie",        path: "/messagerie" },
    { icon: "fa-gear",           label: "Paramètres",        path: "/parametres" }
  ];

  const deleteOrdonnance = (id) => {
    if(window.confirm("Voulez-vous supprimer cette ordonnance de l'historique ?")) {
      setOrdonnances(ordonnances.filter(o => o.id !== id));
    }
  };

  const addMedicament = (e) => {
      e.preventDefault();
      if(!medInput.nom) return;
      setCurrentOrdo({
          ...currentOrdo,
          medicaments: [...currentOrdo.medicaments, { ...medInput, id: Date.now() }]
      });
      setMedInput({ nom: "", posologie: "" });
  };

  const removeMedicament = (id) => {
      setCurrentOrdo({
          ...currentOrdo,
          medicaments: currentOrdo.medicaments.filter(m => m.id !== id)
      });
  };

  const saveOrdonnance = async () => {
      if(!currentOrdo.patient) {
          alert("Veuillez renseigner le nom du patient.");
          return;
      }

      try {
          const payload = {
              medecinId: data.id,
              date: currentOrdo.date,
              medicaments: currentOrdo.medicaments,
              patientNom: currentOrdo.patient // On l'envoie pour l'affichage même s'il n'est pas dans la BDD stricte (il faudra ajouter patientNom dans la table)
          };

          const response = await fetch('/api/ordonnances', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
          });

          if (!response.ok) throw new Error("Erreur sauvegarde ordonnance");

          const result = await response.json();

          const newSaved = {
              id: result.id,
              date: currentOrdo.date,
              patient: currentOrdo.patient,
              nbMedicaments: currentOrdo.medicaments.length
          };
          
          setOrdonnances([newSaved, ...ordonnances]);
          setViewMode('list');
          setCurrentOrdo({ patient: "", age: "", date: todayStr, medicaments: [] });
      } catch (err) {
          console.error(err);
          alert("Erreur lors de l'enregistrement de l'ordonnance.");
      }
  };

  // VUE LISTE
  const renderList = () => (
      <div className="ord-list-container">
          <div className="ord-header hero-card">
              <div className="ord-intro">
                  <i className="fa-solid fa-notes-medical icon-bg"></i>
                  <div>
                      <h3>Historique des Prescriptions</h3>
                      <p>Retrouvez toutes vos ordonnances générées précédemment.</p>
                  </div>
              </div>
              <button className="FIN" onClick={() => setViewMode('create')} style={{width: "auto", padding: "12px 25px", marginTop: 0}}>
                  <i className="fa-solid fa-plus"></i> Nouvelle Ordonnance
              </button>
          </div>

          <div className="ord-grid">
              {ordonnances.map(o => (
                  <div key={o.id} className="ord-list-card form-card">
                      <div className="ord-card-top">
                          <div className="date-badge">
                              <i className="fa-regular fa-calendar"></i> {o.date}
                          </div>
                          <button className="del-btn-round" onClick={() => deleteOrdonnance(o.id)} title="Supprimer">
                              <i className="fa-solid fa-trash"></i>
                          </button>
                      </div>
                      <div className="ord-card-body">
                          <h4>{o.patient}</h4>
                          <span className="med-count">
                              <i className="fa-solid fa-pills"></i> {o.nbMedicaments} médicament(s)
                          </span>
                      </div>
                      <div className="ord-card-foot">
                          <button className="voir-btn" style={{width: "100%", padding: "10px", marginTop: "10px"}}>
                              Voir le PDF
                          </button>
                      </div>
                  </div>
              ))}
              {ordonnances.length === 0 && (
                  <div style={{gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#888"}}>
                      Aucune ordonnance générée.
                  </div>
              )}
          </div>
      </div>
  );

  // VUE GÉNÉRATEUR
  const renderGenerator = () => (
      <div className="generator-container">
          {/* Barre d'action fixe en haut */}
          <div className="gen-toolbar form-card">
              <button className="voir-btn" onClick={() => setViewMode('list')} style={{margin: 0, padding:"10px 20px"}}>
                  <i className="fa-solid fa-arrow-left"></i> Retour
              </button>
              <div className="toolbar-title">Nouvelle Ordonnance</div>
              <button className="FIN" onClick={saveOrdonnance} style={{margin: 0, padding:"10px 20px", width:"auto"}}>
                   Enregistrer <i className="fa-solid fa-check"></i>
              </button>
          </div>

          <div className="paper-wrapper">
              <div className="paper-sheet">
                  {/* EN-TÊTE PRO */}
                  <div className="paper-header">
                      <div className="doc-info">
                          <h2>{data.nom}</h2>
                          <div className="doc-spec">{data.specialite || "Médecine Générale"}</div>
                          <div className="doc-contact">
                              Numéro d'ordre / RPPS : {data.rpps || data.adeli || "Non renseigné"}<br/>
                              Tél : {data.telephone}<br/>
                              {data.adresse || "Adresse du cabinet non renseignée"}
                          </div>
                      </div>
                      <div className="logo-ordo">
                          <i className="fa-solid fa-staff-snake"></i>
                      </div>
                  </div>

                  <div className="paper-divider"></div>

                  {/* INFOS PATIENT */}
                  <div className="paper-patient">
                       <div className="pat-line">
                           <span>Le :</span>
                           <input type="text" value={currentOrdo.date} onChange={e => setCurrentOrdo({...currentOrdo, date: e.target.value})} className="inline-input" style={{width: "120px"}}/>
                       </div>
                       <div className="pat-line mt-2">
                           <span>M./Mme :</span>
                           <input type="text" placeholder="Nom et Prénom du patient" value={currentOrdo.patient} onChange={e => setCurrentOrdo({...currentOrdo, patient: e.target.value})} className="inline-input" style={{flex: 1}} autoFocus />
                       </div>
                       <div className="pat-line">
                           <span>Âge :</span>
                           <input type="text" placeholder="Ex: 45 ans" value={currentOrdo.age} onChange={e => setCurrentOrdo({...currentOrdo, age: e.target.value})} className="inline-input" style={{width: "100px"}}/>
                       </div>
                  </div>

                  {/* PRESCRIPTIONS */}
                  <div className="paper-content">
                      <h3 className="section-title">Prescription</h3>
                      
                      <div className="med-list">
                          {currentOrdo.medicaments.map((med, index) => (
                              <div key={med.id} className="med-item">
                                  <div className="num-med">{index + 1}.</div>
                                  <div className="med-text">
                                      <strong>{med.nom}</strong>
                                      <p>{med.posologie}</p>
                                  </div>
                                  <button onClick={() => removeMedicament(med.id)} className="del-btn-round tiny"><i className="fa-solid fa-times"></i></button>
                              </div>
                          ))}
                      </div>

                      {/* Formulaire ajout rapide de med */}
                      <form className="add-med-form" onSubmit={addMedicament}>
                          <input type="text" placeholder="Nom du médicament (ex: Paracétamol 1000mg)" value={medInput.nom} onChange={e => setMedInput({...medInput, nom: e.target.value})} required/>
                          <input type="text" placeholder="Posologie (ex: 1 comprimé matin et soir pdt 5j)" value={medInput.posologie} onChange={e => setMedInput({...medInput, posologie: e.target.value})} />
                          <button type="submit" className="add-med-btn"><i className="fa-solid fa-plus"></i></button>
                      </form>
                  </div>

                  <div className="paper-footer">
                      <div className="signature-box" onClick={() => setSignatureActive(!signatureActive)}>
                          {signatureActive ? (
                              <div className="fake-stamp" style={{ border: "2px solid #185FA5", borderRadius: "8px", padding: "10px", color: "#185FA5", textAlign: "center", transform: "rotate(-5deg)", width: "160px" }}>
                                  <strong>{(data.nom || "Docteur").toUpperCase()}</strong><br/>
                                  <span style={{fontSize: "12px"}}>{data.specialite || "Médecine Générale"}</span><br/>
                                  <div style={{fontFamily: "'Brush Script MT', 'Dancing Script', cursive", fontSize: "24px", color: "#1e3a8a", marginTop: "5px"}}>Signé</div>
                              </div>
                          ) : (
                              <span style={{color: "#94a3b8", fontStyle: "italic", fontSize: "14px"}}>Cliquez ici pour signer</span>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );

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
            <h2>Mes Ordonnances</h2>
            <p>Rédigez et gardez une trace de vos prescriptions</p>
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
           {viewMode === 'list' ? renderList() : renderGenerator()}
        </div>
      </div>
    </div>
  );
};

export default OrdonnancesPage;
