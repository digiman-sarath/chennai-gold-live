import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TAMIL_NADU_DISTRICTS = [
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
  'Tirunelveli', 'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi',
  'Dindigul', 'Thanjavur', 'Ranipet', 'Sivagangai', 'Karur',
  'Ramanathapuram', 'Tiruvannamalai', 'Virudhunagar', 'Cuddalore', 'Kanchipuram',
  'Nagapattinam', 'Namakkal', 'Pudukkottai', 'Krishnagiri', 'Viluppuram',
  'Theni', 'Perambalur', 'Ariyalur', 'Kallakurichi', 'Tenkasi',
  'Tirupathur', 'Chengalpattu', 'Mayiladuthurai', 'Nilgiris', 'Kanyakumari',
  'Dharmapuri', 'Thiruvarur', 'Tiruvallur'
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting scheduled blog generation for all Tamil Nadu districts...');

    // Get latest gold prices
    const { data: goldPrices, error: pricesError } = await supabase
      .from('gold_prices')
      .select('*')
      .order('date', { ascending: false })
      .limit(1)
      .single();

    if (pricesError || !goldPrices) {
      throw new Error('Failed to fetch gold prices');
    }

    console.log('Current gold prices:', goldPrices);

    const results = [];
    const today = new Date().toISOString().split('T')[0];

    for (const city of TAMIL_NADU_DISTRICTS) {
      try {
        // Check if blog post already exists for today
        const slug = `${city.toLowerCase().replace(/\s+/g, '-')}-gold-rate-${today}`;
        
        const { data: existingPost } = await supabase
          .from('automated_blog_posts')
          .select('id')
          .eq('slug', slug)
          .single();

        if (existingPost) {
          console.log(`Blog post already exists for ${city} today, skipping...`);
          results.push({ city, success: true, skipped: true });
          continue;
        }

        // Generate blog post using AI
        console.log(`Generating blog post for ${city}...`);
        
        const currentDate = new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'Asia/Kolkata'
        });

        const citySlug = city.toLowerCase().replace(/\s+/g, '-');

        const prompt = `Write a comprehensive 5000+ word SEO-optimized blog post about gold prices in ${city}, Tamil Nadu for ${currentDate}.

Current Gold Prices:
- 22K Gold: ₹${goldPrices.price_22k_per_gram} per gram
- 24K Gold: ₹${goldPrices.price_24k_per_gram} per gram
- 18K Gold: ₹${goldPrices.price_18k_per_gram || Math.round(goldPrices.price_24k_per_gram * 0.75)} per gram

Requirements:
1. Use LLMO (Long-form, Location-based, Modular, Optimized) strategy
2. Include AEO (Answer Engine Optimization) elements
3. SEO Title: Exactly 60 characters including the date
4. Meta Description: 155 characters max
5. Keywords: gold rate, ${city}, Tamil Nadu, today's price, 22K, 24K, 18K
6. Include sections on: Current market trends, Price factors, Investment advice, City comparison, Best time to buy
7. Include internal links: <a href="/gold-rates/${citySlug}" rel="dofollow">${city} Gold Rates</a>, <a href="/" rel="dofollow">Chennai Gold Price</a>, <a href="/buying-guide" rel="dofollow">Gold Buying Guide</a>
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
              { role: 'system', content: 'You are an expert SEO content writer. Generate detailed content with proper HTML formatting. Return only valid JSON.' },
              { role: 'user', content: prompt }
            ],
          }),
        });

        if (!aiResponse.ok) {
          const errorText = await aiResponse.text();
          console.error(`AI API Error for ${city}:`, aiResponse.status, errorText);
          results.push({ city, success: false, error: `AI Error: ${aiResponse.status}` });
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }

        const aiData = await aiResponse.json();
        const generatedContent = aiData.choices[0].message.content;
        
        // Extract JSON from markdown code blocks if present
        let jsonContent = generatedContent;
        const jsonMatch = generatedContent.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch) {
          jsonContent = jsonMatch[1];
        }
        
        const blogData = JSON.parse(jsonContent);

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
            gold_price_22k: goldPrices.price_22k_per_gram,
            gold_price_24k: goldPrices.price_24k_per_gram,
            gold_price_18k: goldPrices.price_18k_per_gram || Math.round(goldPrices.price_24k_per_gram * 0.75),
            is_published: true,
            publish_date: new Date().toISOString(),
          })
          .select()
          .single();

        if (insertError) {
          console.error(`Insert error for ${city}:`, insertError);
          results.push({ city, success: false, error: insertError.message });
          continue;
        }

        // Add to indexing queue
        const blogUrl = `https://chennaigoldprice.com/blog/${slug}`;
        await supabase
          .from('indexing_queue')
          .insert({
            url: blogUrl,
            status: 'pending'
          });

        console.log(`Successfully generated blog for ${city}: ${blogPost.id}`);
        results.push({ city, success: true, postId: blogPost.id });

        // Wait between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 3000));
        
      } catch (error) {
        console.error(`Error generating blog for ${city}:`, error);
        results.push({ city, success: false, error: error instanceof Error ? error.message : 'Unknown error' });
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Update site files after all posts are generated
    try {
      console.log('Updating site files...');
      await supabase.functions.invoke('update-site-files');
    } catch (error) {
      console.error('Failed to update site files:', error);
    }

    const successCount = results.filter(r => r.success && !r.skipped).length;
    const skippedCount = results.filter(r => r.skipped).length;
    const failedCount = results.filter(r => !r.success).length;

    console.log(`Blog generation complete. Success: ${successCount}, Skipped: ${skippedCount}, Failed: ${failedCount}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        results,
        summary: { success: successCount, skipped: skippedCount, failed: failedCount }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in scheduled-blog-generation:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
