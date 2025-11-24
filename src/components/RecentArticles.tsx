import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  created_at: string;
}

const RecentArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecentArticles();
  }, []);

  const fetchRecentArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, slug, excerpt, featured_image_url, published_at, created_at')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || articles.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Recent Articles
              </h2>
              <p className="text-muted-foreground">
                Latest insights on gold rates and investment tips
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/articles')}
              className="hidden sm:flex"
            >
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
                onClick={() => navigate(`/articles/${article.slug}`)}
              >
                {article.featured_image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.featured_image_url}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={article.published_at || article.created_at}>
                      {new Date(article.published_at || article.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Button
              variant="outline"
              onClick={() => navigate('/articles')}
              className="w-full"
            >
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentArticles;
