import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './stylepublic.css';
import './style2.css'; // Pour le header et footer partagés

const AideSupportPage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Comment réinitialiser mon mot de passe ?",
      answer: "Sur la page de connexion, cliquez sur 'Mot de passe oublié ?'. Entrez votre adresse e-mail et validez. Vous recevrez un e-mail avec un lien sécurisé pour choisir un nouveau mot de passe."
    },
    {
      question: "Comment ajouter un nouveau patient ?",
      answer: "Une fois connecté(e), allez dans la section 'Mes Patients' via le menu latéral, puis cliquez sur le bouton 'Nouveau Patient'. Remplissez les informations nécessaires et validez."
    },
    {
      question: "La plateforme est-elle vraiment sécurisée ?",
      answer: "Oui, nos serveurs sont certifiés HDS (Hébergeur de Données de Santé) et vos informations sont chiffrées selon la norme AES-256."
    },
    {
      question: "Puis-je éditer une ordonnance une fois générée ?",
      answer: "Non, pour des raisons médico-légales, une ordonnance générée et validée n'est pas modifiable. Vous devez l'annuler et en rédiger une nouvelle."
    }
  ];

  return (
    <div className="page-publique">
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

      <main className="contenu-principal">
        <div className="card-info">
          <h1>Centre d'Aide & Support</h1>
          
          <div style={{ marginTop: '20px' }}>
            <h2>Foire Aux Questions (FAQ)</h2>
            <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div className="faq-question" onClick={() => toggleFaq(index)}>
                    {faq.question}
                    <i className={`fa-solid ${openFaqIndex === index ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                  </div>
                  {openFaqIndex === index && (
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '40px', backgroundColor: '#f9fcff', padding: '20px', borderRadius: '8px', border: '1px solid #e1eef9' }}>
            <h2>Vous ne trouvez pas la réponse ?</h2>
            <p>Contactez notre équipe de support technique disponible de 8h à 20h du Lundi au Samedi.</p>
            <p><strong>Email :</strong> support@mypharma-app.dz</p>
            <p><strong>Téléphone :</strong> +213 (0) 555 12 34 56</p>
          </div>

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <Link to="/connect" style={{ color: '#137FEC', fontWeight: 'bold', textDecoration: 'none' }}>
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>

      <footer>
        <ul>
          <li><Link to="/confidentialite">Conditions d'utilisation</Link></li>
          <li><Link to="/confidentialite">Politique de confidentialité</Link></li>
          <li><Link to="/confidentialite">Mentions légales</Link></li>
        </ul>
        <div>© 2026 MyPharma. Tous droits réservés</div>
      </footer>
    </div>
  );
};

export default AideSupportPage;
