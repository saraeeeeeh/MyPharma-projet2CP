import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styleachat.css';

// Mock Data pour les médicaments
const mockMedicaments = [
  { id: 1, nom: 'Doliprane 1000mg', laboratoire: 'Sanofi', prix: '150 DZD', disponible: true, remboursable: true },
  { id: 2, nom: 'Amoxicilline 500mg', laboratoire: 'Saidal', prix: '250 DZD', disponible: true, remboursable: true },
  { id: 3, nom: 'Vitamine C 1000mg', laboratoire: 'Bayer', prix: '450 DZD', disponible: false, remboursable: false },
  { id: 4, nom: 'Loratadine 10mg', laboratoire: 'Biopharm', prix: '200 DZD', disponible: true, remboursable: true },
  { id: 5, nom: 'Ibuprofène 400mg', laboratoire: 'Saidal', prix: '180 DZD', disponible: true, remboursable: true },
];

// Mock Data pour les pharmacies
const mockPharmacies = [
  { id: 1, nom: 'Pharmacie Centrale', adresse: 'Rue Didouche Mourad, Alger', distance: '0.8 km' },
  { id: 2, nom: 'Pharmacie El Chifa', adresse: 'Bab El Oued, Alger', distance: '1.5 km' },
  { id: 3, nom: 'Pharmacie Santé Plus', adresse: 'Hydra, Alger', distance: '3.2 km' },
];

export default function AchatMedicamentPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMed, setSelectedMed] = useState(null);
  
  // Checkout states
  const [deliveryOption, setDeliveryOption] = useState('collect');
  const [paymentOption, setPaymentOption] = useState('card');
  const [showSuccess, setShowSuccess] = useState(false);

  // Filtrer les médicaments
  const filteredMeds = mockMedicaments.filter(med => 
    med.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirm = () => {
    setShowSuccess(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    navigate('/patient/dashboard/overview'); // Rediriger vers un tableau de bord (mock)
  };

  return (
    <div className="achat-container">
      
      <div className="achat-header">
        <h1>Trouvez votre médicament</h1>
        <p>Vérifiez la disponibilité en temps réel, réservez en pharmacie ou faites-vous livrer directement à domicile.</p>
      </div>

      <div className="search-wrapper">
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Rechercher un médicament (ex: Doliprane...)" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="achat-content">
        
        {/* Colonne Gauche : Liste des Médicaments */}
        <div className="glass-card">
          <h2 className="section-title">
            <i className="fa-solid fa-pills"></i> Résultats de recherche
          </h2>
          
          <div className="med-list">
            {searchTerm === '' ? (
               <div className="empty-state">
                  <i className="fa-solid fa-capsules"></i>
                  <h3>Commencez votre recherche</h3>
                  <p>Tapez le nom d'un médicament dans la barre de recherche ci-dessus.</p>
               </div>
            ) : filteredMeds.length > 0 ? (
              filteredMeds.map(med => (
                <div 
                  key={med.id} 
                  className={`med-item ${selectedMed?.id === med.id ? 'selected' : ''}`}
                  onClick={() => setSelectedMed(med)}
                  style={{ opacity: med.disponible ? 1 : 0.6 }}
                >
                  <div className="med-info">
                    <h3>{med.nom}</h3>
                    <p>Laboratoire : {med.laboratoire}</p>
                    {med.remboursable && (
                       <span className="badge badge-chifa" style={{marginTop: '8px'}}>
                         <i className="fa-solid fa-address-card"></i> Remboursable Chifa
                       </span>
                    )}
                  </div>
                  <div className="med-badges">
                    <span className="badge badge-price">{med.prix}</span>
                    {med.disponible ? (
                      <span className="badge badge-stock"><i className="fa-solid fa-check-circle"></i> Disponible</span>
                    ) : (
                      <span className="badge badge-rupture"><i className="fa-solid fa-xmark-circle"></i> Rupture</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                  <i className="fa-regular fa-face-frown"></i>
                  <h3>Aucun résultat</h3>
                  <p>Nous n'avons pas trouvé de médicament correspondant à "{searchTerm}".</p>
              </div>
            )}
          </div>
        </div>

        {/* Colonne Droite : Options d'Achat (S'affiche si un med est sélectionné et dispo) */}
        <div className="glass-card" style={{ opacity: selectedMed ? 1 : 0.5, pointerEvents: selectedMed ? 'auto' : 'none' }}>
          <h2 className="section-title">
            <i className="fa-solid fa-cart-shopping"></i> Finaliser la commande
          </h2>

          {selectedMed && !selectedMed.disponible ? (
             <div className="empty-state" style={{padding: '20px'}}>
               <i className="fa-solid fa-boxes-stacked" style={{color: '#ef4444'}}></i>
               <h3 style={{color: '#ef4444'}}>Rupture de stock</h3>
               <p>Ce médicament est actuellement indisponible dans toutes les pharmacies à proximité.</p>
             </div>
          ) : (
            <div className="checkout-section">
              
              {/* Localisation Pharmacie */}
              <div className="pharmacy-locator">
                <h3 style={{margin: '0 0 15px 0', fontSize: '1rem', color: '#334155'}}>Pharmacies à proximité (Stock OK)</h3>
                <div className="pharmacy-item">
                  <div className="pharmacy-details">
                    <h4><i className="fa-solid fa-shop" style={{color: 'var(--primary-achat)'}}></i> {mockPharmacies[0].nom}</h4>
                    <p>{mockPharmacies[0].adresse}</p>
                  </div>
                  <div className="distance-badge">
                    <i className="fa-solid fa-location-dot"></i> {mockPharmacies[0].distance}
                  </div>
                </div>
              </div>

              {/* Mode de récupération */}
              <div className="option-group">
                <h3 style={{margin: '0 0 5px 0', fontSize: '1rem'}}>Mode de récupération</h3>
                <label className={`option-label ${deliveryOption === 'collect' ? 'selected-option' : ''}`}>
                  <input type="radio" name="delivery" checked={deliveryOption === 'collect'} onChange={() => setDeliveryOption('collect')} />
                  <div className="custom-radio"></div>
                  <div className="option-content">
                    <h4>Retrait en pharmacie (Click & Collect)</h4>
                    <p>Gratuit - Prêt dans 15 minutes</p>
                  </div>
                </label>
                <label className={`option-label ${deliveryOption === 'delivery' ? 'selected-option' : ''}`}>
                  <input type="radio" name="delivery" checked={deliveryOption === 'delivery'} onChange={() => setDeliveryOption('delivery')} />
                  <div className="custom-radio"></div>
                  <div className="option-content">
                    <h4>Livraison à domicile</h4>
                    <p>+ 400 DZD - Livraison express (moins de 2h)</p>
                  </div>
                </label>
              </div>

              {/* Mode de paiement */}
              <div className="option-group">
                <h3 style={{margin: '0 0 5px 0', fontSize: '1rem'}}>Mode de paiement</h3>
                <label className={`option-label ${paymentOption === 'card' ? 'selected-option' : ''}`}>
                  <input type="radio" name="payment" checked={paymentOption === 'card'} onChange={() => setPaymentOption('card')} />
                  <div className="custom-radio"></div>
                  <div className="option-content">
                    <h4>Carte CIB / Edahabia</h4>
                    <p>Paiement sécurisé en ligne</p>
                  </div>
                </label>
                <label className={`option-label ${paymentOption === 'cash' ? 'selected-option' : ''}`}>
                  <input type="radio" name="payment" checked={paymentOption === 'cash'} onChange={() => setPaymentOption('cash')} />
                  <div className="custom-radio"></div>
                  <div className="option-content">
                    <h4>Paiement à la livraison / Sur place</h4>
                    <p>Espèces acceptées</p>
                  </div>
                </label>
              </div>

              {/* Résumé & Bouton */}
              {selectedMed && (
                <div style={{marginTop: '10px', paddingTop: '20px', borderTop: '1px solid #e2e8f0'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                    <span>Sous-total</span>
                    <span>{selectedMed.prix}</span>
                  </div>
                  {deliveryOption === 'delivery' && (
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                      <span>Frais de livraison</span>
                      <span>400 DZD</span>
                    </div>
                  )}
                  <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.2rem', color: 'var(--primary-dark-achat)'}}>
                    <span>Total estimé</span>
                    <span>
                      {parseInt(selectedMed.prix) + (deliveryOption === 'delivery' ? 400 : 0)} DZD
                    </span>
                  </div>

                  <button 
                    className="btn-confirm-achat"
                    onClick={handleConfirm}
                    disabled={!selectedMed}
                  >
                    Confirmer la commande <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Modal de Succès */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon">
              <i className="fa-solid fa-check"></i>
            </div>
            <h2>Commande confirmée !</h2>
            <p>Votre demande pour <strong>{selectedMed?.nom}</strong> a bien été transmise à la pharmacie centrale.</p>
            {deliveryOption === 'collect' ? (
              <p style={{fontSize: '0.9rem'}}>Vous recevrez un SMS dès que votre commande sera prête à être récupérée.</p>
            ) : (
              <p style={{fontSize: '0.9rem'}}>Le livreur est en route. Temps d'attente estimé : 45 minutes.</p>
            )}
            <button className="btn-outline" onClick={closeSuccess}>
              Retourner à l'accueil
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
