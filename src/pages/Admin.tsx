import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogOut, ArrowLeft } from 'lucide-react';
import { User } from '@supabase/supabase-js';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [price22k, setPrice22k] = useState('');
  const [price24k, setPrice24k] = useState('');

  useEffect(() => {
    checkUser();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (!user) {
        navigate('/auth');
        return;
      }
      
      await checkAdminRole(user.id);
    } catch (error) {
      console.error('Error checking user:', error);
      navigate('/auth');
    } finally {
      setLoading(false);
    }
  };

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin role:', error);
      }
      
      setIsAdmin(!!data);
      
      if (!data) {
        toast({
          title: 'Access Denied',
          description: 'You do not have admin privileges.',
          variant: 'destructive',
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error checking admin role:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('gold_prices')
        .upsert({
          date,
          price_22k_per_gram: parseFloat(price22k),
          price_24k_per_gram: parseFloat(price24k),
        }, {
          onConflict: 'date'
        });

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Gold prices updated successfully.',
      });

      // Reset form
      setDate(new Date().toISOString().split('T')[0]);
      setPrice22k('');
      setPrice24k('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Update Gold Prices</CardTitle>
            <CardDescription>
              Set daily gold rates for Chennai market
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price22k">22K Gold Price (₹ per gram)</Label>
                <Input
                  id="price22k"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="5850.00"
                  value={price22k}
                  onChange={(e) => setPrice22k(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price24k">24K Gold Price (₹ per gram)</Label>
                <Input
                  id="price24k"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="6380.00"
                  value={price24k}
                  onChange={(e) => setPrice24k(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Prices
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
