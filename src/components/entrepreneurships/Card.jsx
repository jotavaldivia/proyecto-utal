import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStar, faHeart as faHeartSolid, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { AppContext } from '../../context/AppContext';
import './Card.css';

export const Card = ({ venture }) => {
  const { currentStudent, toggleLike, toggleFavorite } = useContext(AppContext);
  const favoriteIds = currentStudent?.favoriteVentureIds || [];
  const isFavorite = favoriteIds.includes(venture.id);

  const handleContact = () => {
    const socialMedia = venture.contact || venture.redes_y_contacto || {};
    const contactChannel = socialMedia.instagram || socialMedia.telefono || socialMedia.correo || venture.contacto?.principal || 'canales oficiales';
    alert(`Contactando a ${venture.name || venture.nombre} vía ${contactChannel}`);
  };

  const category = venture.category || venture.clasificacion || venture.categoria || 'General';
  const averageRating = venture.averageRating ?? venture.promedio_valoracion ?? venture.promedioEstrellas ?? 0;
  const totalReviews = venture.totalReviews ?? venture.total_valoraciones ?? venture.totalResenas ?? 0;
  const campusDisplay = venture.campus || (venture.campus_ids ? venture.campus_ids.join(', ') : 'Varios');

  return (
    <div className="card-container">
      <div className="card-header">
        <h3>{venture.name || venture.nombre}</h3>
        <span className="badge">{category}</span>
      </div>
      <p className="description">{venture.description || venture.descripcion}</p>
      <div className="details">
        <span><FontAwesomeIcon icon={faLocationDot} className="icon-location" /> {campusDisplay}</span>
        <span><FontAwesomeIcon icon={faStar} className="icon-star" /> {averageRating} ({totalReviews} reseñas)</span>
      </div>

      <div className="actions">
        <button
          className={`action-btn ${isFavorite ? 'active-fav' : ''}`}
          onClick={() => toggleFavorite(venture.id)}
        >
          <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} />
          <span>{isFavorite ? 'Quitar' : 'Guardar'}</span>
        </button>
        <button
          className="action-btn"
          onClick={() => toggleLike(venture.id, true)}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{venture.likes} Likes</span>
        </button>
        <button className="contact-btn" onClick={handleContact}>
          Contactar
        </button>
      </div>
    </div>
  );
};