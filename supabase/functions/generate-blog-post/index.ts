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

    const citySlug = city.toLowerCase().replace(/\s+/g, '-');
    
    const prompt = `Write a comprehensive, engaging, and highly readable SEO-optimized blog post about gold prices in ${city}, Tamil Nadu for ${currentDate}.

Current Gold Prices:
- 22K Gold: ₹${gold_prices.price_22k} per gram
- 24K Gold: ₹${gold_prices.price_24k} per gram
- 18K Gold: ₹${gold_prices.price_18k} per gram

CONTENT REQUIREMENTS:
1. Minimum 1500+ words of high-quality, human-readable content
2. Write in a conversational yet authoritative tone
3. Use short paragraphs (2-3 sentences max) for better readability
4. Include bullet points and numbered lists for easy scanning

SEO OPTIMIZATION:
1. SEO Title: Exactly 60 characters including the date
2. Meta Description: 155 characters max with call-to-action
3. Primary Keywords: gold rate ${city}, ${city} gold price today, gold rate in ${city} Tamil Nadu
4. Secondary Keywords: gold jewelry price, gold ornaments rate, gold bar price, gold coin rate
5. Semantic/LSI Keywords: yellow metal, precious metal investment, bullion, hallmarked gold, BIS gold, 916 gold, 750 gold
6. Long-tail Keywords: best time to buy gold in ${city}, gold rate forecast ${city}, cheap gold shops ${city}

CONTENT STRUCTURE (Include ALL sections):
1. **Introduction** - Hook readers with current market sentiment
2. **Today's Gold Rate Summary** - Quick reference table format
3. **Live Price Analysis** - Why prices are at current levels
4. **${city} Gold Market Overview** - Local market characteristics
5. **Price Comparison** - 22K vs 24K vs 18K differences explained
6. **Historical Price Trends** - Last 7-day movement
7. **Factors Affecting Gold Prices** - Global and local factors
8. **Investment Tips for ${city} Buyers** - Practical advice
9. **Best Jewelers in ${city}** - Where to buy authentic gold
10. **Making Charges Guide** - What to expect in ${city}
11. **GST and Tax Information** - Current tax rates
12. **FAQ Section** - Must include 8-10 FAQs with detailed answers

FAQ REQUIREMENTS (Programmatic SEO):
Include these FAQ patterns with ${city}-specific answers:
- What is the gold rate in ${city} today?
- Is ${city} gold rate same as Chennai?
- What is the 22 carat gold price in ${city} per gram?
- What is the 24 carat gold price in ${city} today?
- Where can I buy gold in ${city}?
- What is the making charge for gold jewelry in ${city}?
- Is it good time to buy gold in ${city}?
- How to check gold purity in ${city}?
- What is hallmarked gold rate in ${city}?
- Which is the best gold shop in ${city}?

INTERNAL LINKING (Mandatory - add naturally throughout):
- Link to ${city} gold rates: <a href="/gold-rates/${citySlug}" rel="dofollow">${city} Gold Rates</a>
- Link to homepage: <a href="/" rel="dofollow">Chennai Gold Price</a>
- Link to buying guide: <a href="/buying-guide" rel="dofollow">Gold Buying Guide</a>
- Link to nearby cities like <a href="/gold-rates/chennai" rel="dofollow">Chennai</a>, <a href="/gold-rates/coimbatore" rel="dofollow">Coimbatore</a>, <a href="/gold-rates/madurai" rel="dofollow">Madurai</a>
- Include at least 8-10 internal links spread throughout the content

LLM & AI READABILITY:
- Use clear, structured headings (H2, H3)
- Include summary boxes for key information
- Add "Key Takeaways" section
- Use schema-friendly formatting

OUTPUT FORMAT - Return valid JSON only:
{
  "title": "Full blog title with city name and date",
  "seo_title": "60 char max SEO title with date",
  "seo_description": "155 char meta description with CTA",
  "seo_keywords": "comma separated keywords",
  "excerpt": "200 char excerpt for previews",
  "content": "Full HTML content with all sections, FAQs, and internal links",
  "faqs": [{"question": "FAQ question", "answer": "Detailed answer"}]
}`;

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