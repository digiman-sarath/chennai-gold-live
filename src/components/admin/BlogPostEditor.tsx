import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Save, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  city: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  gold_price_22k: number | null;
  gold_price_24k: number | null;
  gold_price_18k: number | null;
  is_published: boolean | null;
  featured_image_url: string | null;
}

interface BlogPostEditorProps {
  post: BlogPost | null;
  open: boolean;
  onClose: () => void;
}

const BlogPostEditor = ({ post, open, onClose }: BlogPostEditorProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Partial<BlogPost>>({});

  useEffect(() => {
    if (post) {
      setFormData(post);
    }
  }, [post]);

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<BlogPost>) => {
      const { error } = await supabase
        .from('automated_blog_posts')
        .update({
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          seo_title: data.seo_title,
          seo_description: data.seo_description,
          seo_keywords: data.seo_keywords,
          gold_price_22k: data.gold_price_22k,
          gold_price_24k: data.gold_price_24k,
          gold_price_18k: data.gold_price_18k,
          is_published: data.is_published,
          featured_image_url: data.featured_image_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', post?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automated-blog-posts'] });
      toast.success('Blog post updated successfully!');
      onClose();
    },
    onError: (error: Error) => {
      toast.error(`Failed to update: ${error.message}`);
    }
  });

  const handleChange = (field: keyof BlogPost, value: string | boolean | number | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog Post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (read-only)</Label>
              <Input
                id="slug"
                value={formData.slug || ''}
                disabled
                className="bg-muted"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="gold_price_22k">22K Price (₹)</Label>
              <Input
                id="gold_price_22k"
                type="number"
                value={formData.gold_price_22k || ''}
                onChange={(e) => handleChange('gold_price_22k', parseFloat(e.target.value) || null)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gold_price_24k">24K Price (₹)</Label>
              <Input
                id="gold_price_24k"
                type="number"
                value={formData.gold_price_24k || ''}
                onChange={(e) => handleChange('gold_price_24k', parseFloat(e.target.value) || null)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gold_price_18k">18K Price (₹)</Label>
              <Input
                id="gold_price_18k"
                type="number"
                value={formData.gold_price_18k || ''}
                onChange={(e) => handleChange('gold_price_18k', parseFloat(e.target.value) || null)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt || ''}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo_title">SEO Title (max 60 chars)</Label>
            <Input
              id="seo_title"
              value={formData.seo_title || ''}
              onChange={(e) => handleChange('seo_title', e.target.value)}
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground">{formData.seo_title?.length || 0}/60</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo_description">SEO Description (max 160 chars)</Label>
            <Textarea
              id="seo_description"
              value={formData.seo_description || ''}
              onChange={(e) => handleChange('seo_description', e.target.value)}
              maxLength={160}
              rows={2}
            />
            <p className="text-xs text-muted-foreground">{formData.seo_description?.length || 0}/160</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seo_keywords">SEO Keywords</Label>
            <Input
              id="seo_keywords"
              value={formData.seo_keywords || ''}
              onChange={(e) => handleChange('seo_keywords', e.target.value)}
              placeholder="comma, separated, keywords"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="featured_image_url">Featured Image URL</Label>
            <Input
              id="featured_image_url"
              value={formData.featured_image_url || ''}
              onChange={(e) => handleChange('featured_image_url', e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (HTML)</Label>
            <Textarea
              id="content"
              value={formData.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              rows={15}
              className="font-mono text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="is_published"
              checked={formData.is_published ?? true}
              onCheckedChange={(checked) => handleChange('is_published', checked)}
            />
            <Label htmlFor="is_published">Published</Label>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPostEditor;
