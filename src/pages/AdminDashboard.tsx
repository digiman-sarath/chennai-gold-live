import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import AdManagement from '@/components/admin/AdManagement';
import AdAnalytics from '@/components/admin/AdAnalytics';
import BlogPostEditor from '@/components/admin/BlogPostEditor';
import SearchConsoleSetup from '@/components/admin/SearchConsoleSetup';
import { 
  DollarSign, TrendingUp, FileText, Settings, Loader2, Plus, 
  RefreshCw, Edit, Trash2, Eye, Search, Globe, Rss, MapPin,
  BarChart3, Newspaper, Clock, CheckCircle, XCircle, ExternalLink
} from 'lucide-react';

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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [editingPost, setEditingPost] = useState<any>(null);
  const [editingFile, setEditingFile] = useState<any>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();
      if (!roles) {
        navigate('/');
        return;
      }
      setIsAdmin(true);
    } catch (error) {
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  // Queries
  const { data: blogPosts, isLoading: loadingBlogs } = useQuery({
    queryKey: ['automated-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('automated_blog_posts')
        .select('*')
        .order('publish_date', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin
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
    },
    enabled: isAdmin
  });

  const { data: siteFiles, isLoading: loadingFiles } = useQuery({
    queryKey: ['site-files'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_files')
        .select('*')
        .order('file_name');
      if (error) throw error;
      return data;
    },
    enabled: isAdmin
  });

  const { data: indexingQueue, isLoading: loadingQueue } = useQuery({
    queryKey: ['indexing-queue'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('indexing_queue')
        .select('*')
        .order('requested_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin
  });

  const { data: districtContent } = useQuery({
    queryKey: ['district-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('district_content_variations')
        .select('*')
        .order('district_name');
      if (error) throw error;
      return data;
    },
    enabled: isAdmin
  });

  // Mutations
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
      toast.success('Blog post generated!');
      setSelectedCity("");
    },
    onError: (error: Error) => {
      toast.error(`Failed: ${error.message}`);
    }
  });

  const deleteBlogMutation = useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabase
        .from('automated_blog_posts')
        .delete()
        .eq('id', postId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automated-blog-posts'] });
      toast.success('Blog post deleted!');
    }
  });

  const updateSiteFilesMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('update-site-files');
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-files'] });
      toast.success('Site files updated!');
    }
  });

  const generateRssMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('generate-rss-feed');
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-files'] });
      toast.success('RSS feed generated!');
    }
  });

  const saveFileMutation = useMutation({
    mutationFn: async ({ id, content }: { id: string, content: string }) => {
      const { error } = await supabase
        .from('site_files')
        .update({ content, last_updated: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-files'] });
      toast.success('File saved!');
      setEditingFile(null);
    }
  });

  const processIndexingMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase.functions.invoke('request-indexing', {
        body: { queueId: id }
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['indexing-queue'] });
      toast.success('Indexing requested!');
    }
  });

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <Footer />
      </>
    );
  }

  if (!isAdmin) return null;

  const pendingCount = indexingQueue?.filter(q => q.status === 'pending').length || 0;
  const publishedCount = blogPosts?.filter(p => p.is_published).length || 0;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">All-in-one management for Chennai Gold Price</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{publishedCount}</p>
                    <p className="text-sm text-muted-foreground">Blog Posts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">{pendingCount}</p>
                    <p className="text-sm text-muted-foreground">Pending Index</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{districtContent?.length || 0}</p>
                    <p className="text-sm text-muted-foreground">Districts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold">{siteFiles?.length || 0}</p>
                    <p className="text-sm text-muted-foreground">Site Files</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="blogs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="blogs">
                <Newspaper className="h-4 w-4 mr-2" />
                Blogs
              </TabsTrigger>
              <TabsTrigger value="seo">
                <Search className="h-4 w-4 mr-2" />
                SEO & Indexing
              </TabsTrigger>
              <TabsTrigger value="files">
                <FileText className="h-4 w-4 mr-2" />
                Site Files
              </TabsTrigger>
              <TabsTrigger value="ads">
                <DollarSign className="h-4 w-4 mr-2" />
                Ads
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* BLOGS TAB */}
            <TabsContent value="blogs" className="space-y-6">
              <Card className="p-6">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {TAMIL_NADU_DISTRICTS.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => selectedCity && generateBlogMutation.mutate(selectedCity)}
                    disabled={!selectedCity || generateBlogMutation.isPending}
                  >
                    {generateBlogMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Plus className="mr-2 h-4 w-4" />
                    Generate Post
                  </Button>
                  <Button variant="outline" onClick={() => generateRssMutation.mutate()} disabled={generateRssMutation.isPending}>
                    <Rss className="mr-2 h-4 w-4" />
                    Update RSS
                  </Button>
                  {goldPrices && (
                    <Badge variant="secondary" className="ml-auto">
                      22K: ₹{goldPrices.price_22k_per_gram} | 24K: ₹{goldPrices.price_24k_per_gram}
                    </Badge>
                  )}
                </div>

                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {loadingBlogs ? (
                    <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
                  ) : (
                    blogPosts?.map(post => (
                      <div key={post.id} className="border rounded-lg p-4 flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{post.title}</h3>
                          <p className="text-sm text-muted-foreground truncate">{post.excerpt}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{post.city}</Badge>
                            <Badge variant={post.is_indexed ? "default" : "secondary"}>
                              {post.is_indexed ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                              {post.is_indexed ? 'Indexed' : 'Pending'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => window.open(`/blog/${post.slug}`, '_blank')}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setEditingPost(post)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Blog Post?</AlertDialogTitle>
                                <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteBlogMutation.mutate(post.id)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </TabsContent>

            {/* SEO & INDEXING TAB */}
            <TabsContent value="seo" className="space-y-6">
              <SearchConsoleSetup hasCredentials={false} />
              
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Indexing Queue</h2>
                  <Badge variant="outline">{pendingCount} pending</Badge>
                </div>
                
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {loadingQueue ? (
                    <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
                  ) : (
                    indexingQueue?.map(item => (
                      <div key={item.id} className="border rounded-lg p-3 flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-mono truncate">{item.url}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant={item.status === 'completed' ? 'default' : item.status === 'failed' ? 'destructive' : 'secondary'}>
                              {item.status === 'completed' ? <CheckCircle className="h-3 w-3 mr-1" /> : 
                               item.status === 'failed' ? <XCircle className="h-3 w-3 mr-1" /> : 
                               <Clock className="h-3 w-3 mr-1" />}
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                        {item.status === 'pending' && (
                          <Button size="sm" variant="outline" onClick={() => processIndexingMutation.mutate(item.id)} disabled={processIndexingMutation.isPending}>
                            <Globe className="h-4 w-4 mr-2" />
                            Request Index
                          </Button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </TabsContent>

            {/* SITE FILES TAB */}
            <TabsContent value="files" className="space-y-6">
              <div className="flex gap-2 mb-4">
                <Button onClick={() => updateSiteFilesMutation.mutate()} disabled={updateSiteFilesMutation.isPending}>
                  {updateSiteFilesMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate All Files
                </Button>
                <Button variant="outline" onClick={() => generateRssMutation.mutate()} disabled={generateRssMutation.isPending}>
                  <Rss className="mr-2 h-4 w-4" />
                  Generate RSS Feed
                </Button>
              </div>

              <div className="grid gap-4">
                {loadingFiles ? (
                  <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
                ) : (
                  siteFiles?.map(file => (
                    <Card key={file.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{file.file_name}</CardTitle>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => window.open(`/${file.file_name}`, '_blank')}>
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button size="sm" onClick={() => setEditingFile(file)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                        <CardDescription>
                          Last updated: {file.last_updated ? new Date(file.last_updated).toLocaleString() : 'Never'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <pre className="bg-muted p-3 rounded text-xs overflow-x-auto max-h-32">
                          {file.content.substring(0, 500)}...
                        </pre>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            {/* ADS TAB */}
            <TabsContent value="ads">
              <AdManagement />
            </TabsContent>

            {/* ANALYTICS TAB */}
            <TabsContent value="analytics">
              <AdAnalytics />
            </TabsContent>

            {/* SETTINGS TAB */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/admin/articles')}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Article Management
                    </CardTitle>
                    <CardDescription>Create and manage blog articles with SEO</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/admin/district-content')}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      District Content
                    </CardTitle>
                    <CardDescription>Manage TL;DR content for all districts</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BlogPostEditor post={editingPost} open={!!editingPost} onClose={() => setEditingPost(null)} />

      {/* File Editor Dialog */}
      <AlertDialog open={!!editingFile} onOpenChange={() => setEditingFile(null)}>
        <AlertDialogContent className="max-w-4xl max-h-[80vh]">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit {editingFile?.file_name}</AlertDialogTitle>
          </AlertDialogHeader>
          <Textarea
            value={editingFile?.content || ''}
            onChange={(e) => setEditingFile({ ...editingFile, content: e.target.value })}
            className="min-h-[400px] font-mono text-sm"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => editingFile && saveFileMutation.mutate({ id: editingFile.id, content: editingFile.content })}>
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </>
  );
};

export default AdminDashboard;