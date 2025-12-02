-- Add 18K gold price to gold_prices table
ALTER TABLE public.gold_prices 
ADD COLUMN IF NOT EXISTS price_18k_per_gram DECIMAL(10,2);

-- Create automated blog posts table
CREATE TABLE IF NOT EXISTS public.automated_blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  featured_image_url TEXT,
  city TEXT,
  gold_price_22k DECIMAL(10,2),
  gold_price_24k DECIMAL(10,2),
  gold_price_18k DECIMAL(10,2),
  publish_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true,
  is_indexed BOOLEAN DEFAULT false,
  indexing_requested_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create site files management table (sitemap, robots.txt, llms.txt)
CREATE TABLE IF NOT EXISTS public.site_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  auto_update BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexing queue table
CREATE TABLE IF NOT EXISTS public.indexing_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  error_message TEXT,
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.automated_blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.indexing_queue ENABLE ROW LEVEL SECURITY;

-- RLS policies for automated_blog_posts (public read, admin write)
CREATE POLICY "Anyone can view published blog posts"
  ON public.automated_blog_posts FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage blog posts"
  ON public.automated_blog_posts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- RLS policies for site_files (public read, admin write)
CREATE POLICY "Anyone can view site files"
  ON public.site_files FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage site files"
  ON public.site_files FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- RLS policies for indexing_queue (admin only)
CREATE POLICY "Admins can manage indexing queue"
  ON public.indexing_queue FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX idx_automated_blog_posts_slug ON public.automated_blog_posts(slug);
CREATE INDEX idx_automated_blog_posts_city ON public.automated_blog_posts(city);
CREATE INDEX idx_automated_blog_posts_publish_date ON public.automated_blog_posts(publish_date DESC);
CREATE INDEX idx_indexing_queue_status ON public.indexing_queue(status);
CREATE INDEX idx_site_files_name ON public.site_files(file_name);

-- Update trigger for automated_blog_posts
CREATE TRIGGER update_automated_blog_posts_updated_at
  BEFORE UPDATE ON public.automated_blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial site files
INSERT INTO public.site_files (file_name, content, auto_update) VALUES
  ('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', true),
  ('robots.txt', 'User-agent: *\nAllow: /\nSitemap: https://chennaigoldprice.com/sitemap.xml', true),
  ('llms.txt', '# Chennai Gold Price - AI Training Data\n\nThis site provides real-time gold prices for Tamil Nadu.', true)
ON CONFLICT (file_name) DO NOTHING;