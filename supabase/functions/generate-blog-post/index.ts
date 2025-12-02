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

    // Verify admin role
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabase.auth.getUser(token);
    
    if (!user) {
      throw new Error('Unauthorized');
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (!roleData || roleData.role !== 'admin') {
      throw new Error('Unauthorized: Admin access required');
    }

    const { city, gold_prices } = await req.json();
    
    console.log(`Generating blog post for ${city}`);

    // Fetch current date
    const currentDate = new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    });

    const prompt = `Write a comprehensive 5000+ word SEO-optimized blog post about gold prices in ${city}, Tamil Nadu for ${currentDate}.

Current Gold Prices:
- 22K Gold: ₹${gold_prices.price_22k} per gram
- 24K Gold: ₹${gold_prices.price_24k} per gram
- 18K Gold: ₹${gold_prices.price_18k} per gram

Requirements:
1. Use LLMO (Long-form, Location-based, Modular, Optimized) strategy
2. Include AEO (Answer Engine Optimization) elements
3. SEO Title: Exactly 60 characters including "${currentDate}"
4. Meta Description: 155 characters max
5. Keywords: gold rate, ${city}, Tamil Nadu, today's price, 22K, 24K, 18K
6. Include sections on:
   - Current market trends
   - Price factors affecting ${city} market
   - Investment advice
   - Comparison with other Tamil Nadu cities
   - Best time to buy analysis
7. Natural internal linking opportunities to other city pages
8. Format output as JSON with: title, seo_title, seo_description, seo_keywords, excerpt (200 chars), content (full HTML)`;

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are an expert SEO content writer specializing in financial and commodity markets. Generate detailed, well-researched content with proper HTML formatting.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API Error:', aiResponse.status, errorText);
      throw new Error(`AI generation failed: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const generatedContent = aiData.choices[0].message.content;
    
    console.log('AI generated content, parsing JSON...');
    
    // Extract JSON from markdown code blocks if present
    let jsonContent = generatedContent;
    const jsonMatch = generatedContent.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      jsonContent = jsonMatch[1];
    }
    
    const blogData = JSON.parse(jsonContent);

    // Generate slug
    const slug = `${city.toLowerCase().replace(/\s+/g, '-')}-gold-rate-${new Date().toISOString().split('T')[0]}`;

    // Insert blog post
    const { data: blogPost, error: insertError } = await supabase
      .from('automated_blog_posts')
      .insert({
        title: blogData.title,
        slug: slug,
        content: blogData.content,
        excerpt: blogData.excerpt,
        seo_title: blogData.seo_title,
        seo_description: blogData.seo_description,
        seo_keywords: blogData.seo_keywords,
        city: city,
        gold_price_22k: gold_prices.price_22k,
        gold_price_24k: gold_prices.price_24k,
        gold_price_18k: gold_prices.price_18k,
        is_published: true,
        publish_date: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) throw insertError;

    console.log(`Blog post created: ${blogPost.id}`);

    // Add to indexing queue
    const blogUrl = `https://chennaigoldprice.com/blog/${slug}`;
    await supabase
      .from('indexing_queue')
      .insert({
        url: blogUrl,
        status: 'pending'
      });

    console.log(`Added to indexing queue: ${blogUrl}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        blogPost,
        message: 'Blog post generated and queued for indexing' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-blog-post:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});