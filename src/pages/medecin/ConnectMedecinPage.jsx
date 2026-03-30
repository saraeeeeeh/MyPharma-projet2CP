import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './MedecinPages.css';

const ConnectMedecinPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Veuillez remplir tous les champs s'il vous plaît.");
      return;
    }
    navigate('/medecin/dashboard');
  };

  return (
    <div className="medecin-bg">
      <Navbar />
      <div className="form-container">
        <div className="form-card">
          
          {/* Logo unifié */}
          <div className="form-logo">
             <span>⊕</span>
             <p>MyPharma</p>
          </div>

          <h2>Se Connecter</h2>
          <p className="form-subtitle">Accédez à votre compte professionnel en toute sécurité</p>

          <form onSubmit={handleLogin}>
            
            <div className="form-group">
              <label>Adresse Email</label>
              <input 
                type="email" 
                placeholder="docteur@exemple.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label>Mot de passe</label>
              <div className="input-icon">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            <div className="forgot-password">
               <span className="link">Mot de passe oublié ?</span>
            </div>

            <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '13px', color: '#666'}}>
              <input 
                type="checkbox" 
                id="save_info" 
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                style={{width: 'auto', cursor: 'pointer'}}
              />
              <label htmlFor="save_info" style={{margin: 0, fontWeight: 'normal', cursor: 'pointer', color: '#555'}}>Rester connecté</label>
            </div>

            <button type="submit" className="btn-primary">
              Se connecter →
            </button>

            {/* Séparateur */}
            <div className="separator">
              <span>ou</span>
            </div>

            {/* Pas encore de compte */}
            <div className="no-account-box">
              <p>Vous n'êtes pas encore partenaire ?</p>
              <button 
                type="button"
                className="btn-secondary" 
                onClick={() => navigate('/medecin/register')}
              >
                Créer un compte praticien
              </button>
            </div>

          </form>
        </div>
      </div>
      <p className="page-footer">© 2026 MYPHARMA DIGITAL HEALTH</p>
    </div>
  );
};

export default ConnectMedecinPage;