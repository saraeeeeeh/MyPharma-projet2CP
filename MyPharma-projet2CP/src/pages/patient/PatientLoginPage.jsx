import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './PatientPages.css';

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: '',
    motDePasse: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  function validate() {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "L'email est obligatoire";
    if (!form.motDePasse) newErrors.motDePasse = 'Le mot de passe est obligatoire';
    return newErrors;
  }

  function handleLogin() {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Plus tard ici on connecte avec le back-end Node.js
    navigate('/patient/dashboard');
  }

  const EyeIcon = ({ visible }) => visible ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  return (
    <div className="patient-bg">
      <Navbar />
      <div className="form-container">
        <div className="form-card">

          <div className="form-logo">
            <span>⊕</span>
            <p>MyPharma</p>
          </div>

          <h2>Bon retour !</h2>
          <p className="form-subtitle">
            Connectez-vous à votre espace santé sécurisé.
          </p>

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
              <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                <EyeIcon visible={showPassword} />
              </span>
            </div>
            {errors.motDePasse && <span className="error-msg">{errors.motDePasse}</span>}
          </div>

          <p className="forgot-password">
            <span className="link" onClick={() => navigate('/patient/forgot-password')}>
              Mot de passe oublié ?
            </span>
          </p>

          <button className="btn-primary" onClick={handleLogin}>
            Se connecter →
          </button>

          <div className="separator">
            <span>ou</span>
          </div>

          <div className="no-account-box">
            <p>Vous n'avez pas de compte ?</p>
            <button
              className="btn-secondary"
              onClick={() => navigate('/patient/register')}
            >
              Créer un nouveau compte
            </button>
          </div>

        </div>
      </div>
      <p className="page-footer">© 2024 MYPHARMA DIGITAL HEALTH</p>
    </div>
  );
}

export default LoginPage;
