
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { goals } from '@/lib/mockData';
import { Progress } from '@/components/ui/progress';
import { Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GoalsProgress = () => {
  // Sort goals by progress (descending)
  const sortedGoals = [...goals].sort((a, b) => b.progress - a.progress);
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Goals Progress</CardTitle>
        <Link 
          to="/goals" 
          className="text-sm text-finance-accent hover:underline flex items-center"
        >
          View All <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          {sortedGoals.slice(0, 3).map((goal) => (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-2 text-finance-accent" />
                  <span className="font-medium">{goal.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                  ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
                </span>
              </div>
              <Progress value={goal.progress} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{goal.progress}% complete</span>
                <span>Due {new Date(goal.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalsProgress;
