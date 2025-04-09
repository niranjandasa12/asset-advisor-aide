
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Edit, Trash } from 'lucide-react';

interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  progress: number;
}

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: number) => void;
}

const GoalCard = ({ goal, onEdit, onDelete }: GoalCardProps) => {
  const deadlineDate = new Date(goal.deadline);
  const today = new Date();
  const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'text-positive';
    if (progress >= 50) return 'text-amber-500';
    return 'text-finance-primary';
  };
  
  const getTimeColor = (daysLeft: number) => {
    if (daysLeft < 0) return 'text-negative';
    if (daysLeft <= 30) return 'text-amber-500';
    return 'text-gray-500';
  };
  
  const getTimeText = (daysLeft: number) => {
    if (daysLeft < 0) return 'Overdue';
    if (daysLeft === 0) return 'Due today';
    if (daysLeft === 1) return '1 day left';
    return `${daysLeft} days left`;
  };
  
  return (
    <Card className="card-hover">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold">{goal.name}</h3>
        
        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Progress</span>
            <span className={`text-sm font-medium ${getProgressColor(goal.progress)}`}>
              {goal.progress}%
            </span>
          </div>
          
          <Progress value={goal.progress} className="h-2" />
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">
              ${goal.currentAmount.toLocaleString()}
            </span>
            <span className="text-gray-900 font-medium">
              ${goal.targetAmount.toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Deadline</span>
            <span className={`text-sm font-medium ${getTimeColor(daysLeft)}`}>
              {getTimeText(daysLeft)}
            </span>
          </div>
          <div className="text-sm font-medium mt-1">
            {deadlineDate.toLocaleDateString()}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="justify-between pt-0">
        <Button variant="ghost" size="sm" onClick={() => onEdit(goal)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(goal.id)}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GoalCard;
