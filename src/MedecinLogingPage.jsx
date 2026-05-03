import React, { useState } from 'react';
import './style.css';
import { useNavigate, Link } from 'react-router-dom';

const MedecinLogingPage = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");

  // ✅ Tous les champs avec useState
  const [sexe, setSexe] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [experience, setExperience] = useState("");
  const [rpps, setRpps] = useState("");
  const [adeli, setAdeli] = useState("");
  const [adresse, setAdresse] = useState("");

  const handleFileChange = (event) => {
    const files = event.target.files;
    setFileName(files.length > 0 ? files[0].name : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Récupère les données de l'étape 1
    const etape1 = JSON.parse(localStorage.getItem("medecinEtape1") || "{}");

    // ✅ Fusionne tout en un seul objet
    const medecinComplet = {
      ...etape1,
      sexe,
      wilaya,
      specialite,
      experience,
      rpps,
      adeli,
      adresse,
      diplome: fileName,
    };

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medecinComplet)
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erreur: ${errorData.message}`);
        return;
      }

      const data = await response.json();
      console.log("Inscription réussie", data);

      // Pour la simulation de session (en l'absence de gestion complète de state global pour le moment)
      localStorage.setItem("medecinConnecte", JSON.stringify({ ...medecinComplet, id: data.medecinId }));
      
      navigate("/connect"); // → Rediriger vers la page de connexion au lieu du profil directement
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      alert("Erreur de connexion au serveur.");
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
            <li><Link to="/aide">Aide</Link></li>
            <li><Link to="/confidentialite">Confidentialité</Link></li>
            <li><Link to="/aide" className="btn-support">Support</Link></li>
          </ul>
        </nav>
      </header>

      <section className="inscr">
        <div className="form-card">
          <h1>Profil Professionnel</h1>
          <h5>Complétez vos informations pour valider votre accès praticien.</h5>

          <form className="form-container" onSubmit={handleSubmit}>

            <div className="section-titre">
              <i className="fa-solid fa-user-doctor" style={{ color: "#137FEC" }}></i>
              Informations personnelles
            </div>

            <div className="ligne-horizontale">
              <div className="champ-formulaire-vertical">
                <label htmlFor="sexe" className="label-titre">SEXE</label>
                <select id="sexe" value={sexe} onChange={(e) => setSexe(e.target.value)} required>
                  <option value="" disabled>Sélectionner</option>
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
              </div>

              <div className="champ-formulaire-vertical">
                <label htmlFor="wilaya" className="label-titre">WILAYA</label>
                <select id="wilaya" value={wilaya} onChange={(e) => setWilaya(e.target.value)} required>
                  <option value="" disabled>Sélectionner une wilaya</option>
                  <option value="01 - Adrar">01 - Adrar</option>
                  <option value="02 - Chlef">02 - Chlef</option>
                  <option value="03 - Laghouat">03 - Laghouat</option>
                  <option value="04 - Oum El Bouaghi">04 - Oum El Bouaghi</option>
                  <option value="05 - Batna">05 - Batna</option>
                  <option value="06 - Béjaïa">06 - Béjaïa</option>
                  <option value="07 - Biskra">07 - Biskra</option>
                  <option value="08 - Béchar">08 - Béchar</option>
                  <option value="09 - Blida">09 - Blida</option>
                  <option value="10 - Bouira">10 - Bouira</option>
                  <option value="11 - Tamanrasset">11 - Tamanrasset</option>
                  <option value="12 - Tébessa">12 - Tébessa</option>
                  <option value="13 - Tlemcen">13 - Tlemcen</option>
                  <option value="14 - Tiaret">14 - Tiaret</option>
                  <option value="15 - Tizi Ouzou">15 - Tizi Ouzou</option>
                  <option value="16 - Alger">16 - Alger</option>
                  <option value="17 - Djelfa">17 - Djelfa</option>
                  <option value="18 - Jijel">18 - Jijel</option>
                  <option value="19 - Sétif">19 - Sétif</option>
                  <option value="20 - Saïda">20 - Saïda</option>
                  <option value="21 - Skikda">21 - Skikda</option>
                  <option value="22 - Sidi Bel Abbès">22 - Sidi Bel Abbès</option>
                  <option value="23 - Annaba">23 - Annaba</option>
                  <option value="24 - Guelma">24 - Guelma</option>
                  <option value="25 - Constantine">25 - Constantine</option>
                  <option value="26 - Médéa">26 - Médéa</option>
                  <option value="27 - Mostaganem">27 - Mostaganem</option>
                  <option value="28 - M'Sila">28 - M'Sila</option>
                  <option value="29 - Mascara">29 - Mascara</option>
                  <option value="30 - Ouargla">30 - Ouargla</option>
                  <option value="31 - Oran">31 - Oran</option>
                  <option value="32 - El Bayadh">32 - El Bayadh</option>
                  <option value="33 - Illizi">33 - Illizi</option>
                  <option value="34 - Bordj Bou Arréridj">34 - Bordj Bou Arréridj</option>
                  <option value="35 - Boumerdès">35 - Boumerdès</option>
                  <option value="36 - El Tarf">36 - El Tarf</option>
                  <option value="37 - Tindouf">37 - Tindouf</option>
                  <option value="38 - Tissemsilt">38 - Tissemsilt</option>
                  <option value="39 - El Oued">39 - El Oued</option>
                  <option value="40 - Khenchela">40 - Khenchela</option>
                  <option value="41 - Souk Ahras">41 - Souk Ahras</option>
                  <option value="42 - Tipaza">42 - Tipaza</option>
                  <option value="43 - Mila">43 - Mila</option>
                  <option value="44 - Aïn Defla">44 - Aïn Defla</option>
                  <option value="45 - Naâma">45 - Naâma</option>
                  <option value="46 - Aïn Témouchent">46 - Aïn Témouchent</option>
                  <option value="47 - Ghardaïa">47 - Ghardaïa</option>
                  <option value="48 - Relizane">48 - Relizane</option>
                  <option value="49 - Timimoun">49 - Timimoun</option>
                  <option value="50 - Bordj Badji Mokhtar">50 - Bordj Badji Mokhtar</option>
                  <option value="51 - Ouled Djellal">51 - Ouled Djellal</option>
                  <option value="52 - Béni Abbès">52 - Béni Abbès</option>
                  <option value="53 - In Salah">53 - In Salah</option>
                  <option value="54 - In Guezzam">54 - In Guezzam</option>
                  <option value="55 - Touggourt">55 - Touggourt</option>
                  <option value="56 - Djanet">56 - Djanet</option>
                  <option value="57 - El M'Ghaier">57 - El M'Ghaier</option>
                  <option value="58 - El Menia">58 - El Menia</option>
                </select>
              </div>
            </div>

            <div className="section-titre" style={{ marginTop: "20px" }}>
              <i className="fa-solid fa-stethoscope" style={{ color: "#137FEC" }}></i>
              Informations professionnelles
            </div>

            <div className="ligne-horizontale">
              <div className="champ-formulaire-vertical specialite">
                <label htmlFor="specialite" className="label-titre">SPÉCIALITÉ MÉDICALE</label>
                <select id="specialite" value={specialite}
                  onChange={(e) => setSpecialite(e.target.value)} required>
                  <option value="" disabled>Sélectionner une spécialité</option>
                  <option value="Médecin généraliste">Médecin généraliste</option>
                  <option value="Cardiologue">Cardiologue</option>
                  <option value="Dermatologue">Dermatologue</option>
                  <option value="Pédiatre">Pédiatre</option>
                  <option value="Neurologue">Neurologue</option>
                  <option value="Ophtalmologue">Ophtalmologue</option>
                  <option value="Gynécologue">Gynécologue</option>
                  <option value="Orthopédiste">Orthopédiste</option>
                  <option value="Psychiatre">Psychiatre</option>
                  <option value="Radiologue">Radiologue</option>
                </select>
              </div>

              <div className="champ-formulaire-vertical annee">
                <label htmlFor="annee" className="label-titre">ANNÉES D'EXPÉRIENCE</label>
                <input type="number" min="0" max="99" placeholder="Ex: 10" id="annee"
                  value={experience} onChange={(e) => setExperience(e.target.value)} />
              </div>
            </div>

            <div className="ligne-horizontale">
              <div className="champ-formulaire-vertical">
                <label htmlFor="rpps" className="label-titre">NUMÉRO RPPS</label>
                <div className="input-icon">
                  <i className="fa-solid fa-id-card"></i>
                  <input type="text" inputMode="numeric" maxLength="11"
                    placeholder="11 chiffres" id="rpps"
                    value={rpps} onChange={(e) => setRpps(e.target.value)} />
                </div>
              </div>

              <div className="champ-formulaire-vertical">
                <label htmlFor="adeli" className="label-titre">NUMÉRO ADELI</label>
                <div className="input-icon">
                  <i className="fa-solid fa-hashtag"></i>
                  <input type="text" inputMode="numeric" maxLength="9"
                    placeholder="9 chiffres" id="adeli"
                    value={adeli} onChange={(e) => setAdeli(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="champ-formulaire-vertical">
              <label htmlFor="adresse" className="label-titre">LIEU D'EXERCICE / CABINET</label>
              <div className="input-icon">
                <i className="fa-solid fa-location-dot"></i>
                <input id="adresse" type="text" placeholder="Ex: 123 rue de la Santé..."
                  value={adresse} onChange={(e) => setAdresse(e.target.value)} />
              </div>
            </div>

            <div className="section-titre" style={{ marginTop: "20px" }}>
              <i className="fa-solid fa-file-medical" style={{ color: "#137FEC" }}></i>
              Diplômes & certifications
            </div>

            <div className="champ-formulaire-vertical upload-section">
              <div className="zone-upload">
                <input type="file" id="diplome" accept=".pdf,.jpg,.jpeg,.png"
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

            <button type="button" className="FIN" onClick={handleSubmit}>Finaliser mon profil</button>
            <p className="securite">Vos données sont chiffrées et sécurisées par protocole AES-256</p>

          </form>
        </div>
      </section>

      <footer>
        <ul>
          <li><Link to="/confidentialite">Conditions d'utilisation</Link></li>
          <li><Link to="/confidentialite">Politique de confidentialité</Link></li>
          <li><Link to="/confidentialite">Mentions légales</Link></li>
        </ul>
        <div>© 2026 MyPharma. Tous droits réservés</div>
      </footer>
    </>
  );
};

export default MedecinLogingPage;