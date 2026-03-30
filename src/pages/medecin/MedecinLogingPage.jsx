import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './MedecinPages.css'; 

const MedecinLogingPage = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setFileName(files[0].name);
    } else {
      setFileName("");
    }
  };

  const handleSubmitProfile = (e) => {
    e.preventDefault();
    alert('Profil professionnel finalisé !');
    navigate('/medecin/dashboard');
  };

  return (
    <div className="medecin-bg">
      <Navbar />
      <div className="form-container">
        <div className="form-card wide">
          
          <div className="form-logo">
             <span>⊕</span>
             <p>MyPharma</p>
          </div>
          <h2>Profil Professionnel</h2>
          <p className="form-subtitle">Complétez vos informations pour valider votre accès praticien.</p>

          <form onSubmit={handleSubmitProfile}>
            
            <div className="form-row">
              <div className="form-group">
                <label>Spécialité Médicale</label>
                <select required defaultValue="">
                  <option value="" disabled>Sélectionner une spécialité</option>
                  <option value="medecin_generaliste">Médecin généraliste</option>
                  <option value="cardiologue">Cardiologue</option>
                  <option value="dermatologue">Dermatologue</option>
                  <option value="pediatre">Pédiatre</option>
                </select>
              </div>

              <div className="form-group">
                <label>Années d'expérience</label>
                <input required type="number" max="99" placeholder="Ex: 10" />
              </div>
            </div>

            <div className="form-group">
              <label>Numéro RPPS / ADELI</label>
              <input required type="number" placeholder="11 chiffres (Ex: 10101234567)" />
            </div>

            <div className="form-group">
              <label>Lieu d'exercice / Cabinet</label>
              <div className="input-icon">
                 <input required type="text" placeholder="Ex: 123 rue de la Santé..." style={{paddingRight: '12px'}} />
              </div>
            </div>

            <div className="form-group" style={{marginTop: '20px'}}>
              <label>Diplômes & Certifications</label>
              <div 
                style={{
                  border: '2px dashed #b9d0f5', borderRadius: '12px', padding: '30px', 
                  textAlign: 'center', background: '#f8fbff', cursor: 'pointer', position: 'relative'
                }}
              >
                <input 
                  type="file" 
                  accept=".pdf, .jpg, .jpeg, .png" 
                  onChange={handleFileChange}
                  style={{opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer'}} 
                />
                <div style={{color: '#2c6fd4', fontSize: '24px', marginBottom: '10px'}}>
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                </div>
                <p style={{fontSize: '14px', fontWeight: '600', color: fileName ? '#2c6fd4' : '#1a1a2e'}}>
                  {fileName ? fileName : "CLIQUEZ OU GLISSEZ VOS DOCUMENTS"}
                </p>
                <p style={{fontSize: '11px', color: '#888', marginTop: '4px'}}>PDF, JPG OU PNG (MAX. 10MB)</p>
              </div>
            </div>

            <button type="submit" className="btn-primary">
              Finaliser mon profil →
            </button>
            <p style={{textAlign: 'center', fontSize: '12px', color: '#888'}}>
               Vos données sont chiffrées et sécurisées par protocole AES-256
            </p>

          </form>
        </div>
      </div>
      <p className="page-footer">© 2026 MYPHARMA DIGITAL HEALTH</p>
    </div>
  );
};

export default MedecinLogingPage;