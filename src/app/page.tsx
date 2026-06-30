import Link from "next/link";
import { ShoppingCart, UtensilsCrossed, MapPin, TrendingDown, Zap, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: ShoppingCart,
    title: "Price Comparison",
    description: "Search any product and see ranked prices from all 6 major UK supermarkets instantly. Know you're always getting the best deal.",
    href: "/compare",
    gradient: "from-emerald-500/20 to-teal-500/20",
    accentColor: "text-emerald-600 dark:text-emerald-400",
    badge: "Aldi · Lidl · Asda · Morrisons · Tesco · Sainsbury's",
  },
  {
    icon: UtensilsCrossed,
    title: "Meal Prep Planner",
    description: "Pick your ingredients, get curated meal-prep recipes, then see the cheapest store to buy your entire basket from.",
    href: "/meal-prep",
    gradient: "from-orange-500/20 to-amber-500/20",
    accentColor: "text-orange-600 dark:text-orange-400",
    badge: "Recipes · Cost per meal · Weekly plan",
  },
  {
    icon: MapPin,
    title: "Store Finder",
    description: "Browse products by store, compare what each supermarket stocks, and find the best-value destination for your shop.",
    href: "/stores",
    gradient: "from-blue-500/20 to-indigo-500/20",
    accentColor: "text-blue-600 dark:text-blue-400",
    badge: "Browse all stores",
  },
];

const stats = [
  { value: "6", label: "UK Supermarkets tracked" },
  { value: "40+", label: "Products priced" },
  { value: "£0", label: "Cost to use SmartCart" },
  { value: "~30%", label: "Average savings vs. shopping blind" },
];

const savings = [
  { product: "Toilet Paper (9-roll)", cheap: "Aldi — £2.89", expensive: "Sainsbury's — £3.75", save: "30p per shop" },
  { product: "Chicken Breast 1kg",   cheap: "Aldi — £3.49",  expensive: "Sainsbury's — £4.99", save: "£1.50 per kg"  },
  { product: "Porridge Oats 1kg",    cheap: "Aldi — £0.99",  expensive: "Sainsbury's — £1.40", save: "41p per bag"  },
  { product: "Penne Pasta 500g",     cheap: "Aldi — £0.79",  expensive: "Sainsbury's — £1.10", save: "31p per pack" },
];

export default function HomePage() {
  return (
    <div className="mesh-bg min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-8 border border-primary/20">
            <Zap className="w-4 h-4" />
            Free to use · No account needed
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Stop paying{" "}
            <span className="bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">
              too much
            </span>
            <br />
            for your groceries
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            SmartCart compares prices across <strong className="text-foreground">Aldi, Lidl, Asda, Morrisons, Tesco & Sainsbury's</strong> in seconds.
            Find the cheapest bulk buys and plan your meal prep without blowing your budget.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/compare"
              className="gradient-brand text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-xl hover:opacity-90 transition-all hover:scale-105 glow-brand inline-flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Compare Prices Now
            </Link>
            <Link
              href="/meal-prep"
              className="bg-secondary text-secondary-foreground font-bold px-8 py-4 rounded-2xl text-lg hover:bg-accent transition-all hover:scale-105 inline-flex items-center gap-2 border border-border"
            >
              <UtensilsCrossed className="w-5 h-5" />
              Plan My Meals
            </Link>
          </div>

          {/* Floating store logos */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {["🟦 Aldi", "🔵 Lidl", "🟢 Asda", "🟡 Morrisons", "🔴 Tesco", "🟠 Sainsbury's"].map((s) => (
              <span key={s} className="glass px-4 py-2 rounded-full text-sm font-medium animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-extrabold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold mb-4">Everything you need to shop smarter</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Three tools, one goal: make every pound you spend work harder.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, href, gradient, accentColor, badge }) => (
            <Link
              key={href}
              href={href}
              className={`relative group price-card rounded-2xl border border-border bg-gradient-to-br ${gradient} p-6 bg-card overflow-hidden`}
            >
              <div className={`w-12 h-12 rounded-xl bg-card shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${accentColor}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{description}</p>
              <Badge variant="secondary" className="text-xs">{badge}</Badge>
              <div className="absolute bottom-4 right-4 text-muted-foreground group-hover:text-foreground transition-colors text-lg">→</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Live savings comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
          <div className="p-8 border-b border-border flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">Real price differences, right now</h2>
              </div>
              <p className="text-muted-foreground">Cheapest vs. most expensive for common products</p>
            </div>
            <Badge className="gradient-brand text-white border-0 px-4 py-1.5 text-sm font-semibold">
              <Star className="w-3.5 h-3.5 mr-1" />
              Updated regularly
            </Badge>
          </div>
          <div className="divide-y divide-border">
            {savings.map(({ product, cheap, expensive, save }) => (
              <div key={product} className="px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 hover:bg-accent/30 transition-colors">
                <span className="font-medium text-sm min-w-44">{product}</span>
                <div className="flex flex-1 gap-4 items-center flex-wrap">
                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{cheap}</span>
                  </span>
                  <span className="text-muted-foreground text-xs">vs</span>
                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
                    <span className="text-muted-foreground">{expensive}</span>
                  </span>
                </div>
                <Badge variant="secondary" className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-xs font-semibold">
                  Save {save}
                </Badge>
              </div>
            ))}
          </div>
          <div className="p-6 text-center">
            <Link
              href="/compare"
              className="gradient-brand text-white font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 hover:opacity-90 transition-all hover:scale-105 shadow-md"
            >
              <ShoppingCart className="w-4 h-4" />
              Search all products →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
