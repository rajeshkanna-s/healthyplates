import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

const Auth = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    mobileNumber: ''
  });

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const adminLoggedIn = localStorage.getItem('admin_logged_in');
    if (adminLoggedIn === 'true') {
      window.location.href = '/admin';
    }
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Base64 encoded credentials
      const ADMIN_EMAIL_ENCODED = 'ZHVyYmlueWFydWxAZ21haWwuY29t';
      const ADMIN_PASSWORD_ENCODED = 'ZHVyYmlueWFydWxANjg5MA==';
      
      // Encode user input
      const emailEncoded = btoa(formData.email);
      const passwordEncoded = btoa(formData.password);
      
      // Compare encoded credentials
      if (emailEncoded !== ADMIN_EMAIL_ENCODED || passwordEncoded !== ADMIN_PASSWORD_ENCODED) {
        throw new Error('Invalid admin credentials');
      }

      // If credentials match, set login state and redirect
      localStorage.setItem('admin_logged_in', 'true');
      setUser({ email: formData.email } as any);
      toast({
        title: "Success",
        description: "Admin logged in successfully!",
      });
      
      // Redirect to admin page
      setTimeout(() => {
        window.location.href = '/admin';
      }, 500);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message === 'Invalid admin credentials' ? 'Access denied. Admin credentials required.' : error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Admin Login
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Admin access only - Enter your credentials
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Enter admin credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter admin email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing In...' : 'Admin Login'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="text-sm"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;