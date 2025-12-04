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
    const { city, blogPostId } = await req.json();
    
    console.log(`Generating featured image for ${city} gold rate blog post`);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Generate a contextual prompt for the gold rate blog image
    const imagePrompt = `Professional, elegant gold jewelry and gold bars photography for ${city}, Tamil Nadu, India. 
    Show beautiful 22K and 24K gold ornaments, traditional South Indian gold jewelry designs, gold coins and bars. 
    Golden warm lighting, premium luxury aesthetic, clean background. 
    High quality editorial style photograph suitable for a financial/gold price website header.
    16:9 aspect ratio, ultra high resolution.`;

    console.log('Generating image with prompt:', imagePrompt);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: imagePrompt
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Image generation error:', response.status, errorText);
      throw new Error(`Image generation failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Image generation response received');

    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      console.error('No image URL in response:', JSON.stringify(data));
      throw new Error('No image generated');
    }

    // If blogPostId provided, update the blog post with the image
    if (blogPostId) {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      const { error: updateError } = await supabase
        .from('automated_blog_posts')
        .update({ featured_image_url: imageUrl })
        .eq('id', blogPostId);

      if (updateError) {
        console.error('Error updating blog post:', updateError);
      } else {
        console.log('Blog post updated with featured image');
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        imageUrl,
        message: 'Image generated successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-blog-image:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
