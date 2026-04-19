
const colors: Record<string, string> = {
  BTC: '#F7931A',
  ETH: '#627EEA',
  SOL: '#14F195',
  ADA: '#0033AD',
  DOT: '#E6007A',
  MATIC: '#8247E5',
};

export const AssetIcon = ({ asset }: { asset: string }) => {
  const color = colors[asset] || '#0052FE';
  
  return (
    <div 
      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
      style={{ backgroundColor: color }}
    >
      {asset.substring(0, 1)}
    </div>
  );
};
