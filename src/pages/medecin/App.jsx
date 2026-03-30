import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MedecinLogingPage from './MedecinLogingPage';
import MedecinRegisterPage from './MedecinRegisterPage';
import ConnectMedecinPage from './ConnectMedecinPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MedecinLogingPage />} />
        <Route path="/register" element={<MedecinRegisterPage />} />
        <Route path="/connect" element={<ConnectMedecinPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;