import StoresClient from "./client";
import { fetchProducts, fetchStores, fetchStorePrices } from "@/lib/data";

export const revalidate = 60; // optionally revalidate every 60s

export default async function StoresPage() {
  const [products, stores, storePrices] = await Promise.all([
    fetchProducts(),
    fetchStores(),
    fetchStorePrices(),
  ]);

  return <StoresClient products={products} stores={stores} storePrices={storePrices} />;
}
