
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface AssetCardProps {
  asset: {
    id: number;
    name: string;
    symbol: string;
    type: string;
    quantity: number;
    purchasePrice: number;
    currentPrice: number;
    purchaseValue: number;
    currentValue: number;
    percentageChange: number;
    history: number[];
  };
}

const AssetCard = ({ asset }: AssetCardProps) => {
  const isPositive = asset.percentageChange >= 0;
  
  // Convert history data to the format required by recharts
  const chartData = asset.history.map((value, index) => ({
    name: index,
    value,
  }));
  
  return (
    <Card className="card-hover">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg flex items-center">
              {asset.name}
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full ml-2">
                {asset.symbol}
              </span>
            </h3>
            <p className="text-sm text-gray-500">{asset.type}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">${asset.currentPrice.toLocaleString()}</p>
            <p className={`text-sm flex items-center justify-end ${isPositive ? 'text-positive' : 'text-negative'}`}>
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {isPositive ? '+' : ''}{asset.percentageChange.toFixed(2)}%
            </p>
          </div>
        </div>
        
        <div className="h-16 mt-2 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={isPositive ? '#10B981' : '#EF4444'}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-gray-500">Quantity</p>
            <p className="text-sm font-medium">{asset.quantity}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Value</p>
            <p className="text-sm font-medium">${asset.currentValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Purchase Price</p>
            <p className="text-sm font-medium">${asset.purchasePrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Purchase Value</p>
            <p className="text-sm font-medium">${asset.purchaseValue.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetCard;
