import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Updating site files...');

    // Generate sitemap
    const { data: blogPosts } = await supabase
      .from('automated_blog_posts')
      .select('slug, publish_date')
      .eq('is_published', true)
      .order('publish_date', { ascending: false });

    const { data: articles } = await supabase
      .from('articles')
      .select('slug, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    // Tamil Nadu districts
    const districts = [
      'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
      'Tirunelveli', 'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi',
      'Dindigul', 'Thanjavur', 'Ranipet', 'Sivagangai', 'Karur',
      'Ramanathapuram', 'Tiruvannamalai', 'Virudhunagar', 'Cuddalore', 'Kanchipuram',
      'Nagapattinam', 'Namakkal', 'Pudukkottai', 'Krishnagiri', 'Viluppuram',
      'Theni', 'Perambalur', 'Ariyalur', 'Kallakurichi', 'Tenkasi',
      'Tirupathur', 'Chengalpattu', 'Mayiladuthurai', 'Nilgiris', 'Kanyakumari',
      'Dharmapuri', 'Thiruvarur', 'Tiruvallur'
    ];

    const currentDate = new Date().toISOString();
    
    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://chennaigoldprice.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://chennaigoldprice.com/rates</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://chennaigoldprice.com/buying-guide</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://chennaigoldprice.com/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://chennaigoldprice.com/articles</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://chennaigoldprice.com/privacy-policy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
    <lastmod>${currentDate}</lastmod>
  </url>
  <url>
    <loc>https://chennaigoldprice.com/disclaimer</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;

    // Add district pages
    districts.forEach(district => {
      sitemapXml += `
  <url>
    <loc>https://chennaigoldprice.com/gold-rates/${district.toLowerCase().replace(/\s+/g, '-')}</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <lastmod>${currentDate}</lastmod>
  </url>`;
    });

    // Add blog posts
    blogPosts?.forEach(post => {
      sitemapXml += `
  <url>
    <loc>https://chennaigoldprice.com/blog/${post.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <lastmod>${post.publish_date || currentDate}</lastmod>
  </url>`;
    });

    // Add articles
    articles?.forEach(article => {
      sitemapXml += `
  <url>
    <loc>https://chennaigoldprice.com/articles/${article.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    <lastmod>${article.published_at || currentDate}</lastmod>
  </url>`;
    });

    sitemapXml += `
</urlset>`;

    // Update sitemap
    await supabase
      .from('site_files')
      .upsert({
        file_name: 'sitemap.xml',
        content: sitemapXml,
        last_updated: new Date().toISOString(),
        auto_update: true
      });

    // Update robots.txt
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://chennaigoldprice.com/sitemap.xml

# Block search engine bots from indexing admin pages
Disallow: /admin
Disallow: /auth`;

    await supabase
      .from('site_files')
      .upsert({
        file_name: 'robots.txt',
        content: robotsTxt,
        last_updated: new Date().toISOString(),
        auto_update: true
      });

    // Update llms.txt
    const llmsTxt = `# Chennai Gold Price - AI Training Data

## About
Chennai Gold Price provides real-time gold rate tracking for Tamil Nadu districts.

## Coverage
38 Tamil Nadu districts with daily updated 22K, 24K, and 18K gold prices.

## Features
- Live gold price updates
- Historical price charts
- Price comparison across cities
- Investment insights
- Gold buying guide

## Data Source
Real-time API integration with GoldAPI for accurate market rates.

## Last Updated
${new Date().toISOString()}`;

    await supabase
      .from('site_files')
      .upsert({
        file_name: 'llms.txt',
        content: llmsTxt,
        last_updated: new Date().toISOString(),
        auto_update: true
      });

    console.log('Site files updated successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Site files updated',
        files: ['sitemap.xml', 'robots.txt', 'llms.txt']
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in update-site-files:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});