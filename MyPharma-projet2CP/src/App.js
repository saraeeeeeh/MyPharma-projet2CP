import React, { useState, useRef } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import ProfileCard from './components/ProfileCard';
import Footer from './components/Footer';

// Patient Routes
import PatientLoginPage from './pages/patient/PatientLoginPage';
import PatientRegisterPage from './pages/patient/PatientRegisterPage';
import PatientHealthProfile from './pages/patient/PatientHealthProfile';
import PatientOTPPage from './pages/patient/PatientOTPPage';
import PatientForgotPassword from './pages/patient/PatientForgotPassword';
import PatientNewPassword from './pages/patient/PatientNewPassword';
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientOverview from './pages/patient/pages/PatientOverview';
import PatientOrdonnances from './pages/patient/pages/PatientOrdonnances';
import PatientMedicaments from './pages/patient/pages/PatientMedicaments';
import PatientCommandes from './pages/patient/pages/PatientCommandes';
import PatientMedecins from './pages/patient/pages/PatientMedecins';
import PatientPharmacies from './pages/patient/pages/PatientPharmacies';
import PatientProfil from './pages/patient/pages/PatientProfil';

// Medecin Routes
import MedecinLoginPage from './pages/medecin/MedecinLogingPage';
import MedecinRegisterPage from './pages/medecin/MedecinRegisterPage.jsx';

// Pharmacien Routes
import PharmacieLogin from './pages/pharmacien/pages/Login';
import PharmacieRegister from './pages/pharmacien/pages/Register';
import PharmacieCreatePassword from './pages/pharmacien/pages/CreatePassword';
import PharmacieLocation from './pages/pharmacien/pages/Location';
import PharmacieInfo from './pages/pharmacien/pages/PharmacyInfo';
import PharmacieDashboard from './pages/pharmacien/pages/Dashboard';
import PharmacieOverview from './pages/pharmacien/pages/Overview';
import PharmacieOrdonnances from './pages/pharmacien/pages/Ordonnances';
import PharmacieCommandes from './pages/pharmacien/pages/Commandes';
import PharmacieStock from './pages/pharmacien/pages/Stock';
import PharmacieParametres from './pages/pharmacien/pages/Parametres';
import { PharmacieProvider } from './pages/pharmacien/context/PharmacieContext';

import './App.css';

const profiles = [
  {
    id: 'medecin',
    image: '/images/medphoto.jpeg',
    tag: 'ESPACE PRO',
    tagClass: 'medecin',
    title: 'Médecin',
    description: 'Créez et gérez des prescriptions électroniques sécurisées et suivez vos patients.',
    btnClass: 'medecin'
  },
  {
    id: 'patient',
    image: '/images/patientphoto.jpeg',
    tag: 'ESPACE PATIENT',
    tagClass: 'patient',
    title: 'Je suis Patient',
    description: 'Consultez vos prescriptions, suivez vos traitements et commandez vos médicaments en ligne.',
    btnClass: 'patient'
  },
  {
    id: 'pharmacien',
    image: '/images/pharmaciephoto.jpeg',
    tag: 'ESPACE PHARMACIE',
    tagClass: 'pharmacien',
    title: 'Pharmacien',
    description: 'Gérez les prescriptions entrantes, validez les délivrances et optimisez votre stock.',
    btnClass: 'pharmacien'
  }
];

function HomePage() {
  const [activeCard, setActiveCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);
  const cardsRef = useRef(null);
  const navigate = useNavigate();

  function scrollToCards() {
    cardsRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  function handleCardClick(profile) {
    if (profile.id === 'patient') {
      navigate('/patient/login');
    } else if (profile.id === 'medecin') {
      navigate('/medecin/login');
    } else if (profile.id === 'pharmacien') {
      navigate('/pharmacien/login');
    }
  }

  const getBackground = () => {
    if (hoveredCard === 'medecin') {
      return 'linear-gradient(135deg, #0d2d3a 0%, #1a3a6e 50%, #1e5a9e 100%)';
    }
    if (hoveredCard === 'patient') {
      return 'linear-gradient(135deg, rgb(13,45,58) 0%, rgb(15,90,80) 50%, rgb(20,140,120) 100%)';
    }
    if (hoveredCard === 'pharmacien') {
      return 'linear-gradient(135deg, #0d2d3a 0%, #1e8a5e 50%, #25a672 100%)';
    }
    return 'linear-gradient(135deg, #0d2d3a 0%, #0f4a5e 40%, #0e6b6b 70%, #1a8c7a 100%)';
  };

  return (
    <div style={{ background: getBackground(), minHeight: '100vh', transition: 'background 0.5s' }}>
      <Navbar />
      <section className="hero">
        <h2>Bienvenue !</h2>
        <p>
          Accédez à votre espace santé sécurisé.<br />
          <span className="hero-highlight" onClick={scrollToCards} style={{ cursor: 'pointer' }}>
            Choisissez votre profil
          </span> pour continuer.
        </p>
      </section>
      <section className="cards" ref={cardsRef}>
        {profiles.map(profile => (
          <ProfileCard
            key={profile.id}
            {...profile}
            isActive={activeCard === profile.id}
            onClick={() => handleCardClick(profile)}
            onHover={setHoveredCard}
          />
        ))}
      </section>
      <Footer />
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Connexion – {selectedProfile}</h3>
            <p>Vous allez accéder à votre espace personnel sécurisé.</p>
            <div className="modal-btns">
              <button className="btn-connexion">Se connecter</button>
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <PharmacieProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Patient */}
        <Route path="/patient/login" element={<PatientLoginPage />} />
        <Route path="/patient/register" element={<PatientRegisterPage />} />
        <Route path="/patient/health-profile" element={<PatientHealthProfile />} />
        <Route path="/patient/otp" element={<PatientOTPPage />} />
        <Route path="/patient/forgot-password" element={<PatientForgotPassword />} />
        <Route path="/patient/new-password" element={<PatientNewPassword />} />
        
        <Route path="/patient/dashboard" element={<PatientDashboard />}>
          <Route index element={<Navigate to="/patient/dashboard/overview" replace />} />
          <Route path="overview" element={<PatientOverview />} />
          <Route path="ordonnances" element={<PatientOrdonnances />} />
          <Route path="medicaments" element={<PatientMedicaments />} />
          <Route path="commandes" element={<PatientCommandes />} />
          <Route path="medecins" element={<PatientMedecins />} />
          <Route path="pharmacies" element={<PatientPharmacies />} />
          <Route path="profil" element={<PatientProfil />} />
        </Route>
        
        {/* Medecin */}
        <Route path="/medecin/login" element={<MedecinLoginPage />} />
        <Route path='/medecin/register' element={<MedecinRegisterPage/>} />   
        
        {/* Pharmacien */}
        <Route path="/pharmacien/login" element={<PharmacieLogin />} />
        <Route path="/pharmacien/register" element={<PharmacieRegister />} />
        <Route path="/pharmacien/create-password" element={<PharmacieCreatePassword />} />
        <Route path="/pharmacien/location" element={<PharmacieLocation />} />
        <Route path="/pharmacien/pharmacy-info" element={<PharmacieInfo />} />
        
        <Route path="/pharmacien/dashboard" element={<PharmacieDashboard />}>
          <Route index element={<Navigate to="/pharmacien/dashboard/overview" replace />} />
          <Route path="overview" element={<PharmacieOverview />} />
          <Route path="ordonnances" element={<PharmacieOrdonnances />} />
          <Route path="commandes" element={<PharmacieCommandes />} />
          <Route path="stock" element={<PharmacieStock />} />
          <Route path="parametres" element={<PharmacieParametres />} />
        </Route>
      </Routes>
    </PharmacieProvider>
  );
}

export default App;
