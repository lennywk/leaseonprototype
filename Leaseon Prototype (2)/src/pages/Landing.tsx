import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import UnitCard from "@/components/UnitCard";
import CompareBar from "@/components/CompareBar";
import { units, states, cities, properties, unitTypes, UnitType } from "@/data/units";
import heroMall from "@/assets/hero-mall.jpg";

const SQFT_RANGES = [
  { label: "Any Size", value: "any" },
  { label: "Under 500 sq ft", value: "0-500" },
  { label: "500 – 1,000 sq ft", value: "500-1000" },
  { label: "1,001 – 3,000 sq ft", value: "1001-3000" },
  { label: "3,001 – 5,000 sq ft", value: "3001-5000" },
  { label: "Over 5,000 sq ft", value: "5001-99999" },
];

const PRICE_FILTER_RANGES = [
  { label: "Any Price", value: "any" },
  { label: "Under $500/mo", value: "0-500" },
  { label: "$501 – $1,000/mo", value: "501-1000" },
  { label: "$1,001 – $2,000/mo", value: "1001-2000" },
  { label: "Over $2,000/mo", value: "2001-99999" },
];

const PRICE_RANGES_MAP: Record<UnitType, { min: number; max: number }> = {
  Cart: { min: 800, max: 1300 },
  Kiosk: { min: 2000, max: 4000 },
  Storage: { min: 250, max: 1000 },
  Inline: { min: 2000, max: 12000 },
};

const Landing = () => {
  const [stateFilter, setStateFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sqftFilter, setSqftFilter] = useState("any");
  const [priceFilter, setPriceFilter] = useState("any");

  const filtered = useMemo(() => {
    return units.filter((u) => {
      if (stateFilter !== "all" && u.state !== stateFilter) return false;
      if (cityFilter !== "all" && u.city !== cityFilter) return false;
      if (propertyFilter !== "all" && u.property !== propertyFilter) return false;
      if (typeFilter !== "all" && u.unitType !== typeFilter) return false;
      if (sqftFilter !== "any") {
        const [min, max] = sqftFilter.split("-").map(Number);
        if (u.sqft < min || u.sqft > max) return false;
      }
      if (priceFilter !== "any") {
        const [min, max] = priceFilter.split("-").map(Number);
        const range = PRICE_RANGES_MAP[u.unitType];
        if (range.max < min || range.min > max) return false;
      }
      return true;
    });
  }, [stateFilter, cityFilter, propertyFilter, typeFilter, sqftFilter, priceFilter]);

  const clearFilters = () => {
    setStateFilter("all");
    setCityFilter("all");
    setPropertyFilter("all");
    setTypeFilter("all");
    setSqftFilter("any");
    setPriceFilter("any");
  };

  const hasFilters = stateFilter !== "all" || cityFilter !== "all" || propertyFilter !== "all" || typeFilter !== "all" || sqftFilter !== "any" || priceFilter !== "any";

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative h-[400px] md:h-[480px] overflow-hidden">
        <img src={heroMall} alt="Modern shopping mall interior" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        <div className="relative container-page flex flex-col justify-center h-full">
          <p className="text-sm uppercase tracking-[0.2em] text-primary-foreground/70 mb-3 font-body font-medium">
            LeaseOn: Online Leasing
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground max-w-2xl leading-tight">
            Find flexible retail spaces fast
          </h1>
          <p className="mt-4 text-primary-foreground/80 text-base md:text-lg max-w-xl font-body">
            Browse and book short-term retail spaces in high-traffic malls. View available spaces below to lease in just a few clicks.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container-page py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-foreground font-body">Filter by:</span>
            {hasFilters && (
              <button onClick={clearFilters} className="text-xs text-accent hover:underline font-body">
                Clear Filters
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger><SelectValue placeholder="State" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger><SelectValue placeholder="City" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={propertyFilter} onValueChange={setPropertyFilter}>
              <SelectTrigger><SelectValue placeholder="Property" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                {properties.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger><SelectValue placeholder="Unit Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {unitTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger><SelectValue placeholder="Price" /></SelectTrigger>
              <SelectContent>
                {PRICE_FILTER_RANGES.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={sqftFilter} onValueChange={setSqftFilter}>
              <SelectTrigger><SelectValue placeholder="Square Footage" /></SelectTrigger>
              <SelectContent>
                {SQFT_RANGES.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container-page py-10 flex-1">
        <p className="text-sm text-muted-foreground mb-6 font-body">
          {filtered.length} space{filtered.length !== 1 ? "s" : ""} available
        </p>
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground font-body">No spaces match your filters. Try adjusting your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(unit => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
      <CompareBar />
    </div>
  );
};

export default Landing;
