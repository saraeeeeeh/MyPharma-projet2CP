import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MedecinLogingPage from './MedecinLogingPage';
import MedecinRegisterPage from './MedecinRegisterPage';
import ConnectMedecinPage from './ConnectMedecinPage';
import ProfilMedecinPage from './ProfilMedecinPage';
import PlanningPage from './PlanningPage';
import PatientsPage from './PatientsPage';
import OrdonnancesPage from './OrdonnancesPage';
import AvisPage from './AvisPage';
import MessageriePage from './MessageriePage';
import ParametresPage from './ParametresPage';
import StatistiquesPage from './StatistiquesPage';
import ConfidentialitePage from './ConfidentialitePage';
import AideSupportPage from './AideSupportPage';
import AchatMedicamentPage from './AchatMedicamentPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConnectMedecinPage />} />
        <Route path="/register" element={<MedecinRegisterPage />} />
        <Route path="/profil-pro" element={<MedecinLogingPage />} />
        <Route path="/connect" element={<ConnectMedecinPage />} />
        <Route path="/login" element={<ConnectMedecinPage />} />
        <Route path="/profil" element={<ProfilMedecinPage />} />
        <Route path="/planning" element={<PlanningPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/ordonnances" element={<OrdonnancesPage />} />
        <Route path="/avis" element={<AvisPage />} />
        <Route path="/messagerie" element={<MessageriePage />} />
        <Route path="/parametres" element={<ParametresPage />} />
        <Route path="/statistiques" element={<StatistiquesPage />} />
        <Route path="/confidentialite" element={<ConfidentialitePage />} />
        <Route path="/aide" element={<AideSupportPage />} />
        <Route path="/achat-medicaments" element={<AchatMedicamentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;