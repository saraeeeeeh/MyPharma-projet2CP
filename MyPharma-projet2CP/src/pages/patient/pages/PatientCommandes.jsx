import React, { useState } from 'react';

function PatientCommandes() {
  const [filter, setFilter] = useState('toutes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commandeType, setCommandeType] = useState('ordonnance'); // 'ordonnance' | 'libre'
  const [medsText, setMedsText] = useState('');
  const [livraison, setLivraison] = useState('domicile');
  const [paiement, setPaiement] = useState('livraison');

  // State pour stocker la liste des commandes et ajouter dynamiquement
  const [commandes, setCommandes] = useState([
    { id: '1042', pharmacie: 'Pharmacie Centrale', date: '17 mars 2026', statut: 'livraison', total: '2450.00', articles: 3, livraisonPrevue: 'Aujourd\'hui, 15h30' },
    { id: '1038', pharmacie: 'Pharmacie Du Centre', date: '10 mars 2026', statut: 'livree', total: '1200.00', articles: 2, livraisonPrevue: 'Livré le 10 mars' },
    { id: '1031', pharmacie: 'Pharmacie de Garde Nord', date: '01 mars 2026', statut: 'livree', total: '590.00', articles: 1, livraisonPrevue: 'Livré le 02 mars' },
    { id: '1025', pharmacie: 'Pharmacie Centrale', date: '15 février 2026', statut: 'annulee', total: '4500.00', articles: 5, livraisonPrevue: 'Annulée par vous' },
  ]);

  const filteredCommandes = commandes.filter(c => filter === 'toutes' || c.statut === filter);

  const getBadge = (statut) => {
    switch (statut) {
      case 'livraison': return <span className="badge badge-orange">En cours de livraison</span>;
      case 'livree': return <span className="badge badge-green">Livrée</span>;
      case 'annulee': return <span className="badge badge-red">Annulée</span>;
      default: return null;
    }
  };

  const handleCreateCommande = (e) => {
    e.preventDefault();
    const newId = Math.floor(1000 + Math.random() * 9000).toString();
    const newEntry = {
      id: newId,
      pharmacie: 'Pharmacie El Wiam',
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
      statut: 'livraison',
      total: 'En calcul',
      articles: commandeType === 'ordonnance' ? 1 : (medsText ? medsText.split(',').length : 1),
      livraisonPrevue: livraison === 'domicile' ? "Aujourd'hui, sous 2h" : "Prêt en pharmacie"
    };
    setCommandes([newEntry, ...commandes]);
    setIsModalOpen(false);
    
    // reset form
    setCommandeType('ordonnance');
    setMedsText('');
    setLivraison('domicile');
    setPaiement('livraison');
  };

  return (
    <div className="fade-in" style={{ width: '100%' }}>
      <div className="page-header">
        <h2 className="page-title">Mes Commandes</h2>
        <button className="btn-primary-sm flex-gap-8" onClick={() => setIsModalOpen(true)} style={{ width: 'auto', padding: '12px 20px', borderRadius: '12px', fontSize: '14px', margin: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nouvelle Commande
        </button>
      </div>

      <div className="card margin-b-20 padding-20" style={{ borderRadius: '16px', width: '100%', boxSizing: 'border-box' }}>
        <div className="flex-gap-10">
          <button className={`btn-outline ${filter === 'toutes' ? 'active' : ''}`} onClick={() => setFilter('toutes')} style={{ padding: '10px 18px', borderRadius: '10px' }}>Toutes</button>
          <button className={`btn-outline ${filter === 'livraison' ? 'active' : ''}`} onClick={() => setFilter('livraison')} style={{ padding: '10px 18px', borderRadius: '10px' }}>En cours</button>
          <button className={`btn-outline ${filter === 'livree' ? 'active' : ''}`} onClick={() => setFilter('livree')} style={{ padding: '10px 18px', borderRadius: '10px' }}>Historique</button>
        </div>
      </div>

      <div className="flex-column flex-gap-15" style={{ width: '100%' }}>
        {filteredCommandes.length > 0 ? filteredCommandes.map(c => (
          <div key={c.id} className="card padding-20 flex-column flex-gap-15" style={{ borderRadius: '16px', width: '100%', boxSizing: 'border-box', transition: 'box-shadow 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}
               onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)'}
               onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)'}>
            <div className="flex-between margin-b-15" style={{ borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
              <div className="flex-gap-20">
                <div style={{ width: '56px', height: '56px', backgroundColor: '#eef2f6', borderRadius: '14px', color: '#2c6fd4', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-md-dark margin-b-15" style={{ fontSize: '18px', marginBottom: '6px', fontWeight: '700' }}>Commande #{c.id}</h3>
                  <p className="text-sm-gray" style={{ margin: 0, fontSize: '14px' }}>Passée le <strong style={{color: '#444'}}>{c.date}</strong> chez <strong style={{ color: '#1a1a2e' }}>{c.pharmacie}</strong></p>
                </div>
              </div>
              <div className="text-right">
                <div className="margin-b-15" style={{ marginBottom: '8px' }}>{getBadge(c.statut)}</div>
                <h4 className="margin-0" style={{ fontSize: '20px', color: c.statut === 'annulee' ? '#888' : '#1a8c7a', fontWeight: '700' }}>
                  {c.total} {c.total !== 'En calcul' && 'DA'}
                </h4>
              </div>
            </div>
            
            <div className="flex-between">
              <div className="flex-gap-10" style={{ color: c.statut === 'livraison' ? '#e67e22' : '#888', backgroundColor: c.statut === 'livraison' ? '#fef3e8' : 'transparent', padding: c.statut === 'livraison' ? '8px 12px' : '0', borderRadius: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span style={{ fontSize: '14px', fontWeight: c.statut === 'livraison' ? 600 : 500 }}>{c.livraisonPrevue}</span>
              </div>
              <div className="flex-gap-10">
                {c.statut === 'livraison' && (
                  <button className="btn-primary-sm" style={{ padding: '10px 20px', background: '#e67e22', margin: 0, width: 'auto', borderRadius: '10px' }}>Suivre le livreur</button>
                )}
                <button className="btn-outline" style={{ padding: '10px 20px', borderRadius: '10px' }}>Voir détails ({c.articles} {c.articles > 1 ? 'articles' : 'article'})</button>
              </div>
            </div>
          </div>
        )) : (
          <div className="card empty-state" style={{ padding: '60px 40px', borderRadius: '16px', width: '100%', boxSizing: 'border-box' }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '20px' }}>
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
            </svg>
            <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>Aucune commande trouvée.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '600px', padding: '32px', borderRadius: '24px', backgroundColor: 'white', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '24px', margin: 0, color: '#1a1a2e' }}>Commander des produits</h3>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }} onClick={() => setIsModalOpen(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '28px', lineHeight: '1.5' }}>
              Passez votre commande de médicaments (avec ou sans ordonnance) et choisissez vos modalités de livraison.
            </p>
            
            <form onSubmit={handleCreateCommande}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                <div 
                  onClick={() => setCommandeType('ordonnance')}
                  style={{ flex: 1, padding: '14px', border: commandeType === 'ordonnance' ? '2px solid #1a8c7a' : '1.5px solid #e0e0e0', borderRadius: '12px', cursor: 'pointer', backgroundColor: commandeType === 'ordonnance' ? '#f0f7f5' : 'white', textAlign: 'center', fontWeight: '600', color: commandeType === 'ordonnance' ? '#1a8c7a' : '#666', transition: 'all 0.2s' }}>
                  Achat avec Ordonnance
                </div>
                <div 
                  onClick={() => setCommandeType('libre')}
                  style={{ flex: 1, padding: '14px', border: commandeType === 'libre' ? '2px solid #1a8c7a' : '1.5px solid #e0e0e0', borderRadius: '12px', cursor: 'pointer', backgroundColor: commandeType === 'libre' ? '#f0f7f5' : 'white', textAlign: 'center', fontWeight: '600', color: commandeType === 'libre' ? '#1a8c7a' : '#666', transition: 'all 0.2s' }}>
                  Achat libre (Parapharmacie)
                </div>
              </div>

              {commandeType === 'ordonnance' ? (
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Choix de l'ordonnance <span style={{color: '#e74c3c'}}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '16px', top: '14px' }}>
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <select 
                      required
                      style={{ width: '100%', padding: '14px 14px 14px 44px', border: '1.5px solid #e0e0e0', borderRadius: '12px', fontSize: '14px', outline: 'none', appearance: 'none', backgroundColor: 'white', cursor: 'pointer' }}
                    >
                      <option value="">Sélectionner une ordonnance active</option>
                      <option value="1042">Ordonnance #1042 - Dr. Djamel Benali</option>
                      <option value="1035">Ordonnance #1035 - Dr. Djamel Benali</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Médicaments ou produits souhaités <span style={{color: '#e74c3c'}}>*</span></label>
                  <textarea 
                    required
                    value={medsText}
                    onChange={(e) => setMedsText(e.target.value)}
                    placeholder="Ex: 2x Paracétamol 1000mg, 1x Sirop pour la toux, 1x Gel hydroalcoolique..." 
                    style={{ width: '100%', padding: '14px', border: '1.5px solid #e0e0e0', borderRadius: '12px', fontSize: '14px', outline: 'none', resize: 'vertical', minHeight: '90px', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  ></textarea>
                </div>
              )}

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
                  Pharmacie trouvée <span style={{ color: '#1a8c7a', fontWeight: '400', fontSize: '12px', marginLeft: '6px' }}>(Proche & En stock)</span>
                </label>
                <div style={{ border: '1.5px solid #1a8c7a', borderRadius: '12px', padding: '16px', backgroundColor: '#f0f7f5', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '44px', height: '44px', backgroundColor: '#e6f4f1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a8c7a', flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <p style={{ margin: 0, fontWeight: '700', color: '#1a1a2e', fontSize: '15px' }}>Pharmacie El Wiam</p>
                      <span className="badge badge-green" style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '6px' }}>Stock garanti</span>
                    </div>
                    <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>À 1.2 km (Hydra, Alger) • Ouverte 24/7</p>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Méthode de livraison</label>
                <div style={{ display: 'flex', gap: '15px' }}>
                   <div onClick={() => setLivraison('domicile')} style={{ flex: 1, border: livraison === 'domicile' ? '2px solid #1a8c7a' : '1.5px solid #e0e0e0', borderRadius: '12px', padding: '16px', backgroundColor: livraison === 'domicile' ? '#f0f7f5' : 'white', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: livraison === 'domicile' ? '5px solid #1a8c7a' : '2px solid #ccc', boxSizing: 'border-box' }}></div>
                     <div>
                       <p style={{ margin: 0, fontWeight: '600', color: livraison === 'domicile' ? '#1a8c7a' : '#333', fontSize: '15px' }}>Livraison à domicile</p>
                       <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '13px' }}>Aujourd'hui, sous 2h</p>
                     </div>
                   </div>
                   <div onClick={() => setLivraison('click_collect')} style={{ flex: 1, border: livraison === 'click_collect' ? '2px solid #1a8c7a' : '1.5px solid #e0e0e0', borderRadius: '12px', padding: '16px', backgroundColor: livraison === 'click_collect' ? '#f0f7f5' : 'white', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: livraison === 'click_collect' ? '5px solid #1a8c7a' : '2px solid #ccc', boxSizing: 'border-box' }}></div>
                     <div>
                       <p style={{ margin: 0, fontWeight: '600', color: livraison === 'click_collect' ? '#1a8c7a' : '#333', fontSize: '15px' }}>Click & Collect</p>
                       <p style={{ margin: '4px 0 0 0', color: '#888', fontSize: '13px' }}>Retrait en pharmacie</p>
                     </div>
                   </div>
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Moyen de paiement</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                   <div onClick={() => setPaiement('en_ligne')} style={{ flex: 1, minWidth: '200px', border: paiement === 'en_ligne' ? '2px solid #1a8c7a' : '1.5px solid #e0e0e0', borderRadius: '12px', padding: '16px', backgroundColor: paiement === 'en_ligne' ? '#f0f7f5' : 'white', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: paiement === 'en_ligne' ? '5px solid #1a8c7a' : '2px solid #ccc', boxSizing: 'border-box' }}></div>
                     <div>
                       <p style={{ margin: 0, fontWeight: '600', color: paiement === 'en_ligne' ? '#1a8c7a' : '#333', fontSize: '14px' }}>Paiement en ligne</p>
                       <p style={{ margin: '2px 0 0 0', color: '#666', fontSize: '12px' }}>CIB / Eddahabia</p>
                     </div>
                   </div>
                   <div onClick={() => setPaiement('livraison')} style={{ flex: 1, minWidth: '200px', border: paiement === 'livraison' ? '2px solid #1a8c7a' : '1.5px solid #e0e0e0', borderRadius: '12px', padding: '16px', backgroundColor: paiement === 'livraison' ? '#f0f7f5' : 'white', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: paiement === 'livraison' ? '5px solid #1a8c7a' : '2px solid #ccc', boxSizing: 'border-box' }}></div>
                     <div>
                       <p style={{ margin: 0, fontWeight: '600', color: paiement === 'livraison' ? '#1a8c7a' : '#333', fontSize: '14px' }}>Paiement à la réception</p>
                       <p style={{ margin: '2px 0 0 0', color: '#666', fontSize: '12px' }}>Espèces ou TPE</p>
                     </div>
                   </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', fontSize: '15px' }}>Annuler</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, margin: 0, borderRadius: '12px', fontSize: '15px', backgroundColor: '#1a8c7a' }}>Valider la commande</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientCommandes;
