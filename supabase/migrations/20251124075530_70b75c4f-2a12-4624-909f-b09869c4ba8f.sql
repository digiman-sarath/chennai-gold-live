-- Create jewelers table
CREATE TABLE public.jewelers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  rating NUMERIC(2,1) CHECK (rating >= 0 AND rating <= 5),
  specialties TEXT[],
  established_year INTEGER,
  description TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.jewelers ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view jewelers
CREATE POLICY "Jewelers are viewable by everyone" 
ON public.jewelers 
FOR SELECT 
USING (true);

-- Only admins can insert jewelers
CREATE POLICY "Admins can insert jewelers" 
ON public.jewelers 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update jewelers
CREATE POLICY "Admins can update jewelers" 
ON public.jewelers 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete jewelers
CREATE POLICY "Admins can delete jewelers" 
ON public.jewelers 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_jewelers_updated_at
BEFORE UPDATE ON public.jewelers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample jewelers for each city
INSERT INTO public.jewelers (name, city, address, phone, rating, specialties, established_year, description) VALUES
('GRT Jewellers', 'chennai', 'No. 132, Usman Road, T. Nagar, Chennai - 600017', '+91-44-24343434', 4.5, ARRAY['Traditional', 'Temple Jewelry', 'Diamond'], 1964, 'One of South India''s most trusted jewelers, known for authentic temple jewelry and traditional designs.'),
('Lalitha Jewellery', 'chennai', 'No. 5, Usman Road, T. Nagar, Chennai - 600017', '+91-44-28151515', 4.7, ARRAY['Traditional', 'Antique', 'Bridal'], 1970, 'Renowned for exquisite craftsmanship and traditional South Indian gold jewelry.'),
('Prince Jewellery', 'chennai', 'No. 15, Ranganathan Street, T. Nagar, Chennai - 600017', '+91-44-24337777', 4.6, ARRAY['Modern', 'Traditional', 'Diamond'], 1990, 'Offers a perfect blend of traditional and contemporary gold jewelry designs.'),

('Pothys Jewellery', 'coimbatore', 'DB Road, RS Puram, Coimbatore - 641002', '+91-422-2474747', 4.5, ARRAY['Traditional', 'Bridal', 'Temple Jewelry'], 1968, 'Trusted family jeweler known for quality gold ornaments and traditional South Indian designs.'),
('NAC Jewellers', 'coimbatore', 'Oppanakara Street, Coimbatore - 641001', '+91-422-2393939', 4.4, ARRAY['Diamond', 'Platinum', 'Modern'], 1985, 'Modern showroom offering contemporary designs alongside traditional jewelry.'),

('Bhima Jewellers', 'erode', 'Brough Road, Erode - 638001', '+91-424-2255555', 4.3, ARRAY['Traditional', 'Modern', 'Bridal'], 1925, 'Heritage jeweler with almost a century of trusted service in Erode.'),

('Saravana Stores Jewellery', 'salem', 'Cherry Road, Salem - 636001', '+91-427-2314444', 4.4, ARRAY['Traditional', 'Temple Jewelry', 'Bridal'], 1975, 'Reliable jeweler offering authentic temple jewelry and wedding collections.'),

('Thangamayil Jewellery', 'madurai', 'Town Hall Road, Madurai - 625001', '+91-452-2344444', 4.6, ARRAY['Temple Jewelry', 'Antique', 'Traditional'], 1958, 'Famous for authentic Madurai temple jewelry and traditional designs.'),
('Muthu Jewellery', 'madurai', 'West Masi Street, Madurai - 625001', '+91-452-2377777', 4.5, ARRAY['Traditional', 'Bridal', 'Gold Coins'], 1980, 'Trusted name for traditional South Indian gold jewelry in Madurai.'),

('Joyalukkas', 'trichy', 'NSB Road, Trichy - 620001', '+91-431-2411111', 4.5, ARRAY['Diamond', 'Platinum', 'Traditional'], 1987, 'International jeweler with extensive gold and diamond collections.'),
('Sri Krishna Jewellers', 'trichy', 'Big Bazaar Street, Trichy - 620001', '+91-431-2466666', 4.3, ARRAY['Traditional', 'Temple Jewelry', 'Bridal'], 1972, 'Local favorite for traditional temple jewelry and bridal collections.');