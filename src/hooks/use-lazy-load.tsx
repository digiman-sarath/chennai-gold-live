import { useState, useEffect, useRef, ReactNode } from 'react';

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useLazyLoad(options: UseLazyLoadOptions = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '100px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return { ref, isInView };
}

interface LazyComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  rootMargin?: string;
}

export function LazyComponent({ 
  children, 
  fallback = null,
  className = '',
  rootMargin = '200px'
}: LazyComponentProps) {
  const { ref, isInView } = useLazyLoad({ rootMargin });

  return (
    <div ref={ref} className={className}>
      {isInView ? children : fallback}
    </div>
  );
}

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export function LazyImage({ src, alt, className = '', width, height }: LazyImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      width={width}
      height={height}
    />
  );
}
