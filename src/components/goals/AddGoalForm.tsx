
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const goalSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  targetAmount: z.coerce.number().positive('Target amount must be positive'),
  currentAmount: z.coerce.number().min(0, 'Current amount cannot be negative'),
  deadline: z.string().min(1, 'Deadline is required'),
});

type GoalFormValues = z.infer<typeof goalSchema>;

interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  progress: number;
}

interface AddGoalFormProps {
  goal?: Goal;
  onSubmit: (goal: Goal | Omit<Goal, 'id' | 'progress'>) => void;
  onCancel: () => void;
}

const AddGoalForm = ({ goal, onSubmit, onCancel }: AddGoalFormProps) => {
  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: goal
      ? {
          name: goal.name,
          targetAmount: goal.targetAmount,
          currentAmount: goal.currentAmount,
          deadline: goal.deadline,
        }
      : {
          name: '',
          targetAmount: 0,
          currentAmount: 0,
          deadline: new Date().toISOString().split('T')[0],
        }
  });
  
  const handleSubmit = (values: GoalFormValues) => {
    const progress = Math.round((values.currentAmount / values.targetAmount) * 100);
    
    const newGoal = {
      ...(goal ? { id: goal.id } : {}),
      name: values.name,
      targetAmount: values.targetAmount,
      currentAmount: values.currentAmount,
      deadline: values.deadline,
      progress,
    };
    
    onSubmit(newGoal as any);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Emergency Fund" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="targetAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Amount ($)</FormLabel>
                <FormControl>
                  <Input type="number" step="any" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="currentAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Amount ($)</FormLabel>
                <FormControl>
                  <Input type="number" step="any" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deadline</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {goal ? 'Update' : 'Add'} Goal
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddGoalForm;
