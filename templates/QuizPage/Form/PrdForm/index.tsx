import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Icon from "@/components/Icon";

const STEP_KEYS = [
    "prdStepLang",
    "prdStep0",
    "prdStep1",
    "prdStep2",
    "prdStep3",
    "prdStep4",
    "prdStep5",
    "prdStep6",
    "prdStep7",
    "prdStep8",
] as const;

const PLATFORM_OPTIONS = [
    { id: 0, titleKey: "platformWeb" as const, descKey: "platformWebDesc" as const, icon: "align-right" as const },
    { id: 1, titleKey: "platformMobile" as const, descKey: "platformMobileDesc" as const, icon: "mobile" as const },
    { id: 2, titleKey: "platformWebAndMobile" as const, descKey: "platformWebAndMobileDesc" as const, icon: "post" as const },
] as const;

const cardClass = (active: boolean) =>
    `w-[calc(50%-1rem)] mt-4 mx-2 px-6 py-5.5 border-[1.5px] border-stroke1 rounded-[1.25rem] text-heading font-medium! text-t-secondary fill-t-secondary hover:border-transparent hover:bg-b-surface2 hover:shadow-hover hover:text-t-primary hover:fill-t-primary cursor-pointer transition-all max-md:w-[calc(50%-0.75rem)] max-md:mt-3 max-md:mx-1.5 ${
        active ? "border-stroke-focus! text-t-primary! fill-t-primary!" : ""
    }`;

const FEATURE_KEYS = ["featAuth", "featPayments", "featUpload", "featRealtime", "featOffline", "featExternalApis"] as const;
const INTEGRATION_KEYS = ["payments", "ai", "external_api", "whatsapp"] as const;

const PrdForm = () => {
    const t = useTranslations("quiz");
    const [activeId, setActiveId] = useState(0);

    const [language, setLanguage] = useState<number | null>(null);
    const [languageOther, setLanguageOther] = useState("");
    const [platform, setPlatform] = useState<number | null>(null);
    const [webFramework, setWebFramework] = useState<number | null>(null);
    const [mobileFramework, setMobileFramework] = useState<number | null>(null);
    const [backendTech, setBackendTech] = useState<number | null>(null);
    const [authentication, setAuthentication] = useState<number | null>(null);

    const [features, setFeatures] = useState<Record<string, boolean>>({
        featAuth: true,
        featPayments: true,
        featUpload: true,
        featRealtime: true,
        featOffline: true,
        featExternalApis: true,
    });
    const [otherFeatures, setOtherFeatures] = useState("");

    const [integrations, setIntegrations] = useState<Record<string, boolean>>({
        payments: false,
        ai: false,
        external_api: false,
        whatsapp: false,
    });

    const [designSystem, setDesignSystem] = useState<number | null>(null);
    const [theme, setTheme] = useState<number | null>(null);
    const [icons, setIcons] = useState<number | null>(null);
    const [customRules, setCustomRules] = useState("");

    const totalSteps = STEP_KEYS.length;

    const handleNext = () => {
        if (activeId < totalSteps - 1) setActiveId(activeId + 1);
    };

    const handlePrevious = () => {
        if (activeId > 0) setActiveId(activeId - 1);
    };

    const toggleFeature = (key: string) => {
        setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleIntegration = (key: string) => {
        setIntegrations((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const langOptions = [
        { id: 0, key: "langPtBr" as const },
        { id: 1, key: "langEn" as const },
        { id: 2, key: "langEs" as const },
        { id: 3, key: "langMulti" as const },
        { id: 4, key: "langOther" as const },
    ];

    const webFrameworks = ["Next.js", "Nuxt.js", "Remix", "Astro", "SvelteKit"];
    const mobileFrameworks = ["Flutter", "React Native", "Expo", "Ionic", "Nativo (Swift/Kotlin)"];

    const integrationLabelKey: Record<string, string> = {
        payments: "integrationPayments",
        ai: "integrationAi",
        external_api: "integrationExternal_api",
        whatsapp: "integrationWhatsapp",
    };

    return (
        <div className="flex flex-col w-full max-w-152 max-h-200 h-full max-3xl:max-w-127 max-3xl:max-h-169 max-xl:max-w-136 max-md:max-h-full">
            <div className="flex mb-20 max-3xl:mb-12 max-2xl:mb-10 max-md:flex-col-reverse max-md:mb-8">
                <div className="grow text-h2 max-md:text-h3">
                    {t(STEP_KEYS[activeId])}
                </div>
                <div className="flex justify-center items-center shrink-0 w-16 h-7 mt-3 ml-8 border-[1.5px] border-primary2/15 bg-primary2/5 rounded-full text-button text-primary2 max-md:m-0 max-md:mb-4">
                    {activeId + 1} / {totalSteps}
                </div>
            </div>
            <div className="">
                {/* 0. Idioma */}
                {activeId === 0 && (
                    <>
                        <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                            {langOptions.map((opt) => (
                                <div
                                    key={opt.id}
                                    className={cardClass(language === opt.id)}
                                    onClick={() => setLanguage(opt.id)}
                                >
                                    <div className="">{t(opt.key)}</div>
                                </div>
                            ))}
                        </div>
                        {language === 4 && (
                            <div className="mt-6">
                                <Field
                                    label=""
                                    value={languageOther}
                                    onChange={(e) => setLanguageOther(e.target.value)}
                                    name="lang-other"
                                    placeholder={t("langPlaceholder")}
                                />
                            </div>
                        )}
                    </>
                )}

                {/* 1. Plataforma */}
                {activeId === 1 && (
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {PLATFORM_OPTIONS.map((opt) => (
                            <div
                                key={opt.id}
                                className={cardClass(platform === opt.id)}
                                onClick={() => setPlatform(opt.id)}
                            >
                                <Icon className="mb-5 fill-inherit max-3xl:mb-4" name={opt.icon} />
                                <div className="text-body-bold">{t(opt.titleKey)}</div>
                                <div className="mt-2 text-body text-t-secondary leading-snug">{t(opt.descKey)}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 2. Framework web */}
                {activeId === 2 && (
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {webFrameworks.map((name, id) => (
                            <div
                                key={id}
                                className={cardClass(webFramework === id)}
                                onClick={() => setWebFramework(id)}
                            >
                                <div className="">{name}</div>
                            </div>
                        ))}
                        <div
                            className={cardClass(webFramework === webFrameworks.length)}
                            onClick={() => setWebFramework(webFrameworks.length)}
                        >
                            <div className="">{t("other")}</div>
                        </div>
                    </div>
                )}

                {/* 3. Framework mobile */}
                {activeId === 3 && (
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {mobileFrameworks.map((name, id) => (
                            <div
                                key={id}
                                className={cardClass(mobileFramework === id)}
                                onClick={() => setMobileFramework(id)}
                            >
                                <div className="">{name}</div>
                            </div>
                        ))}
                        <div
                            className={cardClass(mobileFramework === mobileFrameworks.length)}
                            onClick={() => setMobileFramework(mobileFrameworks.length)}
                        >
                            <div className="">{t("other")}</div>
                        </div>
                    </div>
                )}

                {/* 4. Backend */}
                {activeId === 4 && (
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {["Supabase", "Node.js", "Laravel", "Firebase"].map((name, id) => (
                            <div
                                key={id}
                                className={cardClass(backendTech === id)}
                                onClick={() => setBackendTech(id)}
                            >
                                <div className="">{name}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 5. Autenticação */}
                {activeId === 5 && (
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {[0, 1, 2].map((id) => (
                            <div
                                key={id}
                                className={cardClass(authentication === id)}
                                onClick={() => setAuthentication(id)}
                            >
                                <div className="">{t(id === 0 ? "authNone" : id === 1 ? "authEmailPassword" : "authSocialLogin")}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 6. Funcionalidades principais (multi) */}
                {activeId === 6 && (
                    <>
                        <div className="mb-5 text-body text-t-secondary max-md:mb-4">
                            {t("featuresHint")}
                        </div>
                        <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                            {FEATURE_KEYS.map((key) => (
                                <div
                                    key={key}
                                    className={cardClass(features[key] ?? false)}
                                    onClick={() => toggleFeature(key)}
                                >
                                    <div className="">{t(key)}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <Field
                                label=""
                                value={otherFeatures}
                                onChange={(e) => setOtherFeatures(e.target.value)}
                                name="other-features"
                                placeholder={t("otherFeaturesPlaceholder")}
                            />
                        </div>
                    </>
                )}

                {/* 7. Integrações (multi) */}
                {activeId === 7 && (
                    <>
                        <div className="mb-5 text-body text-t-secondary max-md:mb-4">
                            {t("integrationsHint")}
                        </div>
                        <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                            {INTEGRATION_KEYS.map((key) => (
                                <div
                                    key={key}
                                    className={cardClass(integrations[key] ?? false)}
                                    onClick={() => toggleIntegration(key)}
                                >
                                    <div className="">{t(integrationLabelKey[key])}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* 8. Design e tema */}
                {activeId === 8 && (
                    <div className="space-y-8">
                        <div>
                            <div className="mb-3 text-body-bold text-t-primary">{t("designSectionDesign")}</div>
                            <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                                {[0, 1].map((id) => (
                                    <div
                                        key={id}
                                        className={cardClass(designSystem === id)}
                                        onClick={() => setDesignSystem(id)}
                                    >
                                        <div className="">{t(id === 0 ? "designSystemYes" : "designSystemNo")}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="mb-3 text-body-bold text-t-primary">{t("designSectionTheme")}</div>
                            <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                                {[0, 1].map((id) => (
                                    <div
                                        key={id}
                                        className={cardClass(theme === id)}
                                        onClick={() => setTheme(id)}
                                    >
                                        <div className="">{t(id === 0 ? "themeLightOnly" : "themeLightDark")}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="mb-3 text-body-bold text-t-primary">{t("designSectionIcons")}</div>
                            <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                                {[0, 1, 2, 3].map((id) => (
                                    <div
                                        key={id}
                                        className={cardClass(icons === id)}
                                        onClick={() => setIcons(id)}
                                    >
                                        <div className="">{id === 3 ? t("other") : t(id === 0 ? "iconsLucide" : id === 1 ? "iconsFeather" : "iconsHeroicons")}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 9. Regras */}
                {activeId === 9 && (
                    <Field
                        label={t("customRules")}
                        value={customRules}
                        onChange={(e) => setCustomRules(e.target.value)}
                        name="custom-rules"
                        placeholder={t("customRulesPlaceholder")}
                        isLarge
                        isTextarea
                        required
                    />
                )}
            </div>
            <div className="flex mt-auto pt-10 max-md:-mx-1 max-md:pt-6">
                {activeId > 0 && (
                    <Button
                        className="min-w-40 max-md:min-w-[calc(50%-0.5rem)] max-md:mx-1"
                        isStroke
                        onClick={handlePrevious}
                    >
                        {t("previous")}
                    </Button>
                )}
                {activeId === totalSteps - 1 ? (
                    <Button
                        className="min-w-40 ml-auto max-md:min-w-[calc(50%-0.5rem)] max-md:mx-1"
                        isSecondary
                        as="link"
                        href="/quiz-generating"
                    >
                        {t("continue")}
                    </Button>
                ) : (
                    <Button
                        className="min-w-40 ml-auto max-md:min-w-[calc(50%-0.5rem)] max-md:mx-1"
                        isSecondary
                        onClick={handleNext}
                    >
                        {t("continue")}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PrdForm;
