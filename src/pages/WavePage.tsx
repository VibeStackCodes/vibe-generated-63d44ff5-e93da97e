import React from 'react';

const WavePage: React.FC = () => {
  const waves = [
    { id: 'WAVE-1', zone: 'A', eta: '12m', items: ['SKU-1002', 'SKU-1003'] },
    { id: 'WAVE-2', zone: 'B', eta: '25m', items: ['SKU-1004'] },
    { id: 'WAVE-3', zone: 'C', eta: '40m', items: ['SKU-1001'] }
  ];
  return (
    <section aria-label="Waves" className="space-y-4">
      <h2 className="text-xl font-semibold" style={{ color: '#0066ff' }}>Wave & Zone-Picking Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {waves.map((w) => (
          <div key={w.id} className="p-4 bg-white rounded shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{w.id} - Zone {w.zone}</span>
              <span className="text-sm text-gray-500">ETA {w.eta}</span>
            </div>
            <ul className="text-sm text-gray-700 list-disc pl-5">
              {w.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WavePage;
