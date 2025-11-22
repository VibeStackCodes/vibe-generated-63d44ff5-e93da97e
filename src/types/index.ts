export type UserRole = 'Manager' | 'Director' | 'IT';
export interface InventoryItem {
  sku: string;
  name: string;
  location: string;
  warehouseId: string;
  quantity: number;
  batch?: string;
  expiry?: string;
}
