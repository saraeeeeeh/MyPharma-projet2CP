import React, { useState, useMemo, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { PharmacieContext } from '../context/PharmacieContext';
import { toast } from 'react-toastify';
import Navbar from '../../../components/Navbar';
import '../PharmacienPages.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function DraggableMarker({ position, setPosition, setAddress }) {
  const markerRef = useRef(null);

  const eventHandlers = useMemo(() => ({
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const { lat, lng } = marker.getLatLng();
        setPosition([lat, lng]);
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
          .then(res => res.json())
          .then(data => {
            if (data && data.display_name) setAddress(data.display_name);
          })
          .catch(() => { });
      }
    },
  }), [setPosition, setAddress]);

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.display_name) setAddress(data.display_name);
        })
        .catch(() => { });
    }
  });

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
}

export default function Location() {
  const navigate = useNavigate();
  const { updateData } = useContext(PharmacieContext);

  const defaultPos = [36.7538, 3.0588];
  const [position, setPosition] = useState(defaultPos);
  const [address, setAddress] = useState('');
  const [loadingGps, setLoadingGps] = useState(false);
  const [mapActivated, setMapActivated] = useState(false);

  const getGPS = () => {
    setLoadingGps(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setPosition(coords);
          setMapActivated(true);
          setLoadingGps(false);
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[0]}&lon=${coords[1]}`)
            .then(res => res.json())
            .then(data => {
              if (data && data.display_name) setAddress(data.display_name);
            })
            .catch(() => { });
          toast.success("Position trouvée !");
        },
        (error) => {
          setLoadingGps(false);
          toast.error("Impossible de récupérer la position.");
          setMapActivated(true);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLoadingGps(false);
      toast.error("Votre navigateur ne supporte pas la géolocalisation.");
      setMapActivated(true);
    }
  };

  const handleContinue = () => {
    updateData({ location: { lat: position[0], lng: position[1], address } });
    toast.success("Inscription complétée avec succès !");
    navigate('/pharmacien/dashboard');
  };

  return (
    <div className="pharmacien-bg">
      <Navbar />
      <div className="form-container" style={{padding: '20px'}}>
        <div className="form-card wide" style={{maxWidth: '700px'}}>
          
          <div className="form-logo">
            <span>⊕</span>
            <p>MyPharma</p>
          </div>

          <h2>Emplacement GPS</h2>
          <p className="form-subtitle">Étape 4 sur 4 : Localisation de la Pharmacie</p>

          <div className="steps-indicator">
            <div className="step-dot active">1</div>
            <div className="step-line active"></div>
            <div className="step-dot active">2</div>
            <div className="step-line active"></div>
            <div className="step-dot active">3</div>
            <div className="step-line active"></div>
            <div className="step-dot active">4</div>
          </div>

          {!mapActivated ? (
            <div style={{textAlign:'center', padding:'40px 20px', border:'2px dashed #e0e0e0', borderRadius:'15px', background:'#f9fbfc'}}>
              <div style={{fontSize:'48px', color:'#1e8a5e', marginBottom:'15px'}}>📍</div>
              <p style={{color:'#666', marginBottom:'20px'}}>Autorisez l'accès à votre position pour placer votre officine ou ajustez-la manuellement sur la carte.</p>
              <button onClick={getGPS} disabled={loadingGps} className="btn-primary" style={{width:'auto', padding:'12px 24px'}}>
                 {loadingGps ? 'Recherche...' : '📍 Activer ma position'}
              </button>
              <br/>
              <span className="link" onClick={() => setMapActivated(true)} style={{fontSize:'13px', marginTop:'15px', display:'inline-block'}}>Passer et placer manuellement</span>
            </div>
          ) : (
            <div>
              <p style={{fontSize:'13px', color:'#1e8a5e', background:'#e8f8f2', padding:'10px', borderRadius:'8px', marginBottom:'15px', textAlign:'center', border:'1px solid #d1f2e5'}}>
                Vous pouvez <b>glisser le marqueur bleu</b> ou cliquer n'importe où sur la carte pour affiner.
              </p>
              <div style={{ height: '350px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e0e0e0' }}>
                <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <DraggableMarker position={position} setPosition={setPosition} setAddress={setAddress} />
                </MapContainer>
              </div>
              <div className="form-group" style={{marginTop:'15px'}}>
                <label>Adresse détectée :</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="2"
                  placeholder="Tapez ici si l'adresse est imprécise..."
                  style={{resize:'none'}}
                ></textarea>
              </div>
            </div>
          )}

          <div className="form-row" style={{marginTop:'20px'}}>
             <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => navigate('/pharmacien/pharmacy-info')}
              style={{marginBottom:'16px'}}
             >
               ← Retour
             </button>
             <button type="button" onClick={handleContinue} className="btn-primary" disabled={!mapActivated}>
               Finaliser l'inscription ✓
             </button>
          </div>

        </div>
      </div>
      <p className="page-footer">© 2026 MYPHARMA DIGITAL HEALTH</p>
    </div>
  );
}
