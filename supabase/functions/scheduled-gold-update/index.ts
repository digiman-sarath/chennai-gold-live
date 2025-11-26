import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting scheduled gold price update...');
    
    const SUPABASE_URL = Deno.env.get('VITE_SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!SUPABASE_URL) {
      throw new Error('Missing VITE_SUPABASE_URL environment variable');
    }
    
    if (!SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
    }

    // Call the update-gold-price function
    const updateResponse = await fetch(`${SUPABASE_URL}/functions/v1/update-gold-price`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    });

    if (!updateResponse.ok) {
      const error = await updateResponse.text();
      console.error('Failed to update gold prices:', error);
      throw new Error(`Update failed: ${error}`);
    }

    const result = await updateResponse.json();
    console.log('Gold price update completed:', result);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Gold prices updated successfully',
        data: result
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in scheduled update:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: 'Failed to update gold prices via scheduled task'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
