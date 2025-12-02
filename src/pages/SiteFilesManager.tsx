import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Save, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SiteFilesManager = () => {
  const queryClient = useQueryClient();
  const [editedFiles, setEditedFiles] = useState<Record<string, string>>({});

  const { data: siteFiles, isLoading } = useQuery({
    queryKey: ['site-files'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_files')
        .select('*')
        .order('file_name');
      
      if (error) throw error;
      return data;
    }
  });

  const updateFileMutation = useMutation({
    mutationFn: async ({ fileName, content }: { fileName: string; content: string }) => {
      const { error } = await supabase
        .from('site_files')
        .update({ 
          content,
          last_updated: new Date().toISOString()
        })
        .eq('file_name', fileName);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['site-files'] });
      toast.success(`${variables.fileName} updated successfully!`);
      setEditedFiles(prev => {
        const updated = { ...prev };
        delete updated[variables.fileName];
        return updated;
      });
    },
    onError: (error: Error) => {
      toast.error(`Failed to update file: ${error.message}`);
    }
  });

  const regenerateFilesMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('update-site-files');
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-files'] });
      toast.success('All site files regenerated!');
      setEditedFiles({});
    },
    onError: (error: Error) => {
      toast.error(`Failed to regenerate files: ${error.message}`);
    }
  });

  const handleContentChange = (fileName: string, content: string) => {
    setEditedFiles(prev => ({ ...prev, [fileName]: content }));
  };

  const handleSave = (fileName: string) => {
    const content = editedFiles[fileName];
    if (content !== undefined) {
      updateFileMutation.mutate({ fileName, content });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Site Files Management</h1>
        <Button
          onClick={() => regenerateFilesMutation.mutate()}
          disabled={regenerateFilesMutation.isPending}
        >
          {regenerateFilesMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <RefreshCw className="mr-2 h-4 w-4" />
          Regenerate All Files
        </Button>
      </div>

      <Tabs defaultValue="sitemap.xml" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sitemap.xml">sitemap.xml</TabsTrigger>
          <TabsTrigger value="robots.txt">robots.txt</TabsTrigger>
          <TabsTrigger value="llms.txt">llms.txt</TabsTrigger>
        </TabsList>

        {siteFiles?.map(file => (
          <TabsContent key={file.file_name} value={file.file_name}>
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{file.file_name}</h2>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {new Date(file.last_updated).toLocaleString()}
                  </p>
                </div>
                <Button
                  onClick={() => handleSave(file.file_name)}
                  disabled={!editedFiles[file.file_name] || updateFileMutation.isPending}
                >
                  {updateFileMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>

              <Textarea
                value={editedFiles[file.file_name] ?? file.content}
                onChange={(e) => handleContentChange(file.file_name, e.target.value)}
                className="font-mono text-sm min-h-[500px]"
                placeholder={`Edit ${file.file_name} content...`}
              />

              {file.auto_update && (
                <p className="text-sm text-muted-foreground">
                  ℹ️ This file is automatically updated when new content is published
                </p>
              )}
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SiteFilesManager;