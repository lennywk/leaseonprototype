import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { units } from "@/data/units";
import { Button } from "@/components/ui/button";

const CompareBar = () => {
  const { selectedIds, toggleUnit, clearAll } = useCompare();

  if (selectedIds.length === 0) return null;

  const selected = selectedIds.map((id) => units.find((u) => u.id === id)!).filter(Boolean);

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-card border-t border-border shadow-lg animate-in slide-in-from-bottom-4 duration-300">
      <div className="container-page py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 flex-1 overflow-x-auto">
          {selected.map((u) => (
            <div key={u.id} className="flex items-center gap-2 bg-muted rounded-md px-2 py-1 shrink-0">
              <img src={u.image} alt={u.name} className="w-8 h-8 rounded object-cover" />
              <span className="text-xs font-medium text-foreground whitespace-nowrap">{u.name}</span>
              <button onClick={() => toggleUnit(u.id)} className="text-muted-foreground hover:text-foreground">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-1">
            {selectedIds.length} of 4 selected
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="sm" onClick={clearAll}>
            Clear
          </Button>
          <Button size="sm" disabled={selectedIds.length < 2} asChild={selectedIds.length >= 2}>
            {selectedIds.length >= 2 ? (
              <Link to="/compare">Compare Now</Link>
            ) : (
              <span>Select 2+ to compare</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
