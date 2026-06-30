"use client";

import { useState, useMemo } from "react";
import { Search, TrendingDown, Package, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { getPricesForProduct, searchProducts, type Category, type Product, type Store, type StorePrice } from "@/lib/data";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const categoryLabels: Record<Category, { label: string; icon: string }> = {
  "bulk-household": { label: "Household", icon: "🏠" },
  "protein":        { label: "Protein",   icon: "🍗" },
  "carbs":          { label: "Carbs",     icon: "🍚" },
  "dairy":          { label: "Dairy",     icon: "🥛" },
  "produce":        { label: "Produce",   icon: "🥦" },
  "canned":         { label: "Canned",    icon: "🥫" },
  "condiments":     { label: "Condiments",icon: "🫙" },
  "frozen":         { label: "Frozen",    icon: "❄️" },
};

export default function CompareClient({ products, stores, storePrices }: { products: Product[], stores: Store[], storePrices: StorePrice[] }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let list = query.trim() ? searchProducts(query, products) : products;
    if (selectedCategory !== "all") list = list.filter(p => p.category === selectedCategory);
    return list;
  }, [query, selectedCategory, products]);

  const prices = useMemo(() => {
    if (!selectedProductId) return [];
    return getPricesForProduct(selectedProductId, storePrices, stores);
  }, [selectedProductId, storePrices, stores]);

  const selectedProduct = products.find(p => p.id === selectedProductId);
  const bestPrice = prices[0];
  const worstPrice = prices[prices.length - 1];

  return (
    <div className="mesh-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-primary mb-3">
            <TrendingDown className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Price Comparator</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-3">Find the cheapest price</h1>
          <p className="text-muted-foreground text-lg">
            Search any product to instantly compare prices across all 6 UK supermarkets.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Search + product list */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="product-search"
                placeholder="Search products… e.g. 'toilet paper'"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all",
                  selectedCategory === "all"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary/50"
                )}
              >
                All
              </button>
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

            {/* Product list */}
            <div className="flex flex-col gap-1.5 max-h-[calc(100vh-18rem)] overflow-y-auto pr-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p className="font-medium">No products found</p>
                  <p className="text-sm">Try a different search term</p>
                </div>
              ) : (
                filteredProducts.map(product => (
                  <button
                    key={product.id}
                    id={`product-${product.id}`}
                    onClick={() => setSelectedProductId(product.id)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all border",
                      selectedProductId === product.id
                        ? "bg-primary text-primary-foreground border-primary shadow-md"
                        : "bg-card border-border hover:border-primary/40 hover:bg-accent/50"
                    )}
                  >
                    <span className="text-2xl select-none">{product.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{product.name}</p>
                      <p className={cn("text-xs", selectedProductId === product.id ? "text-primary-foreground/70" : "text-muted-foreground")}>
                        {categoryLabels[product.category]?.label} · {product.unit}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Right: Price results */}
          <div className="lg:col-span-2">
            {!selectedProductId ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 text-muted-foreground border-2 border-dashed border-border rounded-2xl">
                <Search className="w-14 h-14 mb-4 opacity-30" />
                <h2 className="text-xl font-bold text-foreground mb-2">Select a product</h2>
                <p className="text-sm max-w-xs">
                  Pick any product from the list to instantly see ranked prices across all supermarkets.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-5 animate-slide-in-up">
                {/* Product header */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <span className="text-5xl">{selectedProduct?.icon}</span>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedProduct?.name}</h2>
                        <p className="text-muted-foreground text-sm mt-1">
                          Price per {selectedProduct?.unit} · {prices.length} stores in stock
                        </p>
                      </div>
                    </div>
                    {bestPrice && worstPrice && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">You could save</p>
                        <p className="text-3xl font-extrabold text-primary">
                          £{(worstPrice.price - bestPrice.price).toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">vs most expensive store</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Store price cards */}
                <div className="flex flex-col gap-3">
                  {prices.map((entry, i) => {
                    const isBest = i === 0;
                    const isWorst = i === prices.length - 1 && prices.length > 1;
                    const priceDiff = bestPrice ? entry.price - bestPrice.price : 0;

                    return (
                      <div
                        key={entry.storeId}
                        id={`price-${entry.storeId}`}
                        className={cn(
                          "price-card bg-card rounded-2xl border p-5 flex items-center gap-5 flex-wrap",
                          isBest ? "border-primary shadow-sm" : "border-border"
                        )}
                      >
                        {/* Rank */}
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0",
                          isBest ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}>
                          #{i + 1}
                        </div>

                        {/* Store */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-base">{entry.store.name}</span>
                            {isBest && (
                              <Badge className="bg-primary/10 text-primary border-primary/30 badge-best text-xs">
                                ✓ Best Value
                              </Badge>
                            )}
                            {isWorst && (
                              <Badge variant="secondary" className="text-xs text-muted-foreground">
                                Most expensive
                              </Badge>
                            )}
                            {entry.onOffer && (
                              <Badge className="bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700 text-xs">
                                🏷️ {entry.offerNote}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{entry.size}</p>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-2xl font-extrabold">£{entry.price.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">
                            £{entry.pricePerUnit.toFixed(3)} / {entry.baseUnit}
                          </p>
                          {!isBest && priceDiff > 0 && (
                            <p className="text-xs text-rose-500 dark:text-rose-400 font-medium mt-0.5">
                              +£{priceDiff.toFixed(2)} more
                            </p>
                          )}
                        </div>

                        {/* Bar chart indicator */}
                        <div className="w-full mt-2">
                          <div className="flex items-center justify-between gap-3">
                            <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                              <div
                                className={cn("h-full rounded-full transition-all", isBest ? "bg-primary" : "bg-muted-foreground/40")}
                                style={{
                                  width: bestPrice ? `${Math.max(20, (bestPrice.price / entry.price) * 100)}%` : "100%",
                                }}
                              />
                            </div>
                            <a
                              href={entry.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary font-medium hover:underline flex items-center gap-1 shrink-0 bg-primary/5 hover:bg-primary/10 px-2.5 py-1 rounded-md transition-colors"
                            >
                              🔗 Buy Online
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Out of stock stores */}
                {(() => {
                  const outOfStock = stores.filter(s => !prices.find(p => p.storeId === s.id));
                  if (outOfStock.length === 0) return null;
                  return (
                    <div className="text-sm text-muted-foreground bg-muted/50 rounded-xl px-4 py-3">
                      <Filter className="w-4 h-4 inline mr-2" />
                      Not available at: {outOfStock.map(s => s.name).join(", ")}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
