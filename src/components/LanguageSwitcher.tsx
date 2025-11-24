import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';

type Language = 'en' | 'ta';

interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
];

const detectBrowserLanguage = (): Language => {
  // Check localStorage first
  const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
  if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
    return savedLanguage;
  }

  // Detect from browser settings
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  const langCode = browserLang.toLowerCase().split('-')[0];
  
  // Check if detected language is Tamil
  if (langCode === 'ta') {
    return 'ta';
  }
  
  // Default to English
  return 'en';
};

export const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    // Auto-detect language on component mount
    const detectedLang = detectBrowserLanguage();
    setCurrentLanguage(detectedLang);
    
    // Show notification if Tamil is detected but not yet available
    if (detectedLang === 'ta') {
      console.log('Tamil language detected from browser. Tamil version coming soon!');
    }
  }, []);

  const handleLanguageChange = (langCode: Language) => {
    setCurrentLanguage(langCode);
    
    // Store preference in localStorage
    localStorage.setItem('preferredLanguage', langCode);
    
    // Future: Navigate to translated version or trigger i18n change
    if (langCode === 'ta') {
      // TODO: Implement Tamil version navigation when available
      console.log('Tamil version coming soon!');
    }
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="gap-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLang?.nativeName}</span>
          <span className="sm:hidden">{currentLang?.code.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-background border-border z-50"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="cursor-pointer flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span className="font-medium">{lang.nativeName}</span>
              <span className="text-xs text-muted-foreground">{lang.name}</span>
            </div>
            {currentLanguage === lang.code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
