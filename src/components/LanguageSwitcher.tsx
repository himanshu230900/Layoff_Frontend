import React from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '@/locales';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = {
    en: { name: 'English', flag: '🇺🇸' },
    es: { name: 'Español', flag: '🇪🇸' },
    fr: { name: 'Français', flag: '🇫🇷' },
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
        <span>{languages[i18n.language as keyof typeof languages]?.flag}</span>
        <span>{languages[i18n.language as keyof typeof languages]?.name}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {supportedLanguages.map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`flex items-center space-x-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${
              i18n.language === lang ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
            }`}
          >
            <span>{languages[lang as keyof typeof languages]?.flag}</span>
            <span>{languages[lang as keyof typeof languages]?.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher; 