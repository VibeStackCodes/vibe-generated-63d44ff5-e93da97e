import React from 'react';

const IntegrationsPage: React.FC = () => {
  const integrations = [
    { name: 'ERP (ERP-X)', status: 'Connected' },
    { name: 'Shopify', status: 'Syncing' },
    { name: 'ShipStation', status: 'Connected' }
  ];
  return (
    <section aria-label="Integrations" className="space-y-4">
      <h2 className="text-xl font-semibold" style={{ color: '#0066ff' }}>ERP & External Platform Integrations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {integrations.map((inr) => (
          <div key={inr.name} className="p-4 bg-white rounded shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <strong>{inr.name}</strong>
              <span className={`px-2 py-1 rounded text-xs ${inr.status === 'Connected' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{inr.status}</span>
            </div>
            <p className="text-sm text-gray-600">Bi-directional data sync, authentication, and error handling. Secure and resilient.</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IntegrationsPage;
