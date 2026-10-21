import { useState, useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { Catalog } from './components/entrepreneurships/Catalog';
import { Directory } from './components/groups/Directory';

const MainContent = () => {
  const { loading, error } = useContext(AppContext);
  const [currentView, setCurrentView] = useState('catalog');

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando plataforma...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>Error al cargar: {error}</div>;

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      {currentView === 'catalog' && <Catalog />}
      {currentView === 'groups' && <Directory />}
    </Layout>
  );
};

function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;