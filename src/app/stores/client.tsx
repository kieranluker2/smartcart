"use client";

import { useState, useMemo } from "react";
import { MapPin, ExternalLink, TrendingDown, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Store, type Category, type Product, type StorePrice } from "@/lib/data";
import { cn } from "@/lib/utils";

const categoryLabels: Record<Category, { label: string; icon: string }> = {
  "bulk-household": { label: "Household", icon: "🏠" },
  "protein":        { label: "Protein",   icon: "🍗" },
  "carbs":          { label: "Carbs",     icon: "🍚" },
  "dairy":          { label: "Dairy",     icon: "🥛" },
  "produce":        { label: "Produce",   icon: "🥦" },
  "canned":         { label: "Canned",    icon: "🥫" },
  "condiments":     { label: "Condiments", icon: "🫙" },
  "frozen":         { label: "Frozen",    icon: "❄️" },
};

const typeBadge: Record<Store["type"], string> = {
  budget:  "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  mid:     "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  premium: "bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800",
};

const typeLabel: Record<Store["type"], string> = {
  budget: "Budget", mid: "Mid-range", premium: "Premium",
};

export default function StoresClient({ products, stores, storePrices }: { products: Product[], stores: Store[], storePrices: StorePrice[] }) {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");

  const storeStats = useMemo(() => {
    return stores.map(store => {
      const prices = storePrices.filter(p => p.storeId === store.id && p.inStock);
      const cheapestCount = products.filter(product => {
        const allPrices = storePrices.filter(p => p.productId === product.id && p.inStock);
        if (allPrices.length === 0) return false;
        const min = Math.min(...allPrices.map(p => p.pricePerUnit));
        const storePriceEntry = allPrices.find(p => p.storeId === store.id);
        return storePriceEntry && storePriceEntry.pricePerUnit === min;
      }).length;

      return { ...store, priceCount: prices.length, cheapestCount };
    });
  }, [stores, storePrices, products]);

  const selectedStore = stores.find(s => s.id === selectedStoreId);

  const storeProducts = useMemo(() => {
    if (!selectedStoreId) return [];
    return storePrices
      .filter(p => p.storeId === selectedStoreId && p.inStock)
      .map(sp => {
        const product = products.find(p => p.id === sp.productId)!;
        const allPrices = storePrices.filter(p => p.productId === sp.productId && p.inStock);
        const minPrice = Math.min(...allPrices.map(p => p.pricePerUnit));
        const isCheapest = sp.pricePerUnit === minPrice;
        return { ...sp, product, isCheapest };
      })
      .filter(p => selectedCategory === "all" || p.product.category === selectedCategory)
      .sort((a, b) => {
        if (a.isCheapest !== b.isCheapest) return a.isCheapest ? -1 : 1;
        return a.product.name.localeCompare(b.product.name);
      });
  }, [selectedStoreId, selectedCategory, storePrices, products]);

  return (
    <div className="mesh-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-primary mb-3">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Store Explorer</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-3">Explore every supermarket</h1>
          <p className="text-muted-foreground text-lg">
            Click any store to browse their prices and see where they beat the competition.
          </p>
        </div>

        {/* Store cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {storeStats.map(store => (
            <button
              key={store.id}
              id={`store-${store.id}`}
              onClick={() => setSelectedStoreId(store.id === selectedStoreId ? null : store.id)}
              className={cn(
                "price-card flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all text-center",
                selectedStoreId === store.id
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card hover:border-primary/40"
              )}
            >
              <span className="text-4xl select-none">{store.logo}</span>
              <div>
                <p className="font-bold text-sm">{store.name}</p>
                <Badge className={cn("text-xs mt-1.5 border", typeBadge[store.type])}>
                  {typeLabel[store.type]}
                </Badge>
              </div>
              <div className="text-center w-full border-t border-border pt-3">
                <p className="text-xs text-muted-foreground">Cheapest at</p>
                <p className="text-lg font-extrabold text-primary">{store.cheapestCount}</p>
                <p className="text-xs text-muted-foreground">products</p>
              </div>
            </button>
          ))}
        </div>

        {/* Store comparison overview (no store selected) */}
        {!selectedStoreId && (
          <div className="bg-card rounded-2xl border border-border overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-border">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-primary" />
                Store overview — how many products does each win?
              </h2>
            </div>
            <div className="p-6">
              {storeStats
                .sort((a, b) => b.cheapestCount - a.cheapestCount)
                .map(store => {
                  const maxCheapest = Math.max(...storeStats.map(s => s.cheapestCount));
                  return (
                    <div key={store.id} className="flex items-center gap-4 mb-4">
                      <span className="w-24 text-sm font-medium text-right">{store.name}</span>
                      <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full gradient-brand flex items-center justify-end pr-3 transition-all duration-500"
                          style={{ width: `${maxCheapest > 0 ? (store.cheapestCount / maxCheapest) * 100 : 0}%` }}
                        >
                          <span className="text-white text-xs font-bold">{store.cheapestCount}</span>
                        </div>
                      </div>
                      <Badge className={cn("text-xs border", typeBadge[store.type])}>
                        {typeLabel[store.type]}
                      </Badge>
                    </div>
                  );
                })}
              <p className="text-xs text-muted-foreground mt-4">
                Click any store card above to browse their individual prices.
              </p>
            </div>
          </div>
        )}

        {/* Selected store product listing */}
        {selectedStoreId && selectedStore && (
          <div className="animate-slide-in-up">
            <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedStore.logo}</span>
                <div>
                  <h2 className="text-2xl font-bold">{selectedStore.name}</h2>
                  <a href={selectedStore.website} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1">
                    Visit website <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all",
                    selectedCategory === "all"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  )}
                >All</button>
                {(Object.keys(categoryLabels) as Category[]).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat === selectedCategory ? "all" : cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all",
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    )}
                  >
                    {categoryLabels[cat].icon} {categoryLabels[cat].label}
                  </button>
                ))}
              </div>
            </div>

            {storeProducts.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-semibold">No products in this category</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {storeProducts.map(entry => (
                  <div
                    key={entry.productId}
                    className={cn(
                      "price-card bg-card rounded-xl border p-4 flex items-start gap-3",
                      entry.isCheapest ? "border-primary" : "border-border"
                    )}
                  >
                    <span className="text-3xl select-none">{entry.product.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <p className="font-semibold text-sm leading-tight">{entry.product.name}</p>
                        {entry.isCheapest && (
                          <Badge className="bg-primary/10 text-primary border-primary/30 text-xs shrink-0">
                            ✓ Cheapest
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{entry.size}</p>
                      {entry.onOffer && (
                        <Badge className="bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700 text-xs mt-1">
                          🏷️ {entry.offerNote}
                        </Badge>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-extrabold">£{entry.price.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground mb-1">
                        £{entry.pricePerUnit.toFixed(3)}/{entry.baseUnit}
                      </p>
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-primary font-medium hover:underline bg-primary/5 hover:bg-primary/10 px-2 py-0.5 rounded transition-colors inline-flex items-center gap-1"
                      >
                        🔗 Buy Online
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
