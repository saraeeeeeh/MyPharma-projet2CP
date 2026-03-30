import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MedecinLogingPage from './MedecinLogingPage';
import MedecinRegisterPage from './MedecinRegisterPage';
import ConnectMedecinPage from './ConnectMedecinPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page de Profil (ton fichier MedecinLogingPage.jsx) */}
        <Route path="/" element={<MedecinLogingPage />} />

        {/* Page d'Inscription (ton fichier MedecinRegisterPage.jsx) */}
        <Route path="/register" element={<MedecinRegisterPage />} />

        {/* Page de Connexion (ton fichier ConnectMedecinPage.jsx) */}
        <Route path="/connect" element={<ConnectMedecinPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;