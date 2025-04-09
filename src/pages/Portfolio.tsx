
import DashboardLayout from '@/components/layout/DashboardLayout';
import AssetList from '@/components/portfolio/AssetList';
import { portfolioSummary } from '@/lib/mockData';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Portfolio = () => {
  const { totalValue, totalGain, percentageGain } = portfolioSummary;
  const isPositiveGain = totalGain >= 0;
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Portfolio</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm mt-1">
            <p className="text-gray-500">Current portfolio value</p>
            <div className="flex items-center">
              <p className="font-semibold text-lg mr-2">${totalValue.toLocaleString()}</p>
              <span className={`flex items-center ${isPositiveGain ? 'text-positive' : 'text-negative'}`}>
                {isPositiveGain ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {isPositiveGain ? '+' : ''}{totalGain.toLocaleString()} ({percentageGain.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
        
        <AssetList />
      </div>
    </DashboardLayout>
  );
};

export default Portfolio;
