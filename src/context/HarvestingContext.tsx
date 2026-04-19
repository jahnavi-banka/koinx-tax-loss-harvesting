import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { fetchHoldings, fetchCapitalGains, Holding, CapitalGains } from '../data/api';

interface HarvestingContextType {
  holdings: Holding[];
  capitalGains: CapitalGains | null;
  selectedAssetIds: Set<string>;
  isLoading: boolean;
  toggleAssetSelection: (id: string) => void;
  selectAllEligible: () => void;
  clearSelection: () => void;
  calculations: {
    taxBefore: number;
    taxAfter: number;
    savings: number;
    projectedSTCG: number;
    projectedLTCG: number;
    totalLossSelected: number;
  };
}

const HarvestingContext = createContext<HarvestingContextType | undefined>(undefined);

export const HarvestingProvider = ({ children }: { children: ReactNode }) => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null);
  const [selectedAssetIds, setSelectedAssetIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains()
        ]);
        setHoldings(holdingsData);
        setCapitalGains(gainsData);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const eligibleHoldings = useMemo(() => {
    return holdings.filter(h => (h.currentPrice - h.avgBuyPrice) < 0);
  }, [holdings]);

  const toggleAssetSelection = (id: string) => {
    setSelectedAssetIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAllEligible = () => {
    setSelectedAssetIds(new Set(eligibleHoldings.map(h => h.id)));
  };

  const clearSelection = () => {
    setSelectedAssetIds(new Set());
  };

  const calculations = useMemo(() => {
    if (!capitalGains) {
      return {
        taxBefore: 0,
        taxAfter: 0,
        savings: 0,
        projectedSTCG: 0,
        projectedLTCG: 0,
        totalLossSelected: 0
      };
    }

    const stcgRate = 0.30;
    const ltcgRate = 0.20;

    const taxBefore = (capitalGains.stcg * stcgRate) + (capitalGains.ltcg * ltcgRate);

    let projectedSTCG = capitalGains.stcg;
    let projectedLTCG = capitalGains.ltcg;
    let totalLossSelected = 0;

    selectedAssetIds.forEach(id => {
      const holding = holdings.find(h => h.id === id);
      if (holding) {
        const unrealisedGain = (holding.currentPrice - holding.avgBuyPrice) * holding.amount;
        if (unrealisedGain < 0) {
          const loss = Math.abs(unrealisedGain);
          totalLossSelected += loss;
          
          if (holding.type === 'STCG') {
            projectedSTCG = Math.max(0, projectedSTCG - loss);
          } else {
            projectedLTCG = Math.max(0, projectedLTCG - loss);
          }
        }
      }
    });

    const taxAfter = (projectedSTCG * stcgRate) + (projectedLTCG * ltcgRate);
    const savings = taxBefore - taxAfter;

    return {
      taxBefore,
      taxAfter,
      savings,
      projectedSTCG,
      projectedLTCG,
      totalLossSelected
    };
  }, [holdings, capitalGains, selectedAssetIds]);

  return (
    <HarvestingContext.Provider value={{
      holdings,
      capitalGains,
      selectedAssetIds,
      isLoading,
      toggleAssetSelection,
      selectAllEligible,
      clearSelection,
      calculations
    }}>
      {children}
    </HarvestingContext.Provider>
  );
};

export const useHarvesting = () => {
  const context = useContext(HarvestingContext);
  if (context === undefined) {
    throw new Error('useHarvesting must be used within a HarvestingProvider');
  }
  return context;
};
