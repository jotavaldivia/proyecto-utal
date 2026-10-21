import { Header } from './Header';
import './Layout.css';

export const Layout = ({ children, currentView, setCurrentView }) => {
  return (
    <div className="layout-container">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};