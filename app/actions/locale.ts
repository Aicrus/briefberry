"use server";

import { cookies } from "next/headers";

const LOCALE_COOKIE = "NEXT_LOCALE";
const VALID_LOCALES = ["en", "pt", "es"] as const;

export type Locale = (typeof VALID_LOCALES)[number];

export async function setLocale(locale: string) {
    if (!VALID_LOCALES.includes(locale as Locale)) return;
    const store = await cookies();
    store.set(LOCALE_COOKIE, locale, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: "lax",
    });
}
