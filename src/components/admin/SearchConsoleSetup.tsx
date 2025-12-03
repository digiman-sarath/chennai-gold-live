import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, ExternalLink, Copy, Settings } from "lucide-react";
import { toast } from "sonner";

interface SearchConsoleSetupProps {
  hasCredentials: boolean;
}

const SearchConsoleSetup = ({ hasCredentials }: SearchConsoleSetupProps) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const verificationMethods = [
    {
      title: "HTML File Upload",
      description: "Download verification file from Google Search Console and add to your public folder",
      steps: [
        "Go to Google Search Console",
        "Add property: https://chennaigoldprice.com",
        "Choose 'URL prefix' method",
        "Select 'HTML file' verification",
        "Download the verification file",
        "Upload to your public folder",
        "Click Verify in Search Console"
      ]
    },
    {
      title: "HTML Tag",
      description: "Add meta tag to your site's head section",
      steps: [
        "Go to Google Search Console",
        "Add property: https://chennaigoldprice.com",
        "Choose 'HTML tag' verification",
        "Copy the meta tag provided",
        "Add to index.html in the <head> section",
        "Deploy your site",
        "Click Verify in Search Console"
      ]
    },
    {
      title: "DNS Verification",
      description: "Add a TXT record to your domain's DNS settings",
      steps: [
        "Go to Google Search Console",
        "Add property: https://chennaigoldprice.com",
        "Choose 'Domain' method",
        "Copy the TXT record value",
        "Add TXT record in your DNS provider",
        "Wait for DNS propagation (up to 72 hours)",
        "Click Verify in Search Console"
      ]
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Google Search Console Setup
              </CardTitle>
              <CardDescription>
                Configure Search Console for automatic indexing requests
              </CardDescription>
            </div>
            <Badge variant={hasCredentials ? "default" : "secondary"}>
              {hasCredentials ? (
                <><CheckCircle className="h-3 w-3 mr-1" /> Connected</>
              ) : (
                <><AlertCircle className="h-3 w-3 mr-1" /> Not Connected</>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!hasCredentials && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Indexing API Not Configured</AlertTitle>
              <AlertDescription>
                URLs are being queued but automatic indexing requests are not being sent. 
                Configure Google Search Console credentials to enable automatic indexing.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowInstructions(!showInstructions)}
            >
              {showInstructions ? 'Hide' : 'Show'} Setup Instructions
            </Button>
            <Button asChild variant="outline">
              <a 
                href="https://search.google.com/search-console" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Open Search Console <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {showInstructions && (
            <div className="space-y-6 pt-4 border-t">
              <div>
                <h3 className="font-semibold mb-2">Step 1: Verify Your Site</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose one of the verification methods below:
                </p>
                
                <div className="grid gap-4 md:grid-cols-3">
                  {verificationMethods.map((method, index) => (
                    <Card key={index} className="border-dashed">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">{method.title}</CardTitle>
                        <CardDescription className="text-xs">{method.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ol className="text-xs space-y-1 list-decimal list-inside text-muted-foreground">
                          {method.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Step 2: Enable Indexing API</h3>
                <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
                  <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Cloud Console</a></li>
                  <li>Create a new project or select existing</li>
                  <li>Enable the "Indexing API"</li>
                  <li>Create a Service Account</li>
                  <li>Download the JSON key file</li>
                  <li>Add the service account email to Search Console as an owner</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Step 3: Configure Credentials</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Add the service account JSON credentials as a secret named <code className="bg-muted px-1 py-0.5 rounded">GOOGLE_SEARCH_CONSOLE_CREDENTIALS</code>
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => copyToClipboard('GOOGLE_SEARCH_CONSOLE_CREDENTIALS')}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Secret Name
                </Button>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  The Indexing API has daily quotas. Batch your indexing requests and use the queue 
                  to manage submissions efficiently. URLs will be queued even without credentials 
                  and can be manually submitted via Search Console.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manual URL Submission</CardTitle>
          <CardDescription>
            Submit URLs directly to Google Search Console for indexing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You can manually request indexing for any URL through Google Search Console's URL Inspection tool:
          </p>
          <ol className="text-sm space-y-2 list-decimal list-inside text-muted-foreground">
            <li>Open <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Search Console</a></li>
            <li>Select your property (chennaigoldprice.com)</li>
            <li>Use the URL Inspection tool (search bar at top)</li>
            <li>Enter the URL you want indexed</li>
            <li>Click "Request Indexing"</li>
          </ol>
          
          <div className="pt-4">
            <Label className="text-sm font-medium">Quick Copy URLs</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard('https://chennaigoldprice.com')}
              >
                Homepage
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard('https://chennaigoldprice.com/blog')}
              >
                Blog
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard('https://chennaigoldprice.com/buying-guide')}
              >
                Buying Guide
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchConsoleSetup;
