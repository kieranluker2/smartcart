import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartCart — Find the Cheapest Groceries Near You",
  description:
    "Compare grocery prices across Aldi, Lidl, Asda, Morrisons, Tesco and Sainsbury's. Find the best deals on bulk household essentials and plan your weekly meal prep with budget-friendly recipes.",
  keywords: ["grocery price comparison", "cheap supermarket", "meal prep", "UK supermarket prices", "budget shopping"],
  openGraph: {
    title: "SmartCart — Find the Cheapest Groceries Near You",
    description: "Compare prices across UK supermarkets and plan affordable meal preps.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">SmartCart</span> — prices are indicative and updated periodically.
              Always verify at your local store. Not affiliated with any supermarket.
            </p>
            <p className="mt-2">Built with ❤️ to help you shop smarter.</p>
          </div>
        </footer>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
