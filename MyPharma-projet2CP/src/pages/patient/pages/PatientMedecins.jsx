import React, { useState } from 'react';

function PatientMedecins() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMedecin, setNewMedecin] = useState({ nom: '', specialite: '', telephone: '', email: '' });

  const [medecins, setMedecins] = useState([
    { id: '1', nom: 'Dr. Djamel Benali', specialite: 'Médecin généraliste', telephone: '05 55 12 34 56', email: 'djamel.benali@mypharma.dz', adresse: 'Centre Médical El Bina, Alger', consultations: 4, derniereVisite: '15 mars 2026', avatar: 'DB' },
    { id: '2', nom: 'Dr. Sara Meziane', specialite: 'Cardiologue', telephone: '07 77 98 76 54', email: 's.meziane@my-cardio.dz', adresse: 'Clinique du Coeur, Oran', consultations: 2, derniereVisite: '10 février 2026', avatar: 'SM' },
    { id: '3', nom: 'Dr. Khaled Yazid', specialite: 'Dermatologue', telephone: '06 66 11 22 33', email: 'contact@dermato-yazid.dz', adresse: '15 Rue Didouche Mourad, Alger', consultations: 1, derniereVisite: '20 novembre 2025', avatar: 'KY' },
  ]);

  const handleAddMedecin = (e) => {
    e.preventDefault();
    if (!newMedecin.nom) return;
    
    // Obtenir les initiales
    const initiales = newMedecin.nom.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'Dr';

    const newEntry = {
      id: Math.floor(100 + Math.random() * 900).toString(),
      nom: newMedecin.nom.startsWith('Dr') ? newMedecin.nom : `Dr. ${newMedecin.nom}`,
      specialite: newMedecin.specialite || 'Médecin généraliste',
      telephone: newMedecin.telephone || 'Non renseigné',
      email: newMedecin.email || 'Non renseigné',
      adresse: 'Adresse à compléter',
      consultations: 0,
      derniereVisite: 'Aucune',
      avatar: initiales
    };
    
    setMedecins([newEntry, ...medecins]);
    setIsModalOpen(false);
    setNewMedecin({ nom: '', specialite: '', telephone: '', email: '' });
  };

  const filteredMedecins = medecins.filter(m => 
    m.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.specialite.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fade-in" style={{ width: '100%' }}>
      <div className="page-header">
        <h2 className="page-title">Mes Médecins Traitants</h2>
        <button className="btn-primary-sm flex-gap-8" onClick={() => setIsModalOpen(true)} style={{ width: 'auto', padding: '12px 20px', borderRadius: '12px', fontSize: '14px', margin: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
          </svg>
          Ajouter un médecin
        </button>
      </div>

      <div className="card margin-b-20 padding-15" style={{ borderRadius: '16px', width: '100%', boxSizing: 'border-box' }}>
        <div className="search-container" style={{ maxWidth: '500px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon" style={{ top: '14px', left: '16px' }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input 
            type="text" 
            className="search-input"
            placeholder="Rechercher un médecin..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '14px 14px 14px 44px', borderRadius: '12px', fontSize: '14px', backgroundColor: '#f8f9fa', border: '1px solid transparent' }}
          />
        </div>
      </div>

      <div className="grid-cards" style={{ width: '100%' }}>
        {filteredMedecins.length > 0 ? filteredMedecins.map(m => (
          <div key={m.id} className="card doc-card" style={{ borderRadius: '16px', width: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
            <div className="flex-gap-15 margin-b-20" style={{ marginBottom: '20px' }}>
              <div className="doc-avatar" style={{ backgroundColor: '#eef2f6', color: '#1a8c7a', fontWeight: 'bold' }}>
                {m.avatar}
              </div>
              <div>
                <h3 className="text-md-dark margin-b-15" style={{ fontSize: '18px', marginBottom: '5px' }}>{m.nom}</h3>
                <p style={{ color: '#1a8c7a', fontSize: '14px', margin: 0, fontWeight: 500 }}>{m.specialite}</p>
              </div>
            </div>

            <div className="flex-1 flex-column flex-gap-10 margin-b-20" style={{ marginBottom: '20px' }}>
              <div className="doc-contact-item" style={{ gap: '10px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span style={{ fontSize: '13px', color: '#444' }}>{m.adresse}</span>
              </div>
              <div className="doc-contact-item" style={{ gap: '10px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <span style={{ fontSize: '13px', color: '#444' }}>{m.telephone}</span>
              </div>
              <div className="doc-contact-item" style={{ gap: '10px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <span style={{ fontSize: '13px', color: '#444' }}>{m.email}</span>
              </div>
            </div>

            <div className="med-info-box flex-between margin-b-20" style={{ marginBottom: '20px', padding: '12px' }}>
              <div>
                <p className="text-sm-gray" style={{ margin: '0 0 2px 0' }}>Consultations</p>
                <p className="text-md-dark" style={{ fontWeight: 600 }}>{m.consultations}</p>
              </div>
              <div className="text-right">
                <p className="text-sm-gray" style={{ margin: '0 0 2px 0' }}>Dernière visite</p>
                <p className="text-md-dark" style={{ fontWeight: 600 }}>{m.derniereVisite}</p>
              </div>
            </div>

            <div className="flex-gap-10">
              <button className="btn-primary-sm" style={{ flex: 1, margin: 0, borderRadius: '10px' }}>Prendre rendez-vous</button>
              <button className="btn-outline" style={{ color: '#2c6fd4', borderColor: '#2c6fd4', borderRadius: '10px' }}>Message</button>
            </div>
          </div>
        )) : (
          <div className="card empty-state" style={{ gridColumn: '1 / -1', padding: '60px 40px', borderRadius: '16px' }}>
             <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="margin-b-15">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <p className="margin-0 text-md-dark">Aucun médecin trouvé pour cette recherche.</p>
          </div>
        )}
      </div>

      {/* Modal d'ajout de médecin */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '500px', padding: '32px', borderRadius: '24px', backgroundColor: 'white', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '24px', margin: 0, color: '#1a1a2e' }}>Ajouter un médecin</h3>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }} onClick={() => setIsModalOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '28px', lineHeight: '1.5' }}>
              Ajoutez un nouveau praticien à votre répertoire de santé pour faciliter la prise de rendez-vous et le partage de documents.
            </p>
            
            <form onSubmit={handleAddMedecin}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Nom du médecin <span style={{color: '#e74c3c'}}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '16px', top: '14px' }}>
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input 
                    type="text" 
                    value={newMedecin.nom}
                    onChange={e => setNewMedecin({...newMedecin, nom: e.target.value})}
                    placeholder="Ex: Dr. Ahmed Dupont" 
                    required
                    style={{ width: '100%', padding: '14px 14px 14px 44px', border: '1.5px solid #e0e0e0', borderRadius: '12px', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Spécialité</label>
                <div style={{ position: 'relative' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '16px', top: '14px' }}>
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                  <select 
                    value={newMedecin.specialite}
                    onChange={e => setNewMedecin({...newMedecin, specialite: e.target.value})}
                    style={{ width: '100%', padding: '14px 14px 14px 44px', border: '1.5px solid #e0e0e0', borderRadius: '12px', fontSize: '14px', outline: 'none', backgroundColor: 'white', appearance: 'none' }}
                  >
                    <option value="">Sélectionner une spécialité</option>
                    <option>Médecin généraliste</option>
                    <option>Cardiologue</option>
                    <option>Dermatologue</option>
                    <option>Pédiatre</option>
                    <option>Ophtalmologue</option>
                    <option>Gynécologue</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Téléphone</label>
                  <input 
                    type="tel" 
                    value={newMedecin.telephone}
                    onChange={e => setNewMedecin({...newMedecin, telephone: e.target.value})}
                    placeholder="05 55 00 00 00" 
                    style={{ width: '100%', padding: '14px', border: '1.5px solid #e0e0e0', borderRadius: '12px', fontSize: '14px', outline: 'none' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Email</label>
                  <input 
                    type="email" 
                    value={newMedecin.email}
                    onChange={e => setNewMedecin({...newMedecin, email: e.target.value})}
                    placeholder="contact@docteur.dz" 
                    style={{ width: '100%', padding: '14px', border: '1.5px solid #e0e0e0', borderRadius: '12px', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', fontSize: '15px' }}>Annuler</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, margin: 0, borderRadius: '12px', fontSize: '15px', backgroundColor: !newMedecin.nom ? '#ccc' : '#1a8c7a' }} disabled={!newMedecin.nom}>Ajouter le médecin</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientMedecins;
