import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "ja", "zh-Hant"] as const;
const defaultLocale = "en";
const localeCookieName = "locale";

type Locale = (typeof locales)[number];

function resolveLocale(value: string | undefined): Locale {
  if (value && locales.includes(value as Locale)) {
    return value as Locale;
  }

  return defaultLocale;
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeFromCookie = cookieStore.get(localeCookieName)?.value;
  const locale = resolveLocale(localeFromCookie);

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
