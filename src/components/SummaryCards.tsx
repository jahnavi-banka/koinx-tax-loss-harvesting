import React from 'react';
import { useHarvesting } from '../context/HarvestingContext';
import { ArrowRight, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

const formatCurrency = (val: number) => 
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

export const SummaryCards = () => {
  const { capitalGains, calculations } = useHarvesting();

  if (!capitalGains) return null;

  return (
    <div className="flex flex-col gap-6">
      
      {/* Total Savings Banner */}
      <div className={clsx(
        "flex flex-col sm:flex-row items-center justify-between p-6 rounded-xl border transition-all duration-300",
        calculations.savings > 0 
          ? "bg-[#00B865]/10 border-[#00B865]/30" 
          : "bg-card-dark border-border-gray"
      )}>
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center",
            calculations.savings > 0 ? "bg-[#00B865]/20 text-[#00B865]" : "bg-border-gray text-text-gray"
          )}>
            <TrendingDown size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Total Tax Savings</h2>
            <p className="text-sm text-text-gray">By harvesting selected losses</p>
          </div>
        </div>
        <div className="text-center sm:text-right">
          <span className={clsx(
            "text-3xl font-bold",
            calculations.savings > 0 ? "text-[#00B865]" : "text-white"
          )}>
            {formatCurrency(calculations.savings)}
          </span>
        </div>
      </div>

      {/* Before / After Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        
        {/* Before Card */}
        <div className="bg-card-dark rounded-xl border border-border-gray p-6">
          <h3 className="text-text-gray text-sm font-medium mb-4 uppercase tracking-wider">Before Harvesting</h3>
          
          <div className="flex justify-between items-end mb-6 pb-6 border-b border-border-gray">
            <div>
              <p className="text-sm text-text-gray mb-1">Estimated Tax Liability</p>
              <p className="text-2xl font-bold">{formatCurrency(calculations.taxBefore)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-gray mb-1">Short Term Gains (STCG)</p>
              <p className="text-lg font-semibold">{formatCurrency(capitalGains.stcg)}</p>
            </div>
            <div>
              <p className="text-xs text-text-gray mb-1">Long Term Gains (LTCG)</p>
              <p className="text-lg font-semibold">{formatCurrency(capitalGains.ltcg)}</p>
            </div>
          </div>
        </div>

        {/* Arrow Connector (Desktop only) */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#0F1629] border border-border-gray rounded-full items-center justify-center z-10 text-primary">
          <ArrowRight size={20} />
        </div>

        {/* After Card */}
        <div className="bg-primary/5 rounded-xl border border-primary/20 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <h3 className="text-primary text-sm font-medium mb-4 uppercase tracking-wider">After Harvesting</h3>
          
          <div className="flex justify-between items-end mb-6 pb-6 border-b border-primary/10 relative z-10">
            <div>
              <p className="text-sm text-primary/80 mb-1">Estimated Tax Liability</p>
              <p className="text-2xl font-bold">{formatCurrency(calculations.taxAfter)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div>
              <p className="text-xs text-primary/80 mb-1">Projected STCG</p>
              <p className="text-lg font-semibold">{formatCurrency(calculations.projectedSTCG)}</p>
            </div>
            <div>
              <p className="text-xs text-primary/80 mb-1">Projected LTCG</p>
              <p className="text-lg font-semibold">{formatCurrency(calculations.projectedLTCG)}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
