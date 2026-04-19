
export const Header = () => {
  return (
    <header className="w-full bg-[#192033] border-b border-border-gray py-4 px-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
          <span className="font-bold text-white text-xl leading-none">K</span>
        </div>
        <span className="font-bold text-xl tracking-tight">KoinX</span>
      </div>
      <nav className="hidden md:flex gap-6 text-sm font-medium text-text-gray">
        <a href="#" className="hover:text-white transition-colors">Dashboard</a>
        <a href="#" className="hover:text-white transition-colors">Portfolios</a>
        <a href="#" className="text-white">Tax Loss Harvesting</a>
        <a href="#" className="hover:text-white transition-colors">Reports</a>
      </nav>
      <div className="w-8 h-8 rounded-full bg-border-gray overflow-hidden">
        {/* Placeholder avatar */}
        <div className="w-full h-full bg-gradient-to-tr from-primary to-purple-500"></div>
      </div>
    </header>
  );
};
