
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone } from 'lucide-react';
import { advisor } from '@/lib/mockData';

const AdvisorProfile = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Financial Advisor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={advisor.image} alt={advisor.name} />
            <AvatarFallback>{advisor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-semibold">{advisor.name}</h3>
            <p className="text-sm text-gray-500">{advisor.expertise}</p>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Send Email</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Call</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">About</h4>
          <p className="text-gray-600 text-sm">{advisor.bio}</p>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">Contact Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-500">Email</p>
              <p>{advisor.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <p>{advisor.phone}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvisorProfile;
