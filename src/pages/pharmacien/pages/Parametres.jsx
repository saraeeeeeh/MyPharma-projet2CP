import React, { useContext, useState } from 'react';
import { PharmacieContext } from '../context/PharmacieContext';
import { toast } from 'react-toastify';
import '../PharmacienDashboard.css';

export default function Parametres() {
  const { pharmacieData, updateData } = useContext(PharmacieContext);
  const [nom, setNom] = useState(pharmacieData?.nom || '');
  const [telephone, setTelephone] = useState(pharmacieData?.telephone || '');
  const [description, setDescription] = useState(pharmacieData?.description || '');

  const handleSaveInfo = (e) => {
    e.preventDefault();
    updateData({ nom, telephone, description });
    toast.success('Informations mises à jour avec succès.');
  };

  return (
    <>
      <div style={{marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', color: '#1a1a2e'}}>Paramètres de la pharmacie</h2>
        <p style={{fontSize: '13px', color: '#888'}}>Gérez les informations et configurations de votre compte.</p>
      </div>

      <div className="grid3" style={{gridTemplateColumns: 'minmax(200px, 1fr) 2fr'}}>
        
        {/* Navigation Sidebar inside parameters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a href="#infos" style={{ display: 'block', padding: '12px 16px', backgroundColor: '#e8f5ee', color: '#1e8a5e', fontWeight: '600', borderRadius: '10px', textDecoration: 'none', fontSize: '13px' }}>
            Informations générales
          </a>
          <a href="#horaires" style={{ display: 'block', padding: '12px 16px', color: '#666', fontWeight: '500', borderRadius: '10px', textDecoration: 'none', fontSize: '13px' }}>
            Horaires et Garde
          </a>
          <a href="#gps" style={{ display: 'block', padding: '12px 16px', color: '#666', fontWeight: '500', borderRadius: '10px', textDecoration: 'none', fontSize: '13px' }}>
            Position GPS
          </a>
          <a href="#securite" style={{ display: 'block', padding: '12px 16px', color: '#666', fontWeight: '500', borderRadius: '10px', textDecoration: 'none', fontSize: '13px' }}>
            Sécurité et Mot de passe
          </a>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div id="infos" className="card">
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a2e', borderBottom: '1px solid #e0e0e0', paddingBottom: '12px', marginBottom: '16px' }}>Informations générales</h2>
            <form onSubmit={handleSaveInfo} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group" style={{marginBottom: 0}}>
                <label>Nom de la pharmacie</label>
                <input 
                  type="text" 
                  value={nom} 
                  onChange={e => setNom(e.target.value)} 
                />
              </div>
              <div className="form-group" style={{marginBottom: 0}}>
                <label>Téléphone de contact</label>
                <input 
                  type="text" 
                  value={telephone} 
                  onChange={e => setTelephone(e.target.value)} 
                />
              </div>
              <div className="form-group" style={{marginBottom: 0}}>
                <label>Description</label>
                <textarea 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e0e0e0', borderRadius: '10px', outline: 'none', fontSize: '13px', height: '100px', resize: 'vertical' }}
                ></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px' }}>
                <button type="submit" className="btn-primary-sm" style={{ width: 'auto', padding: '10px 24px', margin: 0 }}>
                  Enregistrer
                </button>
              </div>
            </form>
          </div>

          <div id="horaires" className="card" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 20px' }}>
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="2" style={{marginBottom: '10px'}}>
               <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
             </svg>
             <p style={{ color: '#666', fontWeight: '500', fontSize: '13px' }}>Pour modifier vos horaires de garde, utilisez le planificateur complet.</p>
             <button className="btn-primary-sm" style={{ width: 'auto', padding: '10px 24px', margin: '20px auto 0', background: '#f0f4f8', color: '#1a1a2e' }}>
               Ouvrir le planificateur
             </button>
          </div>

          <div id="gps" className="card">
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a2e', borderBottom: '1px solid #e0e0e0', paddingBottom: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e8a5e" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Emplacement GPS
            </h2>
            <div style={{ backgroundColor: '#f0f4f8', padding: '15px', borderRadius: '10px', border: '1px solid #ddd' }}>
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#1a1a2e', marginBottom: '5px' }}>Adresse actuelle</p>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>{pharmacieData?.location?.address || 'Non définie'}</p>
              <button onClick={() => toast.info('Redirection vers la carte...')} className="btn-primary-sm" style={{ width: 'auto', margin: 0, padding: '8px 16px', background: 'white', color: '#1e8a5e', border: '1px solid #1e8a5e' }}>
                Mettre à jour sur la carte
              </button>
            </div>
          </div>

          <div id="securite" className="card">
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a2e', borderBottom: '1px solid #e0e0e0', paddingBottom: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 10-4-4Z"/><circle cx="16.5" cy="7.5" r=".5" fill="#666"/>
              </svg>
              Modifier le mot de passe
            </h2>
            <form onSubmit={e => { e.preventDefault(); toast.success('Mot de passe mis à jour'); }} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group" style={{marginBottom: 0}}>
                <label>Ancien mot de passe</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="form-group" style={{marginBottom: 0}}>
                <label>Nouveau mot de passe</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '10px' }}>
                <button type="submit" className="btn-primary-sm" style={{ width: 'auto', padding: '10px 24px', margin: 0, background: '#1a1a2e' }}>
                  Mettre à jour
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
}
