import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedArticles from '@/components/RelatedArticles';
import { Card } from '@/components/ui/card';
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

  // Convert Markdown to HTML-like structure (basic rendering)
  const renderMarkdown = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-4xl font-bold mb-4 mt-8">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-3xl font-bold mb-3 mt-6">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-2xl font-bold mb-2 mt-4">{line.substring(4)}</h3>;
        }

        // Lists
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-6 list-disc">{parseInlineMarkdown(line.substring(2))}</li>;
        }

        // Images
        const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (imgMatch) {
          return (
            <img
              key={index}
              src={imgMatch[2]}
              alt={imgMatch[1]}
              className="my-4 rounded-lg max-w-full h-auto"
            />
          );
        }

        // Empty lines
        if (line.trim() === '') {
          return <br key={index} />;
        }

        // Regular paragraphs
        return <p key={index} className="mb-4">{parseInlineMarkdown(line)}</p>;
      });
  };

  const parseInlineMarkdown = (text: string) => {
    const parts: (string | JSX.Element)[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Bold
      const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
      if (boldMatch && boldMatch.index !== undefined) {
        if (boldMatch.index > 0) {
          parts.push(remaining.substring(0, boldMatch.index));
        }
        parts.push(<strong key={`bold-${key++}`}>{boldMatch[1]}</strong>);
        remaining = remaining.substring(boldMatch.index + boldMatch[0].length);
        continue;
      }

      // Italic
      const italicMatch = remaining.match(/\*(.*?)\*/);
      if (italicMatch && italicMatch.index !== undefined) {
        if (italicMatch.index > 0) {
          parts.push(remaining.substring(0, italicMatch.index));
        }
        parts.push(<em key={`italic-${key++}`}>{italicMatch[1]}</em>);
        remaining = remaining.substring(italicMatch.index + italicMatch[0].length);
        continue;
      }

      // Links
      const linkMatch = remaining.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch && linkMatch.index !== undefined) {
        if (linkMatch.index > 0) {
          parts.push(remaining.substring(0, linkMatch.index));
        }
        parts.push(
          <a
            key={`link-${key++}`}
            href={linkMatch[2]}
            className="text-primary underline hover:text-primary/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkMatch[1]}
          </a>
        );
        remaining = remaining.substring(linkMatch.index + linkMatch[0].length);
        continue;
      }

      // No more matches, add remaining text
      parts.push(remaining);
      break;
    }

    return <>{parts}</>;
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
        <title>{`${seoTitle} | Chennai Gold Price`}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={`${article.seo_keywords || ''}, gold rate article, Chennai gold price, gold market insights, gold investment tips, gold jewellery guide, Tamil Nadu gold rate, gold buying tips, gold price analysis`.replace(/^, /, '')} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={`https://chennaigoldprice.com/articles/${article.slug}`} />
        <meta name="author" content="Chennai Gold Price" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Chennai, Tamil Nadu" />
        <meta name="revisit-after" content="3 days" />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={`https://chennaigoldprice.com/articles/${article.slug}`} />
        <meta property="og:site_name" content="Chennai Gold Price" />
        <meta property="og:locale" content="en_IN" />
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
        
        {/* Article Metadata */}
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:modified_time" content={article.updated_at} />
        <meta property="article:section" content="Gold Rates" />
        <meta property="article:tag" content="Gold Price" />
        <meta property="article:tag" content="Gold Rate India" />
        
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
          <div className="prose prose-lg max-w-none dark:prose-invert article-content">
            {renderMarkdown(article.content)}
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

      <RelatedArticles 
        currentArticleId={article.id}
        currentArticleKeywords={article.seo_keywords}
      />

      <Footer />
    </div>
  );
};

export default Article;
