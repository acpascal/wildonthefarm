import { defaultLocale, languages, ui, type Locale, type UiKey } from './ui';

const locales = Object.keys(languages) as Locale[];

export function getLocaleFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/');
  return locales.includes(maybeLocale as Locale) ? (maybeLocale as Locale) : defaultLocale;
}

export function useTranslations(locale: Locale) {
  return function t(key: UiKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key];
  };
}

export function mailtoHref(email: string, locale: Locale): string {
  const t = useTranslations(locale);
  const subject = encodeURIComponent(t('reserve.emailSubject'));
  const body = encodeURIComponent(t('reserve.emailBody').replace(/\n/g, '\r\n'));
  return `mailto:${email}?subject=${subject}&body=${body}`;
}
