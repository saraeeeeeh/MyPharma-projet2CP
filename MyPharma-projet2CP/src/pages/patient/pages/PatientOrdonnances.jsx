import React, { useState } from 'react';

function PatientOrdonnances() {
  const [filter, setFilter] = useState('toutes');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [ordonnances, setOrdonnances] = useState([
    { id: '1042', medecin: 'Dr. Djamel Benali', specialite: 'Médecin généraliste', date: '15 mars 2026', statut: 'active', medCount: 3, file: 'Ordo_DB1042.pdf' },
    { id: '1041', medecin: 'Dr. Sara Meziane', specialite: 'Cardiologue', date: '10 février 2026', statut: 'expiree', medCount: 2, file: 'Ordo_SM1041.pdf' },
    { id: '1035', medecin: 'Dr. Djamel Benali', specialite: 'Médecin généraliste', date: '01 janvier 2026', statut: 'historique', medCount: 1, file: 'Ordo_DB1035.pdf' },
    { id: '1030', medecin: 'Dr. Khaled Yazid', specialite: 'Dermatologue', date: '20 novembre 2025', statut: 'historique', medCount: 4, file: 'Ordo_KY1030.pdf' },
  ]);

  const [newOrdo, setNewOrdo] = useState({ medecin: '', specialite: '' });

  const handleAddOrdo = (e) => {
    e.preventDefault();
    if (!newOrdo.medecin) return;
    
    const newEntry = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      medecin: newOrdo.medecin,
      specialite: 'Spécialité à vérifier',
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      statut: 'active',
      medCount: 0,
      file: 'Document_Scanne.pdf'
    };
    
    setOrdonnances([newEntry, ...ordonnances]);
    setIsModalOpen(false);
    setNewOrdo({ medecin: '', specialite: '' });
  };

  const filteredOrdonnances = ordonnances.filter(o => 
    (filter === 'toutes' || o.statut === filter) &&
    (o.medecin.toLowerCase().includes(searchTerm.toLowerCase()) || o.specialite.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getBadge = (statut) => {
    switch (statut) {
      case 'active': return <span className="badge badge-green" style={{ marginLeft: '12px' }}>Validité en cours</span>;
      case 'expiree': return <span className="badge badge-red" style={{ marginLeft: '12px', backgroundColor: '#fdecea', color: '#e74c3c' }}>Expirée (Nécessite renouvellement)</span>;
      case 'historique': return <span className="badge badge-gray" style={{ marginLeft: '12px' }}>Historique</span>;
      default: return null;
    }
  };

  return (
    <div className="fade-in" style={{ width: '100%' }}>
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2 className="page-title" style={{ fontSize: '26px', fontWeight: '700' }}>Mes Ordonnances</h2>
        <button className="btn-primary-sm flex-gap-8" onClick={() => setIsModalOpen(true)} style={{ width: 'auto', padding: '12px 20px', borderRadius: '12px', fontSize: '14px', margin: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Ajouter une ordonnance papier (Scan)
        </button>
      </div>

      <div className="card margin-b-20 padding-20" style={{ borderRadius: '16px', width: '100%', boxSizing: 'border-box' }}>
        <div className="flex-align-center flex-wrap flex-gap-15">
          <div className="search-container" style={{ minWidth: '300px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon" style={{ top: '14px', left: '16px' }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              className="search-input"
              placeholder="Rechercher par médecin, spécialité..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '14px 14px 14px 44px', borderRadius: '12px', fontSize: '14px', backgroundColor: '#f8f9fa', border: '1px solid transparent' }}
            />
          </div>
          <div className="flex-gap-10">
            <button className={`btn-outline ${filter === 'toutes' ? 'active' : ''}`} onClick={() => setFilter('toutes')} style={{ padding: '10px 18px', borderRadius: '10px' }}>Toutes</button>
            <button className={`btn-outline ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')} style={{ padding: '10px 18px', borderRadius: '10px' }}>Actives</button>
            <button className={`btn-outline ${filter === 'expiree' ? 'active' : ''}`} onClick={() => setFilter('expiree')} style={{ padding: '10px 18px', borderRadius: '10px' }}>Expirées</button>
          </div>
        </div>
      </div>

      <div className="flex-column flex-gap-20" style={{ width: '100%' }}>
        {filteredOrdonnances.length > 0 ? filteredOrdonnances.map(o => (
          <div key={o.id} className="card" style={{ padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'box-shadow 0.2s, transform 0.2s', width: '100%', boxSizing: 'border-box' }} 
               onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)'}
               onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ width: '60px', height: '60px', backgroundColor: '#eef2f6', borderRadius: '14px', color: '#1a8c7a', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a2e', margin: 0 }}>Ordonnance #{o.id}</h3>
                  {getBadge(o.statut)}
                </div>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Prescrite le <strong style={{color: '#444'}}>{o.date}</strong> par <strong style={{ color: '#1a1a2e' }}>{o.medecin}</strong> <span style={{color: '#888'}}>({o.specialite})</span></p>
                <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>Contient {o.medCount === 0 ? "des" : o.medCount} médicament(s) prescrit(s)</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {o.statut === 'active' && (
                <button className="btn-primary-sm" style={{ padding: '12px 20px', margin: 0, width: 'auto', borderRadius: '10px' }}>Commander ({o.medCount})</button>
              )}
              {o.statut === 'expiree' && (
                <button className="btn-outline" style={{ color: '#e67e22', borderColor: '#f5cba7', backgroundColor: '#fef3e8', padding: '12px 20px', borderRadius: '10px' }}>Demander renouvellement</button>
              )}
              
              <button style={{ backgroundColor: '#f8f9fa', border: '1px solid #e0e0e0', padding: '12px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', transition: 'all 0.2s' }} 
                      title="Télécharger PDF"
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e9ecef'; e.currentTarget.style.color = '#1a1a2e'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f8f9fa'; e.currentTarget.style.color = '#666'; }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </button>
            </div>
          </div>
        )) : (
          <div className="card empty-state" style={{ padding: '60px 40px', borderRadius: '16px', width: '100%', boxSizing: 'border-box' }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '20px' }}>
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
            <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>Aucune ordonnance trouvée pour cette recherche.</p>
            <button className="btn-outline" onClick={() => {setSearchTerm(''); setFilter('toutes');}} style={{ width: 'auto', padding: '10px 24px', marginTop: '20px' }}>Réinitialiser les filtres</button>
          </div>
        )}
      </div>

      {/* Modal d'ajout d'ordonnance */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '540px', padding: '32px', borderRadius: '24px', backgroundColor: 'white', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '24px', margin: 0, color: '#1a1a2e' }}>Scanner une ordonnance</h3>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }} onClick={() => setIsModalOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '28px', lineHeight: '1.5' }}>
              Prenez en photo ou importez votre ordonnance papier. Nos pharmaciens la numériseront pour préparer votre commande.
            </p>
            
            <form onSubmit={handleAddOrdo}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Nom du médecin prescripteur <span style={{color: '#e74c3c'}}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '16px', top: '14px' }}>
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input 
                    type="text" 
                    value={newOrdo.medecin}
                    onChange={e => setNewOrdo({...newOrdo, medecin: e.target.value})}
                    placeholder="Ex: Dr. Ahmed Dupont" 
                    required
                    style={{ width: '100%', padding: '14px 14px 14px 44px', border: '1.5px solid #e0e0e0', borderRadius: '12px', fontSize: '14px', outline: 'none', transition: 'border 0.2s' }}
                    onFocus={(e) => e.target.style.borderColor = '#1a8c7a'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Fichier (Photo / PDF)</label>
                <div style={{ border: '2px dashed #1a8c7a', borderRadius: '16px', padding: '36px 20px', textAlign: 'center', backgroundColor: '#f0f7f5', cursor: 'pointer', transition: 'background 0.2s' }}
                     onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6f4f1'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f7f5'}>
                  <div style={{ backgroundColor: 'white', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a8c7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#1a8c7a' }}>Parcourir vos fichiers</p>
                  <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#666' }}>Ou glissez-déposez ici (Taille max : 5 Mo)</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', fontSize: '15px' }}>Annuler</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, margin: 0, borderRadius: '12px', fontSize: '15px', backgroundColor: !newOrdo.medecin ? '#ccc' : '#1a8c7a' }} disabled={!newOrdo.medecin}>Confirmer l'ajout</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientOrdonnances;
