"use client";
import { Container } from "@/components/Container";
import PropertyGrid from "@/components/PropertyGrid";
import EmptyState from "@/components/EmptyState";
import { properties } from "@/data/properties";
import { useFavorites } from "@/context/FavoritesProvider";

export default function FavoritesPage() {
  const fav = useFavorites();
  const items = properties.filter((p) => fav.favorites.includes(p.id));
  return (
    <Container className="py-8 space-y-4">
      <h1 className="text-2xl font-bold">Saved places</h1>
      {items.length ? (
        <PropertyGrid items={items} />
      ) : (
        <EmptyState
          title="No favorites yet"
          subtitle="Save places you like to compare later."
          action={{ label: "Browse rentals", href: "/properties" }}
        />
      )}
    </Container>
  );
}
