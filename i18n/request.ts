import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "pt", "es"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
    const store = await cookies();
    const localeCookie = store.get("NEXT_LOCALE")?.value;
    const locale =
        localeCookie && locales.includes(localeCookie as Locale)
            ? (localeCookie as Locale)
            : "en";

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});
