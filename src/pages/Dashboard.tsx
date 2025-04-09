
import DashboardLayout from '@/components/layout/DashboardLayout';
import PortfolioSummary from '@/components/dashboard/PortfolioSummary';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import QuickStats from '@/components/dashboard/QuickStats';
import GoalsProgress from '@/components/dashboard/GoalsProgress';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Overview of your financial portfolio</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-full">
            <PortfolioSummary />
          </div>
          <div className="lg:col-span-2 h-full">
            <PerformanceChart />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-full">
            <QuickStats />
          </div>
          <div className="h-full">
            <GoalsProgress />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
