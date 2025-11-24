-- Create ad_analytics table for tracking daily performance
CREATE TABLE IF NOT EXISTS public.ad_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ad_id UUID NOT NULL REFERENCES public.ads(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(ad_id, date)
);

-- Enable RLS
ALTER TABLE public.ad_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can view all analytics"
  ON public.ad_analytics
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert analytics"
  ON public.ad_analytics
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update analytics"
  ON public.ad_analytics
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Function to record daily ad stats
CREATE OR REPLACE FUNCTION public.record_ad_daily_stats()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.ad_analytics (ad_id, date, impressions, clicks)
  SELECT 
    id,
    CURRENT_DATE,
    impression_count,
    click_count
  FROM public.ads
  ON CONFLICT (ad_id, date) 
  DO UPDATE SET
    impressions = EXCLUDED.impressions,
    clicks = EXCLUDED.clicks;
END;
$$;