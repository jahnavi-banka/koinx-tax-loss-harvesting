import React from 'react';
import { Header } from './components/Header';
import { SummaryCards } from './components/SummaryCards';
import { HoldingsTable } from './components/HoldingsTable';
import { HarvestingProvider, useHarvesting } from './context/HarvestingContext';
import { RefreshCcw } from 'lucide-react';

const DashboardContent = () => {
  const { isLoading } = useHarvesting();

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-[60vh] text-text-gray">
        <RefreshCcw className="animate-spin mb-4 text-primary" size={32} />
        <p>Loading portfolio data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Tax Loss Harvesting</h1>
        <p className="text-text-gray">
          Offset your capital gains by realizing losses on your poorly performing assets. 
          Select the assets below to see your potential tax savings.
        </p>
      </div>

      <SummaryCards />
      
      <HoldingsTable />
    </div>
  );
};

function App() {
  return (
    <HarvestingProvider>
      <div className="min-h-screen bg-bg-dark flex flex-col">
        <Header />
        <main className="flex-1">
          <DashboardContent />
        </main>
      </div>
    </HarvestingProvider>
  );
}

export default App;
