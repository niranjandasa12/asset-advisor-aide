
import AuthForm from '@/components/auth/AuthForm';

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center mb-8">
        <h1 className="text-3xl font-bold text-finance-primary mb-2">
          Asset<span className="text-finance-accent">Advisor</span>
        </h1>
        <p className="text-gray-500">
          Create an account to start managing your portfolio
        </p>
      </div>
      
      <AuthForm type="signup" />
    </div>
  );
};

export default Signup;
