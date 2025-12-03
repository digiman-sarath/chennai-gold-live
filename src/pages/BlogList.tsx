import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('automated_blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('publish_date', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const filteredPosts = posts?.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const seoTitle = "Gold Rate Blog - Tamil Nadu Gold Price Insights | Chennai Gold Price";
  const seoDescription = "Latest gold rate insights, price analysis, and market trends for all Tamil Nadu districts. Expert guides on gold investment and buying tips.";

  return (
    <>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content="gold rate blog, Tamil Nadu gold prices, gold market analysis, gold investment tips" />
      <link rel="canonical" href="https://chennaigoldprice.com/blog" />
      
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content="https://chennaigoldprice.com/blog" />
      <meta property="og:type" content="website" />
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Chennai Gold Price Blog",
          "description": seoDescription,
          "url": "https://chennaigoldprice.com/blog",
          "publisher": {
            "@type": "Organization",
            "name": "Chennai Gold Price",
            "url": "https://chennaigoldprice.com"
          }
        })}
      </script>
      
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Gold Rate Insights & Analysis
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Stay updated with the latest gold prices, market trends, and expert analysis 
              for all Tamil Nadu districts.
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto">
              <Input
                type="search"
                placeholder="Search articles by city or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Posts Grid */}
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts && filteredPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map(post => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.publish_date).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                        {post.city && (
                          <>
                            <span>•</span>
                            <MapPin className="h-3 w-3" />
                            <span>{post.city}</span>
                          </>
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          22K: ₹{post.gold_price_22k?.toLocaleString('en-IN')}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          24K: ₹{post.gold_price_24k?.toLocaleString('en-IN')}
                        </Badge>
                        {post.gold_price_18k && (
                          <Badge variant="outline" className="text-xs">
                            18K: ₹{post.gold_price_18k?.toLocaleString('en-IN')}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? 'No articles found matching your search.' : 'No blog posts available yet.'}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogList;
