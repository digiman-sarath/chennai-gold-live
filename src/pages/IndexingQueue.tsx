import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, RefreshCw, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchConsoleSetup from "@/components/admin/SearchConsoleSetup";

const IndexingQueue = () => {
  const queryClient = useQueryClient();

  const { data: queueItems, isLoading } = useQuery({
    queryKey: ['indexing-queue'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('indexing_queue')
        .select('*')
        .order('requested_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const requestIndexingMutation = useMutation({
    mutationFn: async (url: string) => {
      const { data, error } = await supabase.functions.invoke('request-indexing', {
        body: { url }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['indexing-queue'] });
      toast.success('Indexing request submitted!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to request indexing: ${error.message}`);
    }
  });

  const processAllPendingMutation = useMutation({
    mutationFn: async () => {
      const pending = queueItems?.filter(item => item.status === 'pending') || [];
      
      for (const item of pending) {
        try {
          await supabase.functions.invoke('request-indexing', {
            body: { url: item.url }
          });
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Failed to index ${item.url}:`, error);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['indexing-queue'] });
      toast.success('All pending URLs processed!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to process queue: ${error.message}`);
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const hasCredentials = queueItems?.some(i => !i.error_message?.includes('Credentials not configured')) ?? false;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Indexing & Search Console</h1>
        <Button
          onClick={() => processAllPendingMutation.mutate()}
          disabled={processAllPendingMutation.isPending || !queueItems?.some(i => i.status === 'pending')}
        >
          {processAllPendingMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <Send className="mr-2 h-4 w-4" />
          Process All Pending
        </Button>
      </div>

      <Tabs defaultValue="queue">
        <TabsList>
          <TabsTrigger value="queue">Indexing Queue</TabsTrigger>
          <TabsTrigger value="setup">Search Console Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="queue">
          <Card className="p-6">
        <div className="space-y-2 mb-4">
          <h2 className="text-xl font-semibold">Queue Status</h2>
          <div className="flex gap-4 text-sm">
            <span>Pending: {queueItems?.filter(i => i.status === 'pending').length || 0}</span>
            <span>Completed: {queueItems?.filter(i => i.status === 'completed').length || 0}</span>
            <span>Failed: {queueItems?.filter(i => i.status === 'failed').length || 0}</span>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {queueItems?.map(item => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusBadge(item.status)}
                      <span className="text-sm font-mono">{item.url}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>Requested: {new Date(item.requested_at).toLocaleString()}</span>
                      {item.completed_at && (
                        <span>Completed: {new Date(item.completed_at).toLocaleString()}</span>
                      )}
                    </div>
                    {item.error_message && (
                      <p className="text-sm text-destructive mt-2">{item.error_message}</p>
                    )}
                  </div>
                  {item.status === 'pending' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => requestIndexingMutation.mutate(item.url)}
                      disabled={requestIndexingMutation.isPending}
                    >
                      {requestIndexingMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          )}
        </Card>
      </TabsContent>

      <TabsContent value="setup">
        <SearchConsoleSetup hasCredentials={hasCredentials} />
      </TabsContent>
      </Tabs>
    </div>
  );
};

export default IndexingQueue;