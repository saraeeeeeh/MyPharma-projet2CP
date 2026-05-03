import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylepageprofile.css';
import './styleplanning.css';

const PlanningPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("medecinConnecte");
    return saved ? JSON.parse(saved) : { nom: "Docteur" };
  });

  const [view, setView] = useState('day'); // 'day', 'week', 'month'
  
  const todayDate = new Date();
  const todayStr = todayDate.toISOString().split('T')[0];

  const [dateAffichage, setDateAffichage] = useState(todayDate);

  const [events, setEvents] = useState([
    { id: 1, date: todayStr, time: "09:00", duration: 30, patient: "Karim Belhadj", type: "Consultation générale", color: "#22c55e" },
    { id: 2, date: todayStr, time: "10:30", duration: 30, patient: "Amina Saidi", type: "Suivi diabète", color: "#22c55e" },
    { id: 3, date: todayStr, time: "14:00", duration: 60, patient: "Sara Benmoussa", type: "Première", color: "#137FEC" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ date: todayStr, time: "08:00", duration: 30, patient: "", type: "Consultation", color: "#137FEC" });
  const [selectedEventInfo, setSelectedEventInfo] = useState(null);

  const initiales = (data.nom || "Docteur").replace(/dr\./gi, "").trim().split(" ").filter(w=>w.length>0).map(w=>w[0]).join("").slice(0,2).toUpperCase() || "DR";

  const handleDeconnexion = () => {
    window.localStorage.removeItem("medecinConnecte");
    setData(null);
    navigate("/connect");
  };

  const navItems = [
    { icon: "fa-house",          label: "Tableau de bord",  path: "/profil" },
    { icon: "fa-calendar-days",  label: "Planning",          path: "/planning", active: true },
    { icon: "fa-users",          label: "Mes patients",      path: "/patients" },
    { icon: "fa-file-medical",   label: "Mes ordonnances",   path: "/ordonnances" },
    { icon: "fa-envelope",       label: "Messagerie",        path: "/messagerie" },
    { icon: "fa-gear",           label: "Paramètres",        path: "/parametres" },
  ];

  const deleteEvent = (id) => {
    if(window.confirm("Voulez-vous vraiment supprimer ce rendez-vous ?")) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const addEvent = (e) => {
    e.preventDefault();
    if(!newEvent.patient || !newEvent.time) return;
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    setShowModal(false);
    setNewEvent({ ...newEvent, patient: "", time: "08:00" }); 
  };

  const changerDate = (delta) => {
    const nd = new Date(dateAffichage);
    if(view === 'day') nd.setDate(nd.getDate() + delta);
    else if(view === 'week') nd.setDate(nd.getDate() + (delta * 7));
    else if(view === 'month') nd.setMonth(nd.getMonth() + delta);
    setDateAffichage(nd);
  };

  const timeToPixels = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return Math.max(0, ((h - 8) * 80) + ((m / 60) * 80));
  };
  
  const heightFromDuration = (durationMins) => (durationMins / 60) * 80;

  const getDatesDeLaSemaine = (currentDate) => {
    const week = [];
    const date = new Date(currentDate);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    date.setDate(diff);
    for (let i = 0; i < 7; i++) {
      week.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return week;
  };
  
  const getDatesDuMois = (currentDate) => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const lastDay = new Date(year, month + 1, 0);
      const days = [];
      for(let i=1; i<=lastDay.getDate(); i++) {
        days.push(new Date(year, month, i));
      }
      return days;
  };

  const openSlot = (dateStr, hour) => {
    setNewEvent({...newEvent, date: dateStr, time: hour});
    setShowModal(true);
  };

  const renderGridList = (dates) => {
    return (
      <div className={`calendar-card mode-${view}`}>
         <div className="time-col">
            {['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'].map(t => (
              <div key={t} className="time-slot">{t}</div>
            ))}
          </div>
          <div className="days-wrapper">
             {dates.map((dateObj, i) => {
                const dateStr = dateObj.toISOString().split('T')[0];
                const dayEvents = events.filter(e => e.date === dateStr);
                const isSelectedDay = dateObj.getDate() === todayDate.getDate() && dateObj.getMonth() === todayDate.getMonth();
                const dayLabel = view === 'day' 
                    ? dateObj.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
                    : dateObj.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });

                return (
                  <div key={i} className={`day-col ${isSelectedDay ? 'today' : ''}`}>
                     <div className="day-header">{dayLabel}</div>
                     <div className="day-grid">
                        {['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'].map(t => (
                            <div key={t} className="grid-cell" onClick={() => openSlot(dateStr, t)}>
                                <div className="grid-line-inner"></div>
                            </div>
                        ))}
                        {dayEvents.map(ev => {
                            const top = timeToPixels(ev.time);
                            const height = heightFromDuration(ev.duration);
                            return (
                            <div key={ev.id} className="event-item" style={{ top: `${top}px`, height: `${height}px`, borderLeftColor: ev.color }} onClick={(e) => { e.stopPropagation(); setSelectedEventInfo(ev); }}>
                                <div className="ev-header">
                                    <span className="ev-time">{ev.time}</span>
                                    <span className="ev-del" onClick={(e) => { e.stopPropagation(); deleteEvent(ev.id); }} title="Supprimer"><i className="fa-solid fa-trash"></i></span>
                                </div>
                                <div className="ev-title">{ev.patient}</div>
                                {height > 50 && <div className="ev-sub">{ev.type}</div>}
                            </div>
                            );
                        })}
                     </div>
                  </div>
                );
             })}
          </div>
      </div>
    );
  };

  const renderMonth = () => {
     const days = getDatesDuMois(dateAffichage);
     return (
       <div className="calendar-card month-mode">
          <div className="month-grid">
             {['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].map(day => <div key={day} className="m-header">{day}</div>)}
             
             {Array.from({length: (new Date(dateAffichage.getFullYear(), dateAffichage.getMonth(), 1).getDay() || 7) - 1 }).map((_, i) => (
                 <div key={`empty-${i}`} className="m-cell empty"></div>
             ))}

             {days.map(d => {
                 const dateStr = d.toISOString().split('T')[0];
                 const dayEvents = events.filter(e => e.date === dateStr);
                 return (
                     <div key={d.getDate()} className="m-cell" onClick={() => { 
                         setView('day'); 
                         setDateAffichage(d); 
                     }}>
                         <div className="m-date">{d.getDate()}</div>
                         <div className="m-events">
                             {dayEvents.slice(0,3).map(ev => (
                                 <div key={ev.id} className="m-badge" style={{backgroundColor: ev.color}} onClick={(e) => { e.stopPropagation(); setSelectedEventInfo(ev); }}>
                                     {ev.time} {ev.patient}
                                 </div>
                             ))}
                             {dayEvents.length > 3 && <div className="m-more">+{dayEvents.length - 3}</div>}
                         </div>
                     </div>
                 );
             })}
          </div>
       </div>
     );
  };

  const getCurrentDisplayTitle = () => {
      if(view === 'day') return dateAffichage.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      if(view === 'week') return "Semaine du " + getDatesDeLaSemaine(dateAffichage)[0].toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
      return dateAffichage.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
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
            <h2>Mon Planning</h2>
            <p>{todayDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
          <div className="topbar-right">
            <button className="edit-btn" onClick={() => setShowModal(true)}>+ Nouveau RDV</button>
            <div className="notif-btn" onClick={() => navigate("/ordonnances")}>
              <i className="fa-solid fa-bell"></i>
              <span className="notif-dot"></span>
            </div>
            <div className="av-small">{initiales}</div>
          </div>
        </div>

        <div className="page-content planning-content">
          <div className="planning-header hero-card">
            <div className="planning-nav">
              <button className="p-btn" onClick={() => changerDate(-1)}><i className="fa-solid fa-chevron-left"></i></button>
              <h3 style={{textTransform:'capitalize'}}>{getCurrentDisplayTitle()}</h3>
              <button className="p-btn" onClick={() => changerDate(1)}><i className="fa-solid fa-chevron-right"></i></button>
            </div>
            
            <div className="planning-filters">
              <button className={`filter-btn ${view==='day'?'active':''}`} onClick={()=>setView('day')}>Jour</button>
              <button className={`filter-btn ${view==='week'?'active':''}`} onClick={()=>setView('week')}>Semaine</button>
              <button className={`filter-btn ${view==='month'?'active':''}`} onClick={()=>setView('month')}>Mois</button>
            </div>
          </div>

          {view === 'day' && renderGridList([dateAffichage])}
          {view === 'week' && renderGridList(getDatesDeLaSemaine(dateAffichage))}
          {view === 'month' && renderMonth()}

        </div>
      </div>

      {/* MODAL AJOUT RDV */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content form-card" onClick={e => e.stopPropagation()}>
                <div style={{ textAlign: "center", fontSize: "30px", color: "#137FEC", marginBottom: "10px" }}>
                   <i className="fa-solid fa-calendar-plus"></i>
                </div>
                <h2 style={{textAlign: "center", color: "black", marginBottom: "25px"}}>Ajouter un Rendez-vous</h2>
                
                <form className="form-container" onSubmit={addEvent}>
                    <div className="champ-formulaire">
                        <label>NOM DU PATIENT</label>
                        <div className="input-icon">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" placeholder="Ex: Jean Dupont" value={newEvent.patient} onChange={e => setNewEvent({...newEvent, patient: e.target.value})} required autoFocus />
                        </div>
                    </div>

                    <div className="ligne-horizontale">
                        <div className="champ-formulaire">
                            <label>DATE</label>
                            <input type="date" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} required className="date-inp" />
                        </div>
                        <div className="champ-formulaire">
                            <label>HEURE</label>
                            <input type="time" value={newEvent.time} onChange={e => setNewEvent({...newEvent, time: e.target.value})} required className="date-inp" />
                        </div>
                    </div>

                    <div className="ligne-horizontale">
                        <div className="champ-formulaire">
                            <label>MOTIF</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-stethoscope"></i>
                                <input type="text" placeholder="Consultation..." value={newEvent.type} onChange={e => setNewEvent({...newEvent, type: e.target.value})} required />
                            </div>
                        </div>
                        <div className="champ-formulaire">
                            <label>DURÉE (min)</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-clock"></i>
                                <input type="number" min="15" step="15" value={newEvent.duration} onChange={e => setNewEvent({...newEvent, duration: parseInt(e.target.value)})} required />
                            </div>
                        </div>
                    </div>

                    <div className="boite-securite" style={{marginTop:"15px", marginBottom:"5px"}}>
                        <i className="fa-solid fa-info-circle"></i>
                        <p>Ce créneau sera immédiatement bloqué et synchronisé.</p>
                    </div>

                    <div className="ligne-horizontale" style={{marginTop:"10px"}}>
                        <button type="button" className="voir-btn" onClick={() => setShowModal(false)}>Annuler</button>
                        <button type="submit" className="FIN" style={{marginTop:"0"}}>Créer le RDV</button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* MODAL INFO RDV */}
      {selectedEventInfo && (
        <div className="modal-overlay" onClick={() => setSelectedEventInfo(null)}>
            <div className="modal-content form-card" style={{maxWidth: "400px"}} onClick={e => e.stopPropagation()}>
                <div style={{ textAlign: "center", fontSize: "30px", color: selectedEventInfo.color, marginBottom: "15px" }}>
                   <i className="fa-solid fa-address-card"></i>
                </div>
                <h2 style={{textAlign: "center", color: "black", marginBottom: "5px"}}>{selectedEventInfo.patient}</h2>
                <p style={{textAlign: "center", color: "#666", marginBottom: "25px", fontWeight: "600"}}>{selectedEventInfo.type}</p>
                
                <div className="info-row" style={{borderBottom: "1px dashed #d1d5db", padding: "10px 0"}}>
                    <span className="il">Date</span>
                    <span className="iv" style={{background: "transparent", padding: 0, boxShadow: "none", fontSize: "14px"}}>{new Date(selectedEventInfo.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                </div>
                <div className="info-row" style={{borderBottom: "1px dashed #d1d5db", padding: "10px 0"}}>
                    <span className="il">Heure</span>
                    <span className="iv" style={{background: "transparent", padding: 0, boxShadow: "none", fontSize: "14px"}}>{selectedEventInfo.time}</span>
                </div>
                <div className="info-row" style={{padding: "10px 0"}}>
                    <span className="il">Durée</span>
                    <span className="iv" style={{background: "transparent", padding: 0, boxShadow: "none", fontSize: "14px"}}>{selectedEventInfo.duration} minutes</span>
                </div>

                <div className="ligne-horizontale" style={{marginTop:"30px"}}>
                     <button className="FIN" style={{backgroundColor: "#dc2626", color: "white"}} onClick={(e) => { 
                         deleteEvent(selectedEventInfo.id); 
                         setSelectedEventInfo(null);
                     }} onMouseOver={e=>e.currentTarget.style.backgroundColor="#b91c1c"} onMouseOut={e=>e.currentTarget.style.backgroundColor="#dc2626"}>
                        <i className="fa-solid fa-trash" style={{marginRight: "8px"}}></i> Supprimer
                     </button>
                     <button className="voir-btn" onClick={() => setSelectedEventInfo(null)}>Fermer</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default PlanningPage;
