import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './PatientPages.css';

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    motDePasse: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleLogin() {
    // Plus tard ici on connecte avec le back-end Node.js
    navigate('/patient/health-profile');
  }

  return (
    <div className="patient-bg">
      <Navbar />
      <div className="form-container">
        <div className="form-card">

          {/* Logo */}
          <div className="form-logo">
            <span>⊕</span>
            <p>MyPharma</p>
          </div>

          <h2>Bon retour !</h2>
          <p className="form-subtitle">
            Connectez-vous à votre espace santé sécurisé.
          </p>

          <div className="form-group">
            <label>Email ou Numéro de téléphone</label>
            <input
              type="text"
              name="email"
              placeholder="exemple@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <div className="input-icon">
              <input
                type={showPassword ? 'text' : 'password'}
                name="motDePasse"
                placeholder="••••••••"
                value={form.motDePasse}
                onChange={handleChange}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

          
          <p className="forgot-password">
  <span className="link" onClick={() => navigate('/patient/forgot-password')}>
    Mot de passe oublié ?
  </span>
</p>

          <button className="btn-primary" onClick={handleLogin}>
            Se connecter →
          </button>

          {/* Séparateur */}
          <div className="separator">
            <span>ou</span>
          </div>

          {/* Pas encore de compte */}
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