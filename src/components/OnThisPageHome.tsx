import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const OnThisPageHome = () => {
  const sections = [
    { id: 'current-rates', label: 'Today 22 Carat Gold Price Per Gram in Chennai (INR)' },
    { id: 'current-rates', label: 'Today 24 Carat Gold Rate Per Gram in Chennai (INR)' },
    { id: 'last-10-days', label: 'Gold Rate in Chennai for Last 10 Days (1 gram)' },
    { id: 'average-comparison', label: 'Weekly & Monthly Average of Gold Price in Chennai' },
    { id: 'historical-price', label: 'Historical Price of Gold Rate in Chennai' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">On this page</CardTitle>
      </CardHeader>
      <CardContent>
        <nav>
          <ul className="space-y-2">
            {sections.map((section, index) => (
              <li key={index}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-left w-full"
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </CardContent>
    </Card>
  );
};
