import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylepageprofile.css';
import './stylemessagerie.css';

const MessageriePage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(() => {
    let combined = { nom: "Dr. Jean Dupont", specialite: "Médecine Générale" };
    try {
        const saved = localStorage.getItem("medecinConnecte");
        if (saved) combined = { ...combined, ...JSON.parse(saved) };
    } catch(e) {}
    return combined;
  });

  const initiales = (data.nom || "Docteur").replace(/dr\./gi, "").trim().split(" ").filter(w=>w.length>0).map(w=>w[0]).join("").slice(0,2).toUpperCase() || "DR";

  const navItems = [
    { icon: "fa-house",          label: "Tableau de bord",  path: "/profil" },
    { icon: "fa-calendar-days",  label: "Planning",          path: "/planning" },
    { icon: "fa-users",          label: "Mes patients",      path: "/patients" },
    { icon: "fa-file-medical",   label: "Mes ordonnances",   path: "/ordonnances" },
    { icon: "fa-star",           label: "Avis Patients",     path: "/avis" },
    { icon: "fa-envelope",       label: "Messagerie",        path: "/messagerie", active: true },
    { icon: "fa-gear",           label: "Paramètres",        path: "/parametres" }
  ];

  const handleDeconnexion = () => {
    window.localStorage.removeItem("medecinConnecte");
    setData(null);
    navigate("/connect");
  };

  const [activeFolder, setActiveFolder] = useState('inbox'); // 'inbox' ou 'sent'

  // Mock data des emails
  const [emails, setEmails] = useState([
      { id: 1, type: "inbox", sender: "Karim Belhadj", email: "k.belhadj@patient.dz", subject: "Question sur mon traitement", snippet: "Bonjour Docteur, j'espère que vous allez bien. Suite à...", body: "Bonjour Docteur,\n\nJ'espère que vous allez bien. Suite à notre consultation de mercredi, j'ai commencé le nouveau traitement. Cependant, je ressens de légers maux de tête depuis hier soir. Est-ce un effet secondaire normal ou dois-je arrêter la prise ?\n\nMerci d'avance pour votre retour.\n\nCordialement,\nKarim Belhadj", date: "10:30", unread: true },
      { id: 2, type: "inbox", sender: "Amina Saidi", email: "amina.s@patient.dz", subject: "Demande de renouvellement", snippet: "Bonjour, pourriez-vous renouveler mon ordonnance p...", body: "Bonjour Docteur,\n\nPourriez-vous renouveler mon ordonnance pour mon traitement habituel s'il vous plaît ? Je n'en ai plus que pour 3 jours.\n\nBien à vous,\nAmina Saidi", date: "Hier", unread: false },
      { id: 3, type: "inbox", sender: "Laboratoire BioTest", email: "contact@biotest.dz", subject: "Résultats d'analyses - Patient Y. Merbah", snippet: "Veuillez trouver ci-joint les résultats des analyses d...", body: "Cher Confrère,\n\nVeuillez trouver ci-joint les résultats des analyses sanguines demandées pour votre patient Y. Merbah.\n\nCordialement,\nLe Laboratoire BioTest", date: "28/03", unread: false },
      { id: 4, type: "sent", sender: "Moi", email: data.email || "docteur@mypharma.dz", recipient: "sami.b@patient.dz", subject: "Compte-rendu de consultation", snippet: "Bonjour Sami, voici le compte-rendu suite à votre p...", body: "Bonjour Sami,\n\nVoici le compte-rendu suite à votre passage au cabinet hier. N'oubliez pas les examens complémentaires à faire avant notre prochain rendez-vous.\n\nBien cordialement,\nDr. " + (data.nom || "Dupont"), date: "25/03", unread: false },
  ]);

  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [isComposing, setIsComposing] = useState(false);
  const [composeData, setComposeData] = useState({ to: "", subject: "", text: "" });

  const filteredEmails = emails.filter(e => e.type === activeFolder);
  const selectedEmail = emails.find(e => e.id === selectedEmailId);

  const handleSelectEmail = (email) => {
      setSelectedEmailId(email.id);
      if(email.unread) {
          setEmails(emails.map(e => e.id === email.id ? { ...e, unread: false } : e));
      }
  };

  const handleSendEmail = (e) => {
      e.preventDefault();
      if(!composeData.to || !composeData.subject) {
          alert("Veuillez remplir le destinataire et le sujet.");
          return;
      }

      // Construction du lien `mailto:` dynamique pour ouvrir l'outil d'email du praticien
      const mailtoLink = `mailto:${composeData.to}?subject=${encodeURIComponent(composeData.subject)}&body=${encodeURIComponent(composeData.text)}`;
      
      // Ouvrir la boîte mail sur le PC du médecin pour finaliser l'envoi réel
      window.location.href = mailtoLink;

      // Historique simulé local
      const newEmail = {
          id: Date.now(),
          type: "sent",
          sender: "Moi",
          email: data.email || "docteur@mypharma.dz",
          recipient: composeData.to,
          subject: composeData.subject,
          snippet: composeData.text.substring(0, 40) + "...",
          body: composeData.text,
          date: "À l'instant",
          unread: false
      };
      
      setEmails([newEmail, ...emails]);
      setIsComposing(false);
      setComposeData({ to: "", subject: "", text: "" });
      setActiveFolder("sent");
      setSelectedEmailId(newEmail.id);
  };

  const openReply = () => {
      if (!selectedEmail) return;
      
      const replySubject = selectedEmail.subject.startsWith("Re:") ? selectedEmail.subject : "Re: " + selectedEmail.subject;
      const originalText = `\n\n\n------------------------------\nLe ${selectedEmail.date}, ${selectedEmail.sender} a écrit:\n${selectedEmail.body}`;
      
      setComposeData({ 
          to: selectedEmail.type === "sent" ? selectedEmail.recipient : selectedEmail.email, 
          subject: replySubject, 
          text: originalText 
      });
      setIsComposing(true);
  };

  const unreadCount = emails.filter(e => e.type === "inbox" && e.unread).length;

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
              {item.path === "/messagerie" && unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
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
             <h2 style={{fontSize:"24px", color:"#1e293b", fontWeight:"bold"}}>Messagerie</h2>
             <p style={{color:"#64748b", margin:0}}>Gérez vos communications sécurisées</p>
          </div>
          <div className="topbar-right">
            <div className="notif-btn" onClick={() => navigate("/ordonnances")}>
               <i className="fa-solid fa-bell"></i>
               {unreadCount > 0 && <span className="notif-dot"></span>}
            </div>
            <div className="av-small">{initiales}</div>
          </div>
        </div>

        <div className="msg-layout-container">
            {/* Colonne 1 : Navigation Dossiers */}
            <div className="msg-folders-col">
                <button className="btn-new-msg" onClick={() => setIsComposing(true)}>
                    <i className="fa-solid fa-pen"></i> Nouveau Message
                </button>
                <div className={`folder-item ${activeFolder === 'inbox' ? 'active' : ''}`} onClick={() => {setActiveFolder('inbox'); setSelectedEmailId(null);}}>
                    <i className="fa-solid fa-inbox"></i> Boîte de réception
                    {unreadCount > 0 && <span className="badge-count">{unreadCount}</span>}
                </div>
                <div className={`folder-item ${activeFolder === 'sent' ? 'active' : ''}`} onClick={() => {setActiveFolder('sent'); setSelectedEmailId(null);}}>
                    <i className="fa-regular fa-paper-plane"></i> Messages envoyés
                </div>
                <div className="folder-item">
                    <i className="fa-regular fa-star"></i> Importants
                </div>
                <div className="folder-item">
                    <i className="fa-solid fa-box-archive"></i> Archives
                </div>
                <div className="folder-item" style={{opacity: 0.6}}>
                    <i className="fa-regular fa-trash-can"></i> Corbeille
                </div>
            </div>

            {/* Colonne 2 : Liste des Mails */}
            <div className="msg-list-col">
                <input type="text" className="msg-search-bar" placeholder="Rechercher un message, un patient..." />
                
                <div className="email-scroll-list">
                    {filteredEmails.length === 0 && (
                        <div style={{textAlign: "center", padding:"30px", color:"#94a3b8"}}>Dossier vide.</div>
                    )}
                    {filteredEmails.map(email => (
                        <div key={email.id} 
                             className={`email-item ${email.unread ? 'unread' : 'read'} ${selectedEmailId === email.id ? 'selected' : ''}`}
                             onClick={() => handleSelectEmail(email)}>
                            <div className="email-header-preview">
                                <span className="email-sender">{email.type === "sent" ? "À: " + email.recipient : email.sender}</span>
                                <span className="email-time" style={{fontWeight: email.unread ? "bold" : "normal"}}>{email.date}</span>
                            </div>
                            <div className="email-subject" style={{color: email.unread ? "#1e293b" : "#64748b"}}>{email.subject}</div>
                            <div className="email-snippet">{email.snippet}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Colonne 3 : Lecture de l'Email */}
            <div className="msg-viewer-col">
                {selectedEmail ? (
                    <>
                        <div className="viewer-header">
                            <h2 className="v-subject">{selectedEmail.subject}</h2>
                            <div className="v-sender-block">
                                <div className="sender-info-flex">
                                    <div className="v-avatar">
                                        {selectedEmail.sender[0]}
                                    </div>
                                    <div className="v-name">
                                        <span className="v-real-name">{selectedEmail.sender}</span>
                                        <span className="v-email-address">&lt;{selectedEmail.email}&gt; {selectedEmail.type==="sent" && `➜ À : ${selectedEmail.recipient}`}</span>
                                    </div>
                                </div>
                                <div className="v-date">{selectedEmail.date} <i className="fa-solid fa-reply" style={{marginLeft:"15px", color:"#137FEC", cursor:"pointer"}}></i></div>
                            </div>
                        </div>
                        <div className="v-body" style={{whiteSpace: "pre-wrap"}}>
                            {selectedEmail.body}
                        </div>
                        <div className="v-actions">
                            <button className="btn-reply" onClick={openReply}><i className="fa-solid fa-reply"></i> Répondre</button>
                            {selectedEmail.type === "inbox" && (
                                <button className="btn-reply" style={{backgroundColor:"transparent", border:"1px solid transparent", color:"#137FEC"}}><i className="fa-solid fa-file-medical"></i> Joindre Ordonnance</button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="viewer-empty">
                        <i className="fa-regular fa-envelope-open"></i>
                        <h3>Aucun message sélectionné</h3>
                        <p>Sélectionnez un email dans la liste pour le lire.</p>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* POPUP NOUVEAU MESSAGE (GMAIL STYLE) */}
      {isComposing && (
          <div className="compose-popup">
              <div className="compose-header">
                  <span>Nouveau Message</span>
                  <div className="compose-header-actions">
                      <i className="fa-solid fa-minus"></i>
                      <i className="fa-solid fa-up-right-and-down-left-from-center" style={{fontSize:"12px"}}></i>
                      <i className="fa-solid fa-xmark" onClick={() => setIsComposing(false)}></i>
                  </div>
              </div>
              
              <div className="compose-body">
                  <div className="c-input-group">
                      <span className="c-label">À</span>
                      <input type="email" className="c-input" placeholder="Email du patient ou confrère" 
                             value={composeData.to} onChange={e => setComposeData({...composeData, to: e.target.value})} autoFocus />
                  </div>
                  <div className="c-input-group">
                      <span className="c-label">Objet</span>
                      <input type="text" className="c-input" placeholder="Sujet de votre message" 
                             value={composeData.subject} onChange={e => setComposeData({...composeData, subject: e.target.value})} />
                  </div>
                  <textarea className="c-textarea" placeholder="Rédigez votre message ici..."
                            value={composeData.text} onChange={e => setComposeData({...composeData, text: e.target.value})}></textarea>
              </div>

              <div className="compose-footer">
                  <button className="btn-send" onClick={handleSendEmail}>Envoyer <i className="fa-regular fa-paper-plane"></i></button>
                  <div className="c-toolbar">
                      <i className="fa-solid fa-font"></i>
                      <i className="fa-solid fa-paperclip"></i>
                      <i className="fa-regular fa-face-smile"></i>
                      <i className="fa-regular fa-file-pdf"></i>
                      <i className="fa-regular fa-trash-can" style={{marginLeft:"20px", color:"#dc2626"}} onClick={() => setIsComposing(false)}></i>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default MessageriePage;
