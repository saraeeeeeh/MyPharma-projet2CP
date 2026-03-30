import React, { useState } from 'react';
import './style2.css';
import { Link, useNavigate } from 'react-router-dom';

const MedecinRegisterForm = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (password === "" || confirmPassword === "") {
      alert("Veuillez remplir les deux champs de mot de passe.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Erreur : Les mots de passe ne correspondent pas !");
      setConfirmPassword("");
      return;
    }

    navigate("/");
  };

  return (
    <>
      <header>
        <div className="bloc-logo">
          <i className="fa-solid fa-house-medical" style={{ fontSize: "24px", color: "#137FEC" }}></i>
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
          <div style={{ textAlign: "center", fontSize: "30px", color: "#137FEC", marginBottom: "10px" }}>
            <i className="fa-solid fa-stethoscope"></i>
          </div>
          <h1>Espace Praticien</h1>
          <h5>Créez votre compte sécurisé en quelques instants</h5>

          <form className="form-container" onSubmit={handleRegister}>
            <div className="champ-formulaire">
              <label htmlFor="NOM">NOM COMPLET</label>
              <div className="input-icon">
                <i className="fa-solid fa-user"></i>
                <input
                  type="text"
                  placeholder="Dr. Jean Dupont"
                  id="NOM"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="champ-formulaire">
              <label htmlFor="nb">NUMÉRO DE TÉLÉPHONE</label>
              <div className="input-icon">
                <i className="fa-solid fa-phone"></i>
                <input
                  type="number"
                  placeholder="+213..."
                  id="nb"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="champ-formulaire">
              <label htmlFor="EML">ADRESSE EMAIL</label>
              <div className="input-icon">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  placeholder="docteur@exemple.com"
                  id="EML"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="ligne-horizontale">
              <div className="champ-formulaire pass">
                <label htmlFor="ps">MOT DE PASSE</label>
                <div className="input-icon">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type="password"
                    id="ps"
                    placeholder="......"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="champ-formulaire Cpass">
                <label htmlFor="Cps">CONFIRMER</label>
                <div className="input-icon">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    type="password"
                    id="Cps"
                    placeholder="......"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="champ-formulaire">
              <label htmlFor="DT">DATE DE NAISSANCE</label>
              <input
                type="date"
                id="DT"
                value={dateNaissance}
                onChange={(e) => setDateNaissance(e.target.value)}
                required
              />
            </div>

            <div className="boite-securite">
              <i className="fa-solid fa-shield-halved"></i>
              <p>Vos données sont chiffrées selon les normes HDS (Hébergeur de Données de Santé) en vigueur.</p>
            </div>

            <button type="submit" className="FIN">
              S'enregistrer <i className="fa-solid fa-arrow-right" style={{ marginLeft: "8px" }}></i>
            </button>

            <div className="cnc" style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
              Vous avez déjà un compte ?{" "}
              <Link to="/connect" style={{ color: "#137FEC", fontWeight: "bold" }}>Se connecter</Link>
            </div>
          </form>
        </div>
      </section>

      <footer>
        <ul>
          <li><a href="#">Conditions d'utilisation</a></li>
          <li><a href="#">Politique de confidentialité</a></li>
          <li><a href="#">Mentions légales</a></li>
        </ul>
        <div>© 2026 MyPharma. Tous droits réservés</div>
      </footer>
    </>
  );
};

export default MedecinRegisterForm;