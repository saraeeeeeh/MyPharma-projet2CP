import React from 'react';

function ProfileCard({ image, tag, tagClass, title, description, btnClass, isActive, onClick, onHover }) {
  return (
    <div
      className={`profile-card ${tagClass} ${isActive ? 'active' : ''}`}
      onClick={onClick}
      onMouseEnter={() => onHover(tagClass)}
      onMouseLeave={() => onHover(null)}
    >
      <img src={image} alt={title} className="card-img" />

      <div className="card-tag">
        <span className="tag-icon">👤</span>
        <span className={`tag-label ${tagClass}`}>{tag}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className={`btn-acces ${btnClass}`}>
        Accéder →
      </button>
    </div>
  );
}

export default ProfileCard;