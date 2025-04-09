
import DashboardLayout from '@/components/layout/DashboardLayout';
import TransactionTable from '@/components/transactions/TransactionTable';

const Transactions = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-gray-500">Manage your transaction history</p>
        </div>
        
        <TransactionTable />
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
