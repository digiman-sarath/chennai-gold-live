-- Enable realtime for ads table
ALTER PUBLICATION supabase_realtime ADD TABLE public.ads;

-- Enable realtime for ad_analytics table
ALTER PUBLICATION supabase_realtime ADD TABLE public.ad_analytics;