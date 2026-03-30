import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './PatientPages.css';

function PatientRegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    nom: '',
    email: '',
    jour: '',
    mois: '',
    annee: '',
    motDePasse: ''
  });

  // Générer les jours (1-31)
  const jours = Array.from({ length: 31 }, (_, i) => i + 1);

  // Les mois
  const mois = [
    { value: '01', label: 'Janvier' },
    { value: '02', label: 'Février' },
    { value: '03', label: 'Mars' },
    { value: '04', label: 'Avril' },
    { value: '05', label: 'Mai' },
    { value: '06', label: 'Juin' },
    { value: '07', label: 'Juillet' },
    { value: '08', label: 'Août' },
    { value: '09', label: 'Septembre' },
    { value: '10', label: 'Octobre' },
    { value: '11', label: 'Novembre' },
    { value: '12', label: 'Décembre' }
  ];

  // Générer les années (1940 - année actuelle)
  const anneeActuelle = new Date().getFullYear();
  const annees = Array.from(
    { length: anneeActuelle - 1940 + 1 },
    (_, i) => anneeActuelle - i
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Efface l'erreur quand l'utilisateur commence à taper
    setErrors({ ...errors, [e.target.name]: '' });
  }

  function validate() {
    const newErrors = {};
    if (!form.nom.trim()) newErrors.nom = 'Le nom est obligatoire';
    if (!form.email.trim()) newErrors.email = "L'email est obligatoire";
    if (!form.jour) newErrors.date = 'Le jour est obligatoire';
    if (!form.mois) newErrors.date = 'Le mois est obligatoire';
    if (!form.annee) newErrors.date = 'L\'année est obligatoire';
    if (!form.motDePasse) newErrors.motDePasse = 'Le mot de passe est obligatoire';
    else if (form.motDePasse.length < 6) newErrors.motDePasse = 'Minimum 6 caractères';
    return newErrors;
  }

  function handleSubmit() {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // ❌ bloque si erreurs
    }
    navigate('/patient/health-profile'); // ✅ contourne l'envoie d'email
  }

  return (
    <div className="patient-bg">
      <Navbar />
      <div className="form-container">
        <div className="form-card">

          <div className="form-logo">
            <span>⊕</span>
            <p>MyPharma</p>
          </div>

          <h2>Créer votre compte</h2>
          <p className="form-subtitle">
            Rejoignez notre plateforme de santé moderne et simplifiée pour gérer vos ordonnances.
          </p>

          {/* Nom complet */}
          <div className="form-group">
            <label>Nom complet</label>
            <input
              type="text"
              name="nom"
              placeholder="Jean Dupont"
              value={form.nom}
              onChange={handleChange}
              className={errors.nom ? 'input-error' : ''}
            />
            {errors.nom && <span className="error-msg">{errors.nom}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email ou Numéro de téléphone</label>
            <input
              type="text"
              name="email"
              placeholder="exemple@email.com"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          {/* Date de naissance */}
          <div className="form-group">
            <label>Date de naissance</label>
            <div className="date-selects">
              <select
                name="jour"
                value={form.jour}
                onChange={handleChange}
                className={errors.date ? 'input-error' : ''}
              >
                <option value="">Jour</option>
                {jours.map(j => (
                  <option key={j} value={j}>{j}</option>
                ))}
              </select>

              <select
                name="mois"
                value={form.mois}
                onChange={handleChange}
                className={errors.date ? 'input-error' : ''}
              >
                <option value="">Mois</option>
                {mois.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>

              <select
                name="annee"
                value={form.annee}
                onChange={handleChange}
                className={errors.date ? 'input-error' : ''}
              >
                <option value="">Année</option>
                {annees.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            {errors.date && <span className="error-msg">{errors.date}</span>}
          </div>

          {/* Mot de passe */}
          <div className="form-group">
            <label>Mot de passe</label>
            <div className="input-icon">
              <input
                type={showPassword ? 'text' : 'password'}
                name="motDePasse"
                placeholder="••••••••"
                value={form.motDePasse}
                onChange={handleChange}
                className={errors.motDePasse ? 'input-error' : ''}
              />
              {/* Icône SVG professionnelle */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? (
                  // Oeil barré
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  // Oeil normal
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </span>
            </div>
            {errors.motDePasse && <span className="error-msg">{errors.motDePasse}</span>}
          </div>

          {/* Checkbox */}
          <div className="checkbox-group">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              J'accepte les <span className="link">Conditions d'Utilisation</span> et la <span className="link">Politique de Confidentialité</span>.
            </label>
          </div>

          <button className="btn-primary" onClick={handleSubmit}>
            Créer un compte ✓
          </button>

          <p className="form-footer">
            Déjà un compte ? <span className="link" onClick={() => navigate('/patient/login')}>Se connecter</span>
          </p>

        </div>
      </div>
      <p className="page-footer">© 2024 MYPHARMA DIGITAL HEALTH</p>
    </div>
  );
}

export default PatientRegisterPage;