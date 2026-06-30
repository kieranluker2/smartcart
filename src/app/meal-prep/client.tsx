"use client";

import { useState, useMemo } from "react";
import { UtensilsCrossed, ChevronRight, Check, ShoppingCart, Clock, Flame, Dumbbell, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { type Product, type Store, type StorePrice, getCheapestBasket } from "@/lib/data";
import { recipes, type Recipe } from "@/lib/recipes";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;

function getMatchingRecipes(selectedIds: string[]): Recipe[] {
  if (selectedIds.length === 0) return recipes;
  return recipes.filter(recipe => {
    const recipeProductIds = recipe.ingredients
      .map(i => i.productId)
      .filter(Boolean) as string[];
    const matches = recipeProductIds.filter(pid => selectedIds.includes(pid));
    return matches.length >= Math.min(2, recipeProductIds.length);
  }).sort((a, b) => {
    const aMatches = a.ingredients.filter(i => i.productId && selectedIds.includes(i.productId)).length;
    const bMatches = b.ingredients.filter(i => i.productId && selectedIds.includes(i.productId)).length;
    return bMatches - aMatches;
  });
}

export default function MealPrepClient({ products, stores, storePrices }: { products: Product[], stores: Store[], storePrices: StorePrice[] }) {
  const [step, setStep] = useState<Step>(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const mealPrepIngredients = useMemo(() => products.filter(p =>
    ["protein", "carbs", "dairy", "produce", "canned", "condiments"].includes(p.category)
  ), [products]);

  const categoryGroups = useMemo(() => ({
    "🍗 Proteins":     mealPrepIngredients.filter(p => p.category === "protein"),
    "🍚 Carbs":        mealPrepIngredients.filter(p => p.category === "carbs"),
    "🥛 Dairy":        mealPrepIngredients.filter(p => p.category === "dairy"),
    "🥦 Produce":      mealPrepIngredients.filter(p => p.category === "produce"),
    "🥫 Canned goods": mealPrepIngredients.filter(p => p.category === "canned"),
    "🫙 Condiments":   mealPrepIngredients.filter(p => p.category === "condiments"),
  }), [mealPrepIngredients]);

  // Expand all by default
  useState(() => {
    setExpandedGroups(new Set(Object.keys(categoryGroups)));
  });

  const matchingRecipes = useMemo(() => getMatchingRecipes(selectedIds), [selectedIds]);

  const selectedRecipe = recipes.find(r => r.id === selectedRecipeId);

  const recipeBasket = useMemo(() => {
    if (!selectedRecipe) return null;
    const ids = selectedRecipe.ingredients.map(i => i.productId).filter(Boolean) as string[];
    if (ids.length === 0) return null;
    return getCheapestBasket(ids, storePrices, products, stores);
  }, [selectedRecipe, storePrices, products, stores]);

  const toggleIngredient = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      next.has(group) ? next.delete(group) : next.add(group);
      return next;
    });
  };

  const difficultyColor = {
    easy:   "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
    medium: "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400",
    hard:   "bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400",
  };

  return (
    <div className="mesh-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-primary mb-3">
            <UtensilsCrossed className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Meal Prep Planner</span>
          </div>
          <h1 className="text-4xl font-extrabold mb-3">Plan your week. Slash your bill.</h1>
          <p className="text-muted-foreground text-lg">
            Pick your ingredients → get matched recipes → find the cheapest store for your basket.
          </p>
        </div>

        {/* Step tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {([1, 2, 3] as const).map(s => (
            <button
              key={s}
              id={`step-${s}`}
              onClick={() => { if (s <= step || s === step + 1) setStep(s); }}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border",
                step === s
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : step > s
                  ? "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                  : "bg-muted text-muted-foreground border-border cursor-default"
              )}
            >
              <span className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                step === s ? "bg-white/20" : step > s ? "bg-primary text-primary-foreground" : "bg-border"
              )}>
                {step > s ? <Check className="w-3.5 h-3.5" /> : s}
              </span>
              {s === 1 ? "Pick Ingredients" : s === 2 ? "Choose Recipe" : "Price My Basket"}
            </button>
          ))}
        </div>

        {/* ─── STEP 1: Ingredient picker ─── */}
        {step === 1 && (
          <div className="animate-slide-in-up">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: ingredient groups */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                {Object.entries(categoryGroups).map(([group, items]) => (
                  <div key={group} className="bg-card rounded-2xl border border-border overflow-hidden">
                    <button
                      onClick={() => toggleGroup(group)}
                      className="w-full flex items-center justify-between px-5 py-4 font-bold text-base hover:bg-accent/50 transition-colors"
                    >
                      <span>{group}</span>
                      <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", expandedGroups.has(group) && "rotate-180")} />
                    </button>
                    {expandedGroups.has(group) && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-5 pb-5">
                        {items.map(product => {
                          const selected = selectedIds.includes(product.id);
                          return (
                            <button
                              key={product.id}
                              id={`ingredient-${product.id}`}
                              onClick={() => toggleIngredient(product.id)}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-sm transition-all border",
                                selected
                                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                  : "border-border hover:border-primary/40 hover:bg-accent/50"
                              )}
                            >
                              <span className="text-xl">{product.icon}</span>
                              <span className="font-medium leading-tight text-xs">{product.name}</span>
                              {selected && <Check className="w-3.5 h-3.5 ml-auto shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right: selection summary */}
              <div className="flex flex-col gap-4">
                <div className="bg-card rounded-2xl border border-border p-5 sticky top-20">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    Selected ({selectedIds.length})
                  </h3>
                  {selectedIds.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No ingredients selected yet. Pick some from the left to get started.</p>
                  ) : (
                    <div className="flex flex-col gap-2 mb-5">
                      {selectedIds.map(id => {
                        const p = products.find(x => x.id === id)!;
                        return (
                          <div key={id} className="flex items-center gap-2 text-sm">
                            <span>{p.icon}</span>
                            <span className="flex-1 text-xs">{p.name}</span>
                            <button
                              onClick={() => toggleIngredient(id)}
                              className="text-muted-foreground hover:text-foreground"
                            >×</button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {selectedIds.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {matchingRecipes.length} recipe{matchingRecipes.length !== 1 ? "s" : ""} match your ingredients
                      </p>
                      <button
                        onClick={() => setStep(2)}
                        className="w-full gradient-brand text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                      >
                        See Recipes <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Recipe selection ─── */}
        {step === 2 && (
          <div className="animate-slide-in-up">
            {matchingRecipes.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <UtensilsCrossed className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-xl font-bold text-foreground">No matching recipes</p>
                <p className="text-sm mb-6">Try selecting more ingredients</p>
                <button onClick={() => setStep(1)} className="text-primary font-semibold hover:underline">
                  ← Back to ingredients
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {matchingRecipes.map(recipe => {
                  const matchCount = recipe.ingredients.filter(i => i.productId && selectedIds.includes(i.productId)).length;
                  const totalLinked = recipe.ingredients.filter(i => i.productId).length;

                  return (
                    <button
                      key={recipe.id}
                      id={`recipe-${recipe.id}`}
                      onClick={() => { setSelectedRecipeId(recipe.id); setStep(3); }}
                      className={cn(
                        "price-card bg-card rounded-2xl border border-border p-5 text-left flex flex-col gap-3 hover:border-primary/50 transition-all"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-4xl">{recipe.icon}</span>
                        <Badge className={cn("text-xs capitalize", difficultyColor[recipe.difficulty])}>
                          {recipe.difficulty}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-bold text-base mb-1">{recipe.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{recipe.description}</p>
                      </div>

                      {/* Match bar */}
                      <div className="w-full">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Ingredient match</span>
                          <span className="text-primary font-semibold">{matchCount}/{totalLinked}</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${totalLinked > 0 ? (matchCount / totalLinked) * 100 : 0}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                          <p className="text-xs text-muted-foreground">Cals</p>
                          <p className="text-sm font-bold">{recipe.calories}</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                          <p className="text-xs text-muted-foreground">Protein</p>
                          <p className="text-sm font-bold">{recipe.protein}g</p>
                        </div>
                        <div className="bg-muted/50 rounded-lg px-2 py-1.5 text-center">
                          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                            <Clock className="w-3 h-3" /> Mins
                          </p>
                          <p className="text-sm font-bold">{recipe.prepTime + recipe.cookTime}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {recipe.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>

                      <div className="mt-auto pt-2 text-primary text-sm font-semibold flex items-center gap-1">
                        Price this basket <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            <button onClick={() => setStep(1)} className="mt-6 text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              ← Change ingredients
            </button>
          </div>
        )}

        {/* ─── STEP 3: Basket pricing ─── */}
        {step === 3 && selectedRecipe && (
          <div className="animate-slide-in-up">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Recipe details */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="bg-card rounded-2xl border border-border p-6">
                  <span className="text-5xl mb-4 block">{selectedRecipe.icon}</span>
                  <h2 className="text-2xl font-bold mb-2">{selectedRecipe.title}</h2>
                  <p className="text-muted-foreground text-sm mb-5">{selectedRecipe.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { label: "Calories", value: selectedRecipe.calories, icon: "🔥" },
                      { label: "Protein",  value: `${selectedRecipe.protein}g`, icon: "💪" },
                      { label: "Carbs",    value: `${selectedRecipe.carbs}g`,   icon: "🌾" },
                      { label: "Servings", value: selectedRecipe.servings,     icon: "🍽️" },
                    ].map(({ label, value, icon }) => (
                      <div key={label} className="bg-muted/50 rounded-xl p-3">
                        <p className="text-xs text-muted-foreground">{icon} {label}</p>
                        <p className="font-bold text-lg">{value}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="font-bold mb-3">Ingredients</h3>
                  <ul className="flex flex-col gap-2">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>{ing.amount} {ing.name}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="font-bold mt-5 mb-3">Method</h3>
                  <ol className="flex flex-col gap-2">
                    {selectedRecipe.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Basket pricing */}
              <div className="lg:col-span-3 flex flex-col gap-4">
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="font-bold text-lg mb-1">Store comparison for your basket</h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    Full basket of {selectedRecipe.ingredients.length} ingredients, ranked cheapest first
                  </p>

                  {recipeBasket ? (
                    <div className="flex flex-col gap-3">
                      {recipeBasket.byStore.map((entry, i) => {
                        const isBest = i === 0;
                        const isWorst = i === recipeBasket.byStore.length - 1;
                        const maxTotal = recipeBasket.byStore[recipeBasket.byStore.length - 1].total;

                        return (
                          <div
                            key={entry.store.id}
                            className={cn(
                              "price-card rounded-xl border p-4",
                              isBest ? "border-primary bg-primary/5" : "border-border"
                            )}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-2xl select-none">{entry.store.logo}</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-bold">{entry.store.name}</span>
                                  {isBest && (
                                    <Badge className="bg-primary/10 text-primary border-primary/30 badge-best text-xs">
                                      ✓ Cheapest basket
                                    </Badge>
                                  )}
                                  {isWorst && (
                                    <Badge variant="secondary" className="text-xs">Most expensive</Badge>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-extrabold">£{entry.total.toFixed(2)}</p>
                                {!isBest && (
                                  <p className="text-xs text-rose-500">+£{(entry.total - recipeBasket.byStore[0].total).toFixed(2)}</p>
                                )}
                              </div>
                            </div>
                            <div className="h-2 bg-muted rounded-full">
                              <div
                                className={cn("h-full rounded-full", isBest ? "bg-primary" : "bg-muted-foreground/30")}
                                style={{ width: `${(recipeBasket.byStore[0].total / entry.total) * 100}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}

                      <div className="mt-2 bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-1">Switching to {recipeBasket.cheapestStore?.name} saves you</p>
                        <p className="text-3xl font-extrabold text-primary">£{recipeBasket.savings.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground mt-1">vs most expensive option · per meal prep batch</p>
                      </div>

                      {selectedRecipe.servings > 0 && recipeBasket.byStore[0] && (
                        <div className="flex items-center gap-4 bg-muted/50 rounded-xl p-4 text-sm">
                          <Flame className="w-5 h-5 text-primary shrink-0" />
                          <div>
                            <p className="font-bold">Cost per meal: <span className="text-primary">£{(recipeBasket.byStore[0].total / selectedRecipe.servings).toFixed(2)}</span></p>
                            <p className="text-muted-foreground text-xs">at {recipeBasket.cheapestStore?.name} · makes {selectedRecipe.servings} servings</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">Not enough pricing data for this recipe&apos;s basket.</p>
                  )}
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  ← Choose a different recipe
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
