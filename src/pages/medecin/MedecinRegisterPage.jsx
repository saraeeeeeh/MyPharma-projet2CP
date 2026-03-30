import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './MedecinPages.css';

const MedecinRegisterPage = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (password === "" || confirmPassword === "") {
      setErrorMsg("Veuillez remplir les deux champs de mot de passe.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Les mots de passe ne correspondent pas !");
      setConfirmPassword("");
      return;
    }
    setErrorMsg('');
    navigate('/medecin/profil');
  };

  return (
    <div className="medecin-bg">
      <Navbar />
      <div className="form-container">
        <div className="form-card wide">
          
          <div className="form-logo">
             <span>⊕</span>
             <p>Espace Praticien</p>
          </div>
          <h2>Création de compte</h2>
          <p className="form-subtitle">Créez votre compte sécurisé en quelques instants</p>

          <form onSubmit={handleRegister}>
            {errorMsg && <p className="error-msg" style={{textAlign: 'center', marginBottom:'15px', fontSize:'14px'}}>{errorMsg}</p>}
            
            <div className="form-row">
              <div className="form-group">
                <label>Nom Complet</label>
                <div className="input-icon">
                   <input required type="text" placeholder="Dr. Jean Dupont" value={nom} onChange={e => setNom(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Numéro de téléphone</label>
                <div className="input-icon">
                   <input required type="text" placeholder="+213..." value={telephone} onChange={e => setTelephone(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Adresse Email</label>
              <div className="input-icon">
                 <input required type="email" placeholder="docteur@exemple.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mot de passe</label>
                <div className="input-icon">
                   <input required type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                   <span onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '👁️'}</span>
                </div>
              </div>
              <div className="form-group">
                <label>Confirmer le mot de passe</label>
                <div className="input-icon">
                   <input required type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                   <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? '🙈' : '👁️'}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Date de naissance</label>
              <input required type="date" value={dateNaissance} onChange={e => setDateNaissance(e.target.value)} />
            </div>

            <div className="no-account-box" style={{marginBottom: '20px', fontSize: '12px', padding: '12px', background: '#e8f0fd', border: '1px solid #c8dbf9'}}>
              🛡️ Vos données sont chiffrées selon les normes HDS en vigueur.
            </div>

            <button type="submit" className="btn-primary">
              S'enregistrer →
            </button>
            
            <div style={{textAlign: 'center', fontSize: '13px', marginTop: '10px'}}>
              Vous avez déjà un compte ? <span className="link" onClick={() => navigate('/medecin/login')}>Se connecter</span>
            </div>

          </form>
        </div>
      </div>
      <p className="page-footer">© 2026 MYPHARMA DIGITAL HEALTH</p>
    </div>
  );
};

export default MedecinRegisterPage;