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

    console.log('Generating RSS feed...');

    // Fetch published blog posts
    const { data: blogPosts, error } = await supabase
      .from('automated_blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('publish_date', { ascending: false })
      .limit(50);

    if (error) throw error;

    const buildDate = new Date().toUTCString();
    
    let rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Chennai Gold Price - Latest Gold Rates in Tamil Nadu</title>
    <link>https://chennaigoldprice.com</link>
    <description>Real-time gold price updates for Tamil Nadu districts. Get today's 22K, 24K, and 18K gold rates with market insights.</description>
    <language>en-IN</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="https://chennaigoldprice.com/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>https://chennaigoldprice.com/gold-logo.png</url>
      <title>Chennai Gold Price</title>
      <link>https://chennaigoldprice.com</link>
    </image>`;

    blogPosts?.forEach(post => {
      const pubDate = new Date(post.publish_date).toUTCString();
      const link = `https://chennaigoldprice.com/blog/${post.slug}`;
      
      // Clean HTML content for description
      const description = post.excerpt || post.content
        .replace(/<[^>]*>/g, '')
        .substring(0, 300) + '...';

      rssXml += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${link}</guid>
      <category>${post.city || 'Gold Rates'}</category>
    </item>`;
    });

    rssXml += `
  </channel>
</rss>`;

    // Store RSS feed in site_files
    await supabase
      .from('site_files')
      .upsert({
        file_name: 'rss.xml',
        content: rssXml,
        last_updated: new Date().toISOString(),
        auto_update: true
      });

    console.log('RSS feed generated successfully');

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