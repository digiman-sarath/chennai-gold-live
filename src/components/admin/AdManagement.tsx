import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, BarChart } from 'lucide-react';
import { format } from 'date-fns';

interface Ad {
  id: string;
  title: string;
  image_url: string;
  link_url: string | null;
  position: 'top_banner' | 'sidebar' | 'in_content' | 'bottom_banner' | 'mobile_sticky';
  is_active: boolean;
  priority: number;
  click_count: number;
  impression_count: number;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

const AdManagement = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    link_url: '',
    position: 'top_banner' as Ad['position'],
    is_active: true,
    priority: 0,
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAds(data || []);
    } catch (error) {
      console.error('Error fetching ads:', error);
      toast({
        title: 'Error',
        description: 'Failed to load ads',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const adData = {
        title: formData.title,
        image_url: formData.image_url,
        link_url: formData.link_url || null,
        position: formData.position,
        is_active: formData.is_active,
        priority: formData.priority,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
      };

      if (editingAd) {
        const { error } = await supabase
          .from('ads')
          .update(adData)
          .eq('id', editingAd.id);

        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Ad updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('ads')
          .insert([adData]);

        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Ad created successfully',
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchAds();
    } catch (error) {
      console.error('Error saving ad:', error);
      toast({
        title: 'Error',
        description: 'Failed to save ad',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ad?')) return;

    try {
      const { error } = await supabase
        .from('ads')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Ad deleted successfully',
      });
      
      fetchAds();
    } catch (error) {
      console.error('Error deleting ad:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete ad',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (ad: Ad) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      image_url: ad.image_url,
      link_url: ad.link_url || '',
      position: ad.position,
      is_active: ad.is_active,
      priority: ad.priority,
      start_date: ad.start_date ? ad.start_date.split('T')[0] : '',
      end_date: ad.end_date ? ad.end_date.split('T')[0] : '',
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingAd(null);
    setFormData({
      title: '',
      image_url: '',
      link_url: '',
      position: 'top_banner',
      is_active: true,
      priority: 0,
      start_date: '',
      end_date: '',
    });
  };

  const toggleActive = async (ad: Ad) => {
    try {
      const { error } = await supabase
        .from('ads')
        .update({ is_active: !ad.is_active })
        .eq('id', ad.id);

      if (error) throw error;
      
      fetchAds();
    } catch (error) {
      console.error('Error toggling ad status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update ad status',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div className="p-8">Loading ads...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Ad Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Ad
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingAd ? 'Edit Ad' : 'Create New Ad'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Ad Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  required
                  placeholder="https://example.com/image.jpg"
                />
                {formData.image_url && (
                  <img src={formData.image_url} alt="Preview" className="mt-2 max-h-32 rounded" />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="link_url">Link URL (optional)</Label>
                <Input
                  id="link_url"
                  type="url"
                  value={formData.link_url}
                  onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select value={formData.position} onValueChange={(value: any) => setFormData({ ...formData, position: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top_banner">Top Banner</SelectItem>
                    <SelectItem value="sidebar">Sidebar</SelectItem>
                    <SelectItem value="in_content">In Content</SelectItem>
                    <SelectItem value="bottom_banner">Bottom Banner</SelectItem>
                    <SelectItem value="mobile_sticky">Mobile Sticky</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Input
                    id="priority"
                    type="number"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div className="flex items-center space-x-2 pt-8">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date (optional)</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date (optional)</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingAd ? 'Update' : 'Create'} Ad
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Ads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Preview</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Stats</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ads.map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell>
                      <img src={ad.image_url} alt={ad.title} className="h-12 w-20 object-cover rounded" />
                    </TableCell>
                    <TableCell className="font-medium">{ad.title}</TableCell>
                    <TableCell>
                      <span className="capitalize">{ad.position.replace('_', ' ')}</span>
                    </TableCell>
                    <TableCell>{ad.priority}</TableCell>
                    <TableCell>
                      <Switch
                        checked={ad.is_active}
                        onCheckedChange={() => toggleActive(ad)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <BarChart className="h-3 w-3" />
                          {ad.impression_count} views
                        </div>
                        <div className="text-muted-foreground">
                          {ad.click_count} clicks
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs">
                        {ad.start_date && <div>From: {format(new Date(ad.start_date), 'MMM dd, yyyy')}</div>}
                        {ad.end_date && <div>To: {format(new Date(ad.end_date), 'MMM dd, yyyy')}</div>}
                        {!ad.start_date && !ad.end_date && <div className="text-muted-foreground">Always</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(ad)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(ad.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {ads.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No ads created yet. Click "Create Ad" to add your first ad.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdManagement;