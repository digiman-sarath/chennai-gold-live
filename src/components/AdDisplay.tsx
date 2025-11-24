import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { X } from 'lucide-react';

interface Ad {
  id: string;
  title: string;
  image_url: string;
  link_url: string | null;
  position: 'top_banner' | 'sidebar' | 'in_content' | 'bottom_banner' | 'mobile_sticky';
  priority: number;
}

interface AdDisplayProps {
  position: Ad['position'];
  className?: string;
}

const AdDisplay = ({ position, className = '' }: AdDisplayProps) => {
  const [ad, setAd] = useState<Ad | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileStickyDismissed, setIsMobileStickyDismissed] = useState(false);
  const impressionTracked = useRef(false);

  useEffect(() => {
    fetchAd();

    // Subscribe to real-time updates for ads
    const channel = supabase
      .channel('ads-display-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ads'
        },
        (payload) => {
          console.log('Ad updated:', payload);
          // Refresh if it affects current position
          if (payload.new && (payload.new as any).position === position) {
            fetchAd();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [position]);

  useEffect(() => {
    // Track impression when ad is loaded
    if (ad && !impressionTracked.current) {
      trackImpression(ad.id);
      impressionTracked.current = true;
    }
  }, [ad]);

  const fetchAd = async () => {
    try {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('position', position)
        .eq('is_active', true)
        .or(`start_date.is.null,start_date.lte.${new Date().toISOString()}`)
        .or(`end_date.is.null,end_date.gte.${new Date().toISOString()}`)
        .order('priority', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setAd(data);
    } catch (error) {
      console.error('Error fetching ad:', error);
    }
  };

  const trackImpression = async (adId: string) => {
    try {
      await supabase.rpc('increment_ad_impression', { ad_id: adId });
    } catch (error) {
      console.error('Error tracking impression:', error);
    }
  };

  const trackClick = async (adId: string) => {
    try {
      await supabase.rpc('increment_ad_click', { ad_id: adId });
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  const handleAdClick = () => {
    if (ad) {
      trackClick(ad.id);
      if (ad.link_url) {
        window.open(ad.link_url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const handleDismiss = () => {
    if (position === 'mobile_sticky') {
      setIsMobileStickyDismissed(true);
      setIsVisible(false);
    }
  };

  if (!ad || !isVisible || (position === 'mobile_sticky' && isMobileStickyDismissed)) {
    return null;
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'top_banner':
        return 'w-full max-w-6xl mx-auto mb-4';
      case 'sidebar':
        return 'w-full sticky top-4';
      case 'in_content':
        return 'w-full my-8';
      case 'bottom_banner':
        return 'w-full max-w-6xl mx-auto mt-4';
      case 'mobile_sticky':
        return 'fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t shadow-lg';
      default:
        return '';
    }
  };

  return (
    <div className={`${getPositionClasses()} ${className}`}>
      <div className="relative group">
        {position === 'mobile_sticky' && (
          <button
            onClick={handleDismiss}
            className="absolute -top-2 right-2 z-10 bg-background border rounded-full p-1 shadow-md"
            aria-label="Close ad"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        
        <div
          className="cursor-pointer overflow-hidden rounded-lg"
          onClick={handleAdClick}
        >
          <img
            src={ad.image_url}
            alt={ad.title}
            className="w-full h-auto object-cover transition-transform hover:scale-105"
          />
        </div>

        <div className="text-xs text-muted-foreground text-center mt-1">
          Advertisement
        </div>
      </div>
    </div>
  );
};

export default AdDisplay;