import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { PharmacieContext } from '../context/PharmacieContext';
import Navbar from '../../../components/Navbar';
import '../PharmacienPages.css';

const schema = yup.object({
  password: yup.string()
    .required('Le mot de passe est requis')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .matches(/[A-Z]/, 'Doit contenir au moins une lettre majuscule')
    .matches(/[0-9]/, 'Doit contenir au moins un chiffre'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Les mots de passe ne correspondent pas')
    .required('La confirmation est requise'),
}).required();

function getPasswordStrength(password) {
  let score = 0;
  if (!password) return score;
  if (password.length > 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

export default function CreatePassword() {
  const navigate = useNavigate();
  const { updateData } = useContext(PharmacieContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const passwordValue = watch('password');
  const strength = getPasswordStrength(passwordValue);
  const strengthText = ['Très faible', 'Faible', 'Moyen', 'Bon', 'Fort'];

  const onSubmit = data => {
    updateData({ password: data.password });
    navigate('/pharmacien/pharmacy-info');
  };

  return (
    <div className="pharmacien-bg">
      <Navbar />
      <div className="form-container">
        <div className="form-card">
          
          <div className="form-logo">
            <span>⊕</span>
            <p>MyPharma</p>
          </div>

          <h2>Création de compte</h2>
          <p className="form-subtitle">Étape 2 sur 4 : Sécurité</p>

          <div className="steps-indicator">
            <div className="step-dot active">1</div>
            <div className="step-line active"></div>
            <div className="step-dot active">2</div>
            <div className="step-line"></div>
            <div className="step-dot">3</div>
            <div className="step-line"></div>
            <div className="step-dot">4</div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="form-group">
              <label>Mot de passe</label>
              <div className="input-icon">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register("password")}
                  placeholder="••••••••"
                  style={errors.password ? { borderColor: '#e74c3c' } : {}}
                />
                <span 
                  onClick={() => setShowPassword(!showPassword)} 
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
              {errors.password && <span className="error-msg">{errors.password.message}</span>}
              <div style={{display:'flex', gap:'5px', marginTop:'8px', height:'4px'}}>
                {[1, 2, 3, 4].map(level => (
                  <div key={level} style={{
                    flex:1, 
                    borderRadius:'2px', 
                    background: strength >= level 
                      ? (strength <= 1 ? '#e74c3c' : strength === 2 ? '#f39c12' : '#1e8a5e') 
                      : '#e0e0e0'
                  }}></div>
                ))}
              </div>
              <p style={{fontSize:'11px', marginTop:'4px', color: strength > 0 ? (strength <= 1 ? '#e74c3c' : strength === 2 ? '#f39c12' : '#1e8a5e') : '#999'}}>
                 {strength > 0 ? strengthText[strength] : 'Sécurité du mot de passe'}
              </p>
            </div>

            <div className="form-group" style={{marginTop:'15px'}}>
              <label>Confirmer le mot de passe</label>
              <div className="input-icon">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register("confirmPassword")}
                  placeholder="••••••••"
                  style={errors.confirmPassword ? { borderColor: '#e74c3c' } : {}}
                />
                <span 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                  style={{ cursor: 'pointer' }}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </span>
              </div>
              {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword.message}</span>}
            </div>

            <div className="form-row" style={{marginTop:'20px'}}>
               <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => navigate('/pharmacien/register')}
                style={{marginBottom:'16px'}}
               >
                 ← Retour
               </button>
               <button type="submit" className="btn-primary">
                 Suivant →
               </button>
            </div>

          </form>
        </div>
      </div>
      <p className="page-footer">© 2026 MYPHARMA DIGITAL HEALTH</p>
    </div>
  );
}
