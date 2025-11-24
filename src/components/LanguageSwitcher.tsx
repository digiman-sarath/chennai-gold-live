import { useState } from 'react';
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

export const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

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
