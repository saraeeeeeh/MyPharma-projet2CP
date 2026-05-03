import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-icon">⊕</div>
        <div className="logo-text">
          <h1>MyPharma</h1>
          <p>Votre santé connectée en toute sécurité</p>
        </div>
      </div>
      <div className="nav-links">
        <a href="#">Aide</a>
        <a href="#">Confidentialité</a>
        <button className="btn-support">Support</button>
      </div>
    </nav>
  );
}

export default Navbar;