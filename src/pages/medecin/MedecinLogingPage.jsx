import React, { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const MedecinLogingPage = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setFileName(files[0].name);
    } else {
      setFileName("");
    }
  };

  return (
    <>
      <header>
        <div className="bloc-logo">
          <i className="fa-solid fa-house-medical" style={{ fontSize: '24px', color: '#137FEC' }}></i>
          <div className="texte-logo">
            <h1>MyPharma</h1>
            <p>Votre santé connectée en toute sécurité</p>
          </div>
        </div>
        <nav>
          <ul className="nav__links">
            <li><a href="#">Aide</a></li>
            <li><a href="#">Confidentialité</a></li>
            <li><a href="#" className="btn-support">Support</a></li>
          </ul>
        </nav>
      </header>

      <section className="inscr">
        <div className="form-card">
          <h1>Profil Professionnel</h1>
          <h5>Complétez vos informations pour valider votre accès praticien.</h5>

          <form className="form-container" onSubmit={(e) => e.preventDefault()}>
            <div className="ligne-horizontale">
              <div className="champ-formulaire-vertical specialite">
                <label htmlFor="specialite" className="label-titre">SPÉCIALITÉ MÉDICALE</label>
                <select id="specialite" name="specialite" required defaultValue="">
                  <option value="" disabled>Sélectionner une spécialité</option>
                  <option value="medecin_generaliste">Médecin généraliste (omnipraticien)</option>
                  <option value="cardiologue">Cardiologue</option>
                  <option value="dermatologue">Dermatologue</option>
                  <option value="pediatre">Pédiatre</option>
                </select>
              </div>

              <div className="champ-formulaire-vertical annee">
                <label htmlFor="annee" className="label-titre">ANNÉES D'EXPÉRIENCE</label>
                <input type="number" max="99" placeholder="Ex: 10" id="annee" />
              </div>
            </div>

            <div className="champ-formulaire-vertical">
              <label htmlFor="nb" className="label-titre">NUMÉRO RPPS / ADELI</label>
              <input type="number" max="9999999999" placeholder="11 chiffres (Ex: 10101234567)" id="nb" />
            </div>

            <div className="champ-formulaire-vertical">
              <label htmlFor="adresse" className="label-titre">LIEU D'EXERCICE / CABINET</label>
              <div className="input-icon">
                <i className="fa-solid fa-location-dot"></i>
                <input id="adresse" type="text" name="adresse" placeholder="Ex: 123 rue de la Santé, Bâtiment A..." />
              </div>
            </div>

            <div className="champ-formulaire-vertical upload-section">
              <div className="label-titre">DIPLÔMES & CERTIFICATIONS</div>
              <div className="zone-upload">
                <input type="file" id="diplome" accept=".pdf, .jpg, .jpeg, .png"
                  className="input-fichier-cache" onChange={handleFileChange} />
                <label htmlFor="diplome" className="boite-upload">
                  <div className="icone-cercle-vert">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                  </div>
                  <span className="texte-clic" style={fileName ? { color: "#137FEC", fontWeight: "bold" } : {}}>
                    {fileName ? fileName : "CLIQUEZ OU GLISSEZ VOS DOCUMENTS"}
                  </span>
                  <span className="texte-format">PDF, JPG OU PNG (MAX. 10MB)</span>
                </label>
              </div>
            </div>

            <button type="submit" className="FIN">Finaliser mon profil</button>
            <p className="securite">Vos données sont chiffrées et sécurisées par protocole AES-256</p>

            
          </form>
        </div>
        <div className="end"><p>Données sécurisées et confidentielles © 2026 MyPharma</p></div>
      </section>
    </>
  );
};

export default MedecinLogingPage;