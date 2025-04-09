
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CalendarIcon, Video, MapPin } from 'lucide-react';
import { advisorMeetings } from '@/lib/mockData';

const MeetingSchedule = () => {
  // Sort meetings by date (ascending)
  const sortedMeetings = [...advisorMeetings].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Upcoming Meetings</CardTitle>
        <Button>
          <CalendarIcon className="h-4 w-4 mr-2" />
          Schedule New
        </Button>
      </CardHeader>
      <CardContent>
        {sortedMeetings.length > 0 ? (
          <div className="space-y-4">
            {sortedMeetings.map((meeting) => {
              const meetingDate = new Date(meeting.date);
              const today = new Date();
              const isToday = meetingDate.toDateString() === today.toDateString();
              const formattedDate = isToday 
                ? 'Today' 
                : meetingDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  });
              const formattedTime = meetingDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              });
              
              return (
                <div 
                  key={meeting.id} 
                  className={`p-4 rounded-md border ${
                    isToday ? 'border-finance-accent bg-sky-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-lg">{meeting.topic}</h4>
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formattedTime} ({meeting.duration} minutes)</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        {meeting.location === 'Video Call' ? (
                          <Video className="h-4 w-4 mr-1" />
                        ) : (
                          <MapPin className="h-4 w-4 mr-1" />
                        )}
                        <span>{meeting.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {meeting.location === 'Video Call' && (
                        <Button size="sm">Join</Button>
                      )}
                      <Button size="sm" variant="outline">Reschedule</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No upcoming meetings scheduled.
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium mb-2">Need help?</h4>
          <p className="text-sm text-gray-600 mb-4">
            You can schedule a meeting with your advisor to discuss your financial goals and strategy.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="justify-start">
              <Video className="h-4 w-4 mr-2" />
              Schedule Video Call
            </Button>
            <Button variant="outline" className="justify-start">
              <MapPin className="h-4 w-4 mr-2" />
              Schedule In-Person Meeting
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingSchedule;
