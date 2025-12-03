import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Plus, RefreshCw, Edit, Trash2, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import BlogPostEditor from "@/components/admin/BlogPostEditor";

const TAMIL_NADU_DISTRICTS = [
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
  'Tirunelveli', 'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi',
  'Dindigul', 'Thanjavur', 'Ranipet', 'Sivagangai', 'Karur',
  'Ramanathapuram', 'Tiruvannamalai', 'Virudhunagar', 'Cuddalore', 'Kanchipuram',
  'Nagapattinam', 'Namakkal', 'Pudukkottai', 'Krishnagiri', 'Viluppuram',
  'Theni', 'Perambalur', 'Ariyalur', 'Kallakurichi', 'Tenkasi',
  'Tirupathur', 'Chengalpattu', 'Mayiladuthurai', 'Nilgiris', 'Kanyakumari',
  'Dharmapuri', 'Thiruvarur', 'Tiruvallur'
];

const BlogPostManagement = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [editingPost, setEditingPost] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ['automated-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('automated_blog_posts')
        .select('*')
        .order('publish_date', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: goldPrices } = useQuery({
    queryKey: ['gold-prices-latest'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gold_prices')
        .select('*')
        .order('date', { ascending: false })
        .limit(1)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const generateBlogMutation = useMutation({
    mutationFn: async (city: string) => {
      const { data, error } = await supabase.functions.invoke('generate-blog-post', {
        body: { 
          city,
          gold_prices: {
            price_22k: goldPrices?.price_22k_per_gram,
            price_24k: goldPrices?.price_24k_per_gram,
            price_18k: goldPrices?.price_18k_per_gram,
          }
        }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automated-blog-posts'] });
      toast.success('Blog post generated and queued for indexing!');
      setSelectedCity("");
    },
    onError: (error: Error) => {
      toast.error(`Failed to generate blog post: ${error.message}`);
    }
  });

  const generateAllBlogsMutation = useMutation({
    mutationFn: async () => {
      const results = [];
      for (const city of TAMIL_NADU_DISTRICTS) {
        try {
          const { data, error } = await supabase.functions.invoke('generate-blog-post', {
            body: { 
              city,
              gold_prices: {
                price_22k: goldPrices?.price_22k_per_gram,
                price_24k: goldPrices?.price_24k_per_gram,
                price_18k: goldPrices?.price_18k_per_gram,
              }
            }
          });
          
          if (error) throw error;
          results.push({ city, success: true });
          
          // Wait 2 seconds between requests to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
          console.error(`Failed for ${city}:`, error);
          results.push({ city, success: false, error });
        }
      }
      return results;
    },
    onSuccess: (results) => {
      queryClient.invalidateQueries({ queryKey: ['automated-blog-posts'] });
      const successCount = results.filter(r => r.success).length;
      toast.success(`Generated ${successCount}/${TAMIL_NADU_DISTRICTS.length} blog posts!`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to generate all blogs: ${error.message}`);
    }
  });

  const updateSiteFilesMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('update-site-files');
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success('Site files updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update site files: ${error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabase
        .from('automated_blog_posts')
        .delete()
        .eq('id', postId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automated-blog-posts'] });
      toast.success('Blog post deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete: ${error.message}`);
    }
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Automated Blog Management</h1>
        <Button
          onClick={() => updateSiteFilesMutation.mutate()}
          disabled={updateSiteFilesMutation.isPending}
        >
          {updateSiteFilesMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <RefreshCw className="mr-2 h-4 w-4" />
          Update Site Files
        </Button>
      </div>

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Generate New Blog Post</h2>
        
        <div className="flex gap-4">
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {TAMIL_NADU_DISTRICTS.map(city => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={() => selectedCity && generateBlogMutation.mutate(selectedCity)}
            disabled={!selectedCity || generateBlogMutation.isPending}
          >
            {generateBlogMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Plus className="mr-2 h-4 w-4" />
            Generate Single Post
          </Button>

          <Button
            onClick={() => generateAllBlogsMutation.mutate()}
            disabled={generateAllBlogsMutation.isPending}
            variant="secondary"
          >
            {generateAllBlogsMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate All Cities
          </Button>
        </div>

        {goldPrices && (
          <div className="text-sm text-muted-foreground">
            Current Prices: 22K: ₹{goldPrices.price_22k_per_gram} | 24K: ₹{goldPrices.price_24k_per_gram} | 18K: ₹{goldPrices.price_18k_per_gram}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Generated Blog Posts ({blogPosts?.length || 0})</h2>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
              {blogPosts?.map(post => (
              <div key={post.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span>City: {post.city}</span>
                      <span>Published: {new Date(post.publish_date).toLocaleDateString()}</span>
                      <span>Indexed: {post.is_indexed ? '✓' : '✗'}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingPost(post)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{post.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(post.id)}
                            className="bg-destructive text-destructive-foreground"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <BlogPostEditor 
        post={editingPost} 
        open={!!editingPost} 
        onClose={() => setEditingPost(null)} 
      />
    </div>
  );
};

export default BlogPostManagement;