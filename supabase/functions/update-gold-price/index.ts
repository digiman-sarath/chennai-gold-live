import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Currency conversion rate (approximate - Gold API provides USD rates)
// For more accurate conversion, you could integrate a currency API
const USD_TO_INR = 83.5;

// Conversion factors for gold purity
// GoldAPI provides 24K (999.9 fineness) prices
const K24_TO_K22_RATIO = 0.9167; // 22K is 91.67% pure

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const goldApiKey = Deno.env.get('GOLD_API_KEY');
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (!goldApiKey) {
      console.error('GOLD_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Gold API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching live gold prices from GoldAPI...');

    // Fetch current gold price from GoldAPI (XAU = Gold, INR = Indian Rupee)
    // GoldAPI provides price per troy ounce, we need to convert to gram
    const goldApiResponse = await fetch('https://www.goldapi.io/api/XAU/INR', {
      headers: {
        'x-access-token': goldApiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!goldApiResponse.ok) {
      const errorText = await goldApiResponse.text();
      console.error('GoldAPI error response:', errorText);
      throw new Error(`GoldAPI request failed: ${goldApiResponse.status} - ${errorText}`);
    }

    const goldData = await goldApiResponse.json();
    console.log('GoldAPI response:', goldData);

    // Extract price per troy ounce in INR
    // 1 troy ounce = 31.1035 grams
    const pricePerOunceINR = goldData.price;
    const GRAMS_PER_TROY_OUNCE = 31.1035;
    
    // Calculate 24K price per gram in INR
    const price24kPerGram = Math.round(pricePerOunceINR / GRAMS_PER_TROY_OUNCE);
    
    // Calculate 22K price per gram (22K is 91.67% pure)
    const price22kPerGram = Math.round(price24kPerGram * K24_TO_K22_RATIO);

    console.log('Calculated prices:', {
      price_22k_per_gram: price22kPerGram,
      price_24k_per_gram: price24kPerGram,
      source: 'GoldAPI.io',
      timestamp: new Date().toISOString()
    });

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Update or insert gold price for today
    const { data, error } = await supabase
      .from('gold_prices')
      .upsert({
        date: today,
        price_22k_per_gram: price22kPerGram,
        price_24k_per_gram: price24kPerGram,
      }, {
        onConflict: 'date'
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Gold price updated successfully from live API:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data,
        source: 'GoldAPI.io - Live Market Rates',
        message: 'Gold price updated successfully from live API' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error updating gold prices:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: 'Failed to fetch or update live gold prices'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
