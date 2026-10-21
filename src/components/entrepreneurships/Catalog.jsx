import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Card } from './Card';
import './Catalog.css';

export const Catalog = () => {
  const { ventures, currentStudent } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredVentures = (ventures || []).filter(venture => {
    const search = searchTerm.toLowerCase();
    const name = (venture.name || venture.nombre || '').toLowerCase();
    const category = (venture.category || venture.clasificacion || '').toLowerCase();
    const matchesSearch = name.includes(search) || category.includes(search);

    const favoriteIds = currentStudent?.favoriteVentureIds || [];
    const isFavorite = favoriteIds.includes(venture.id);
    const matchesFavorites = showFavoritesOnly ? isFavorite : true;

    return matchesSearch && matchesFavorites;
  });

  return (
    <div className="catalog-container">
      <div className="catalog-filters">
        <input
          type="text"
          placeholder="Buscar por nombre o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button
          className={`filter-btn ${showFavoritesOnly ? 'active' : ''}`}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          {showFavoritesOnly ? 'Volver' : 'Ver Mis Favoritos'}
        </button>
      </div>

      <div className="cards-grid">
        {filteredVentures.length > 0 ? (
          filteredVentures.map(venture => (
            <Card key={venture.id} venture={venture} />
          ))
        ) : (
          <div className="empty-state">No se encontraron emprendimientos con esos filtros.</div>
        )}
      </div>
    </div>
  );
};