-- Create table for gold prices
CREATE TABLE public.gold_prices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  price_22k_per_gram DECIMAL(10, 2) NOT NULL,
  price_24k_per_gram DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gold_prices ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view gold prices)
CREATE POLICY "Gold prices are viewable by everyone" 
ON public.gold_prices 
FOR SELECT 
USING (true);

-- Create index for faster date lookups
CREATE INDEX idx_gold_prices_date ON public.gold_prices(date DESC);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_gold_prices_updated_at
BEFORE UPDATE ON public.gold_prices
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial gold prices for today
INSERT INTO public.gold_prices (date, price_22k_per_gram, price_24k_per_gram)
VALUES (CURRENT_DATE, 5850.00, 6380.00)
ON CONFLICT (date) DO NOTHING;