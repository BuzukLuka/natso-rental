export type Amenity =
  | "WiFi"
  | "Heating"
  | "Air Conditioning"
  | "Washer"
  | "Dryer"
  | "Kitchen"
  | "Parking"
  | "Pet Friendly";

export type PropertyType = "room" | "studio" | "shared";

export interface Property {
  id: string;
  slug: string;
  title: string;
  type: PropertyType;
  city: string;
  province: string;
  country: "Canada";
  address: string;
  lat: number;
  lng: number;
  priceMonthly: number;
  beds: number;
  baths: number;
  sizeSqft: number;
  images: string[];
  rating: number; // 0..5
  reviewsCount: number;
  featured?: boolean;
  amenities: Amenity[];
  shortDescription: string;
  longDescription: string;
  host: {
    name: string;
    avatar?: string;
    since: string; // ISO date
    superhost?: boolean;
  };
  availableFrom: string; // ISO date
}

export interface BookingInput {
  propertyId: string;
  moveIn: string; // ISO date
  months: number; // 1..12
  guests: number;
  name: string;
  email: string;
  phone?: string;
}

export interface BookingResponse {
  bookingId: string;
  amountDue: number; // first month or deposit (demo)
  currency: "CAD";
}
