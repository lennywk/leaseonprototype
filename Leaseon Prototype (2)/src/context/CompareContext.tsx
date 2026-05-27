import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { toast } from "@/components/ui/sonner";

interface CompareContextType {
  selectedIds: string[];
  toggleUnit: (id: string) => void;
  isSelected: (id: string) => boolean;
  clearAll: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE = 4;

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleUnit = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= MAX_COMPARE) {
        toast.error(`You can compare up to ${MAX_COMPARE} units at a time.`);
        return prev;
      }
      return [...prev, id];
    });
  }, []);

  const isSelected = useCallback((id: string) => selectedIds.includes(id), [selectedIds]);

  const clearAll = useCallback(() => setSelectedIds([]), []);

  return (
    <CompareContext.Provider value={{ selectedIds, toggleUnit, isSelected, clearAll }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
};
