import { memo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, MapPin, TrendingUp } from "lucide-react";

interface BlogInsightsProps {
  city?: string;
  limit?: number;
  excludeSlug?: string;
}

const RecentBlogInsights = memo(({ city, limit = 4, excludeSlug }: BlogInsightsProps) => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-insights', city, limit],
    queryFn: async () => {
      let query = supabase
        .from('automated_blog_posts')
        .select('id, title, slug, city, publish_date, gold_price_22k, gold_price_24k')
        .eq('is_published', true)
        .order('publish_date', { ascending: false })
        .limit(limit + 1);
      
      if (excludeSlug) {
        query = query.neq('slug', excludeSlug);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      if (city && data) {
        const cityPosts = data.filter(p => p.city?.toLowerCase() === city.toLowerCase());
        const otherPosts = data.filter(p => p.city?.toLowerCase() !== city.toLowerCase());
        return [...cityPosts, ...otherPosts].slice(0, limit);
      }
      
      return data?.slice(0, limit) || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    gcTime: 10 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <section className="py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Latest Gold Rate Insights
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Latest Gold Rate Insights
        </h2>
        <Link 
          to="/blog" 
          className="text-primary hover:underline flex items-center gap-1 text-sm font-medium"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map(post => (
          <Link key={post.id} to={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-md transition-shadow hover:border-primary/30 group">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(post.publish_date).toLocaleDateString('en-IN', { 
                    month: 'short', day: 'numeric' 
                  })}</span>
                  {post.city && (
                    <>
                      <span>•</span>
                      <MapPin className="h-3 w-3" />
                      <span>{post.city}</span>
                    </>
                  )}
                </div>
                <CardTitle className="text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex gap-1.5">
                  <Badge variant="outline" className="text-xs py-0">
                    22K: ₹{post.gold_price_22k?.toLocaleString('en-IN')}
                  </Badge>
                  <Badge variant="outline" className="text-xs py-0">
                    24K: ₹{post.gold_price_24k?.toLocaleString('en-IN')}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
});

RecentBlogInsights.displayName = 'RecentBlogInsights';

export default RecentBlogInsights;
