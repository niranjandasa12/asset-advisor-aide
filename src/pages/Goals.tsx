
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { goals as initialGoals } from '@/lib/mockData';
import GoalCard from '@/components/goals/GoalCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import AddGoalForm from '@/components/goals/AddGoalForm';
import { toast } from 'sonner';

interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  progress: number;
}

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);
  
  const handleAddGoal = (newGoal: Omit<Goal, 'id'>) => {
    const id = Math.max(...goals.map(g => g.id), 0) + 1;
    setGoals([...goals, { ...newGoal, id }]);
    setIsAddDialogOpen(false);
    toast.success('Goal added successfully');
  };
  
  const handleEditGoal = (goal: Goal) => {
    setCurrentGoal(goal);
    setIsEditDialogOpen(true);
  };
  
  const handleUpdateGoal = (updatedGoal: Goal) => {
    setGoals(goals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    ));
    setIsEditDialogOpen(false);
    toast.success('Goal updated successfully');
  };
  
  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast.success('Goal deleted successfully');
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Financial Goals</h1>
            <p className="text-gray-500">Track and manage your financial goals</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Goal
          </Button>
        </div>
        
        {goals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {goals.map((goal) => (
              <GoalCard 
                key={goal.id} 
                goal={goal}
                onEdit={handleEditGoal}
                onDelete={handleDeleteGoal}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg border-dashed">
            <h3 className="text-lg font-medium mb-2">No goals yet</h3>
            <p className="text-gray-500 mb-6">Add your first financial goal to start tracking your progress.</p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Goal
            </Button>
          </div>
        )}
      </div>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Goal</DialogTitle>
          </DialogHeader>
          <AddGoalForm 
            onSubmit={handleAddGoal} 
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Goal</DialogTitle>
          </DialogHeader>
          {currentGoal && (
            <AddGoalForm 
              goal={currentGoal}
              onSubmit={handleUpdateGoal} 
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Goals;
