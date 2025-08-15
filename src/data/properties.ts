import { Property } from "@/types";
import { slugify } from "@/utils/slug";

const imgs = (n: number, base: string) =>
  Array.from({ length: n }).map(
    (_, i) =>
      `https://images.unsplash.com/${
        base[i % base.length]
      }?q=80&w=1600&auto=format&fit=crop`
  );

const bases = [
  [
    "photo-1505693416388-ac5ce068fe85",
    "photo-1502005229762-cf1b2da7c52f",
    "photo-1560448204-e02f11c3d0e2",
  ],
  [
    "photo-1523217582562-09d0def993a6",
    "photo-1502672260266-1c1ef2d93688",
    "photo-1505691723518-36a5ac3b2d95",
  ],
];

const ITEMS: Omit<Property, "slug" | "id">[] = [
  {
    title: "Bright Room near Downtown Toronto",
    type: "room",
    city: "Toronto",
    province: "ON",
    country: "Canada",
    address: "123 King St W, Toronto, ON",
    lat: 43.6487,
    lng: -79.3854,
    priceMonthly: 1250,
    beds: 1,
    baths: 1,
    sizeSqft: 210,
    images: imgs(5, bases[0][0]),
    rating: 4.7,
    reviewsCount: 84,
    featured: true,
    amenities: ["WiFi", "Heating", "Kitchen", "Washer", "Dryer"],
    shortDescription: "Sunny furnished room steps from transit.",
    longDescription:
      "Comfortable private room in shared apartment. Walk to subway, shops, and parks. Utilities included. Perfect for students and newcomers.",
    host: { name: "Sophie", avatar: "", since: "2021-03-12", superhost: true },
    availableFrom: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    title: "Modern Studio in Vancouver Kitsilano",
    type: "studio",
    city: "Vancouver",
    province: "BC",
    country: "Canada",
    address: "456 W 4th Ave, Vancouver, BC",
    lat: 49.2636,
    lng: -123.1386,
    priceMonthly: 2200,
    beds: 1,
    baths: 1,
    sizeSqft: 410,
    images: imgs(5, bases[1][0]),
    rating: 4.8,
    reviewsCount: 112,
    featured: true,
    amenities: ["WiFi", "Heating", "Kitchen", "Washer", "Parking"],
    shortDescription: "Stylish studio close to beach & cafes.",
    longDescription:
      "Bright studio with full kitchen, in-suite laundry, and balcony. 10-min walk to Kits Beach. Long-term welcome.",
    host: { name: "Jay", avatar: "", since: "2020-06-02" },
    availableFrom: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 14
    ).toISOString(),
  },
  {
    title: "Shared 2BR near UBC Campus",
    type: "shared",
    city: "Vancouver",
    province: "BC",
    country: "Canada",
    address: "789 Alma St, Vancouver, BC",
    lat: 49.2684,
    lng: -123.2038,
    priceMonthly: 950,
    beds: 2,
    baths: 1,
    sizeSqft: 680,
    images: imgs(5, bases[0][0]),
    rating: 4.4,
    reviewsCount: 35,
    amenities: ["WiFi", "Heating", "Kitchen"],
    shortDescription: "Student-friendly shared apartment.",
    longDescription:
      "Two-bedroom apartment shared with one male student. Quiet, clean, and close to campus buses.",
    host: { name: "Liang", avatar: "", since: "2023-01-14" },
    availableFrom: new Date().toISOString(),
  },
];

export const properties: Property[] = ITEMS.map((p, i) => ({
  ...p,
  id: String(i + 1),
  slug: slugify(p.title, i + 1),
}));

export function getPropertyBySlug(slug: string) {
  return properties.find((p) => p.slug === slug) || null;
}
