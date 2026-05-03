import React, { useState } from 'react';
import PatientHealthProfile from '../PatientHealthProfile';

function PatientProfil() {
  const [ongletActif, setOngletActif] = useState('sante');

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '24px', color: '#1a1a2e', marginBottom: '20px' }}>Mon profil</h2>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
        <button 
          onClick={() => setOngletActif('sante')}
          style={{ 
            background: ongletActif === 'sante' ? '#1a8c7a' : 'transparent', 
            color: ongletActif === 'sante' ? 'white' : '#666',
            border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          Profil de Santé
        </button>
        <button 
          onClick={() => setOngletActif('parametres')}
          style={{ 
            background: ongletActif === 'parametres' ? '#1a8c7a' : 'transparent', 
            color: ongletActif === 'parametres' ? 'white' : '#666',
            border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold'
          }}
        >
          Paramètres du compte
        </button>
      </div>

      {ongletActif === 'sante' ? (
        <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e0e0e0' }}>
          <p style={{ color: '#666', marginBottom: '20px' }}>Gérez vos allergies, maladies chroniques et antécédents médicaux.</p>
          <div style={{ transform: 'scale(0.95)', transformOrigin: 'top left', width: '105%' }}>
            <PatientHealthProfile isDashboardMode={true} />
          </div>
        </div>
      ) : (
        <div className="card">
          <h3 style={{ marginBottom: '15px' }}>Informations personnelles</h3>
          <div className="form-group">
            <label>Nom complet</label>
            <input type="text" defaultValue="Ahmed Dupont" />
          </div>
          <div className="form-group">
            <label>Email de contact</label>
            <input type="email" defaultValue="ahmed@exemple.com" />
          </div>
          <div className="form-group">
            <label>Nouveau mot de passe</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="form-group">
            <label>Adresse de livraison</label>
            <input type="text" defaultValue="12 Rue de la Santé, Paris" />
          </div>
          <button className="btn-primary-sm" style={{ marginTop: '10px' }}>Enregistrer les modifications</button>
        </div>
      )}
    </div>
  );
}

export default PatientProfil;
