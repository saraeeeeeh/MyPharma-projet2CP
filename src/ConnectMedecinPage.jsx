import React, { useState } from 'react';
import './style3.css';
import { Link } from 'react-router-dom';

  const ConnectMedecinPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [view, setView] = useState("login"); 
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Veuillez remplir tous les champs s'il vous plaît.");
      return;
    }
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erreur: ${errorData.message}`);
        return;
      }

      const data = await response.json();
      console.log("Connexion réussie", data);

      // Enregistrer les données utilisateur
      localStorage.setItem("medecinConnecte", JSON.stringify(data.medecin));
      localStorage.setItem("token", data.token); // Si tu veux gérer des routes protégées plus tard
      
      window.location.href = "/profil"; // Redirection
    } catch (error) {
      console.error("Erreur de connexion:", error);
      alert("Erreur de connexion au serveur.");
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (forgotEmail === "") {
      alert("Veuillez saisir votre adresse email.");
      return;
    }
    console.log("Réinitialisation demandée pour :", forgotEmail);
    setView("forgot-sent");
  };

  const resetToLogin = () => {
    setView("login");
    setForgotEmail("");
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
            <li><Link to="/aide">Aide</Link></li>
            <li><Link to="/confidentialite">Confidentialité</Link></li>
            <li><Link to="/aide" className="btn-support">Support</Link></li>
          </ul>
        </nav>
      </header>

      <section className="inscr">
        <div className="form-card">

          
          {view === "login" && (
            <>
              <div style={{ textAlign: "center", fontSize: "30px", color: "#137FEC", marginBottom: "10px" }}>
                <i className="fa-solid fa-stethoscope"></i>
              </div>
              <h1>Connecter</h1>
              <h5>Accédez à votre compte professionnel en toute sécurité</h5>

              <form className="form-container" onSubmit={handleLogin}>
                <div className="champ-formulaire">
                  <label htmlFor="EML">ADRESSE EMAIL</label>
                  <div className="input-icon">
                    <i className="fa-solid fa-envelope"></i>
                    <input type="email" placeholder="docteur@exemple.com" id="EML"
                      value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>

                <div className="champ-formulaire pass">
                  <label htmlFor="ps">MOT DE PASSE</label>
                  <div className="input-icon">
                    <i className="fa-solid fa-lock"></i>
                    <input type={showPassword ? "text" : "password"} id="ps" placeholder="......"
                      value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer", marginLeft: "auto", marginRight: "0" }}></i>
                  </div>
                </div>

             
                <div style={{ textAlign: "right", marginTop: "6px", marginBottom: "10px" }}>
                  <span
                    onClick={() => setView("forgot")}
                    style={{ color: "#137FEC", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}
                  >
                    Mot de passe oublié ?
                  </span>
                </div>

                <div className="champ-checkbox">
                  <input type="checkbox" id="save_info" name="save_info"
                    checked={saveInfo} onChange={(e) => setSaveInfo(e.target.checked)} />
                  <label htmlFor="save_info">Enregistrer mes informations pour mes prochaines connexions</label>
                </div>

                <button type="submit" className="FIN">Se connecter</button>

                <div className="cnc" style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
                  Pas encore de compte ?{" "}
                  <Link to="/register" style={{ color: "#137FEC", fontWeight: "bold" }}>S'enregistrer</Link>
                </div>
              </form>
            </>
          )}

         
          {view === "forgot" && (
            <>
              <div style={{ textAlign: "center", fontSize: "30px", color: "#137FEC", marginBottom: "10px" }}>
                <i className="fa-solid fa-key"></i>
              </div>
              <h1>Mot de passe oublié</h1>
              <h5>Saisissez votre email pour recevoir un lien de réinitialisation</h5>

              <form className="form-container" onSubmit={handleForgotPassword}>
                <div className="champ-formulaire">
                  <label htmlFor="forgot-email">ADRESSE EMAIL</label>
                  <div className="input-icon">
                    <i className="fa-solid fa-envelope"></i>
                    <input
                      type="email"
                      id="forgot-email"
                      placeholder="docteur@exemple.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="FIN">Envoyer le lien</button>

                <div className="cnc" style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
                  <span
                    onClick={resetToLogin}
                    style={{ color: "#137FEC", cursor: "pointer", fontWeight: "bold" }}
                  >
                    ← Retour à la connexion
                  </span>
                </div>
              </form>
            </>
          )}

          {view === "forgot-sent" && (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div style={{ fontSize: "48px", color: "#137FEC", marginBottom: "16px" }}>
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h1 style={{ color: "#137FEC" }}>Email envoyé !</h1>
              <h5>
                Un lien de réinitialisation a été envoyé à <strong>{forgotEmail}</strong>.
                Vérifiez votre boîte mail et suivez les instructions.
              </h5>

              <button className="FIN" onClick={resetToLogin} style={{ marginTop: "1.5rem" }}>
                Retour à la connexion
              </button>
            </div>
          )}

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

export default ConnectMedecinPage;

