import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  created_at: string;
  seo_keywords: string | null;
}

interface RelatedArticlesProps {
  currentArticleId: string;
  currentArticleKeywords?: string | null;
}

const RelatedArticles = ({ currentArticleId, currentArticleKeywords }: RelatedArticlesProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRelatedArticles();
  }, [currentArticleId, currentArticleKeywords]);

  const fetchRelatedArticles = async () => {
    try {
      // Fetch articles excluding the current one
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, slug, excerpt, featured_image_url, published_at, created_at, seo_keywords')
        .eq('is_published', true)
        .neq('id', currentArticleId)
        .order('published_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      if (data) {
        // If we have keywords, try to find articles with similar keywords
        if (currentArticleKeywords) {
          const keywords = currentArticleKeywords.toLowerCase().split(',').map(k => k.trim());
          
          // Score articles based on keyword matches
          const scoredArticles = data.map(article => {
            let score = 0;
            if (article.seo_keywords) {
              const articleKeywords = article.seo_keywords.toLowerCase().split(',').map(k => k.trim());
              keywords.forEach(keyword => {
                if (articleKeywords.some(ak => ak.includes(keyword) || keyword.includes(ak))) {
                  score++;
                }
              });
            }
            return { ...article, score };
          });

          // Sort by score (descending) and take top 3
          const sortedArticles = scoredArticles
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
          
          setArticles(sortedArticles);
        } else {
          // No keywords, just show 3 most recent articles
          setArticles(data.slice(0, 3));
        }
      }
    } catch (error) {
      console.error('Error fetching related articles:', error);
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Related Articles
            </h2>
            <p className="text-muted-foreground">
              Continue reading more about gold rates and investment
            </p>
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
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
