import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PatientOverview() {
  const navigate = useNavigate();

  // Timer de livraison (en secondes)
  const [deliveryTime, setDeliveryTime] = useState(5400); // 1h30 exemple

  useEffect(() => {
    if (deliveryTime > 0) {
      const interval = setInterval(() => {
        setDeliveryTime(t => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [deliveryTime]);

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + 'h ' : ''}${String(m).padStart(2, '0')}min ${String(s).padStart(2, '0')}s`;
  }

  // Données fictives
  const ordonnances = [
    { id: 1, nom: 'Metformine 500mg', medecin: 'Dr. Benali', date: '15 mars 2026', statut: 'active' },
    { id: 2, nom: 'Amlodipine 5mg', medecin: 'Dr. Benali', date: '01 mars 2026', statut: 'expire' },
    { id: 3, nom: 'Atorvastatine 10mg', medecin: 'Dr. Meziane', date: '10 fév 2026', statut: 'expiree' },
  ];

  const medicaments = [
    { id: 1, nom: 'Metformine 500mg', dose: '2x par jour — Matin & Soir', stock: 70, couleur: '#1e8a5e' },
    { id: 2, nom: 'Amlodipine 5mg', dose: '1x par jour — Matin', stock: 40, couleur: '#e67e22' },
    { id: 3, nom: 'Atorvastatine 10mg', dose: '1x par jour — Soir', stock: 85, couleur: '#2c6fd4' },
  ];

  const commandes = [
    { id: 1042, nb: 3, date: '17 mars 2026', statut: 'livraison' },
    { id: 1038, nb: 2, date: '10 mars 2026', statut: 'livree' },
    { id: 1031, nb: 1, date: '01 mars 2026', statut: 'livree' },
  ];

  const medecins = [
    { initiales: 'DB', nom: 'Dr. Djamel Benali', spec: 'Médecin généraliste', nbOrdo: 2 },
    { initiales: 'SM', nom: 'Dr. Sara Meziane', spec: 'Cardiologue', nbOrdo: 1 },
  ];

  const getBadge = (statut) => {
    switch(statut) {
      case 'active': return <span className="badge badge-green">Active</span>;
      case 'expire': return <span className="badge badge-orange">Expire bientôt</span>;
      case 'expiree': return <span className="badge badge-red">Expirée</span>;
      case 'livraison': return <span className="badge badge-orange">En livraison</span>;
      case 'livree': return <span className="badge badge-green">Livrée</span>;
      default: return null;
    }
  };

  return (
    <>
      <div className="alert-box">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e67e22" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <div>
          <p className="alert-title">Ordonnance bientôt expirée</p>
          <p className="alert-sub">Votre ordonnance pour Amlodipine 5mg expire dans 3 jours</p>
        </div>
      </div>

      <div className="stats">
        {[
          { label: 'Ordonnances actives', value: '3', sub: '2 en cours', subClass: 'blue', bgClass: 'icon-blue', iconColor: '#2c6fd4', icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></> },
          { label: 'Médicaments en cours', value: '5', sub: 'Tous pris aujourd\'hui', subClass: 'green', bgClass: 'icon-green', iconColor: '#1e8a5e', icon: <><rect x="3" y="8" width="18" height="8" rx="4"/><line x1="12" y1="8" x2="12" y2="16"/></> },
          { label: 'Commandes en cours', value: '1', sub: 'En livraison', subClass: 'orange', bgClass: 'icon-orange', iconColor: '#e67e22', icon: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></> },
          { label: 'Mes médecins', value: medecins.length, sub: 'Liés via ordonnances', subClass: 'blue', bgClass: 'icon-blue', iconColor: '#2c6fd4', icon: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></> },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className={`stat-icon ${s.bgClass}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={s.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
            </div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className={`stat-sub ${s.subClass}`}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Mes ordonnances</div>
            <button className="btn-voir" onClick={() => navigate('/patient/dashboard/ordonnances')}>Voir tout →</button>
          </div>
          {ordonnances.map(o => (
            <div key={o.id} className="list-item">
              <div className="item-icon icon-blue">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2c6fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                </svg>
              </div>
              <div className="item-info">
                <p className="item-name">{o.nom}</p>
                <p className="item-sub">{o.medecin} — {o.date}</p>
              </div>
              {getBadge(o.statut)}
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Médicaments en cours</div>
            <button className="btn-voir" onClick={() => navigate('/patient/dashboard/medicaments')}>Voir tout →</button>
          </div>
          {medicaments.map(m => (
            <div key={m.id} className="list-item">
              <div className="item-icon icon-orange">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e67e22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="8" width="18" height="8" rx="4"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                </svg>
              </div>
              <div className="item-info" style={{flex:1}}>
                <p className="item-name">{m.nom}</p>
                <p className="item-sub">{m.dose}</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: m.stock+'%', background: m.couleur}}></div>
                </div>
              </div>
              <span style={{fontSize:'12px', color: m.couleur, fontWeight:600}}>{m.stock}%</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Mes commandes</div>
            <button className="btn-voir" onClick={() => navigate('/patient/dashboard/commandes')}>Voir tout →</button>
          </div>
          {commandes.map(c => (
            <div key={c.id} className="list-item">
              <div className="item-icon icon-blue">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2c6fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                </svg>
              </div>
              <div className="item-info">
                <p className="item-name">Commande #{c.id}</p>
                <p className="item-sub">{c.nb} médicaments — {c.date}</p>
                {c.statut === 'livraison' && (
                  <div className="delivery-timer">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e67e22" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    Livraison dans : <strong>{formatTime(deliveryTime)}</strong>
                  </div>
                )}
              </div>
              {getBadge(c.statut)}
            </div>
          ))}
          <button className="btn-primary-sm" onClick={() => navigate('/patient/dashboard/commandes')}>+ Nouvelle commande</button>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Mes médecins</div>
            <span style={{fontSize:'12px', color:'#888'}}>Via vos ordonnances</span>
          </div>
          {medecins.map((m, i) => (
            <div key={i} className="medecin-card">
              <div className="medecin-avatar">{m.initiales}</div>
              <div className="medecin-info">
                <p className="medecin-name">{m.nom}</p>
                <p className="medecin-spec">{m.spec}</p>
                <p className="medecin-ordo">{m.nbOrdo} ordonnance{m.nbOrdo > 1 ? 's' : ''}</p>
              </div>
              <button className="btn-contact">Contacter</button>
            </div>
          ))}
          <button className="btn-renew" onClick={() => navigate('/patient/dashboard/medecins')}>Gérer mes praticiens</button>
        </div>
      </div>
    </>
  );
}

export default PatientOverview;
