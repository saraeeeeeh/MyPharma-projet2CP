import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PharmacieContext } from '../context/PharmacieContext';
import Navbar from '../../../components/Navbar';
import '../PharmacienPages.css';

const DAYS = [
  { id: 'lundi', label: 'Lundi' },
  { id: 'mardi', label: 'Mardi' },
  { id: 'mercredi', label: 'Mercredi' },
  { id: 'jeudi', label: 'Jeudi' },
  { id: 'vendredi', label: 'Vendredi' },
  { id: 'samedi', label: 'Samedi' },
  { id: 'dimanche', label: 'Dimanche' },
];

const PREDEFINED_SERVICES = [
  { id: 'vaccin', label: 'Vaccination' },
  { id: 'covid', label: 'Tests COVID' },
  { id: 'ortho', label: 'Orthopédie' },
  { id: 'livraison', label: 'Livraison' },
];

export default function PharmacyInfo() {
  const navigate = useNavigate();
  const { updateData } = useContext(PharmacieContext);

  const [personalInfo, setPersonalInfo] = useState({ nom: '', rpps: '' });
  const [pharmacyInfo, setPharmacyInfo] = useState({ nom: '', adresse: '', telephone: '' });
  const [availableServices, setAvailableServices] = useState(PREDEFINED_SERVICES.filter(s => s.id !== 'livraison'));
  const [services, setServices] = useState(['vaccin', 'covid']);
  const [isAddingService, setIsAddingService] = useState(false);
  const [newServiceLabel, setNewServiceLabel] = useState("");

  const handleAddService = () => {
    if (newServiceLabel.trim()) {
      const newId = `custom_${Date.now()}`;
      setAvailableServices([...availableServices, { id: newId, label: newServiceLabel.trim() }]);
      setServices([...services, newId]);
      setNewServiceLabel("");
      setIsAddingService(false);
    }
  };

  const [schedule, setSchedule] = useState(
    DAYS.reduce((acc, day) => ({
      ...acc,
      [day.id]: {
        isOpen: day.id !== 'dimanche',
        matin: { start: '08:30', end: '12:30' },
        aprem: { start: '14:00', end: '19:30' }
      }
    }), {})
  );

  const toggleService = (id) => {
    setServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateData({
      pharmacien: personalInfo,
      pharmacieDetails: pharmacyInfo,
      schedule,
      services,
      completedProfile: true
    });
    navigate('/pharmacien/location');
  };

  return (
    <div className="pharmacien-bg">
      <Navbar />
      <div className="form-container" style={{padding: '20px'}}>
        <div className="form-card wide" style={{maxWidth: '800px'}}>
          
          <div className="form-logo">
            <span>⊕</span>
            <p>MyPharma</p>
          </div>

          <h2>Détails Professionnels</h2>
          <p className="form-subtitle">Étape 3 sur 4 : Infos sur l'officine</p>

          <div className="steps-indicator">
            <div className="step-dot active">1</div>
            <div className="step-line active"></div>
            <div className="step-dot active">2</div>
            <div className="step-line active"></div>
            <div className="step-dot active">3</div>
            <div className="step-line"></div>
            <div className="step-dot">4</div>
          </div>

          <form onSubmit={onSubmit}>
            
            <div style={{display:'flex', gap:'20px', flexWrap:'wrap', marginBottom:'20px'}}>
              <div style={{flex: '1 1 300px'}}>
                <h3 style={{fontSize:'16px', color:'#1e8a5e', marginBottom:'10px', borderBottom:'1px solid #e0e0e0', paddingBottom:'5px'}}>Le Pharmacien Titulaire</h3>
                <div className="form-group">
                  <label>Nom complet</label>
                  <input
                    type="text"
                    required
                    value={personalInfo.nom}
                    onChange={e => setPersonalInfo({ ...personalInfo, nom: e.target.value })}
                    placeholder="Ex: Jean Dupont"
                  />
                </div>
                <div className="form-group">
                  <label>Numéro RPPS / ADELI</label>
                  <input
                    type="number"
                    required
                    value={personalInfo.rpps}
                    onChange={e => setPersonalInfo({ ...personalInfo, rpps: e.target.value })}
                    placeholder="11 chiffres (ex: 101...)"
                  />
                </div>
              </div>

              <div style={{flex: '1 1 300px'}}>
                <h3 style={{fontSize:'16px', color:'#1e8a5e', marginBottom:'10px', borderBottom:'1px solid #e0e0e0', paddingBottom:'5px'}}>L'Officine</h3>
                <div className="form-group">
                  <label>Nom de l'officine</label>
                  <input
                    type="text"
                    required
                    value={pharmacyInfo.nom}
                    onChange={e => setPharmacyInfo({ ...pharmacyInfo, nom: e.target.value })}
                    placeholder="Pharmacie du Centre"
                  />
                </div>
                <div className="form-group">
                  <label>Adresse complète</label>
                  <input
                    type="text"
                    required
                    value={pharmacyInfo.adresse}
                    onChange={e => setPharmacyInfo({ ...pharmacyInfo, adresse: e.target.value })}
                    placeholder="Rue de la Paix, Paris"
                  />
                </div>
                <div className="form-group">
                  <label>Téléphone professionnel</label>
                  <input
                    type="tel"
                    required
                    value={pharmacyInfo.telephone}
                    onChange={e => setPharmacyInfo({ ...pharmacyInfo, telephone: e.target.value })}
                    placeholder="01 23 45 67 89"
                  />
                </div>
              </div>
            </div>

            <h3 style={{fontSize:'16px', color:'#1e8a5e', marginBottom:'10px', borderBottom:'1px solid #e0e0e0', paddingBottom:'5px'}}>Horaires d'Ouverture</h3>
            <div style={{overflowX: 'auto', marginBottom: '25px', border: '1px solid #e0e0e0', borderRadius: '10px', padding: '10px'}}>
              <table style={{width:'100%', fontSize:'13px', textAlign:'left', borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{color:'#666', borderBottom:'1px solid #ececec'}}>
                    <th style={{padding:'8px', width:'120px'}}>Jour</th>
                    <th style={{padding:'8px'}}>Matin</th>
                    <th style={{padding:'8px'}}>Après-midi</th>
                  </tr>
                </thead>
                <tbody>
                  {DAYS.map(day => {
                    const d = schedule[day.id];
                    return (
                      <tr key={day.id} style={{borderBottom:'1px solid #f0f0f0'}}>
                        <td style={{padding:'8px'}}>
                          <label style={{display:'flex', alignItems:'center', gap:'8px', cursor:'pointer', fontWeight:'600', textTransform:'capitalize'}}>
                            <input
                              type="checkbox"
                              checked={d.isOpen}
                              onChange={() => setSchedule(prev => ({ ...prev, [day.id]: { ...prev[day.id], isOpen: !prev[day.id].isOpen } }))}
                              style={{width:'16px', height:'16px', accentColor:'#1e8a5e', padding:0, margin:0}}
                            />
                            {day.label}
                          </label>
                        </td>
                        {d.isOpen ? (
                          <>
                            <td style={{padding:'8px'}}>
                              <div style={{display:'flex', alignItems:'center', gap:'5px', color:'#555'}}>
                                <input type="time" value={d.matin.start} onChange={e => setSchedule(p => ({ ...p, [day.id]: { ...p[day.id], matin: { ...p[day.id].matin, start: e.target.value } } }))} style={{border:'none', outline:'none', background:'transparent', padding:'0'}} />
                                -
                                <input type="time" value={d.matin.end} onChange={e => setSchedule(p => ({ ...p, [day.id]: { ...p[day.id], matin: { ...p[day.id].matin, end: e.target.value } } }))} style={{border:'none', outline:'none', background:'transparent', padding:'0'}} />
                              </div>
                            </td>
                            <td style={{padding:'8px'}}>
                              <div style={{display:'flex', alignItems:'center', gap:'5px', color:'#555'}}>
                                <input type="time" value={d.aprem.start} onChange={e => setSchedule(p => ({ ...p, [day.id]: { ...p[day.id], aprem: { ...p[day.id].aprem, start: e.target.value } } }))} style={{border:'none', outline:'none', background:'transparent', padding:'0'}} />
                                -
                                <input type="time" value={d.aprem.end} onChange={e => setSchedule(p => ({ ...p, [day.id]: { ...p[day.id], aprem: { ...p[day.id].aprem, end: e.target.value } } }))} style={{border:'none', outline:'none', background:'transparent', padding:'0'}} />
                              </div>
                            </td>
                          </>
                        ) : (
                          <td colSpan="2" style={{padding:'8px', color:'#999', fontStyle:'italic'}}>Fermé</td>
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <h3 style={{fontSize:'16px', color:'#1e8a5e', marginBottom:'10px', borderBottom:'1px solid #e0e0e0', paddingBottom:'5px'}}>Services Offerts</h3>
            <div style={{display:'flex', flexWrap:'wrap', gap:'10px', marginBottom:'25px'}}>
               {availableServices.map(srv => {
                  const isActive = services.includes(srv.id);
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => toggleService(srv.id)}
                      style={{
                        padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500', transition: 'all 0.2s', border: '1.5px solid', cursor: 'pointer',
                        borderColor: isActive ? '#1e8a5e' : '#e0e0e0',
                        backgroundColor: isActive ? '#1e8a5e' : 'white',
                        color: isActive ? 'white' : '#555',
                      }}
                    >
                      {srv.label}
                    </button>
                  );
                })}
                {isAddingService ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <input
                      type="text"
                      value={newServiceLabel}
                      onChange={(e) => setNewServiceLabel(e.target.value)}
                      placeholder="Nouveau..."
                      style={{ padding: '6px 12px', fontSize: '13px', border: '1.5px solid #1e8a5e', borderRadius: '20px', outline: 'none', width: '120px' }}
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService())}
                    />
                    <button type="button" onClick={handleAddService} style={{ background:'#1e8a5e', color:'white', border:'none', borderRadius:'50%', width:'24px', height:'24px', cursor:'pointer' }}>+</button>
                    <button type="button" onClick={() => { setIsAddingService(false); setNewServiceLabel(""); }} style={{ background:'#e74c3c', color:'white', border:'none', borderRadius:'50%', width:'24px', height:'24px', cursor:'pointer' }}>✕</button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setIsAddingService(true)} style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '13px', border: '1.5px dashed #ccc', backgroundColor: 'transparent', color: '#666', cursor: 'pointer' }}>
                    + Ajouter
                  </button>
                )}
            </div>

            <div className="form-row" style={{marginTop:'20px'}}>
               <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => navigate('/pharmacien/create-password')}
                style={{marginBottom:'16px'}}
               >
                 ← Retour
               </button>
               <button type="submit" className="btn-primary">
                 Continuer →
               </button>
            </div>

          </form>
        </div>
      </div>
      <p className="page-footer">© 2026 MYPHARMA DIGITAL HEALTH</p>
    </div>
  );
}
