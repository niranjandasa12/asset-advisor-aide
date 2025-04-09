
import { useState } from 'react';
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
import { transactions } from '@/lib/mockData';
import { Edit, MoreHorizontal, Search, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import AddTransactionForm from './AddTransactionForm';
import { toast } from 'sonner';

interface Transaction {
  id: number;
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
  const [data, setData] = useState<Transaction[]>(transactions);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  
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
  
  const handleDelete = (id: number) => {
    setData(data.filter(transaction => transaction.id !== id));
    toast.success('Transaction deleted successfully');
  };
  
  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const id = Math.max(...data.map(t => t.id), 0) + 1;
    setData([{ ...newTransaction, id }, ...data]);
    setIsAddDialogOpen(false);
    toast.success('Transaction added successfully');
  };
  
  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    setData(data.map(transaction => 
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    ));
    setIsEditDialogOpen(false);
    toast.success('Transaction updated successfully');
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
            {filteredTransactions.length > 0 ? (
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
