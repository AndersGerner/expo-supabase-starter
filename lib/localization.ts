import { da } from '@/translations/da';
import { en } from '@/translations/en';
import { TranslationKeys } from '@/types/translationKeys';
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

const i18n = new I18n({});
// Set the key-value pairs for the different languages
i18n.translations = {
  en,
  da,
};

// Set the locale once at the beginning of your app.
const deviceLanguage = getLocales()[0].languageCode;
i18n.locale = deviceLanguage;

// Enable fallbacks for missing translations
i18n.enableFallback = true;

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode;

export const t = (key: TranslationKeys) => i18n.t(key);
