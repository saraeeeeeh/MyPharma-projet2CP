import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './PatientPages.css';

const maladiesDisponibles = [
  'Diabète type 1', 'Diabète type 2', 'Hypertension', 'Asthme',
  'Insuffisance cardiaque', 'Insuffisance rénale', 'Insuffisance hépatique',
  'Épilepsie', 'Parkinson', 'Alzheimer', 'Sclérose en plaques',
  'Polyarthrite rhumatoïde', 'Lupus', 'Thyroïde (hypothyroïdie)',
  'Thyroïde (hyperthyroïdie)', 'Dépression', 'Anxiété chronique',
  'Schizophrénie', 'Troubles bipolaires', 'Anémie', 'Drépanocytose',
  'Cancer', 'VIH / SIDA', 'Hépatite B', 'Hépatite C',
  'Tuberculose', 'BPCO', 'Reflux gastrique (RGO)', 'Ulcère gastrique',
  'Maladie de Crohn', 'Colite ulcéreuse', 'Obésité', 'Ostéoporose'
];

const allergiesMedicaments = [
  'Pénicilline', 'Amoxicilline', 'Ampicilline',
  'Aspirine (Acide acétylsalicylique)', 'Ibuprofène', 'Kétoprofène',
  'Paracétamol', 'Codéine', 'Morphine', 'Tramadol',
  'Sulfamides', 'Tétracyclines', 'Érythromycine', 'Clarithromycine',
  'Ciprofloxacine', 'Métronidazole', 'Vancomycine',
  'Carbamazépine', 'Phénytoïne', 'Lamotrigine',
  'Insuline', 'Metformine',
  'Héparine', 'Warfarine',
  'IEC (Captopril, Énalapril)', 'Bêtabloquants', 'Statines',
  'Produits de contraste iodés', 'Latex (gants médicaux)'
];

function PatientHealthProfile({ isDashboardMode = false }) {
  const navigate = useNavigate();

  const [maladiesSelectionnees, setMaladiesSelectionnees] = useState([]);
  const [autresMaladies, setAutresMaladies] = useState('');
  const [showAutresMaladies, setShowAutresMaladies] = useState(false);

  const [allergiesSelectionnees, setAllergiesSelectionnees] = useState([]);
  const [autresAllergies, setAutresAllergies] = useState('');
  const [showAutresAllergies, setShowAutresAllergies] = useState(false);

  const [form, setForm] = useState({
    antecedents: '',
    groupeSanguin: '',
    poids: '',
    taille: '',
    traitements: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function toggleMaladie(maladie) {
    if (maladie === 'Autres') {
      setShowAutresMaladies(!showAutresMaladies);
      return;
    }
    if (maladiesSelectionnees.includes(maladie)) {
      setMaladiesSelectionnees(maladiesSelectionnees.filter(m => m !== maladie));
    } else {
      setMaladiesSelectionnees([...maladiesSelectionnees, maladie]);
    }
  }

  function toggleAllergie(allergie) {
    if (allergie === 'Autres') {
      setShowAutresAllergies(!showAutresAllergies);
      return;
    }
    if (allergiesSelectionnees.includes(allergie)) {
      setAllergiesSelectionnees(allergiesSelectionnees.filter(a => a !== allergie));
    } else {
      setAllergiesSelectionnees([...allergiesSelectionnees, allergie]);
    }
  }

  const content = (
    <div className={`form-card ${isDashboardMode ? '' : 'wide'}`} style={isDashboardMode ? { boxShadow: 'none', padding: '0', width: '100%' } : {}}>
      {!isDashboardMode && <h2>Votre profil santé</h2>}
      {!isDashboardMode && <p className="form-subtitle">Ces informations permettent à nos pharmaciens de mieux vous conseiller.</p>}

          {/* Maladies chroniques */}
<div className="form-group">
  <label> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2c6fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px', verticalAlign:'middle'}}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
   Maladies chroniques connues</label>
  <select
    onChange={e => {
      const val = e.target.value;
      if (val === '') return;
      if (val === 'Autres') {
        setShowAutresMaladies(true);
        return;
      }
      if (!maladiesSelectionnees.includes(val)) {
        setMaladiesSelectionnees([...maladiesSelectionnees, val]);
      }
      e.target.value = ''; // remet à "Sélectionner" après choix
    }}
  >
    <option value="">Sélectionner une maladie</option>
    {maladiesDisponibles.map(m => (
      <option key={m} value={m}>{m}</option>
    ))}
    <option value="Autres">Autres...</option>
  </select>

  {/* Tags des maladies sélectionnées */}
  {maladiesSelectionnees.length > 0 && (
    <div className="selected-tags">
      {maladiesSelectionnees.map((m, i) => (
        <span key={i} className="tag">
          {m}
          <span className="tag-remove" onClick={() => setMaladiesSelectionnees(maladiesSelectionnees.filter((_, idx) => idx !== i))}>×</span>
        </span>
      ))}
    </div>
  )}

  {/* Champ "Autres" */}
  {showAutresMaladies && (
    <div className="autres-input">
      <input
        type="text"
        placeholder="Précisez votre maladie..."
        value={autresMaladies}
        onChange={e => setAutresMaladies(e.target.value)}
      />
      <button onClick={() => {
        if (autresMaladies.trim()) {
          setMaladiesSelectionnees([...maladiesSelectionnees, autresMaladies.trim()]);
          setAutresMaladies('');
          setShowAutresMaladies(false);
        }
      }}>Ajouter</button>
    </div>
  )}
</div>

          {/* Antécédents */}
          <div className="form-group">
            <label> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2c6fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px', verticalAlign:'middle'}}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
   Antécédents médicaux</label>
            <textarea
              name="antecedents"
              placeholder="Interventions chirurgicales, hospitalisations passées..."
              value={form.antecedents}
              onChange={handleChange}
              rows={3}
            />
          </div>

          {/* Groupe sanguin + Poids + Taille */}
          <div className="form-row">
            <div className="form-group">
              <label>  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2c6fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px', verticalAlign:'middle'}}>
    <path d="M12 2C12 2 4 10 4 15a8 8 0 0016 0C20 10 12 2 12 2z"/>
  </svg>
   Groupe sanguin</label>
              <select name="groupeSanguin" value={form.groupeSanguin} onChange={handleChange}>
                <option value="">Sélectionner</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option>
                <option>O+</option><option>O-</option>
              </select>
            </div>
            <div className="form-group small">
              <label>Poids (kg)</label>
              <input type="number" name="poids" placeholder="70" value={form.poids} onChange={handleChange} />
            </div>
            <div className="form-group small">
              <label>Taille (cm)</label>
              <input type="number" name="taille" placeholder="175" value={form.taille} onChange={handleChange} />
            </div>
          </div>

           {/* Allergies médicaments */}
<div className="form-group">
  <label> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2c6fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px', verticalAlign:'middle'}}>
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
   Allergies aux médicaments</label>
  <select
    onChange={e => {
      const val = e.target.value;
      if (val === '') return;
      if (val === 'Autres') {
        setShowAutresAllergies(true);
        return;
      }
      if (!allergiesSelectionnees.includes(val)) {
        setAllergiesSelectionnees([...allergiesSelectionnees, val]);
      }
      e.target.value = '';
    }}
  >
    <option value="">Sélectionner une allergie</option>
    {allergiesMedicaments.map(a => (
      <option key={a} value={a}>{a}</option>
    ))}
    <option value="Autres">Autres...</option>
  </select>

  {/* Tags des allergies sélectionnées */}
  {allergiesSelectionnees.length > 0 && (
    <div className="selected-tags">
      {allergiesSelectionnees.map((a, i) => (
        <span key={i} className="tag allergie">
          {a}
          <span className="tag-remove" onClick={() => setAllergiesSelectionnees(allergiesSelectionnees.filter((_, idx) => idx !== i))}>×</span>
        </span>
      ))}
    </div>
  )}

  {/* Champ "Autres" */}
  {showAutresAllergies && (
    <div className="autres-input">
      <input
        type="text"
        placeholder="Précisez votre allergie médicamenteuse..."
        value={autresAllergies}
        onChange={e => setAutresAllergies(e.target.value)}
      />
      <button onClick={() => {
        if (autresAllergies.trim()) {
          setAllergiesSelectionnees([...allergiesSelectionnees, autresAllergies.trim()]);
          setAutresAllergies('');
          setShowAutresAllergies(false);
        }
      }}>Ajouter</button>
    </div>
  )}
</div>

          {/* Traitements en cours */}
          <div className="form-group">
            <label>     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2c6fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px', verticalAlign:'middle'}}>
    <rect x="3" y="8" width="18" height="8" rx="4"/>
    <line x1="12" y1="8" x2="12" y2="16"/>
  </svg>
   Traitements en cours</label>
            <input
              type="text"
              name="traitements"
              placeholder="Médicaments pris régulièrement..."
              value={form.traitements}
              onChange={handleChange}
            />
          </div>

          <button className="btn-primary" onClick={() => navigate('/patient/dashboard')}>
            {isDashboardMode ? "Sauvegarder le profil de santé ✓" : "Terminer mon profil ✓"}
          </button>

          {!isDashboardMode && (
            <p className="form-footer">
              <span className="link" onClick={() => navigate('/patient/dashboard')}>
                Passer cette étape pour le moment
              </span>
            </p>
          )}

        </div>
  );

  if (isDashboardMode) return content;

  return (
    <div className="patient-bg">
      <Navbar />
      <div className="form-container">
        {content}
      </div>
      <p className="page-footer">DONNÉES SÉCURISÉES ET CONFIDENTIELLES © 2026 MYPHARMA</p>
    </div>
  );
}

export default PatientHealthProfile;
