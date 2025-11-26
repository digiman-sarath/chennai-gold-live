-- Create table for district content variations
CREATE TABLE public.district_content_variations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  district_name TEXT NOT NULL,
  variation_text TEXT NOT NULL,
  season_tag TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  priority INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_district_content_district ON public.district_content_variations(district_name);
CREATE INDEX idx_district_content_active ON public.district_content_variations(is_active);

-- Enable RLS
ALTER TABLE public.district_content_variations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view active content variations"
ON public.district_content_variations
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can view all content variations"
ON public.district_content_variations
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert content variations"
ON public.district_content_variations
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update content variations"
ON public.district_content_variations
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete content variations"
ON public.district_content_variations
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_district_content_updated_at
BEFORE UPDATE ON public.district_content_variations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();