import en from '@/app/locales/en.json';

const messages = {
  en,
};

export const getLocaleMessages = (locale) => {
  return messages[locale] || {};
};
