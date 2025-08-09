import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.title = mode === 'signin' ? 'Sign in | HS Profiles' : 'Create account | HS Profiles';
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({ title: 'Welcome back!', description: 'Signed in successfully.' });
        navigate('/start');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });
        if (error) throw error;
        toast({
          title: 'Check your email',
          description: 'We sent you a confirmation link to complete sign up.',
        });
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-peaceful flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-healing border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle as-child>
              <h1 className="text-2xl font-bold text-foreground">
                {mode === 'signin' ? 'Sign in to your account' : 'Create your account'}
              </h1>
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {mode === 'signin'
                ? 'Use your email and password to continue'
                : 'Sign up with your email and a secure password'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={mode === 'signin' ? 'Your password' : 'Create a strong password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 text-base"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-healing hover:opacity-90 text-lg font-medium"
                disabled={loading || !email || !password}
              >
                {loading ? (mode === 'signin' ? 'Signing in...' : 'Creating account...') : (mode === 'signin' ? 'Sign In' : 'Create Account')}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                {mode === 'signin' ? (
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    Don\'t have an account? Create one
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    Already have an account? Sign in
                  </button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Auth;
