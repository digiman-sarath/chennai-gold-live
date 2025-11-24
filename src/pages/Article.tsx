import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  head_scripts: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const Article = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      setArticle(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Article not found',
        variant: 'destructive',
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <p className="text-center text-muted-foreground">Loading article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return null;
  }

  const seoTitle = article.seo_title || article.title;
  const seoDescription = article.seo_description || article.excerpt || article.title;
  const publishedDate = article.published_at || article.created_at;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{seoTitle} | Chennai Gold Price</title>
        <meta name="description" content={seoDescription} />
        {article.seo_keywords && <meta name="keywords" content={article.seo_keywords} />}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://chennaigoldprice.com/articles/${article.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://chennaigoldprice.com/articles/${article.slug}`} />
        {article.featured_image_url && (
          <meta property="og:image" content={article.featured_image_url} />
        )}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        {article.featured_image_url && (
          <meta name="twitter:image" content={article.featured_image_url} />
        )}
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": seoDescription,
            "image": article.featured_image_url || "https://chennaigoldprice.com/placeholder.svg",
            "datePublished": publishedDate,
            "dateModified": article.updated_at,
            "author": {
              "@type": "Organization",
              "name": "Chennai Gold Price"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Chennai Gold Price",
              "url": "https://chennaigoldprice.com"
            }
          })}
        </script>
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://chennaigoldprice.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Articles",
                "item": "https://chennaigoldprice.com/articles"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": article.title,
                "item": `https://chennaigoldprice.com/articles/${article.slug}`
              }
            ]
          })}
        </script>
        
        {/* Custom Head Scripts */}
        {article.head_scripts && (
          <div dangerouslySetInnerHTML={{ __html: article.head_scripts }} />
        )}
      </Helmet>

      <Header />

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Featured Image */}
        {article.featured_image_url && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={article.featured_image_url}
              alt={article.title}
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {article.title}
          </h1>
          
          {article.excerpt && (
            <p className="text-xl text-muted-foreground mb-6">{article.excerpt}</p>
          )}
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={publishedDate}>
                {new Date(publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Chennai Gold Price</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <Card className="p-8">
          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {article.content}
          </div>
        </Card>

        {/* Article Footer */}
        <footer className="mt-8 pt-8 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Last updated:</span>
            <time dateTime={article.updated_at}>
              {new Date(article.updated_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </footer>
      </article>

      <Footer />
    </div>
  );
};

export default Article;
