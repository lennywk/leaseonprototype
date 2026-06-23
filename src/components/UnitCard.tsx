import { Link } from "react-router-dom";
import { MapPin, Maximize2, Tag } from "lucide-react";
import { Unit, STARTING_PRICES } from "@/data/units";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useCompare } from "@/context/CompareContext";

interface UnitCardProps {
  unit: Unit;
}

const UnitCard = ({ unit }: UnitCardProps) => {
  const startingPrice = STARTING_PRICES[unit.unitType];
  const { toggleUnit, isSelected } = useCompare();
  const selected = isSelected(unit.id);

  return (
    <Link
      to={`/unit/${unit.id}`}
      className={`group block bg-card rounded-lg overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        selected ? "border-accent ring-2 ring-accent/30" : "border-border"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={unit.image}
          alt={`${unit.name} at ${unit.property}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs rounded-[3px]">
          {unit.unitType}
        </Badge>

        <div
          className="absolute top-3 right-3"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleUnit(unit.id);
          }}
        >
          <Checkbox
            checked={selected}
            className="bg-background/80 backdrop-blur-sm border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent"
          />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {unit.name}
          </h3>
          <div className="flex flex-col items-end leading-tight whitespace-nowrap">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-body">
              Starting at
            </span>
            <span className="text-sm font-bold text-primary font-body">
              ${startingPrice.toLocaleString()}/mo
            </span>
            <span className="text-[10px] italic text-muted-foreground font-body mt-0.5">
              Final price varies
            </span>
          </div>
        </div>
        <p className="text-sm font-medium text-foreground/80 mb-1">{unit.property}</p>
        <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3">
          <MapPin className="w-3 h-3" />
          <span>{unit.city}, {unit.state}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3 h-3" />
            {unit.sqft.toLocaleString()} sq ft
          </span>
          <span className="flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {unit.level}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs font-medium text-[#52595f]">View space details →</p>
          <button
            type="button"
            className="text-xs font-semibold text-[#4C8577] border border-[#4C8577] px-3 py-1.5 text-center hover:bg-[#4C8577] hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = `/inquiry/${unit.id}`;
            }}
          >
            Apply now
          </button>

        </div>
      </div>
    </Link>
  );
};

export default UnitCard;
