import React from 'react';

const HomePage: React.FC = () => {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold" style={{ color: '#0066ff' }}>StockSight Cloud WMS</h1>
      <p className="text-gray-700">A production-ready starter for real-time stock visibility, zone-based picking, batch/expiry tracking, and ERP integrations across multiple warehouses.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow-sm">Real-time stock visibility</div>
        <div className="p-4 bg-white rounded shadow-sm">Batch/Expiry tracking</div>
        <div className="p-4 bg-white rounded shadow-sm">ERP & E-commerce integrations</div>
      </div>
    </section>
  );
};

export default HomePage;
