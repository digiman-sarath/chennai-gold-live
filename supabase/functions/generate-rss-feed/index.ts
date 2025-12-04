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
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    console.log('Generating RSS feed with gold news...');

    // Fetch published blog posts
    const { data: blogPosts, error: blogError } = await supabase
      .from('automated_blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('publish_date', { ascending: false })
      .limit(30);

    if (blogError) throw blogError;

    // Fetch published articles
    const { data: articles, error: articleError } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(20);

    if (articleError) console.log('No articles found or error:', articleError);

    // Fetch latest gold prices for news items
    const { data: goldPrices } = await supabase
      .from('gold_prices')
      .select('*')
      .order('date', { ascending: false })
      .limit(1)
      .single();

    const buildDate = new Date().toUTCString();
    const today = new Date().toLocaleDateString('en-IN', { 
      year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' 
    });
    
    let rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Chennai Gold Price - Live Gold Rates &amp; News in Tamil Nadu</title>
    <link>https://chennaigoldprice.com</link>
    <description>Real-time gold price updates, market analysis, and investment insights for Tamil Nadu. Get today's 22K, 24K, and 18K gold rates with latest gold news.</description>
    <language>en-IN</language>
    <copyright>Copyright ${new Date().getFullYear()} Chennai Gold Price</copyright>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <ttl>60</ttl>
    <atom:link href="https://chennaigoldprice.com/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>https://chennaigoldprice.com/favicon.ico</url>
      <title>Chennai Gold Price</title>
      <link>https://chennaigoldprice.com</link>
    </image>
    <category>Finance</category>
    <category>Gold</category>
    <category>Investment</category>
    <category>Tamil Nadu</category>`;

    // Add daily gold price news item
    if (goldPrices) {
      const priceDate = new Date().toUTCString();
      rssXml += `
    <item>
      <title><![CDATA[Gold Price Update ${today}: 22K at ₹${goldPrices.price_22k_per_gram}/gram, 24K at ₹${goldPrices.price_24k_per_gram}/gram]]></title>
      <link>https://chennaigoldprice.com</link>
      <description><![CDATA[Today's gold rates in Chennai: 22 Karat gold is priced at ₹${goldPrices.price_22k_per_gram} per gram, 24 Karat (999 fine gold) at ₹${goldPrices.price_24k_per_gram} per gram, and 18 Karat at ₹${goldPrices.price_18k_per_gram || Math.round(goldPrices.price_24k_per_gram * 0.75)} per gram. Check live rates for all Tamil Nadu districts.]]></description>
      <pubDate>${priceDate}</pubDate>
      <guid isPermaLink="false">gold-price-update-${new Date().toISOString().split('T')[0]}</guid>
      <category>Gold Rates</category>
      <category>Daily Update</category>
    </item>`;
    }

    // Add blog posts
    blogPosts?.forEach(post => {
      const pubDate = new Date(post.publish_date).toUTCString();
      const link = `https://chennaigoldprice.com/blog/${post.slug}`;
      
      const description = post.excerpt || post.content
        .replace(/<[^>]*>/g, '')
        .substring(0, 400) + '...';

      rssXml += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${link}</guid>
      <category>${post.city || 'Gold Rates'}</category>
      <category>Tamil Nadu</category>
      <category>Gold Price Analysis</category>
    </item>`;
    });

    // Add articles
    articles?.forEach(article => {
      const pubDate = new Date(article.published_at || article.created_at).toUTCString();
      const link = `https://chennaigoldprice.com/articles/${article.slug}`;
      
      const description = article.excerpt || article.content
        .replace(/<[^>]*>/g, '')
        .substring(0, 400) + '...';

      rssXml += `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${link}</link>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${link}</guid>
      <category>Gold News</category>
      <category>Investment Tips</category>
    </item>`;
    });

    rssXml += `
  </channel>
</rss>`;

    // Store RSS feed in site_files
    const { error: upsertError } = await supabase
      .from('site_files')
      .upsert({
        file_name: 'rss.xml',
        content: rssXml,
        last_updated: new Date().toISOString(),
        auto_update: true
      }, { onConflict: 'file_name' });

    if (upsertError) console.log('Error upserting RSS:', upsertError);

    console.log('RSS feed generated successfully with', blogPosts?.length || 0, 'blog posts and', articles?.length || 0, 'articles');

    return new Response(rssXml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/rss+xml; charset=utf-8',
      },
    });

  } catch (error) {
    console.error('Error in generate-rss-feed:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});