import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Store, Phone, Mail, MapPin, Star, Globe, Calendar } from 'lucide-react';

interface Jeweler {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string | null;
  email: string | null;
  rating: number | null;
  specialties: string[] | null;
  established_year: number | null;
  description: string | null;
  website: string | null;
}

interface JewelerDirectoryProps {
  city: string;
}

const JewelerDirectory = ({ city }: JewelerDirectoryProps) => {
  const [jewelers, setJewelers] = useState<Jeweler[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJewelers();
  }, [city]);

  const fetchJewelers = async () => {
    try {
      const { data, error } = await supabase
        .from('jewelers')
        .select('*')
        .eq('city', city.toLowerCase())
        .order('rating', { ascending: false });

      if (error) throw error;
      setJewelers(data || []);
    } catch (error) {
      console.error('Error fetching jewelers:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="h-4 w-4 fill-amber-400 text-amber-400" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-amber-400 text-amber-400 opacity-50" />
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-muted" />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-muted rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (jewelers.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          No jewelers listed for this city yet. Check back soon!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {jewelers.map((jeweler) => (
        <Card key={jeweler.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2 flex items-center gap-2">
                  <Store className="h-5 w-5 text-primary" />
                  {jeweler.name}
                </CardTitle>
                {jeweler.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(jeweler.rating)}</div>
                    <span className="text-sm font-semibold text-foreground">
                      {jeweler.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
              {jeweler.established_year && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  <Calendar className="h-3 w-3" />
                  Est. {jeweler.established_year}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            {jeweler.description && (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {jeweler.description}
              </p>
            )}

            {jeweler.specialties && jeweler.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {jeweler.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            )}

            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{jeweler.address}</span>
              </div>

              {jeweler.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <a
                    href={`tel:${jeweler.phone}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {jeweler.phone}
                  </a>
                </div>
              )}

              {jeweler.email && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <a
                    href={`mailto:${jeweler.email}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {jeweler.email}
                  </a>
                </div>
              )}

              {jeweler.website && (
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="h-4 w-4 text-primary flex-shrink-0" />
                  <a
                    href={jeweler.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors underline"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JewelerDirectory;
