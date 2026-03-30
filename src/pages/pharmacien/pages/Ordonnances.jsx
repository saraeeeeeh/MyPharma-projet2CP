import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../PharmacienDashboard.css';

const MOCK_ORDONNANCES = [
  { id: 'ORD-2023-001', pateint: 'Karim Ahmed', medecin: 'Dr. Yassine B.', date: 'Aujourd\'hui, 10:30', statut: 'En attente', items: 3 },
  { id: 'ORD-2023-002', pateint: 'Amina L.', medecin: 'Dr. Sarah K.', date: 'Aujourd\'hui, 09:15', statut: 'Validée', items: 2 },
  { id: 'ORD-2023-003', pateint: 'Omar M.', medecin: 'Dr. Farid T.', date: 'Hier, 16:45', statut: 'Préparée', items: 5 },
  { id: 'ORD-2023-004', pateint: 'Fatima Z.', medecin: 'Dr. Yassine B.', date: 'Hier, 14:20', statut: 'Livrée', items: 1 },
];

const statutColors = {
  'En attente': 'badge-orange',
  'Validée': 'badge-green', /* We can use green for Validee */
  'Préparée': 'badge-blue', /* Need to add badge-blue in css if possible or just use string */
  'Livrée': 'badge-green',
};

export default function Ordonnances() {
  const [ordonnances, setOrdonnances] = useState(MOCK_ORDONNANCES);
  const [filter, setFilter] = useState('Toutes');

  const handleValidate = (id) => {
    setOrdonnances(prev => prev.map(o => o.id === id ? { ...o, statut: 'Validée' } : o));
    toast.success(`L'ordonnance ${id} a été validée avec succès. Le stock a été mis à jour.`);
  };

  const filtered = filter === 'Toutes' ? ordonnances : ordonnances.filter(o => o.statut === filter);

  return (
    <>
      <div style={{marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <div>
          <h2 style={{fontSize: '20px', color: '#1a1a2e'}}>Ordonnances Électroniques</h2>
          <p style={{fontSize: '13px', color: '#888'}}>Gérez les prescriptions envoyées par les médecins.</p>
        </div>
        <div style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #e0e0e0', padding: '4px' }}>
          {['Toutes', 'En attente', 'Validée', 'Préparée'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px', fontSize: '13px', fontWeight: '500', borderRadius: '8px', transition: 'all 0.2s', border: 'none', cursor: 'pointer',
                backgroundColor: filter === f ? '#e8f5ee' : 'transparent',
                color: filter === f ? '#1e8a5e' : '#666',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Liste des ordonnances</div>
          <div style={{display: 'flex', gap: '10px'}}>
             <input type="text" placeholder="Rechercher..." style={{padding:'8px 12px', borderRadius:'8px', border:'1px solid #e0e0e0', outline:'none', fontSize:'13px'}} />
          </div>
        </div>

        {filtered.map((ord, idx) => (
          <div key={ord.id} className="list-item" style={{borderBottom: idx === filtered.length - 1 ? 'none' : '1px solid #f0f4f8', paddingBottom: '15px', paddingTop: '15px'}}>
            <div className="item-icon icon-blue">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2c6fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              </svg>
            </div>
            <div className="item-info">
              <p className="item-name">{ord.id} - {ord.pateint}</p>
              <p className="item-sub">{ord.medecin} — {ord.date} — {ord.items} médicaments</p>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
              <span className={`badge ${statutColors[ord.statut] || 'badge-orange'}`} style={{background: ord.statut==='Préparée'?'#e8f0fd':'', color: ord.statut==='Préparée'?'#2c6fd4':''}}>
                {ord.statut}
              </span>
              {ord.statut === 'En attente' && (
                <button 
                  onClick={() => handleValidate(ord.id)}
                  className="btn-primary-sm"
                  style={{margin: 0, padding: '6px 14px', width: 'auto'}}
                >
                  Valider
                </button>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{padding: '30px', textAlign: 'center', color: '#888', fontSize: '14px'}}>
            Aucune ordonnance trouvée.
          </div>
        )}
      </div>
    </>
  );
}
