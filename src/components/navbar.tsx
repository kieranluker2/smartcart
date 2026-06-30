"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, UtensilsCrossed, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/compare",   label: "Price Compare", icon: ShoppingCart },
  { href: "/meal-prep", label: "Meal Prep",      icon: UtensilsCrossed },
  { href: "/stores",    label: "Stores Map",     icon: MapPin },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl select-none group-hover:scale-110 transition-transform">🛒</span>
          <span className="font-bold text-lg tracking-tight">
            Smart<span className="text-primary">Cart</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/compare"
            className="gradient-brand text-white text-sm font-semibold px-5 py-2 rounded-full shadow-md hover:opacity-90 transition-opacity glow-brand"
          >
            Find Best Price →
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg px-4 py-4 flex flex-col gap-2 animate-slide-in-up">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
          <Link
            href="/compare"
            onClick={() => setOpen(false)}
            className="gradient-brand text-white text-sm font-semibold px-5 py-3 rounded-xl text-center shadow-md mt-2"
          >
            Find Best Price →
          </Link>
        </div>
      )}
    </header>
  );
}
