
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const isLogin = type === 'login';
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  
  const currentForm = isLogin ? loginForm : signupForm;
  
  const onSubmit = async (values: LoginFormValues | SignupFormValues) => {
    setIsLoading(true);
    
    try {
      if (isLogin) {
        const loginValues = values as LoginFormValues;
        const success = await login(loginValues.email, loginValues.password);
        
        if (success) {
          toast.success('Login successful');
          navigate('/dashboard');
        } else {
          toast.error('Invalid email or password');
        }
      } else {
        const signupValues = values as SignupFormValues;
        const success = await signup(signupValues.fullName, signupValues.email, signupValues.password);
        
        if (success) {
          toast.success('Account created successfully');
          navigate('/dashboard');
        } else {
          toast.error('Failed to create account');
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isLogin ? 'Log in to your account' : 'Create an account'}
        </CardTitle>
        <CardDescription>
          {isLogin 
            ? 'Enter your email and password to access your account'
            : 'Enter your details to create a new account'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={currentForm.handleSubmit(onSubmit)} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Smith"
                {...signupForm.register('fullName')}
              />
              {signupForm.formState.errors.fullName && (
                <p className="text-sm text-destructive">
                  {signupForm.formState.errors.fullName.message}
                </p>
              )}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              {...(isLogin ? loginForm.register('email') : signupForm.register('email'))}
            />
            {currentForm.formState.errors.email && (
              <p className="text-sm text-destructive">
                {currentForm.formState.errors.email.message}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...(isLogin ? loginForm.register('password') : signupForm.register('password'))}
            />
            {currentForm.formState.errors.password && (
              <p className="text-sm text-destructive">
                {currentForm.formState.errors.password.message}
              </p>
            )}
          </div>
          
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...signupForm.register('confirmPassword')}
              />
              {signupForm.formState.errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {signupForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Processing...' : isLogin ? 'Log in' : 'Sign up'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Button 
            variant="link" 
            className="p-0 h-auto" 
            onClick={() => navigate(isLogin ? '/signup' : '/login')}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
