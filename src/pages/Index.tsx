
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, BarChart3, PieChart, Target, Users, ShieldCheck } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-finance-primary to-finance-secondary">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">
                Asset<span className="text-finance-accent">Advisor</span>
              </span>
            </div>
            <div>
              <Button 
                variant="ghost" 
                className="text-white hover:text-white hover:bg-white/10"
                onClick={() => navigate('/login')}
              >
                Log in
              </Button>
              <Button 
                className="bg-white text-finance-primary hover:bg-gray-100"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </Button>
            </div>
          </div>
          
          <div className="py-20 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Simplify Your Financial Management
              </h1>
              <p className="text-lg text-gray-100 mb-8 max-w-lg mx-auto lg:mx-0">
                Track, manage, and optimize your investment portfolio with our comprehensive financial management system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  className="bg-white text-finance-primary hover:bg-gray-100"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                  onClick={() => navigate('/login')}
                >
                  Login to Dashboard
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <img 
                  src="https://placehold.co/800x600/1E293B/FFFFFF/png?text=Dashboard+Preview"
                  alt="Dashboard Preview" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-finance-primary mb-4">
              Features Designed for Modern Investors
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides everything you need to manage your investments, track your goals, and plan for your financial future.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-finance-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Dashboard</h3>
              <p className="text-gray-600">
                Get a complete overview of your portfolio performance, asset allocation, and financial health at a glance.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-finance-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Portfolio Management</h3>
              <p className="text-gray-600">
                Easily track and manage all your assets in one place, with real-time updates on performance and value.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-finance-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Financial Goals</h3>
              <p className="text-gray-600">
                Set and track progress toward your financial goals, from emergency funds to retirement planning.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-finance-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Advisors</h3>
              <p className="text-gray-600">
                Connect with qualified financial advisors for personalized guidance and investment recommendations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-finance-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your financial data is protected with enterprise-grade security and strict privacy controls.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-finance-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
              <p className="text-gray-600">
                Gain insights into your investment performance with detailed charts, reports, and analytics tools.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-finance-accent">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Sign up today and start your journey toward better financial management and investment success.
          </p>
          <Button 
            size="lg"
            className="bg-white text-finance-accent hover:bg-gray-100"
            onClick={() => navigate('/signup')}
          >
            Create Your Free Account
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-finance-primary py-12 text-white">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold mb-4">
                Asset<span className="text-finance-accent">Advisor</span>
              </h3>
              <p className="text-gray-300 max-w-xs">
                Empowering investors with the tools and insights they need to achieve financial success.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-medium mb-4">Product</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white">Features</a></li>
                  <li><a href="#" className="hover:text-white">Pricing</a></li>
                  <li><a href="#" className="hover:text-white">Testimonials</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                  <li><a href="#" className="hover:text-white">Help Center</a></li>
                  <li><a href="#" className="hover:text-white">Contact Us</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-4">Company</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white">About</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Legal</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} AssetAdvisor. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
