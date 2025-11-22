import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Home';
import InventoryPage from './pages/InventoryPage';
import IntegrationsPage from './pages/IntegrationsPage';
import WavePage from './pages/WavePage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold" style={{ color: '#0066ff' }}>StockSight</Link>
          <div className="flex space-x-3">
            <Link to="/inventory" className="px-3 py-2 rounded-md bg-primary text-white hover:bg-blue-600">Inventory</Link>
            <Link to="/waves" className="px-3 py-2 rounded-md bg-primary text-white hover:bg-blue-600">Waves</Link>
            <Link to="/integrations" className="px-3 py-2 rounded-md bg-primary text-white hover:bg-blue-600">Integrations</Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/waves" element={<WavePage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
