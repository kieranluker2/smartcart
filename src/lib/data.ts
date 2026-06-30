import { supabase } from './supabase';

export type Category = 'bulk-household' | 'protein' | 'carbs' | 'dairy' | 'produce' | 'canned' | 'condiments' | 'frozen';

export interface Product {
  id: string;
  name: string;
  category: Category;
  unit: string;
  icon: string;
}

export interface Store {
  id: string;
  name: string;
  color: string;
  darkColor: string;
  logo: string;
  website: string;
  type: 'budget' | 'mid' | 'premium';
}

export interface StorePrice {
  storeId: string;
  productId: string;
  price: number;
  size: string;
  pricePerUnit: number;
  baseUnit: string;
  inStock: boolean;
  onOffer: boolean;
  offerNote?: string;
  url: string;
}

export async function fetchStores(): Promise<Store[]> {
  const { data } = await supabase.from('stores').select('*');
  return data as Store[] || [];
}

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await supabase.from('products').select('*');
  return data as Product[] || [];
}

export async function fetchStorePrices(): Promise<StorePrice[]> {
  const { data } = await supabase.from('store_prices').select('*');
  return data as StorePrice[] || [];
}

export function getPricesForProduct(
  productId: string,
  storePrices: StorePrice[],
  stores: Store[]
): (StorePrice & { store: Store })[] {
  return storePrices
    .filter(p => p.productId === productId && p.inStock)
    .sort((a, b) => a.pricePerUnit - b.pricePerUnit)
    .map(p => ({ ...p, store: stores.find(s => s.id === p.storeId)! }));
}

export function getCheapestBasket(
  productIds: string[],
  storePrices: StorePrice[],
  products: Product[],
  stores: Store[]
): {
  byStore: { store: Store; total: number; items: (StorePrice & { store: Store; product: Product })[] }[];
  cheapestStore: Store;
  savings: number;
} {
  const storeBaskets = stores.map(store => {
    const items = productIds.map(pid => {
      const price = storePrices.find(p => p.productId === pid && p.storeId === store.id && p.inStock);
      const product = products.find(p => p.id === pid)!;
      return price ? { ...price, store, product } : null;
    }).filter(Boolean) as (StorePrice & { store: Store; product: Product })[];

    const total = items.reduce((sum, i) => sum + i.price, 0);
    return { store, total, items };
  }).filter(b => b.items.length === productIds.length)
    .sort((a, b) => a.total - b.total);

  return {
    byStore: storeBaskets,
    cheapestStore: storeBaskets[0]?.store,
    savings: storeBaskets.length > 1 ? storeBaskets[storeBaskets.length - 1].total - storeBaskets[0].total : 0,
  };
}

export function searchProducts(query: string, products: Product[]): Product[] {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.includes(q)
  );
}
