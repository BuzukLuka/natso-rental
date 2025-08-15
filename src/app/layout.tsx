import "./globals.css";
import type { Metadata } from "next";
import { site } from "@/data/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FavoritesProvider } from "@/context/FavoritesProvider";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description:
    "Find, book, and manage rentals with Natso: modern search, secure payments, and beautiful listings.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col bg-white text-slate-900 antialiased">
        <Header />
        <FavoritesProvider>
          <main className="flex-1">{children}</main>
        </FavoritesProvider>
        <Footer />
      </body>
    </html>
  );
}
