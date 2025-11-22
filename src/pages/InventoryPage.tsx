import React, { useEffect, useMemo, useState } from 'react';
import { cn, formatDate } from '@/lib/utils';

type StockItem = {
  sku: string;
  name: string;
  location: string;
  warehouseId: string;
  quantity: number;
  batch?: string;
  expiry?: string; // ISO date string
};

type Warehouse = {
  id: string;
  name: string;
  location: string;
  stock: StockItem[];
};

const initialWarehouses: Warehouse[] = [
  {
    id: 'W1',
    name: 'East Coast DC',
    location: 'New York, NY',
    stock: [
      { sku: 'SKU-1001', name: 'Widget Pro', location: 'Aisle 1', warehouseId: 'W1', quantity: 120, batch: 'BATCH-A1', expiry: '2025-12-31' },
      { sku: 'SKU-1002', name: 'Gadget Mini', location: 'Aisle 2', warehouseId: 'W1', quantity: 240, batch: 'BATCH-A2', expiry: '2026-03-30' },
      { sku: 'SKU-1003', name: 'Toolset', location: 'Aisle 3', warehouseId: 'W1', quantity: 75, batch: 'BATCH-B1', expiry: '2025-08-15' }
    ]
  },
  {
    id: 'W2',
    name: 'West Coast DC',
    location: 'San Francisco, CA',
    stock: [
      { sku: 'SKU-1001', name: 'Widget Pro', location: 'Aisle 4', warehouseId: 'W2', quantity: 80, batch: 'BATCH-A1', expiry: '2025-12-31' },
      { sku: 'SKU-1004', name: 'Cable Pack', location: 'Aisle 5', warehouseId: 'W2', quantity: 300, batch: 'BATCH-C1', expiry: '2027-01-12' }
    ]
  }
];

const InventoryPage: React.FC = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>(initialWarehouses);
  const [query, setQuery] = useState<string>('');

  // Simulate real-time stock updates every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setWarehouses((prev) => {
        if (prev.length === 0) return prev;
        const wIndex = Math.floor(Math.random() * prev.length);
        const w = prev[wIndex];
        if (!w.stock.length) return prev;
        const sIndex = Math.floor(Math.random() * w.stock.length);
        const s = w.stock[sIndex];
        const delta = Math.random() > 0.5 ? 1 : -1;
        const newQty = Math.max(0, s.quantity + delta);
        const newWarehouses = prev.map((wh, idx) => {
          if (idx !== wIndex) return wh;
          const newStock = wh.stock.map((it, i) => (i === sIndex ? { ...it, quantity: newQty } : it));
          return { ...wh, stock: newStock };
        });
        return newWarehouses;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return warehouses;
    return warehouses.map((w) => ({ ...w, stock: w.stock.filter((s) => [s.sku, s.name, s.location].some((t) => t.toLowerCase().includes(q))) }));
  }, [warehouses, query]);

  return (
    <section aria-label="Inventory dashboard" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold" style={{ color: '#0066ff' }}>Stock Visibility by Warehouse</h2>
        <div className="flex items-center gap-2">
          <input
            aria-label="Scan barcode or search"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Scan barcode or search SKU..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="text-sm text-gray-500">Real-time updates every 6s</span>
        </div>
      </div>
      {filtered.map((w) => (
        <div key={w.id} className="bg-white rounded shadow-sm p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: '#0066ff' }} />
              <strong>{w.name}</strong>
              <span className="text-sm text-gray-500">({w.location})</span>
            </div>
            <span className="text-sm text-gray-500">Warehouse ID: {w.id}</span>
          </div>
          <table className="w-full text-sm text-left table-fixed border-collapse">
            <thead>
              <tr>
                <th className="px-2 py-2 w-28">SKU</th>
                <th className="px-2 py-2">Item</th>
                <th className="px-2 py-2 w-28">Location</th>
                <th className="px-2 py-2 w-20">Batch</th>
                <th className="px-2 py-2 w-20">Expiry</th>
                <th className="px-2 py-2 w-16">Qty</th>
              </tr>
            </thead>
            <tbody>
              {w.stock.map((item) => (
                <tr key={item.sku + item.location} className="border-t">
                  <td className="px-2 py-1 text-xs">{item.sku}</td>
                  <td className="px-2 py-1">{item.name}</td>
                  <td className="px-2 py-1 text-xs">{item.location}</td>
                  <td className="px-2 py-1 text-xs">{item.batch ?? '-'}</td>
                  <td className="px-2 py-1 text-xs">{item.expiry ? formatDate(item.expiry) : '-'}</td>
                  <td className="px-2 py-1 text-right font-mono">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <section aria-label="Wave picking" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="font-semibold mb-2" style={{ color: '#0066ff' }}>Zone-based Picking Waves</h3>
          <WaveListMini />
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="font-semibold mb-2" style={{ color: '#0066ff' }}>Barcode Scan History</h3>
          <p className="text-sm text-gray-500">Simulated barcode scans appear here during usage.</p>
        </div>
      </section>
    </section>
  );
};

const WaveListMini: React.FC = () => {
  const waves = [
    { id: 'WAVE-1', zone: 'A', items: [ { sku: 'SKU-1002', qty: 12 }, { sku: 'SKU-1003', qty: 4 } ], eta: '12m' },
    { id: 'WAVE-2', zone: 'B', items: [ { sku: 'SKU-1004', qty: 20 } ], eta: '25m' },
    { id: 'WAVE-3', zone: 'C', items: [ { sku: 'SKU-1001', qty: 6 } ], eta: '40m' }
  ];
  return (
    <div className="space-y-2">
      {waves.map((w) => (
        <div key={w.id} className="p-2 border rounded-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full" style={{ background: w.zone === 'A' ? '#34d399' : w.zone === 'B' ? '#f59e0b' : '#3b82f6' }} />
            <strong>Zone {w.zone}</strong>
          </div>
          <span className="text-sm text-gray-600">ETA: {w.eta}</span>
          <span className="text-sm text-gray-600">Items: {w.items.length}</span>
        </div>
      ))}
    </div>
  );
};

export default InventoryPage;
