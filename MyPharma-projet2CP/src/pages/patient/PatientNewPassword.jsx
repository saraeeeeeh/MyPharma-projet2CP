import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './PatientPages.css';

function PatientNewPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    motDePasse: '',
    confirmer: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  function validate() {
    const newErrors = {};
    if (!form.motDePasse) newErrors.motDePasse = 'Le mot de passe est obligatoire';
    else if (form.motDePasse.length < 6) newErrors.motDePasse = 'Minimum 6 caractères';
    if (!form.confirmer) newErrors.confirmer = 'Veuillez confirmer le mot de passe';
    else if (form.motDePasse !== form.confirmer) newErrors.confirmer = 'Les mots de passe ne correspondent pas';
    return newErrors;
  }

  function handleSubmit() {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Plus tard on envoie au back-end
    setSuccess(true);
    setTimeout(() => navigate('/patient/login'), 2500);
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

          <div className="otp-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2c6fd4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>

          {success ? (
            // Message de succès
            <div className="success-box">
              <div className="success-icon">✓</div>
              <h2>Mot de passe modifié !</h2>
              <p>Vous allez être redirigé vers la page de connexion...</p>
            </div>
          ) : (
            <>
              <h2>Nouveau mot de passe</h2>
              <p className="form-subtitle">
                Choisissez un nouveau mot de passe sécurisé.
              </p>

              {/* Nouveau mot de passe */}
              <div className="form-group">
                <label>Nouveau mot de passe</label>
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

              {/* Confirmer mot de passe */}
              <div className="form-group">
                <label>Confirmer le mot de passe</label>
                <div className="input-icon">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    name="confirmer"
                    placeholder="••••••••"
                    value={form.confirmer}
                    onChange={handleChange}
                    className={errors.confirmer ? 'input-error' : ''}
                  />
                  <span onClick={() => setShowConfirm(!showConfirm)} style={{ cursor: 'pointer' }}>
                    <EyeIcon visible={showConfirm} />
                  </span>
                </div>
                {errors.confirmer && <span className="error-msg">{errors.confirmer}</span>}
              </div>

              <button className="btn-primary" onClick={handleSubmit}>
                Confirmer →
              </button>
            </>
          )}

        </div>
      </div>
      <p className="page-footer">© 2024 MYPHARMA DIGITAL HEALTH</p>
    </div>
  );
}

export default PatientNewPassword;
