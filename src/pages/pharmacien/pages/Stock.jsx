import React, { useState } from 'react';
import '../PharmacienDashboard.css';

const MOCK_STOCK = [
  { id: '1', name: 'Doliprane 1000mg', forme: 'Comprimé', lab: 'Sanofi', price: '250', qty: 145, threshold: 50 },
  { id: '2', name: 'Amoxicilline 500mg', forme: 'Gélule', lab: 'Saidal', price: '450', qty: 12, threshold: 20 },
  { id: '3', name: 'Smecta', forme: 'Sachet', lab: 'Ipsen', price: '320', qty: 8, threshold: 15 },
  { id: '4', name: 'Vitamin C 1000', forme: 'Effervescent', lab: 'Bayer', price: '600', qty: 89, threshold: 30 },
  { id: '5', name: 'Aspegic 1000', forme: 'Sachet', lab: 'Sanofi', price: '210', qty: 3, threshold: 20 },
];

export default function Stock() {
  const [stock, setStock] = useState(MOCK_STOCK);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', forme: '', lab: '', price: '', qty: 0, threshold: 0 });

  const [editingItem, setEditingItem] = useState(null);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    if (editingItem) {
      setStock(stock.map(item => item.id === editingItem.id ? { ...newItem, id: editingItem.id } : item));
      alert('Médicament modifié avec succès.');
    } else {
      const newMedicine = {
        ...newItem,
        id: Date.now().toString(),
        price: newItem.price.toString(),
        qty: Number(newItem.qty),
        threshold: Number(newItem.threshold)
      };
      setStock([newMedicine, ...stock]);
      alert('Médicament ajouté au stock.');
    }
    
    setIsModalOpen(false);
    setNewItem({ name: '', forme: '', lab: '', price: '', qty: 0, threshold: 0 });
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet article de votre inventaire ?")) {
      setStock(stock.filter(i => i.id !== id));
      alert("L'article a été supprimé.");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewItem(item);
    setIsModalOpen(true);
  };

  const updateQty = (id, change) => {
    setStock(stock.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.qty + change);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const filtered = stock.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  const lowStockItems = stock.filter(item => item.qty <= item.threshold);

  return (
    <>
      <div style={{marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <div>
          <h2 style={{fontSize: '20px', color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: '10px'}}>
            Gestion du Stock
            {lowStockItems.length > 0 && (
              <span className="badge badge-red" style={{fontSize: '11px', padding: '4px 8px'}}>
                {lowStockItems.length} alertes
              </span>
            )}
          </h2>
          <p style={{fontSize: '13px', color: '#888'}}>Gérez votre inventaire et visualisez les alertes de rupture.</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setNewItem({ name: '', forme: '', lab: '', price: '', qty: 0, threshold: 0 });
            setIsModalOpen(true);
          }}
          className="btn-primary-sm"
          style={{margin: 0, padding: '10px 20px', width: 'auto'}}
        >
          + Nouveaux articles
        </button>
      </div>

      {/* Alerts banner */}
      {lowStockItems.length > 0 && (
        <div className="alert-box" style={{backgroundColor: '#fdecea', borderColor: '#f5cba7'}}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="2" style={{marginTop:'2px'}}>
             <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
             <line x1="12" y1="9" x2="12" y2="13"/>
             <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <div>
            <h3 className="alert-title" style={{color: '#e74c3c'}}>Attention, {lowStockItems.length} médicaments sont presque en rupture :</h3>
            <ul style={{ color: '#e74c3c', fontSize: '13px', paddingLeft: '20px', marginTop: '5px' }}>
              {lowStockItems.map(item => (
                <li key={item.id}>{item.name} - Reste {item.qty} (Seuil: {item.threshold})</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="card">
        <div className="card-header">
           <div className="card-title">Inventaire</div>
           <input
             type="text"
             placeholder="Rechercher un médicament..."
             value={search}
             onChange={e => setSearch(e.target.value)}
             style={{padding:'8px 12px', borderRadius:'8px', border:'1px solid #e0e0e0', outline:'none', fontSize:'13px', minWidth:'250px'}}
           />
        </div>

        <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left'}}>
          <thead>
            <tr style={{borderBottom: '2px solid #f0f4f8', color: '#888'}}>
              <th style={{padding: '12px 10px', fontWeight: '500'}}>Médicament</th>
              <th style={{padding: '12px 10px', fontWeight: '500'}}>Forme</th>
              <th style={{padding: '12px 10px', fontWeight: '500'}}>Laboratoire</th>
              <th style={{padding: '12px 10px', fontWeight: '500'}}>Prix (DZD)</th>
              <th style={{padding: '12px 10px', fontWeight: '500', textAlign: 'center'}}>Quantité</th>
              <th style={{padding: '12px 10px', fontWeight: '500', textAlign: 'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => {
              const isLow = item.qty <= item.threshold;
              return (
                <tr key={item.id} style={{borderBottom: '1px solid #f0f4f8', backgroundColor: isLow ? '#fef2f2' : 'transparent'}}>
                  <td style={{padding: '12px 10px'}}>
                    <p style={{ fontWeight: '600', color: '#1a1a2e' }}>{item.name}</p>
                    {isLow && <p style={{ fontSize: '11px', fontWeight: '600', color: '#e74c3c', marginTop: '2px' }}>Stock critique</p>}
                  </td>
                  <td style={{padding: '12px 10px', color: '#555'}}>{item.forme}</td>
                  <td style={{padding: '12px 10px', color: '#555'}}>{item.lab}</td>
                  <td style={{padding: '12px 10px', fontWeight: '600'}}>{item.price}.00</td>
                  <td style={{padding: '12px 10px', textAlign: 'center'}}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ padding: '6px', borderRadius: '5px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}>-</button>
                      <span style={{ fontWeight: '700', color: isLow ? '#e74c3c' : '#1a1a2e', minWidth:'20px' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{ padding: '6px', borderRadius: '5px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}>+</button>
                    </div>
                  </td>
                  <td style={{padding: '12px 10px', textAlign: 'right'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                      <button onClick={() => handleEdit(item)} style={{padding: '6px', border: 'none', background: 'transparent', cursor: 'pointer'}} title="Modifier">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2c6fd4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(item.id)} style={{padding: '6px', border: 'none', background: 'transparent', cursor: 'pointer'}} title="Supprimer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#888' }}>
                  Aucun médicament trouvé pour "{search}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div className="card" style={{width: '90%', maxWidth: '600px', padding: '24px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h3 style={{fontSize: '18px', color: '#1a1a2e'}}>Ajouter un médicament</h3>
              <button onClick={() => setIsModalOpen(false)} style={{background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#888'}}>✕</button>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div className="form-group">
                <label>Nom du médicament*</label>
                <input required type="text" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} placeholder="Ex: Paracétamol 1000mg" />
              </div>

              <div className="grid2">
                <div className="form-group">
                  <label>Forme</label>
                  <input type="text" value={newItem.forme} onChange={e => setNewItem({ ...newItem, forme: e.target.value })} placeholder="Ex: Comprimé" />
                </div>
                <div className="form-group">
                  <label>Laboratoire</label>
                  <input type="text" value={newItem.lab} onChange={e => setNewItem({ ...newItem, lab: e.target.value })} placeholder="Ex: Saidal" />
                </div>
              </div>

              <div className="grid3" style={{gridTemplateColumns: '1fr 1fr 1fr'}}>
                <div className="form-group">
                  <label>Prix (DZD)*</label>
                  <input required type="number" min="0" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} placeholder="0.00" />
                </div>
                <div className="form-group">
                  <label>Stock Initial*</label>
                  <input required type="number" min="0" value={newItem.qty} onChange={e => setNewItem({ ...newItem, qty: e.target.value })} placeholder="0" />
                </div>
                <div className="form-group">
                  <label>Seuil Alerte*</label>
                  <input required type="number" min="0" value={newItem.threshold} onChange={e => setNewItem({ ...newItem, threshold: e.target.value })} placeholder="10" />
                </div>
              </div>

              <div style={{ paddingTop: '15px', display: 'flex', justifyContent: 'flex-end', gap: '15px', borderTop: '1px solid #e0e0e0', marginTop: '10px' }}>
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingItem(null); }} style={{background: 'white', border: '1px solid #ccc', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '600'}}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary-sm" style={{margin: 0, width: 'auto', padding: '10px 18px', background: '#1e8a5e'}}>
                  {editingItem ? "Sauvegarder" : "+ Ajouter au stock"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
