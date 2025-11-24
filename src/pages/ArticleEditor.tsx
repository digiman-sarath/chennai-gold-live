import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, ArrowLeft, Upload, Link2, Image, Bold, Italic, List } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const ArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [article, setArticle] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image_url: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    head_scripts: '',
    is_published: false,
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    if (!id || id === 'new') return;

    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setArticle({
          title: data.title,
          slug: data.slug,
          content: data.content,
          excerpt: data.excerpt || '',
          featured_image_url: data.featured_image_url || '',
          seo_title: data.seo_title || '',
          seo_description: data.seo_description || '',
          seo_keywords: data.seo_keywords || '',
          head_scripts: data.head_scripts || '',
          is_published: data.is_published,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setArticle({ ...article, title: value });
    if (!id || id === 'new') {
      setArticle((prev) => ({ ...prev, slug: generateSlug(value) }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isFeatured = true) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image size should be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      if (isFeatured) {
        setArticle({ ...article, featured_image_url: publicUrl });
      } else {
        setImageUrl(publicUrl);
      }

      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const insertAtCursor = (before: string, after: string = '') => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = article.content.substring(start, end);
    const newText =
      article.content.substring(0, start) +
      before +
      selectedText +
      after +
      article.content.substring(end);

    setArticle({ ...article, content: newText });

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const insertLink = () => {
    if (!linkUrl) return;
    const linkMarkdown = `[${linkText || linkUrl}](${linkUrl})`;
    insertAtCursor(linkMarkdown);
    setShowLinkDialog(false);
    setLinkUrl('');
    setLinkText('');
  };

  const insertImage = () => {
    if (!imageUrl) return;
    const imageMarkdown = `![${imageAlt || 'Image'}](${imageUrl})`;
    insertAtCursor(imageMarkdown);
    setShowImageDialog(false);
    setImageUrl('');
    setImageAlt('');
  };

  const handleSave = async () => {
    if (!article.title || !article.slug || !article.content) {
      toast({
        title: 'Validation Error',
        description: 'Title, slug, and content are required',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('User not authenticated');

      const articleData = {
        ...article,
        author_id: userData.user.id,
        published_at: article.is_published ? new Date().toISOString() : null,
      };

      if (id && id !== 'new') {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', id);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Article updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('articles')
          .insert([articleData]);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Article created successfully',
        });
      }

      navigate('/admin/articles');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/articles')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Button>
            <h1 className="text-4xl font-bold text-foreground">
              {id && id !== 'new' ? 'Edit Article' : 'New Article'}
            </h1>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <Switch
                checked={article.is_published}
                onCheckedChange={(checked) =>
                  setArticle({ ...article, is_published: checked })
                }
              />
              <Label>Published</Label>
            </div>
            <Button onClick={handleSave} disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={article.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter article title"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={article.slug}
                    onChange={(e) => setArticle({ ...article, slug: e.target.value })}
                    placeholder="article-url-slug"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={article.excerpt}
                    onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                    placeholder="Short description of the article"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Featured Image</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={article.featured_image_url}
                      onChange={(e) =>
                        setArticle({ ...article, featured_image_url: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg or upload below"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('featured-upload')?.click()}
                      disabled={uploading}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {uploading ? 'Uploading...' : 'Upload'}
                    </Button>
                    <input
                      id="featured-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, true)}
                    />
                  </div>
                  {article.featured_image_url && (
                    <img
                      src={article.featured_image_url}
                      alt="Featured"
                      className="mt-2 max-h-40 rounded-lg object-cover"
                    />
                  )}
                </div>

                <div>
                  <Label htmlFor="content">Content *</Label>
                  <div className="flex gap-2 mb-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertAtCursor('**', '**')}
                      title="Bold"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertAtCursor('*', '*')}
                      title="Italic"
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => insertAtCursor('\n- ')}
                      title="List"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowLinkDialog(true)}
                      title="Insert Link"
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowImageDialog(true)}
                      title="Insert Image"
                    >
                      <Image className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    id="content"
                    value={article.content}
                    onChange={(e) => setArticle({ ...article, content: e.target.value })}
                    placeholder="Write your article content here... Supports Markdown formatting"
                    rows={20}
                    className="font-mono"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Supports Markdown: **bold**, *italic*, [links](url), ![images](url)
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="seo_title">SEO Title</Label>
                  <Input
                    id="seo_title"
                    value={article.seo_title}
                    onChange={(e) => setArticle({ ...article, seo_title: e.target.value })}
                    placeholder="Custom title for search engines (defaults to article title)"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {article.seo_title.length}/60 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="seo_description">SEO Description</Label>
                  <Textarea
                    id="seo_description"
                    value={article.seo_description}
                    onChange={(e) =>
                      setArticle({ ...article, seo_description: e.target.value })
                    }
                    placeholder="Meta description for search engines"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {article.seo_description.length}/160 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="seo_keywords">SEO Keywords</Label>
                  <Input
                    id="seo_keywords"
                    value={article.seo_keywords}
                    onChange={(e) =>
                      setArticle({ ...article, seo_keywords: e.target.value })
                    }
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="head_scripts">Custom Head Scripts</Label>
                  <Textarea
                    id="head_scripts"
                    value={article.head_scripts}
                    onChange={(e) =>
                      setArticle({ ...article, head_scripts: e.target.value })
                    }
                    placeholder="<script>...</script> or <meta>...</meta>"
                    rows={10}
                    className="font-mono"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Custom scripts and meta tags to inject in the page head. Use with caution.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Link Dialog */}
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
            <DialogDescription>
              Add a hyperlink to your article content
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="link-text">Link Text</Label>
              <Input
                id="link-text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Click here"
              />
            </div>
            <div>
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLinkDialog(false)}>
              Cancel
            </Button>
            <Button onClick={insertLink}>Insert Link</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
            <DialogDescription>
              Add an image to your article content
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-url">Image URL</Label>
              <div className="flex gap-2">
                <Input
                  id="image-url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg or upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('content-image-upload')?.click()}
                  disabled={uploading}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <input
                  id="content-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, false)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="image-alt">Alt Text</Label>
              <Input
                id="image-alt"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Description of the image"
              />
            </div>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="max-h-40 rounded-lg object-cover"
              />
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImageDialog(false)}>
              Cancel
            </Button>
            <Button onClick={insertImage}>Insert Image</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default ArticleEditor;
