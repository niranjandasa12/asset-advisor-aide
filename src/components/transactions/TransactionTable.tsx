
import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { transactions as mockTransactions } from '@/lib/mockData';
import { Edit, MoreHorizontal, Search, Trash, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import AddTransactionForm from './AddTransactionForm';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

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

const TransactionTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const { user } = useAuth();
  
  // Fetch transactions from Supabase on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) {
        // If not authenticated, use mock data
        setData(mockTransactions);
        setIsLoading(false);
        return;
      }

      try {
        const { data: transactions, error } = await supabase
          .from('transactions')
          .select('*')
          .order('date', { ascending: false });

        if (error) {
          console.error('Error fetching transactions:', error);
          toast.error('Failed to load transactions');
          // Fallback to mock data if there's an error
          setData(mockTransactions);
        } else {
          // Map the Supabase data format to our component's format
          const formattedTransactions = transactions.map(t => ({
            id: t.id,
            date: t.date,
            type: t.type,
            assetName: t.asset_name,
            assetSymbol: t.asset_symbol,
            quantity: Number(t.quantity),
            price: Number(t.price),
            total: Number(t.total),
            notes: t.notes || undefined
          }));
          setData(formattedTransactions);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        // Fallback to mock data
        setData(mockTransactions);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [user]);
  
  // Filter transactions based on search term
  const filteredTransactions = data.filter(transaction => {
    const searchString = searchTerm.toLowerCase();
    return (
      transaction.assetName.toLowerCase().includes(searchString) ||
      transaction.assetSymbol.toLowerCase().includes(searchString) ||
      transaction.type.toLowerCase().includes(searchString)
    );
  });
  
  const handleEdit = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setIsEditDialogOpen(true);
  };
  
  const handleDelete = async (id: number | string) => {
    if (!user) {
      setData(data.filter(transaction => transaction.id !== id));
      toast.success('Transaction deleted successfully');
      return;
    }

    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting transaction:', error);
        toast.error('Failed to delete transaction');
        return;
      }

      setData(data.filter(transaction => transaction.id !== id));
      toast.success('Transaction deleted successfully');
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred');
    }
  };
  
  const handleAddTransaction = async (newTransaction: Omit<Transaction, 'id'>) => {
    if (!user) {
      const mockId = Math.max(...data.map(t => typeof t.id === 'number' ? t.id : 0), 0) + 1;
      setData([{ ...newTransaction, id: mockId }, ...data]);
      setIsAddDialogOpen(false);
      toast.success('Transaction added successfully');
      return;
    }

    try {
      // Format the data for Supabase
      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          date: newTransaction.date,
          type: newTransaction.type,
          asset_name: newTransaction.assetName,
          asset_symbol: newTransaction.assetSymbol,
          quantity: newTransaction.quantity,
          price: newTransaction.price,
          total: newTransaction.total,
          notes: newTransaction.notes || null
        });

      if (error) {
        console.error('Error adding transaction:', error);
        toast.error('Failed to add transaction');
        return;
      }

      // Refresh transactions after adding
      const { data: updatedTransactions, error: fetchError } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (fetchError) {
        console.error('Error fetching updated transactions:', fetchError);
      } else {
        // Map the Supabase data format to our component's format
        const formattedTransactions = updatedTransactions.map(t => ({
          id: t.id,
          date: t.date,
          type: t.type,
          assetName: t.asset_name,
          assetSymbol: t.asset_symbol,
          quantity: Number(t.quantity),
          price: Number(t.price),
          total: Number(t.total),
          notes: t.notes || undefined
        }));
        setData(formattedTransactions);
      }

      setIsAddDialogOpen(false);
      toast.success('Transaction added successfully');
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred');
    }
  };
  
  const handleUpdateTransaction = async (updatedTransaction: Transaction) => {
    if (!user) {
      setData(data.map(transaction => 
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      ));
      setIsEditDialogOpen(false);
      toast.success('Transaction updated successfully');
      return;
    }

    try {
      const { error } = await supabase
        .from('transactions')
        .update({
          date: updatedTransaction.date,
          type: updatedTransaction.type,
          asset_name: updatedTransaction.assetName,
          asset_symbol: updatedTransaction.assetSymbol,
          quantity: updatedTransaction.quantity,
          price: updatedTransaction.price,
          total: updatedTransaction.total,
          notes: updatedTransaction.notes || null
        })
        .eq('id', updatedTransaction.id);

      if (error) {
        console.error('Error updating transaction:', error);
        toast.error('Failed to update transaction');
        return;
      }

      // Refresh transactions after updating
      const { data: updatedTransactions, error: fetchError } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });

      if (fetchError) {
        console.error('Error fetching updated transactions:', fetchError);
      } else {
        // Map the Supabase data format to our component's format
        const formattedTransactions = updatedTransactions.map(t => ({
          id: t.id,
          date: t.date,
          type: t.type,
          assetName: t.asset_name,
          assetSymbol: t.asset_symbol,
          quantity: Number(t.quantity),
          price: Number(t.price),
          total: Number(t.total),
          notes: t.notes || undefined
        }));
        setData(formattedTransactions);
      }

      setIsEditDialogOpen(false);
      toast.success('Transaction updated successfully');
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred');
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search transactions..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>Add Transaction</Button>
      </div>
      
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Loading transactions...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'Buy' 
                          ? 'bg-green-100 text-green-800' 
                          : transaction.type === 'Sell'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{transaction.assetName}</div>
                      <div className="text-xs text-gray-500">{transaction.assetSymbol}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{transaction.quantity}</TableCell>
                  <TableCell className="text-right">${transaction.price.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">${transaction.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(transaction)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(transaction.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
          </DialogHeader>
          <AddTransactionForm 
            onSubmit={handleAddTransaction} 
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          {currentTransaction && (
            <AddTransactionForm 
              transaction={currentTransaction}
              onSubmit={handleUpdateTransaction} 
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionTable;
