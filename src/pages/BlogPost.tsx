import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BlogSection from "@/components/BlogSection";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('automated_blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug
  });

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt || '',
          url: url
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  if (error) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link to="/">
              <Button><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const currentDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric',
    timeZone: 'Asia/Kolkata'
  });

  const seoTitle = post?.seo_title || `${post?.title} - Chennai Gold Price`;
  const seoDescription = post?.seo_description || post?.excerpt || `Gold rates in ${post?.city} today. Current 22K, 24K, 18K gold prices.`;

  return (
    <>
      {post && (
        <>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDescription} />
          <meta name="keywords" content={post.seo_keywords || `gold rate, ${post.city}, Tamil Nadu, today price`} />
          <link rel="canonical" href={`https://chennaigoldprice.com/blog/${slug}`} />
          
          {/* Open Graph */}
          <meta property="og:title" content={seoTitle} />
          <meta property="og:description" content={seoDescription} />
          <meta property="og:url" content={`https://chennaigoldprice.com/blog/${slug}`} />
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content="Chennai Gold Price" />
          {post.featured_image_url && <meta property="og:image" content={post.featured_image_url} />}
          
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={seoTitle} />
          <meta name="twitter:description" content={seoDescription} />
          
          {/* Article metadata */}
          <meta property="article:published_time" content={post.publish_date} />
          <meta property="article:modified_time" content={post.updated_at} />
          <meta property="article:section" content="Gold Prices" />
          <meta property="article:tag" content={`Gold Rate ${post.city}`} />
          
          {/* JSON-LD Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": post.title,
              "description": seoDescription,
              "datePublished": post.publish_date,
              "dateModified": post.updated_at,
              "author": {
                "@type": "Organization",
                "name": "Chennai Gold Price",
                "url": "https://chennaigoldprice.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Chennai Gold Price",
                "url": "https://chennaigoldprice.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://chennaigoldprice.com/logo.png"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://chennaigoldprice.com/blog/${slug}`
              },
              "about": {
                "@type": "Thing",
                "name": `Gold Rate in ${post.city}`,
                "description": `Current gold prices in ${post.city}, Tamil Nadu`
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
                  "name": "Blog",
                  "item": "https://chennaigoldprice.com/blog"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": post.title,
                  "item": `https://chennaigoldprice.com/blog/${slug}`
                }
              ]
            })}
          </script>
        </>
      )}
      
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li>/</li>
              <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
              <li>/</li>
              <li className="text-foreground truncate max-w-[200px]">{post?.title || 'Loading...'}</li>
            </ol>
          </nav>

          {isLoading ? (
            <div className="max-w-4xl mx-auto space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-96 w-full" />
            </div>
          ) : post ? (
            <article className="max-w-4xl mx-auto">
              {/* Header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.publish_date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  {post.city && (
                    <Link to={`/gold-rates/${post.city.toLowerCase()}`} className="flex items-center gap-1 hover:text-primary">
                      <MapPin className="h-4 w-4" />
                      <span>{post.city}, Tamil Nadu</span>
                    </Link>
                  )}
                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>

                {/* Price Summary */}
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <h2 className="text-sm font-semibold text-muted-foreground mb-2">Current Gold Prices in {post.city}</h2>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <Badge variant="outline" className="mb-1">22K</Badge>
                      <p className="font-bold text-lg">₹{post.gold_price_22k?.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-muted-foreground">per gram</p>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-1">24K</Badge>
                      <p className="font-bold text-lg">₹{post.gold_price_24k?.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-muted-foreground">per gram</p>
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-1">18K</Badge>
                      <p className="font-bold text-lg">₹{post.gold_price_18k?.toLocaleString('en-IN')}</p>
                      <p className="text-xs text-muted-foreground">per gram</p>
                    </div>
                  </div>
                </div>

                {post.excerpt && (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </header>

              {/* Content */}
              <div 
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:text-foreground 
                  prose-p:text-foreground/90 prose-p:leading-relaxed
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground
                  prose-ul:text-foreground/90 prose-ol:text-foreground/90
                  prose-li:marker:text-primary"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Internal Links */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-xl font-semibold mb-4">Explore Gold Rates</h3>
                <div className="flex flex-wrap gap-2">
                  <Link to={`/gold-rates/${post.city?.toLowerCase()}`}>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      {post.city} Gold Rates
                    </Badge>
                  </Link>
                  <Link to="/">
                    <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Chennai Gold Price Today
                    </Badge>
                  </Link>
                  <Link to="/buying-guide">
                    <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                      Gold Buying Guide
                    </Badge>
                  </Link>
                </div>
              </div>
            </article>
          ) : null}

          {/* Related Blog Posts */}
          {post && (
            <div className="mt-16">
              <BlogSection 
                excludeSlug={slug} 
                city={post.city} 
                title="Related Articles"
                limit={3}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
