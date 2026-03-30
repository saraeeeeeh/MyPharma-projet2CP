import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../PharmacienDashboard.css';

const MOCK_COMMANDES = [
  { id: 'CMD-001', pateint: 'Karim Ahmed', type: 'Retrait en pharmacie', paiement: 'Sur place', date: 'il y a 2h', statut: 'En préparation', articles: 3 },
  { id: 'CMD-002', pateint: 'Fatima Z.', type: 'Livraison à domicile', paiement: 'En ligne (Payé)', date: 'il y a 3h', statut: 'Prête pour livraison', articles: 1 },
  { id: 'CMD-003', pateint: 'Omar M.', type: 'Retrait en pharmacie', paiement: 'En ligne (Payé)', date: 'Hier', statut: 'Terminée', articles: 2 },
];

const statutColors = {
  'En préparation': 'badge-orange',
  'Prête pour livraison': 'badge-blue',
  'Terminée': 'badge-green',
};

export default function Commandes() {
  const [commandes, setCommandes] = useState(MOCK_COMMANDES);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const markReady = (id, type) => {
    const newStatut = type === 'Livraison à domicile' ? 'Prête pour livraison' : 'Terminée';
    setCommandes(prev => prev.map(c => c.id === id ? { ...c, statut: newStatut } : c));
    toast.success(`La commande ${id} a été marquée comme prête.`);
  };

  const markDelivered = (id) => {
    setCommandes(prev => prev.map(c => c.id === id ? { ...c, statut: 'Terminée' } : c));
    toast.success(`La livraison de la commande ${id} a été confirmée.`);
  };

  return (
    <>
      <div style={{marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', color: '#1a1a2e'}}>Commandes Patients</h2>
        <p style={{fontSize: '13px', color: '#888'}}>Gérez les achats en ligne (avec ou sans ordonnance).</p>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Liste des commandes</div>
          <div style={{display: 'flex', gap: '10px'}}>
             <input type="text" placeholder="Rechercher..." style={{padding:'8px 12px', borderRadius:'8px', border:'1px solid #e0e0e0', outline:'none', fontSize:'13px'}} />
          </div>
        </div>

        {commandes.map((cmd, idx) => (
          <div key={cmd.id} className="list-item" style={{borderBottom: idx === commandes.length - 1 ? 'none' : '1px solid #f0f4f8', paddingBottom: '15px', paddingTop: '15px'}}>
            <div className={`item-icon ${cmd.type.includes('Livraison') ? 'icon-blue' : 'icon-green'}`}>
              {cmd.type.includes('Livraison') ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2c6fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 18H3a2 2 0 01-2-2V6a2 2 0 012-2h3"/>
                  <polyline points="21 16 21 12 16 12 14 6 8 6 8 18 10 18"/>
                  <circle cx="12" cy="18" r="2"/><circle cx="19" cy="18" r="2"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e8a5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              )}
            </div>
            
            <div className="item-info">
              <p className="item-name">{cmd.id} - {cmd.pateint}</p>
              <p className="item-sub">
                {cmd.type} — {cmd.paiement} — {cmd.date} — {cmd.articles} article(s)
              </p>
            </div>
            
            <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
              <span className={`badge ${statutColors[cmd.statut] || 'badge-orange'}`} style={{background: cmd.statut==='Prête pour livraison'?'#e8f0fd':'', color: cmd.statut==='Prête pour livraison'?'#2c6fd4':''}}>
                {cmd.statut}
              </span>

              {cmd.statut === 'En préparation' && (
                <button 
                  onClick={() => setSelectedOrder(cmd)}
                  className="btn-primary-sm"
                  style={{margin: 0, padding: '6px 14px', width: 'auto'}}
                >
                  Préparer
                </button>
              )}
              {cmd.statut === 'Prête pour livraison' && (
                <button 
                  onClick={() => markDelivered(cmd.id)}
                  className="btn-primary-sm"
                  style={{margin: 0, padding: '6px 14px', width: 'auto', background: '#2c6fd4'}}
                >
                  Livrer
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div className="card" style={{width: '90%', maxWidth: '500px', padding: '24px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h3 style={{fontSize: '18px', color: '#1a1a2e'}}>Préparation de la {selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} style={{background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#888'}}>✕</button>
            </div>
            
            <div style={{backgroundColor: '#f8fbff', padding: '15px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #e8f0fd'}}>
              <p style={{fontSize: '13px', color: '#888'}}>Patient</p>
              <p style={{fontSize: '16px', fontWeight: '700', color: '#1a1a2e'}}>{selectedOrder.pateint}</p>
              <p style={{fontSize: '13px', color: '#2c6fd4', marginTop: '5px', fontWeight: '500'}}>{selectedOrder.articles} articles à préparer</p>
            </div>

            <div style={{display: 'flex', gap: '15px', marginBottom: '20px'}}>
               <div style={{flex: 1, padding: '12px', border: '1px solid #e0e0e0', borderRadius: '10px'}}>
                 <p style={{fontSize: '12px', color: '#888', fontWeight: '600', marginBottom: '4px'}}>RÉCEPTION</p>
                 <p style={{fontSize: '13px', color: '#1a1a2e'}}>{selectedOrder.type}</p>
               </div>
               <div style={{flex: 1, padding: '12px', border: '1px solid #e0e0e0', borderRadius: '10px'}}>
                 <p style={{fontSize: '12px', color: '#888', fontWeight: '600', marginBottom: '4px'}}>PAIEMENT</p>
                 <p style={{fontSize: '13px', color: '#1a1a2e'}}>{selectedOrder.paiement}</p>
               </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #eee', paddingTop: '20px'}}>
              <button type="button" onClick={() => setSelectedOrder(null)} style={{background: 'white', border: '1px solid #ccc', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500'}}>
                Annuler
              </button>
              <button 
                onClick={() => {
                  markReady(selectedOrder.id, selectedOrder.type);
                  setSelectedOrder(null);
                }} 
                className="btn-primary-sm"
                style={{margin: 0, width: 'auto'}}
              >
                Marquer comme prête
              </button>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}
