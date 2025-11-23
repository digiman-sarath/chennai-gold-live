import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, UserCog, Key } from 'lucide-react';

const AdminSetupGuide = () => {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <Card className="shadow-elegant border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <UserCog className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Demo Admin Account Setup</CardTitle>
            </div>
            <CardDescription>Create your admin account to manage daily gold prices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="border-primary/30 bg-primary/5">
              <Key className="h-4 w-4 text-primary" />
              <AlertTitle className="text-foreground">Demo Credentials</AlertTitle>
              <AlertDescription className="space-y-2">
                <div className="bg-background/60 p-3 rounded-md mt-2 space-y-1">
                  <div><strong className="text-foreground">Email:</strong> admin@chennai-gold.com</div>
                  <div><strong className="text-foreground">Password:</strong> Admin@123456</div>
                </div>
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="font-semibold text-foreground text-lg">Setup Steps:</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">1</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Sign Up</h4>
                    <p className="text-sm text-muted-foreground">Use the "Sign Up" tab above with the demo credentials</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">2</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Get User ID</h4>
                    <p className="text-sm text-muted-foreground">Go to Cloud → Database → auth.users and copy your user ID</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">3</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Assign Admin Role</h4>
                    <p className="text-sm text-muted-foreground mb-2">In user_roles table, insert:</p>
                    <div className="bg-muted p-3 rounded text-sm space-y-1">
                      <div><strong>user_id:</strong> [your copied ID]</div>
                      <div><strong>role:</strong> admin</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">4</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Access Admin Panel</h4>
                    <p className="text-sm text-muted-foreground">Sign in and you'll be redirected to the admin dashboard</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="mb-2 font-semibold text-foreground">SQL Query (Alternative):</p>
              <pre className="bg-background border border-border p-3 rounded text-xs overflow-x-auto">
{`INSERT INTO user_roles (user_id, role)
VALUES ('your-user-id-here', 'admin');`}
              </pre>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Security Notice</AlertTitle>
              <AlertDescription className="text-sm">
                Change demo credentials for production use. Never share admin access publicly.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminSetupGuide;
