import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogSectionProps {
  excludeSlug?: string;
  city?: string | null;
  title?: string;
  limit?: number;
  showViewAll?: boolean;
}

const BlogSection = ({ 
  excludeSlug, 
  city, 
  title = "Latest Gold Rate Insights",
  limit = 6,
  showViewAll = true
}: BlogSectionProps) => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts-section', city, excludeSlug, limit],
    queryFn: async () => {
      let query = supabase
        .from('automated_blog_posts')
        .select('id, title, slug, excerpt, city, publish_date, gold_price_22k, gold_price_24k')
        .eq('is_published', true)
        .order('publish_date', { ascending: false })
        .limit(limit + 1);
      
      if (excludeSlug) {
        query = query.neq('slug', excludeSlug);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // If city is specified, prioritize posts from that city
      if (city && data) {
        const cityPosts = data.filter(p => p.city?.toLowerCase() === city.toLowerCase());
        const otherPosts = data.filter(p => p.city?.toLowerCase() !== city.toLowerCase());
        return [...cityPosts, ...otherPosts].slice(0, limit);
      }
      
      return data?.slice(0, limit) || [];
    }
  });

  if (isLoading) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map(i => (
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
      </section>
    );
  }

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {showViewAll && (
          <Link 
            to="/blog" 
            className="text-primary hover:underline flex items-center gap-1 text-sm font-medium"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
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
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    22K: ₹{post.gold_price_22k?.toLocaleString('en-IN')}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
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
};

export default BlogSection;
