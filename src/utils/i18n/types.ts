export type Language = 'zh' | 'en';

export interface TranslationText {
  zh: string;
  en: string;
}

export type TranslationValues = Record<string, string | number>;

export interface I18nContextType {
  currentLanguage: Language;
  t: (text: TranslationText, values?: TranslationValues) => string;
  setLanguage: (lang: Language) => void;
}
