import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './PatientPages.css';

function PatientOTPPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const contact = location.state?.contact || 'votre email/téléphone';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  function handleChange(index, value) {
    if (!/^[0-9]$/.test(value) && value !== '') return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Passe automatiquement au champ suivant
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  }

  function handleKeyDown(index, e) {
    // Revient au champ précédent si on appuie sur Backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  }

  function handlePaste(e) {
    const pasted = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pasted)) {
      const newOtp = pasted.split('');
      while (newOtp.length < 6) newOtp.push('');
      setOtp(newOtp);
      inputs.current[Math.min(pasted.length, 5)].focus();
    }
  }

  function handleVerify() {
    const code = otp.join('');
    if (code.length < 6) {
      setError('Veuillez entrer le code complet à 6 chiffres');
      return;
    }
    // Pour l'instant on accepte tout code
    // Plus tard ici on vérifie avec le back-end Node.js
    navigate('/patient/health-profile');
  }

  function handleResend() {
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputs.current[0].focus();
    // Plus tard ici on renvoie le code via le back-end
  }

  return (
    <div className="patient-bg">
      <Navbar />
      <div className="form-container">
        <div className="form-card">

          <div className="form-logo">
            <span>⊕</span>
            <p>MyPharma</p>
          </div>

          {/* Icône */}
          <div className="otp-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2c6fd4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </div>

          <h2>Vérification</h2>
          <p className="form-subtitle">
            Un code à 6 chiffres a été envoyé à<br />
            <strong>{contact}</strong>
          </p>

          {/* Les 6 cases OTP */}
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputs.current[index] = el}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`otp-box ${error ? 'input-error' : ''} ${digit ? 'filled' : ''}`}
              />
            ))}
          </div>

          {error && <p className="error-msg" style={{ textAlign: 'center' }}>{error}</p>}

          {/* Timer */}
          <p className="otp-timer">
            {canResend ? (
              <span className="link" onClick={handleResend}>
                Renvoyer le code
              </span>
            ) : (
              <>Renvoyer le code dans <strong>{timer}s</strong></>
            )}
          </p>

          <button className="btn-primary" onClick={handleVerify}>
            Vérifier →
          </button>

          <p className="form-footer">
            <span className="link" onClick={() => navigate('/patient/register')}>
              ← Modifier mes informations
            </span>
          </p>

        </div>
      </div>
      <p className="page-footer">© 2024 MYPHARMA DIGITAL HEALTH</p>
    </div>
  );
}

export default PatientOTPPage;
