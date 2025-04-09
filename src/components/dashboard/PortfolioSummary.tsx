
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { portfolioSummary } from '@/lib/mockData';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const PortfolioSummary = () => {
  const { totalValue, totalInvestment, totalGain, percentageGain } = portfolioSummary;
  const isPositiveGain = totalGain >= 0;
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Portfolio Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="text-3xl font-bold">${totalValue.toLocaleString()}</div>
        <div className="flex items-center mt-2">
          <span className={`text-sm font-medium flex items-center ${isPositiveGain ? 'text-positive' : 'text-negative'}`}>
            {isPositiveGain ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
            {isPositiveGain ? '+' : ''}{totalGain.toLocaleString()} ({percentageGain.toFixed(2)}%)
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Investment</p>
            <p className="text-xl font-semibold">${totalInvestment.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Gain/Loss</p>
            <p className={`text-xl font-semibold ${isPositiveGain ? 'text-positive' : 'text-negative'}`}>
              {isPositiveGain ? '+' : ''}${totalGain.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummary;
