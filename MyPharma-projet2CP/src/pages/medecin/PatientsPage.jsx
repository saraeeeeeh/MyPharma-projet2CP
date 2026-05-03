import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylepageprofile.css';
import './stylepatients.css';

const PatientsPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("medecinConnecte");
    return saved ? JSON.parse(saved) : { nom: "Docteur" };
  });

  const [search, setSearch] = useState("");

  const [patients, setPatients] = useState([
    { id: 1, nom: "Karim Belhadj", age: 45, sexe: "M", telephone: "05 45 12 30 11", rdv: "31/03/2026", status: "Suivi régulier", avatarColor: "#e6f2ff", textColor: "#137FEC" },
    { id: 2, nom: "Amina Saidi", age: 38, sexe: "F", telephone: "06 72 88 19 04", rdv: "02/04/2026", status: "Nouveau", avatarColor: "#fef3c7", textColor: "#92400e" },
    { id: 3, nom: "Mohamed Ait", age: 62, sexe: "M", telephone: "05 55 90 22 17", rdv: "15/04/2026", status: "Suivi régulier", avatarColor: "#fee2e2", textColor: "#dc2626" },
    { id: 4, nom: "Sara Benmoussa", age: 29, sexe: "F", telephone: "07 88 11 22 33", rdv: "31/03/2026", status: "Nouveau", avatarColor: "#e6f9f0", textColor: "#065f46" },
    { id: 5, nom: "Yacine Cherif", age: 51, sexe: "M", telephone: "06 61 77 88 99", rdv: "10/05/2026", status: "Suivi régulier", avatarColor: "#f3e8ff", textColor: "#6b21a8" },
    { id: 6, nom: "Lina Merzoug", age: 24, sexe: "F", telephone: "05 40 50 60 70", rdv: "Aucun", status: "Nouveau", avatarColor: "#f1f5f9", textColor: "#475569" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ nom: "", age: "", sexe: "M", telephone: "" });

  const initiales = (data.nom || "Docteur").replace(/dr\./gi, "").trim().split(" ").filter(w=>w.length>0).map(w=>w[0]).join("").slice(0,2).toUpperCase() || "DR";

  const handleDeconnexion = () => {
    window.localStorage.removeItem("medecinConnecte");
    setData(null);
    navigate("/connect");
  };

  const navItems = [
    { icon: "fa-house",          label: "Tableau de bord",  path: "/profil" },
    { icon: "fa-calendar-days",  label: "Planning",          path: "/planning" },
    { icon: "fa-users",          label: "Mes patients",      path: "/patients", active: true },
    { icon: "fa-file-medical",   label: "Mes ordonnances",   path: "/ordonnances" },
    { icon: "fa-envelope",       label: "Messagerie",        path: "/messagerie" },
    { icon: "fa-gear",           label: "Paramètres",        path: "/parametres" }
  ];

  const handleAddPatient = (e) => {
    e.preventDefault();
    if(!newPatient.nom) return;
    const patientObj = {
      ...newPatient,
      id: Date.now(),
      rdv: "Aucun",
      status: "Nouveau",
      age: parseInt(newPatient.age) || 0,
      avatarColor: "#e6f9f0", 
      textColor: "#065f46"
    };
    setPatients([patientObj, ...patients]);
    setShowAddModal(false);
    setNewPatient({ nom: "", age: "", sexe: "M", telephone: "" });
  };

  const deletePatient = (id) => {
    if(window.confirm("Voulez-vous vraiment retirer ce patient de votre base de données ?")) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  const getInitials = (name) => {
      return name.split(" ").filter(w=>w.length>0).map(w=>w[0]).join("").slice(0,2).toUpperCase() || "??";
  };

  const filteredPatients = patients.filter(p => 
      p.nom.toLowerCase().includes(search.toLowerCase()) || 
      p.telephone.includes(search)
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
            <h2>Annuaire des Patients</h2>
            <p>Gérez vos rendez-vous et informations de contact</p>
          </div>
          <div className="topbar-right">
            <button className="edit-btn" onClick={() => setShowAddModal(true)}>+ Nouveau Patient</button>
            <div className="notif-btn" onClick={() => navigate("/ordonnances")}>
              <i className="fa-solid fa-bell"></i>
              <span className="notif-dot"></span>
            </div>
            <div className="av-small">{initiales}</div>
          </div>
        </div>

        <div className="page-content patients-content">
          
          {/* SEARCH BAR */}
          <div className="search-card form-card">
              <div className="search-box">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input 
                      type="text" 
                      placeholder="Rechercher un numéro de téléphone ou un nom..." 
                      value={search} 
                      onChange={e => setSearch(e.target.value)} 
                  />
              </div>
          </div>

          <div className="patients-grid">
               {filteredPatients.map(p => (
                   <div key={p.id} className="patient-card form-card">
                       <div className="pc-top">
                           <div className="pc-avatar" style={{backgroundColor: p.avatarColor, color: p.textColor}}>
                               {getInitials(p.nom)}
                           </div>
                           <div className="pc-main">
                               <h3>{p.nom}</h3>
                               <p>{p.sexe} - {p.age} ans</p>
                           </div>
                           <button className="pc-del" onClick={() => deletePatient(p.id)} title="Archiver ce dossier">
                               <i className="fa-solid fa-trash"></i>
                           </button>
                       </div>
                       
                       <div className="pc-details">
                           <div className="pc-row">
                               <i className="fa-solid fa-phone"></i>
                               <span>{p.telephone}</span>
                           </div>
                           <div className="pc-row">
                               <i className="fa-regular fa-calendar-check"></i>
                               <span>Prochain RDV: <strong>{p.rdv}</strong></span>
                           </div>
                       </div>

                       <div className="pc-bottom" style={{justifyContent: "flex-end", marginTop: "10px"}}>
                           <span className="pc-status" style={{backgroundColor: p.avatarColor, color: p.textColor}}>{p.status}</span>
                       </div>
                   </div>
               ))}
               
               {filteredPatients.length === 0 && (
                   <div style={{gridColumn: "1 / -1", textAlign: "center", padding: "60px 20px", color: "#666", background: "#f1f3f0", borderRadius: "20px"}}>
                       <i className="fa-solid fa-users-slash" style={{fontSize: "40px", marginBottom: "15px", color: "#d1d5db"}}></i>
                       <h3>Aucun patient trouvé</h3>
                       <p>Vérifiez votre recherche ou ajoutez un nouveau patient.</p>
                   </div>
               )}
           </div>

        </div>
      </div>

      {/* MODAL AJOUT PATIENT */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal-content form-card" onClick={e => e.stopPropagation()}>
                <div style={{ textAlign: "center", fontSize: "30px", color: "#137FEC", marginBottom: "10px" }}>
                   <i className="fa-solid fa-user-plus"></i>
                </div>
                <h2 style={{textAlign: "center", color: "black", marginBottom: "25px"}}>Nouveau Patient</h2>
                
                <form className="form-container" onSubmit={handleAddPatient}>
                    <div className="champ-formulaire">
                        <label>NOM COMPLET</label>
                        <div className="input-icon">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" placeholder="Ex: Jean Dupont" value={newPatient.nom} onChange={e => setNewPatient({...newPatient, nom: e.target.value})} required autoFocus />
                        </div>
                    </div>

                    <div className="ligne-horizontale">
                        <div className="champ-formulaire">
                            <label>SEXE</label>
                            <div className="input-icon" style={{padding: 0}}>
                                <select className="custom-sel" value={newPatient.sexe} onChange={e => setNewPatient({...newPatient, sexe: e.target.value})} required>
                                    <option value="M">Masculin</option>
                                    <option value="F">Féminin</option>
                                </select>
                            </div>
                        </div>
                        <div className="champ-formulaire">
                            <label>ÂGE</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-cake-candles"></i>
                                <input type="number" placeholder="Ex: 34" value={newPatient.age} onChange={e => setNewPatient({...newPatient, age: e.target.value})} required />
                            </div>
                        </div>
                    </div>

                    <div className="champ-formulaire">
                        <label>TÉLÉPHONE</label>
                        <div className="input-icon">
                            <i className="fa-solid fa-phone"></i>
                            <input type="text" placeholder="Ex: 05 55 12 34 56" value={newPatient.telephone} onChange={e => setNewPatient({...newPatient, telephone: e.target.value})} required />
                        </div>
                    </div>

                    <div className="boite-securite" style={{marginTop:"15px", marginBottom:"5px"}}>
                        <i className="fa-solid fa-shield-halved"></i>
                        <p>Ces données de contact resteront entièrement privées.</p>
                    </div>

                    <div className="ligne-horizontale" style={{marginTop:"10px"}}>
                        <button type="button" className="voir-btn" onClick={() => setShowAddModal(false)}>Annuler</button>
                        <button type="submit" className="FIN" style={{marginTop:"0"}}>Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
};

export default PatientsPage;
