import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './PatientPages.css';

function PatientForgotPassword() {
  const navigate = useNavigate();
  const [etape, setEtape] = useState(1); // 1 = email, 2 = OTP
  const [contact, setContact] = useState('');
  const [contactError, setContactError] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef([]);

  // Timer OTP
  useEffect(() => {
    if (etape === 2 && timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [etape, timer]);

  // ---- Etape 1 ----
  function handleSendCode() {
    if (!contact.trim()) {
      setContactError('Veuillez entrer votre email ou numéro de téléphone');
      return;
    }
    // Plus tard on envoie le code via le back-end
    setEtape(2);
  }

  // ---- Etape 2 ----
  function handleOtpChange(index, value) {
    if (!/^[0-9]$/.test(value) && value !== '') return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError('');
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  }

  function handleKeyDown(index, e) {
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

  function handleResend() {
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    inputs.current[0].focus();
  }

  function handleVerifyOtp() {
    const code = otp.join('');
    if (code.length < 6) {
      setOtpError('Veuillez entrer le code complet à 6 chiffres');
      return;
    }
    // Plus tard on vérifie avec le back-end
    navigate('/patient/new-password');
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

          {/* Indicateur d'étape */}
          <div className="steps-indicator">
            <div className={`step-dot ${etape >= 1 ? 'active' : ''}`}>1</div>
            <div className={`step-line ${etape >= 2 ? 'active' : ''}`}></div>
            <div className={`step-dot ${etape >= 2 ? 'active' : ''}`}>2</div>
          </div>

          {/* ===== ETAPE 1 : Email/Téléphone ===== */}
          {etape === 1 && (
            <>
              <div className="otp-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2c6fd4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>

              <h2>Mot de passe oublié ?</h2>
              <p className="form-subtitle">
                Entrez votre email ou numéro de téléphone.<br />
                Nous vous enverrons un code de vérification.
              </p>

              <div className="form-group">
                <label>Email ou Numéro de téléphone</label>
                <input
                  type="text"
                  placeholder="exemple@email.com"
                  value={contact}
                  onChange={e => {
                    setContact(e.target.value);
                    setContactError('');
                  }}
                  className={contactError ? 'input-error' : ''}
                />
                {contactError && <span className="error-msg">{contactError}</span>}
              </div>

              <button className="btn-primary" onClick={handleSendCode}>
                Envoyer le code →
              </button>

              <p className="form-footer">
                <span className="link" onClick={() => navigate('/patient/login')}>
                  ← Retour à la connexion
                </span>
              </p>
            </>
          )}

          {/* ===== ETAPE 2 : OTP ===== */}
          {etape === 2 && (
            <>
              <div className="otp-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2c6fd4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>

              <h2>Vérification</h2>
              <p className="form-subtitle">
                Code envoyé à<br />
                <strong>{contact}</strong>
              </p>

              <div className="otp-inputs">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputs.current[index] = el}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`otp-box ${otpError ? 'input-error' : ''} ${digit ? 'filled' : ''}`}
                  />
                ))}
              </div>

              {otpError && <p className="error-msg" style={{ textAlign: 'center' }}>{otpError}</p>}

              <p className="otp-timer">
                {canResend ? (
                  <span className="link" onClick={handleResend}>Renvoyer le code</span>
                ) : (
                  <>Renvoyer le code dans <strong>{timer}s</strong></>
                )}
              </p>

              <button className="btn-primary" onClick={handleVerifyOtp}>
                Vérifier →
              </button>

              <p className="form-footer">
                <span className="link" onClick={() => setEtape(1)}>
                  ← Modifier mon email/téléphone
                </span>
              </p>
            </>
          )}

        </div>
      </div>
      <p className="page-footer">© 2024 MYPHARMA DIGITAL HEALTH</p>
    </div>
  );
}

export default PatientForgotPassword;
