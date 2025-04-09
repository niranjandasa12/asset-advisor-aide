
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { assets } from '@/lib/mockData';

const transactionSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  type: z.string().min(1, 'Type is required'),
  assetSymbol: z.string().min(1, 'Asset is required'),
  quantity: z.coerce.number().positive('Quantity must be positive'),
  price: z.coerce.number().positive('Price must be positive'),
  notes: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

interface Transaction {
  id: number | string;
  date: string;
  type: string;
  assetName: string;
  assetSymbol: string;
  quantity: number;
  price: number;
  total: number;
  notes?: string;
}

interface AddTransactionFormProps {
  transaction?: Transaction;
  onSubmit: (transaction: Transaction | Omit<Transaction, 'id'>) => void;
  onCancel: () => void;
}

const AddTransactionForm = ({ transaction, onSubmit, onCancel }: AddTransactionFormProps) => {
  const [total, setTotal] = useState(transaction?.total || 0);
  
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: transaction
      ? {
          date: transaction.date,
          type: transaction.type,
          assetSymbol: transaction.assetSymbol,
          quantity: transaction.quantity,
          price: transaction.price,
          notes: transaction.notes || '',
        }
      : {
          date: new Date().toISOString().split('T')[0],
          type: 'Buy',
          assetSymbol: '',
          quantity: 0,
          price: 0,
          notes: '',
        }
  });
  
  const calculateTotal = (quantity: number, price: number) => {
    const calculatedTotal = quantity * price;
    setTotal(calculatedTotal);
    return calculatedTotal;
  };
  
  const watchQuantity = form.watch('quantity');
  const watchPrice = form.watch('price');
  
  // Update total when quantity or price changes
  useEffect(() => {
    calculateTotal(watchQuantity || 0, watchPrice || 0);
  }, [watchQuantity, watchPrice]);
  
  const handleSubmit = (values: TransactionFormValues) => {
    const selectedAsset = assets.find(asset => asset.symbol === values.assetSymbol);
    
    const newTransaction = {
      ...(transaction ? { id: transaction.id } : {}),
      date: values.date,
      type: values.type,
      assetName: selectedAsset ? selectedAsset.name : values.assetSymbol,
      assetSymbol: values.assetSymbol,
      quantity: values.quantity,
      price: values.price,
      total: calculateTotal(values.quantity, values.price),
      notes: values.notes,
    };
    
    onSubmit(newTransaction as any);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Buy">Buy</SelectItem>
                    <SelectItem value="Sell">Sell</SelectItem>
                    <SelectItem value="Deposit">Deposit</SelectItem>
                    <SelectItem value="Withdraw">Withdraw</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="assetSymbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {assets.map((asset) => (
                    <SelectItem key={asset.symbol} value={asset.symbol}>
                      {asset.name} ({asset.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="any" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      calculateTotal(parseFloat(e.target.value) || 0, watchPrice || 0);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    step="any" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      calculateTotal(watchQuantity || 0, parseFloat(e.target.value) || 0);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center bg-muted p-3 rounded-md">
            <span className="font-medium">Total:</span>
            <span className="font-bold">${total.toLocaleString()}</span>
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea {...field} />
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
            {transaction ? 'Update' : 'Add'} Transaction
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddTransactionForm;
