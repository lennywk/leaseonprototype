import { Link } from "react-router-dom";
import { ArrowLeft, Check, X } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useCompare } from "@/context/CompareContext";
import { units, getPriceLabel } from "@/data/units";
import { Button } from "@/components/ui/button";

const Compare = () => {
  const { selectedIds, clearAll } = useCompare();
  const selected = selectedIds.map((id) => units.find((u) => u.id === id)!).filter(Boolean);

  // Collect all unique features across selected units
  const allFeatures = [...new Set(selected.flatMap((u) => u.features))].sort();

  if (selected.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4 font-body">No units selected for comparison.</p>
            <Button asChild>
              <Link to="/">Browse Spaces</Link>
            </Button>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const rows: { label: string; render: (u: typeof selected[0]) => React.ReactNode }[] = [
    {
      label: "Image",
      render: (u) => (
        <img src={u.image} alt={u.name} className="w-full aspect-[4/3] object-cover rounded-md" />
      ),
    },
    { label: "Name", render: (u) => <span className="font-semibold text-foreground">{u.name}</span> },
    { label: "Property", render: (u) => u.property },
    { label: "Location", render: (u) => `${u.city}, ${u.state}` },
    { label: "Unit Type", render: (u) => u.unitType },
    { label: "Size", render: (u) => `${u.sqft.toLocaleString()} sq ft` },
    { label: "Level", render: (u) => u.level },
    {
      label: "Price",
      render: (u) => getPriceLabel(u.unitType),
    },
    {
      label: "Available",
      render: (u) => new Date(u.available).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="container-page py-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Compare Spaces</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={clearAll} asChild>
            <Link to="/" onClick={clearAll}>Clear &amp; Back</Link>
          </Button>
        </div>

        {/* Comparison table - horizontally scrollable on mobile */}
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <table className="w-full min-w-[600px]">
            <colgroup>
              <col className="w-32 md:w-40" />
              {selected.map((u) => (
                <col key={u.id} />
              ))}
            </colgroup>
            <tbody className="divide-y divide-border">
              {rows.map((row) => (
                <tr key={row.label}>
                  <td className="py-3 pr-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide align-top font-body">
                    {row.label}
                  </td>
                  {selected.map((u) => (
                    <td key={u.id} className="py-3 px-3 text-sm text-foreground font-body align-top">
                      {row.render(u)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Features rows */}
              <tr>
                <td className="py-3 pr-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide font-body" colSpan={selected.length + 1}>
                  Features
                </td>
              </tr>
              {allFeatures.map((feature) => (
                <tr key={feature}>
                  <td className="py-2 pr-4 text-xs text-muted-foreground font-body">{feature}</td>
                  {selected.map((u) => (
                    <td key={u.id} className="py-2 px-3 text-center">
                      {u.features.includes(feature) ? (
                        <Check className="w-4 h-4 text-accent mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Inquire buttons */}
              <tr>
                <td className="py-4" />
                {selected.map((u) => (
                  <td key={u.id} className="py-4 px-3">
                    <Button className="w-full" size="sm" asChild>
                      <Link to={`/inquiry/${u.id}`}>Inquire</Link>
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Compare;
