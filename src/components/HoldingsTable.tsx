
import { useHarvesting } from '../context/HarvestingContext';
import { AssetIcon } from './AssetIcon';
import clsx from 'clsx';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(val);

export const HoldingsTable = () => {
  const { holdings, selectedAssetIds, toggleAssetSelection, selectAllEligible, clearSelection } = useHarvesting();

  const eligibleCount = holdings.filter(h => (h.currentPrice - h.avgBuyPrice) < 0).length;
  const allSelected = eligibleCount > 0 && selectedAssetIds.size === eligibleCount;

  const handleSelectAll = () => {
    if (allSelected) {
      clearSelection();
    } else {
      selectAllEligible();
    }
  };

  return (
    <div className="bg-card-dark rounded-xl border border-border-gray overflow-hidden">
      <div className="p-6 border-b border-border-gray flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Your Holdings</h2>
          <p className="text-sm text-text-gray">Select assets with losses to harvest them</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#101623] border-b border-border-gray">
              <th className="py-4 px-6 text-xs font-medium text-text-gray uppercase tracking-wider w-12">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-border-gray bg-transparent"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  disabled={eligibleCount === 0}
                />
              </th>
              <th className="py-4 px-6 text-xs font-medium text-text-gray uppercase tracking-wider">Asset</th>
              <th className="py-4 px-6 text-xs font-medium text-text-gray uppercase tracking-wider text-right">Balance</th>
              <th className="py-4 px-6 text-xs font-medium text-text-gray uppercase tracking-wider text-right">Avg. Buy Price</th>
              <th className="py-4 px-6 text-xs font-medium text-text-gray uppercase tracking-wider text-right">Current Price</th>
              <th className="py-4 px-6 text-xs font-medium text-text-gray uppercase tracking-wider text-center">Type</th>
              <th className="py-4 px-6 text-xs font-medium text-text-gray uppercase tracking-wider text-right">Unrealised P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-gray">
            {holdings.map((holding) => {
              const unrealisedGain = (holding.currentPrice - holding.avgBuyPrice) * holding.amount;
              const isEligible = unrealisedGain < 0;
              const isSelected = selectedAssetIds.has(holding.id);

              return (
                <tr 
                  key={holding.id} 
                  className={clsx(
                    "transition-colors hover:bg-white/5",
                    isSelected ? "bg-primary/5" : ""
                  )}
                >
                  <td className="py-4 px-6">
                    {isEligible ? (
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-border-gray"
                        checked={isSelected}
                        onChange={() => toggleAssetSelection(holding.id)}
                      />
                    ) : (
                      <div className="w-4 h-4 rounded border border-border-gray/30 bg-border-gray/10 cursor-not-allowed"></div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <AssetIcon asset={holding.asset} />
                      <div>
                        <p className="font-semibold text-white leading-tight">{holding.name}</p>
                        <p className="text-xs text-text-gray">{holding.asset}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <p className="font-medium text-white">{holding.amount.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-6 text-right font-medium">
                    {formatCurrency(holding.avgBuyPrice)}
                  </td>
                  <td className="py-4 px-6 text-right font-medium">
                    {formatCurrency(holding.currentPrice)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-block px-2 py-1 bg-border-gray/50 rounded text-xs font-medium text-text-gray">
                      {holding.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex flex-col items-end">
                      <span className={clsx(
                        "font-semibold",
                        unrealisedGain > 0 ? "text-success" : unrealisedGain < 0 ? "text-danger" : "text-white"
                      )}>
                        {unrealisedGain > 0 ? '+' : ''}{formatCurrency(unrealisedGain)}
                      </span>
                      {isEligible && (
                        <span className="text-[10px] text-text-gray uppercase mt-1">Harvestable</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
