
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PieChart, Repeat, Target, Users, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Portfolio', path: '/portfolio', icon: PieChart },
  { name: 'Transactions', path: '/transactions', icon: Repeat },
  { name: 'Goals', path: '/goals', icon: Target },
  { name: 'Advisor', path: '/advisor', icon: Users },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              isActive 
                ? 'bg-finance-accent text-white font-medium' 
                : 'hover:bg-gray-100'
            }`}
          >
            <Icon size={18} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </>
  );
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-finance-primary">
              Asset<span className="text-finance-accent">Advisor</span>
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <NavLinks />
        </nav>
        
        <div className="flex items-center space-x-2">
          {user && (
            <>
              <div className="hidden md:flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.profileImage} alt={user.fullName} />
                  <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.fullName}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </>
          )}
          
          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="font-bold">Menu</div>
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex flex-col space-y-1 py-4">
                  <NavLinks />
                </div>
                
                {user && (
                  <div className="mt-auto border-t pt-4 flex flex-col">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profileImage} alt={user.fullName} />
                        <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user.fullName}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
