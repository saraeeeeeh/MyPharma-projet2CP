import React, { useState } from 'react';

function PatientMedicaments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMedoc, setNewMedoc] = useState({ nom: '', type: 'Comprimé', dose: '' });

  const [medicamentsList, setMedicamentsList] = useState([
    { id: '1', nom: 'Metformine 500mg', type: 'Comprimé', dose: '2x par jour — Matin & Soir', freq: 'Quotidien', prochaînePrise: '19:00', stock: 70, prescrit: true, couleur: '#1e8a5e' },
    { id: '2', nom: 'Amlodipine 5mg', type: 'Gélule', dose: '1x par jour — Matin', freq: 'Quotidien', prochaînePrise: '08:00', stock: 40, prescrit: true, couleur: '#e67e22' },
    { id: '3', nom: 'Doliprane 1000mg', type: 'Comprimé effervescent', dose: 'Au besoin', freq: 'Occasionnel', prochaînePrise: 'N/A', stock: 95, prescrit: false, couleur: '#2c6fd4' },
    { id: '4', nom: 'Ventoline 100µg', type: 'Inhalateur', dose: 'Au besoin (2 bouffées)', freq: 'Occasionnel', prochaînePrise: 'N/A', stock: 20, prescrit: true, couleur: '#e74c3c' },
  ]);

  const handleAddMedoc = (e) => {
    e.preventDefault();
    if (!newMedoc.nom) return;
    
    const newEntry = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      nom: newMedoc.nom,
      type: newMedoc.type,
      dose: newMedoc.dose || 'Selon besoin',
      freq: 'Auto-médication',
      prochaînePrise: 'N/A',
      stock: 100,
      prescrit: false,
      couleur: '#8e44ad'
    };
    
    setMedicamentsList([newEntry, ...medicamentsList]);
    setIsModalOpen(false);
    setNewMedoc({ nom: '', type: 'Comprimé', dose: '' });
  };

  return (
    <div className="fade-in" style={{ width: '100%' }}>
      <div className="page-header">
        <h2 className="page-title">Mes Médicaments et Traitements</h2>
        <button className="btn-primary-sm flex-gap-8" onClick={() => setIsModalOpen(true)} style={{ width: 'auto', padding: '12px 20px', borderRadius: '12px', fontSize: '14px', margin: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Déclarer un auto-traitement
        </button>
      </div>

      <div className="grid-cards" style={{ width: '100%' }}>
        {medicamentsList.map(med => (
          <div key={med.id} className="card med-card" style={{ borderTop: `4px solid ${med.couleur}`, width: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
            <div className="flex-between-start margin-b-15">
              <div className="flex-gap-15">
                <div style={{ backgroundColor: `${med.couleur}15`, padding: '12px', borderRadius: '12px', color: med.couleur }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="8" width="18" height="8" rx="4"/><line x1="12" y1="8" x2="12" y2="16"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-md-dark margin-b-15" style={{ fontSize: '18px', marginBottom: '5px' }}>{med.nom}</h3>
                  <p className="text-sm-gray">{med.type}</p>
                </div>
              </div>
              {!med.prescrit && (
                <span className="badge badge-gray" style={{ fontSize: '11px', padding: '4px 8px' }}>Auto-médication</span>
              )}
            </div>

            <div className="med-info-box">
              <div className="grid-2col">
                <div>
                  <p className="text-sm-gray">Posologie</p>
                  <p className="text-md-dark">{med.dose}</p>
                </div>
                <div>
                  <p className="text-sm-gray">Fréquence</p>
                  <p className="text-md-dark">{med.freq}</p>
                </div>
                {med.prochaînePrise !== 'N/A' && (
                  <div style={{ gridColumn: '1 / -1', marginTop: '5px' }}>
                    <p className="text-sm-gray">Prochaine prise (Rappel)</p>
                    <div className="flex-gap-8">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2c6fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <span style={{ fontSize: '14px', color: '#2c6fd4', fontWeight: 600 }}>Aujourd'hui à {med.prochaînePrise}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex-between-baseline margin-b-15" style={{ marginBottom: '5px' }}>
                <p className="text-sm-gray">Stock estimé à domicile</p>
                <div className="flex-align-center text-md-dark">
                  <span style={{ fontSize: '16px', color: med.couleur, fontWeight: 700 }}>{med.stock}%</span>
                </div>
              </div>
              <div className="progress-bar margin-b-15">
                <div className="progress-fill" style={{ width: `${med.stock}%`, background: med.couleur }}></div>
              </div>
              
              <div className="flex-gap-10">
                <button className={med.stock < 30 ? "btn-primary-sm" : "btn-outline"} style={{ flex: 1, margin: 0 }}>
                  {med.stock < 30 ? 'Commander (Stock faible)' : 'Renouveler'}
                </button>
                <button className="btn-icon" title="Historique des prises">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'auto-traitement */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '500px', padding: '32px', borderRadius: '24px', backgroundColor: 'white', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '24px', margin: 0, color: '#1a1a2e' }}>Déclarer un traitement</h3>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }} onClick={() => setIsModalOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '28px', lineHeight: '1.5' }}>
              Ajoutez un médicament pris sans ordonnance (auto-médication) pour l'inclure dans votre suivi médical.
            </p>
            
            <form onSubmit={handleAddMedoc}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Nom du médicament <span style={{color: '#e74c3c'}}>*</span></label>
                <input 
                  type="text" 
                  value={newMedoc.nom}
                  onChange={e => setNewMedoc({...newMedoc, nom: e.target.value})}
                  placeholder="Ex: Paracétamol 1000mg" 
                  required
                  style={{ width: '100%', padding: '14px', border: '1.5px solid #e0e0e0', borderRadius: '12px', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Format</label>
                  <select 
                    value={newMedoc.type}
                    onChange={e => setNewMedoc({...newMedoc, type: e.target.value})}
                    style={{ width: '100%', padding: '14px', border: '1.5px solid #e0e0e0', borderRadius: '12px', fontSize: '14px', outline: 'none', backgroundColor: 'white' }}
                  >
                    <option>Comprimé</option>
                    <option>Gélule</option>
                    <option>Sirop</option>
                    <option>Pommade</option>
                    <option>Gouttes</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Posologie</label>
                  <input 
                    type="text" 
                    value={newMedoc.dose}
                    onChange={e => setNewMedoc({...newMedoc, dose: e.target.value})}
                    placeholder="Ex: 1 le matin" 
                    style={{ width: '100%', padding: '14px', border: '1.5px solid #e0e0e0', borderRadius: '12px', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', fontSize: '15px' }}>Annuler</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, margin: 0, borderRadius: '12px', fontSize: '15px', backgroundColor: !newMedoc.nom ? '#ccc' : '#1a8c7a' }} disabled={!newMedoc.nom}>Ajouter le traitement</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientMedicaments;
