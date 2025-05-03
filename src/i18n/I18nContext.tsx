import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { Language, I18nContextType, TranslationText, TranslationValues } from './types';

const I18nContext = createContext<I18nContextType | null>(null);

const getInitialLanguage = (): Language => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage === 'zh' || savedLanguage === 'en') {
    return savedLanguage as Language;
  }
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('zh') ? 'zh' : 'en';
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(getInitialLanguage());

  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);

  const t = useCallback((text: TranslationText, values?: TranslationValues): string => {
    const translation = text[currentLanguage];
    
    if (!values) return translation;

    return translation.replace(/\{\{(\w+)\}\}/g, (_: string, paramKey: string) => 
      String(values[paramKey] ?? `{{${paramKey}}}`)
    );
  }, [currentLanguage]);

  const value: I18nContextType = {
    currentLanguage,
    t,
    setLanguage: setCurrentLanguage,
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
