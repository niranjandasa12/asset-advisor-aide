
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { assetDistribution } from '@/lib/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#0891B2', '#10B981', '#6366F1', '#F59E0B', '#6B7280'];

const QuickStats = () => {
  const total = assetDistribution.reduce((acc, item) => acc + item.value, 0);
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow rounded-md border border-gray-100">
          <p className="font-medium">{data.name}</p>
          <p className="text-finance-accent">${data.value.toLocaleString()}</p>
          <p className="text-gray-500">{((data.value / total) * 100).toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={assetDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {assetDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
          {assetDistribution.map((item, index) => (
            <div key={item.name} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm font-medium">{item.name}</span>
              <span className="text-sm text-gray-500 ml-auto">
                {((item.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStats;
