import React, { useContext } from 'react';
import { PharmacieContext } from '../context/PharmacieContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const StatCard = ({ label, value, sub, subClass, bgClass, iconColor, icon }) => (
  <div className="stat-card">
    <div className={`stat-icon ${bgClass}`}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {icon}
      </svg>
    </div>
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
    <div className={`stat-sub ${subClass}`}>{sub}</div>
  </div>
);

export default function Overview() {
  const { pharmacieData } = useContext(PharmacieContext);

  const loc = pharmacieData?.location;
  const position = loc && loc.lat ? [loc.lat, loc.lng] : [36.7538, 3.0588];

  return (
    <>
      <div style={{marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', color: '#1a1a2e'}}>Vue d'ensemble</h2>
        <p style={{fontSize: '13px', color: '#888'}}>Bienvenue sur votre tableau de bord, voici l'état de votre pharmacie aujourd'hui.</p>
      </div>

      <div className="stats" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'}}>
        <StatCard 
          label="Ordonnances en attente" value="12" sub="+3 depuis hier" subClass="blue" bgClass="icon-blue" iconColor="#2c6fd4"
          icon={<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>}
        />
        <StatCard 
          label="Commandes à préparer" value="5" sub="Prioritaires" subClass="orange" bgClass="icon-orange" iconColor="#e67e22"
          icon={<><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></>}
        />
        <StatCard 
          label="Articles en rupture" value="3" sub="Vérifier le stock" subClass="red" bgClass="icon-red" iconColor="#e74c3c"
          icon={<><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>}
        />
        <StatCard 
          label="Total Médicaments" value="1,248" sub="En stock" subClass="green" bgClass="icon-green" iconColor="#1e8a5e"
          icon={<><rect x="3" y="8" width="18" height="8" rx="4"/><line x1="12" y1="8" x2="12" y2="16"/></>}
        />
      </div>

      <div className="grid3">
        {/* Emplacement de la pharmacie */}
        <div className="card" style={{display: 'flex', flexDirection: 'column'}}>
          <div className="card-header">
            <div className="card-title">Votre officine</div>
          </div>
          {loc && loc.lat ? (
            <div style={{ flex: 1, borderRadius: '10px', overflow: 'hidden', border: '1px solid #e0e0e0', minHeight: '200px', zIndex: 0 }}>
              <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }} zoomControl={false} dragging={false} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}>
                  <Popup>{pharmacieData?.nom}</Popup>
                </Marker>
              </MapContainer>
            </div>
          ) : (
            <div style={{ flex: 1, backgroundColor: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', minHeight: '200px', color: '#888' }}>
              Position non configurée
            </div>
          )}
          <div style={{ marginTop: '15px' }}>
            <p style={{ fontSize: '12px', fontWeight: '600', color: '#444' }}>Adresse de la pharmacie</p>
            <p style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>{loc?.address || 'Non spécifiée'}</p>
          </div>
        </div>

        {/* Activités récentes */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">Activité récente</div>
            <button className="btn-voir">Voir tout →</button>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="list-item">
              <div className="item-icon icon-blue">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2c6fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <div className="item-info">
                <p className="item-name">Nouvelle ordonnance reçue</p>
                <p className="item-sub">Dr. Yassine - Patient: Ahmed K.</p>
              </div>
              <span style={{ fontSize: '11px', color: '#888' }}>
                Il y a {i * 10} min
              </span>
            </div>
          ))}
          <button className="btn-primary-sm" style={{marginTop: '20px'}}>Traiter les demandes</button>
        </div>
      </div>
    </>
  );
}
