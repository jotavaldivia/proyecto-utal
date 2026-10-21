import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../../context/AppContext';
import './Header.css';

export const Header = ({ currentView, setCurrentView }) => {
  const { currentStudent, resetData } = useContext(AppContext);

  return (
    <header className="main-header">
      <div className="header-brand">
        <h2>Campus Virtual</h2>
      </div>
      <nav className="header-nav">
        <button 
          className={currentView === 'catalog' ? 'active' : ''} 
          onClick={() => setCurrentView('catalog')}
        >
          Emprendimientos
        </button>
        <button 
          className={currentView === 'groups' ? 'active' : ''} 
          onClick={() => setCurrentView('groups')}
        >
          Grupos Intermedios
        </button>
      </nav>
      <div className="header-user">
        {currentStudent && <span>Hola, {currentStudent.name || currentStudent.nombre}</span>}
        <button 
          className="btn-reset" 
          onClick={() => {
            if (window.confirm('¿Deseas restablecer todos los datos al estado inicial?')) {
              resetData();
            }
          }}
          title="Restablecer datos originales"
        >
          <FontAwesomeIcon icon={faRotateRight} /> Reiniciar datos
        </button>
      </div>
    </header>
  );
};