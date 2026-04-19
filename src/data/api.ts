export interface Holding {
  id: string;
  asset: string;
  name: string;
  amount: number;
  avgBuyPrice: number;
  currentPrice: number;
  type: 'STCG' | 'LTCG';
}

export interface CapitalGains {
  stcg: number;
  ltcg: number;
}

export const fetchHoldings = async (): Promise<Holding[]> => {
  // Simulating network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    { id: '1', asset: 'BTC', name: 'Bitcoin', amount: 0.5, avgBuyPrice: 40000, currentPrice: 35000, type: 'STCG' },
    { id: '2', asset: 'ETH', name: 'Ethereum', amount: 2.0, avgBuyPrice: 2500, currentPrice: 2000, type: 'LTCG' },
    { id: '3', asset: 'SOL', name: 'Solana', amount: 15.0, avgBuyPrice: 120, currentPrice: 140, type: 'STCG' },
    { id: '4', asset: 'ADA', name: 'Cardano', amount: 5000.0, avgBuyPrice: 1.5, currentPrice: 0.4, type: 'LTCG' },
    { id: '5', asset: 'DOT', name: 'Polkadot', amount: 100.0, avgBuyPrice: 25, currentPrice: 15, type: 'STCG' },
    { id: '6', asset: 'MATIC', name: 'Polygon', amount: 1500.0, avgBuyPrice: 1.2, currentPrice: 1.5, type: 'STCG' },
  ];
};

export const fetchCapitalGains = async (): Promise<CapitalGains> => {
  // Simulating network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    stcg: 5000,
    ltcg: 8000,
  };
};
