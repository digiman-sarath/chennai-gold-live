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

    const { url } = await req.json();
    
    console.log(`Processing indexing request for: ${url}`);

    // Note: Google Search Console API requires credentials
    // This is a placeholder implementation that adds to queue
    // Users need to configure GOOGLE_SEARCH_CONSOLE_CREDENTIALS secret
    
    const credentials = Deno.env.get('GOOGLE_SEARCH_CONSOLE_CREDENTIALS');
    
    if (!credentials) {
      console.log('Google Search Console credentials not configured, adding to queue only');
      
      const { error: queueError } = await supabase
        .from('indexing_queue')
        .insert({
          url: url,
          status: 'pending',
          error_message: 'Credentials not configured'
        });

      if (queueError) throw queueError;

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Added to queue. Configure GOOGLE_SEARCH_CONSOLE_CREDENTIALS secret to enable automatic indexing.' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse credentials and make API request
    const creds = JSON.parse(credentials);
    
    // Request indexing via Google Indexing API
    const indexingResponse = await fetch(
      'https://indexing.googleapis.com/v3/urlNotifications:publish',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${creds.access_token}`,
        },
        body: JSON.stringify({
          url: url,
          type: 'URL_UPDATED'
        })
      }
    );

    if (!indexingResponse.ok) {
      const errorText = await indexingResponse.text();
      console.error('Indexing API error:', indexingResponse.status, errorText);
      
      // Update queue with error
      await supabase
        .from('indexing_queue')
        .update({
          status: 'failed',
          error_message: `API Error: ${indexingResponse.status}`,
          completed_at: new Date().toISOString()
        })
        .eq('url', url);

      throw new Error(`Indexing failed: ${indexingResponse.status}`);
    }

    // Update queue as completed
    await supabase
      .from('indexing_queue')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('url', url);

    console.log(`Successfully requested indexing for: ${url}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Indexing request submitted successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in request-indexing:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});