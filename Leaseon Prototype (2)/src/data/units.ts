import spaceInline from "@/assets/space-inline.jpg";
import spaceKiosk from "@/assets/space-kiosk.jpg";
import spaceCart from "@/assets/space-cart.jpg";
import spaceStorage from "@/assets/space-storage.jpg";

export type UnitType = "Cart" | "Kiosk" | "Storage" | "Inline";

export interface Unit {
  id: string;
  name: string;
  property: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  unitType: UnitType;
  sqft: number;
  level: string;
  image: string;
  available: string;
  features: string[];
  description: string;
  propertyDescription: string;
  centerType: string;
  totalRetailSqft: string;
  totalRetailers: string;
  showPrice?: boolean;
}

export const PRICE_RANGES: Record<UnitType, { min: number; max: number }> = {
  Cart: { min: 800, max: 1300 },
  Kiosk: { min: 2000, max: 4000 },
  Storage: { min: 250, max: 1000 },
  Inline: { min: 2000, max: 12000 },
};

export const STARTING_PRICES: Record<UnitType, number> = {
  Cart: 500,
  Kiosk: 1500,
  Inline: 2500,
  Storage: 250,
};

export const getPriceLabel = (unitType: UnitType): string => {
  return `Starting at $${STARTING_PRICES[unitType].toLocaleString()}/mo`;
};

export const units: Unit[] = [
  {
    id: "2222-0303",
    name: "Space 0303",
    property: "Four Seasons Town Centre",
    address: "410 Four Seasons Town Ctr",
    city: "Greensboro",
    state: "North Carolina",
    zip: "27407",
    unitType: "Inline",
    sqft: 2272,
    level: "Level 3",
    image: spaceInline,
    available: "2026-04-01",
    features: ["Hardwood floors", "Back storage/office area", "Restroom", "Overhead lighting", "Existing cash wrap and retail fixtures", "Front display windows"],
    description: "Located on Level 3 of Four Seasons Town Centre in Greensboro, NC, this 2,272 sq ft retail space offers prime exposure for your business. Adjacent to the USPS Office and steps from the bustling food court, this area sees the highest foot traffic in the mall.",
    propertyDescription: "Four Seasons Town Centre is Greensboro's only enclosed shopping center. Situated along I-40 with more than 105,000 cars passing daily, the center gives retailers a key opportunity to connect with local shoppers.",
    centerType: "3-level enclosed",
    totalRetailSqft: "900,000+",
    totalRetailers: "110+",
  },
  {
    id: "2222-0115",
    name: "Space 0115",
    property: "Four Seasons Town Centre",
    address: "410 Four Seasons Town Ctr",
    city: "Greensboro",
    state: "North Carolina",
    zip: "27407",
    unitType: "Kiosk",
    sqft: 120,
    level: "Level 1",
    image: spaceKiosk,
    available: "2026-04-15",
    features: ["High-traffic location", "Power outlets", "Open layout", "Near food court entrance"],
    description: "Prime kiosk space on Level 1 near the main entrance. Perfect for accessories, phone cases, or specialty food items. High visibility with constant shopper traffic.",
    propertyDescription: "Four Seasons Town Centre is Greensboro's only enclosed shopping center with more than 110 retailers.",
    centerType: "3-level enclosed",
    totalRetailSqft: "900,000+",
    totalRetailers: "110+",
  },
  {
    id: "3333-0201",
    name: "Space 0201",
    property: "Stonebriar Centre",
    address: "2601 Preston Rd",
    city: "Frisco",
    state: "Texas",
    zip: "75034",
    unitType: "Inline",
    sqft: 3500,
    level: "Level 2",
    image: spaceInline,
    showPrice: false,
    available: "2026-05-01",
    features: ["Corner location", "Double-height ceiling", "Two entrances", "Overhead lighting", "Restroom", "Storage room"],
    description: "Spacious corner retail space on Level 2 with excellent visibility from two directions. Double-height ceiling creates an impressive storefront presence perfect for fashion, home goods, or experiential retail.",
    propertyDescription: "Stonebriar Centre is a premier shopping destination in Frisco, TX, featuring over 165 retailers, dining options, and entertainment.",
    centerType: "2-level enclosed",
    totalRetailSqft: "1,600,000+",
    totalRetailers: "165+",
  },
  {
    id: "3333-K05",
    name: "Kiosk K05",
    property: "Stonebriar Centre",
    address: "2601 Preston Rd",
    city: "Frisco",
    state: "Texas",
    zip: "75034",
    unitType: "Cart",
    sqft: 48,
    level: "Level 1",
    image: spaceCart,
    showPrice: false,
    available: "2026-04-01",
    features: ["Wheeled cart included", "Prime corridor location", "Power access", "Near anchor store"],
    description: "Turnkey cart space in the busiest corridor on Level 1, positioned between two anchor stores. Ideal for seasonal products, jewelry, or specialty snacks.",
    propertyDescription: "Stonebriar Centre is a premier shopping destination in Frisco, TX.",
    centerType: "2-level enclosed",
    totalRetailSqft: "1,600,000+",
    totalRetailers: "165+",
  },
  {
    id: "4444-S12",
    name: "Storage S12",
    property: "Oakbrook Center",
    address: "100 Oakbrook Center",
    city: "Oak Brook",
    state: "Illinois",
    zip: "60523",
    unitType: "Storage",
    sqft: 600,
    level: "Lower Level",
    image: spaceStorage,
    showPrice: false,
    available: "2026-04-01",
    features: ["Climate controlled", "24/7 access", "Loading dock access", "Security cameras", "Shelving included"],
    description: "Secure climate-controlled storage unit with convenient loading dock access. Perfect for retailers needing overflow inventory space or seasonal merchandise storage.",
    propertyDescription: "Oakbrook Center is one of the premier open-air shopping centers in the Chicagoland area.",
    centerType: "Open-air",
    totalRetailSqft: "1,500,000+",
    totalRetailers: "160+",
  },
  {
    id: "4444-0402",
    name: "Space 0402",
    property: "Oakbrook Center",
    address: "100 Oakbrook Center",
    city: "Oak Brook",
    state: "Illinois",
    zip: "60523",
    unitType: "Inline",
    sqft: 1800,
    level: "Level 1",
    image: spaceInline,
    available: "2026-06-01",
    features: ["Street-facing entrance", "Large display windows", "Overhead lighting", "Restroom", "Back office"],
    description: "Street-level inline space with stunning exterior display windows at Oakbrook Center. Great foot traffic from outdoor shoppers and nearby dining district.",
    propertyDescription: "Oakbrook Center is one of the premier open-air shopping centers in the Chicagoland area.",
    centerType: "Open-air",
    totalRetailSqft: "1,500,000+",
    totalRetailers: "160+",
  },
  {
    id: "5555-K02",
    name: "Kiosk K02",
    property: "Ala Moana Center",
    address: "1450 Ala Moana Blvd",
    city: "Honolulu",
    state: "Hawaii",
    zip: "96814",
    unitType: "Kiosk",
    sqft: 150,
    level: "Level 2",
    image: spaceKiosk,
    available: "2026-04-15",
    features: ["Tourist traffic", "Open layout", "Power and water access", "Near luxury wing"],
    description: "Premium kiosk in the luxury wing of Ala Moana Center, the world's largest open-air shopping center. Ideal for beauty, accessories, or souvenir retail targeting tourists and locals alike.",
    propertyDescription: "Ala Moana Center is the world's largest open-air shopping center located in Honolulu.",
    centerType: "Open-air",
    totalRetailSqft: "2,400,000+",
    totalRetailers: "350+",
  },
  {
    id: "5555-0108",
    name: "Space 0108",
    property: "Ala Moana Center",
    address: "1450 Ala Moana Blvd",
    city: "Honolulu",
    state: "Hawaii",
    zip: "96814",
    unitType: "Inline",
    sqft: 4200,
    level: "Level 1",
    image: spaceInline,
    showPrice: false,
    available: "2026-07-01",
    features: ["Premium location", "High ceilings", "Two restrooms", "Large back storage", "Double-width storefront", "HVAC"],
    description: "Flagship-ready inline retail space in the heart of Ala Moana Center. Double-width storefront with premium finishes and massive foot traffic from both local and international shoppers.",
    propertyDescription: "Ala Moana Center is the world's largest open-air shopping center located in Honolulu.",
    centerType: "Open-air",
    totalRetailSqft: "2,400,000+",
    totalRetailers: "350+",
  },
];

export const states = [...new Set(units.map(u => u.state))].sort();
export const cities = [...new Set(units.map(u => u.city))].sort();
export const properties = [...new Set(units.map(u => u.property))].sort();
export const unitTypes: UnitType[] = ["Cart", "Inline", "Kiosk", "Storage"];
