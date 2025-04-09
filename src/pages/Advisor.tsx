
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdvisorProfile from '@/components/advisor/AdvisorProfile';
import MeetingSchedule from '@/components/advisor/MeetingSchedule';

const Advisor = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Financial Advisor</h1>
          <p className="text-gray-500">Get expert financial guidance and schedule meetings</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-full">
            <AdvisorProfile />
          </div>
          <div className="h-full">
            <MeetingSchedule />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Advisor;
