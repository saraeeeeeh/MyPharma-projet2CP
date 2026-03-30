import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { PharmacieContext } from '../context/PharmacieContext';
import Navbar from '../../../components/Navbar';
import '../PharmacienPages.css';

const schema = yup.object({
  email: yup.string().email('Email invalide').required('L\'email est requis'),
}).required();

export default function Register() {
  const navigate = useNavigate();
  const { updateData } = useContext(PharmacieContext);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const onSubmit = data => {
    updateData({ email: data.email });
    navigate('/pharmacien/create-password');
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
          <p className="form-subtitle">Étape 1 sur 4 : Identifiant</p>

          <div className="steps-indicator">
            <div className="step-dot active">1</div>
            <div className="step-line"></div>
            <div className="step-dot">2</div>
            <div className="step-line"></div>
            <div className="step-dot">3</div>
            <div className="step-line"></div>
            <div className="step-dot">4</div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            
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

            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
              Suivant →
            </button>

            <div className="separator">
              <span>ou</span>
            </div>

            <div className="no-account-box">
              <p>Déjà inscrit ?</p>
              <button 
                type="button"
                className="btn-secondary" 
                onClick={() => navigate('/pharmacien/login')}
              >
                Se connecter
              </button>
            </div>

          </form>
        </div>
      </div>
      <p className="page-footer">© 2026 MYPHARMA DIGITAL HEALTH</p>
    </div>
  );
}
