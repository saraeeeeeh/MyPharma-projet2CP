import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './stylepublic.css';
import './style2.css'; // Pour réutiliser le footer et le header existants

const ConfidentialitePage = () => {
  const [activeTab, setActiveTab] = useState('confidentialite');

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
          <h1>Politiques & Mentions Légales</h1>
          
          <ul className="tabs">
            <li 
              className={activeTab === 'confidentialite' ? 'active' : ''} 
              onClick={() => setActiveTab('confidentialite')}
            >
              Politique de confidentialité
            </li>
            <li 
              className={activeTab === 'cgu' ? 'active' : ''} 
              onClick={() => setActiveTab('cgu')}
            >
              Conditions d'utilisation
            </li>
            <li 
              className={activeTab === 'mentions' ? 'active' : ''} 
              onClick={() => setActiveTab('mentions')}
            >
              Mentions Légales
            </li>
          </ul>

          {activeTab === 'confidentialite' && (
            <div>
              <h2>Protection de vos données de santé</h2>
              <p>
                Chez MyPharma, la protection des données de santé personnelles (DSP) de nos patients et praticiens est notre priorité absolue. Nous nous engageons à respecter les lois en matière de protection de la vie privée applicables.
              </p>
              
              <h2>1. Collecte des données</h2>
              <p>
                Nous collectons les données strictement nécessaires au fonctionnement de la plateforme (informations de profil, rendez-vous, prescriptions). Toutes ces données sont chiffrées de bout en bout.
              </p>

              <h2>2. Hébergement certifié HDS</h2>
              <p>
                L'ensemble des données de santé est hébergé sur des serveurs disposant de la certification Hébergeur de Données de Santé (HDS) en vigueur, garantissant un niveau de sécurité optimal.
              </p>

              <h2>3. Vos droits</h2>
              <p>
                Conformément à la réglementation (RGPD), vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression de vos données. Vous pouvez exercer ce droit en nous contactant via la page Aide / Support.
              </p>
            </div>
          )}

          {activeTab === 'cgu' && (
            <div>
              <h2>Conditions Générales d'Utilisation (CGU)</h2>
              <p>
                L'utilisation de la plateforme MyPharma implique l'acceptation pleine et entière des présentes conditions générales d'utilisation.
              </p>
              
              <h2>1. Accès au service</h2>
              <p>
                L'accès à l'espace praticien est strictement réservé aux professionnels de santé dûment enregistrés et en exercice légal et disposant d'un numéro RPPS ou ADELI valide.
              </p>

              <h2>2. Responsabilité médicale</h2>
              <p>
                MyPharma fournit un outil de gestion technique. La responsabilité médicale, le diagnostic, et le choix des prescriptions restent l'entière responsabilité du praticien utilisant le logiciel.
              </p>

              <h2>3. Indisponibilité ou pannes</h2>
              <p>
                Bien que nous mettions tout en œuvre pour assurer un service ininterrompu, MyPharma ne saurait être tenu responsable d'une éventuelle suspension de l'accès au site suite à une opération de maintenance ou une panne externe.
              </p>
            </div>
          )}

          {activeTab === 'mentions' && (
            <div>
              <h2>Mentions Légales</h2>
              <p><strong>Éditeur de l'application :</strong></p>
              <p>MyPharma Technologies SARL</p>
              <p>Capital Social: 100 000 DA</p>
              <p>RCS: Alger 123 456 789</p>

              <h2>Hébergement :</h2>
              <p>HostHealth Cloud Services - Agréé HDS</p>

              <h2>Contact Délégué à la Protection des Données (DPO) :</h2>
              <p>dpo@mypharma-app.dz</p>
              <p>Pour toute question d'ordre légal, vous pouvez nous adresser un courrier à notre siège social.</p>
            </div>
          )}
          
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

export default ConfidentialitePage;
