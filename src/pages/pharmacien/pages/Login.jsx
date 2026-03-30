import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { PharmacieContext } from '../context/PharmacieContext';
import { toast } from 'react-toastify';
import Navbar from '../../../components/Navbar';
import '../PharmacienPages.css';

const schema = yup.object({
  email: yup.string().email('Email invalide').required('L\'email est requis'),
  password: yup.string().required('Le mot de passe est requis'),
}).required();

export default function Login() {
  const navigate = useNavigate();
  const { login, forceLogin } = useContext(PharmacieContext);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    const success = login(data.email, data.password);
    if (success) {
      toast.success("Bienvenue !");
      navigate('/pharmacien/dashboard');
    } else {
      setErrorMsg("Email ou mot de passe incorrect");
      // Bypass pour la démo
      toast.warn("Mode Démo: Connecté avec succès (Bypass)");
      forceLogin();
      navigate('/pharmacien/dashboard');
    }
  };

  return (
    <div className="pharmacien-bg">
      <Navbar />
      <div className="form-container">
        <div className="form-card">
          
          {/* Logo */}
          <div className="form-logo">
            <span>⊕</span>
            <p>MyPharma</p>
          </div>

          <h2>Accès Pharmacie</h2>
          <p className="form-subtitle">
            Connectez-vous à votre espace professionnel de santé.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {errorMsg && (
              <p className="error-msg" style={{textAlign: 'center', marginBottom: '10px'}}>
                {errorMsg}
              </p>
            )}

            <div className="form-group">
              <label>Email professionnel</label>
              <input 
                type="email" 
                {...register("email")}
                placeholder="contact@pharmacie.dz"
                style={errors.email ? { borderColor: '#e74c3c' } : {}}
              />
              {errors.email && <span className="error-msg">{errors.email.message}</span>}
            </div>

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
            </div>

            <p className="forgot-password">
              <span className="link" onClick={() => navigate('/pharmacien/forgot-password')}>
                Mot de passe oublié ?
              </span>
            </p>

            <button type="submit" className="btn-primary">
              Se connecter →
            </button>

            {/* Séparateur */}
            <div className="separator">
              <span>ou</span>
            </div>

            {/* Pas encore de compte */}
            <div className="no-account-box">
              <p>Vous n'êtes pas encore partenaire ?</p>
              <button 
                type="button"
                className="btn-secondary" 
                onClick={() => navigate('/pharmacien/register')}
              >
                Inscrire ma pharmacie
              </button>
            </div>
          </form>

        </div>
      </div>
      <p className="page-footer">© 2026 MYPHARMA DIGITAL HEALTH</p>
    </div>
  );
}
