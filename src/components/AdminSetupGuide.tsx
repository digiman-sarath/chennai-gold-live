import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const AdminSetupGuide = () => {
  return (
    <section className="bg-muted/30 py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Admin Setup Instructions</CardTitle>
            <CardDescription>For site administrators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                To grant admin access to a user, you need to manually add them to the user_roles table in your database.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Steps to Create an Admin:</h3>
              <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
                <li>Sign up for an account using the Auth page</li>
                <li>Go to your Lovable Cloud backend database</li>
                <li>Find the user_roles table</li>
                <li>Insert a new row with:
                  <ul className="ml-4 mt-1 list-disc space-y-1">
                    <li><code className="rounded bg-muted px-1 py-0.5">user_id</code>: Your user ID from auth.users</li>
                    <li><code className="rounded bg-muted px-1 py-0.5">role</code>: 'admin'</li>
                  </ul>
                </li>
                <li>Sign in and access the Admin Dashboard</li>
              </ol>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="mb-2 font-semibold text-foreground">Example SQL Query:</p>
              <code className="block rounded bg-background p-3 text-sm">
                INSERT INTO user_roles (user_id, role)<br />
                VALUES ('your-user-id-here', 'admin');
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AdminSetupGuide;
