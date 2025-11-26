import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus, ArrowLeft, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ContentVariation {
  id: string;
  district_name: string;
  variation_text: string;
  season_tag: string | null;
  is_active: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
}

const TAMIL_NADU_DISTRICTS = [
  'Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tirunelveli', 'Tiruchirappalli',
  'Erode', 'Vellore', 'Thanjavur', 'Kanyakumari', 'Chengalpattu', 'Dharmapuri',
  'Dindigul', 'Karur', 'Namakkal', 'Pudukkottai', 'Ramanathapuram', 'Sivaganga',
  'Theni', 'Thoothukudi', 'Virudhunagar', 'Cuddalore', 'Nagapattinam', 'Perambalur',
  'Ariyalur', 'Nilgiris', 'Krishnagiri', 'Tirupattur', 'Ranipet', 'Tiruvannamalai',
  'Villupuram', 'Kallakurichi', 'Tenkasi', 'Mayiladuthurai', 'Kancheepuram', 'Tiruvallur'
];

const SEASON_TAGS = ['All Year', 'Pongal', 'Diwali', 'Wedding Season', 'Harvest', 'Festival'];

export default function DistrictContentManager() {
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Chennai');
  const [variations, setVariations] = useState<ContentVariation[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingVariation, setEditingVariation] = useState<ContentVariation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    variation_text: '',
    season_tag: 'All Year',
    is_active: true,
    priority: 0
  });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      fetchVariations();
    }
  }, [selectedDistrict]);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('Please login to access this page');
      navigate('/auth');
      return;
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    if (!roles?.some(r => r.role === 'admin')) {
      toast.error('Admin access required');
      navigate('/');
    }
  };

  const fetchVariations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('district_content_variations')
      .select('*')
      .eq('district_name', selectedDistrict)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch content variations');
      console.error(error);
    } else {
      setVariations(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.variation_text.trim()) {
      toast.error('Variation text is required');
      return;
    }

    const variationData = {
      district_name: selectedDistrict,
      variation_text: formData.variation_text,
      season_tag: formData.season_tag,
      is_active: formData.is_active,
      priority: formData.priority
    };

    if (editingVariation) {
      const { error } = await supabase
        .from('district_content_variations')
        .update(variationData)
        .eq('id', editingVariation.id);

      if (error) {
        toast.error('Failed to update variation');
        console.error(error);
      } else {
        toast.success('Variation updated successfully');
        resetForm();
        fetchVariations();
      }
    } else {
      const { error } = await supabase
        .from('district_content_variations')
        .insert(variationData);

      if (error) {
        toast.error('Failed to create variation');
        console.error(error);
      } else {
        toast.success('Variation created successfully');
        resetForm();
        fetchVariations();
      }
    }
  };

  const handleEdit = (variation: ContentVariation) => {
    setEditingVariation(variation);
    setFormData({
      variation_text: variation.variation_text,
      season_tag: variation.season_tag || 'All Year',
      is_active: variation.is_active,
      priority: variation.priority
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this variation?')) return;

    const { error } = await supabase
      .from('district_content_variations')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete variation');
      console.error(error);
    } else {
      toast.success('Variation deleted successfully');
      fetchVariations();
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('district_content_variations')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update status');
      console.error(error);
    } else {
      toast.success(`Variation ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchVariations();
    }
  };

  const resetForm = () => {
    setFormData({
      variation_text: '',
      season_tag: 'All Year',
      is_active: true,
      priority: 0
    });
    setEditingVariation(null);
    setIsDialogOpen(false);
  };

  const getPreviewText = (text: string) => {
    const mockPrice24k = '₹12,787';
    const mockPrice22k = '₹11,721';
    const mockPrice18k = '₹9,590';
    const mockDate = '26 Nov 2025';

    return text
      .replace(/\{p24k\}/g, mockPrice24k)
      .replace(/\{p22k\}/g, mockPrice22k)
      .replace(/\{p18k\}/g, mockPrice18k)
      .replace(/\{date\}/g, mockDate);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin Panel
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">District Content Manager</h1>
              <p className="text-muted-foreground mt-2">
                Manage TL;DR content variations for each Tamil Nadu district
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Variation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingVariation ? 'Edit' : 'Add'} Content Variation
                  </DialogTitle>
                  <DialogDescription>
                    Use placeholders: {'{p24k}'}, {'{p22k}'}, {'{p18k}'}, {'{date}'}
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="variation_text">Variation Text</Label>
                    <Textarea
                      id="variation_text"
                      value={formData.variation_text}
                      onChange={(e) => setFormData({ ...formData, variation_text: e.target.value })}
                      placeholder="The live gold price in {selectedDistrict} today ({date}) is {p24k} per gram for 24K..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="season_tag">Season Tag</Label>
                      <Select
                        value={formData.season_tag}
                        onValueChange={(value) => setFormData({ ...formData, season_tag: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SEASON_TAGS.map(tag => (
                            <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Input
                        id="priority"
                        type="number"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>

                  {formData.variation_text && (
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Preview
                      </Label>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm">{getPreviewText(formData.variation_text)}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      {editingVariation ? 'Update' : 'Create'} Variation
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select District</CardTitle>
            <CardDescription>Choose a district to manage its content variations</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TAMIL_NADU_DISTRICTS.map(district => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Variations for {selectedDistrict}</CardTitle>
            <CardDescription>
              {variations.length} variation{variations.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : variations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No variations found. Add your first variation to get started.
              </div>
            ) : (
              <div className="space-y-4">
                {variations.map((variation) => (
                  <Card key={variation.id} className={!variation.is_active ? 'opacity-60' : ''}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant={variation.is_active ? 'default' : 'secondary'}>
                              {variation.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                            {variation.season_tag && (
                              <Badge variant="outline">{variation.season_tag}</Badge>
                            )}
                            <Badge variant="outline">Priority: {variation.priority}</Badge>
                          </div>
                          <p className="text-sm text-foreground">{variation.variation_text}</p>
                          <div className="text-xs text-muted-foreground">
                            Last updated: {new Date(variation.updated_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleActive(variation.id, variation.is_active)}
                          >
                            <Switch checked={variation.is_active} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(variation)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(variation.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
