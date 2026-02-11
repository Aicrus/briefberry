"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Select from "@/components/Select";
import Icon from "@/components/Icon";
import { setLocale, type Locale } from "@/app/actions/locale";

const LOCALES: { value: Locale; labelKey: "en" | "pt" | "es" }[] = [
    { value: "en", labelKey: "en" },
    { value: "pt", labelKey: "pt" },
    { value: "es", labelKey: "es" },
];

const LanguageSwitcher = () => {
    const t = useTranslations("language");
    const locale = useLocale();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const options = LOCALES.map((l, id) => ({ id, name: t(l.labelKey) }));
    const currentOption =
        options[LOCALES.findIndex((l) => l.value === locale)] ?? options[0];

    const handleChange = (option: { id: number; name: string }) => {
        const newLocale = LOCALES[option.id]?.value;
        if (!newLocale || newLocale === locale) return;
        startTransition(async () => {
            await setLocale(newLocale);
            router.refresh();
        });
    };

    if (!mounted) {
        return (
            <div
                className="min-w-32 max-md:min-w-28 h-10 min-h-10 pl-4 pr-3 flex justify-between items-center rounded-full bg-b-surface2 text-button text-t-secondary"
                aria-hidden
            >
                <span>{currentOption.name}</span>
                <Icon className="shrink-0 ml-3 fill-t-secondary" name="chevron" />
            </div>
        );
    }

    return (
        <Select
            className="min-w-32 max-md:min-w-28"
            classButton="h-10 min-h-10 pl-4 pr-3 text-hairline"
            value={currentOption}
            onChange={handleChange}
            options={options}
            disabled={isPending}
            aria-label={t("label")}
        />
    );
};

export default LanguageSwitcher;
