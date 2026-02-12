import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import MyDatePicker from "@/components/MyDatePicker";

const STEP_KEYS = [
    "prdStep0",
    "prdStepLang",
    "prdStepDeadline",
    "prdStep1",
    "prdStep2",
    "prdStepBackendAndAuth",
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
    const [webFrameworkOther, setWebFrameworkOther] = useState("");
    const [mobileFramework, setMobileFramework] = useState<number | null>(null);
    const [mobileFrameworkOther, setMobileFrameworkOther] = useState("");
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
    const [otherFeaturesTags, setOtherFeaturesTags] = useState<string[]>([]);
    const [otherFeaturesInput, setOtherFeaturesInput] = useState("");

    const [integrations, setIntegrations] = useState<Record<string, boolean>>({
        payments: false,
        ai: false,
        external_api: false,
        whatsapp: false,
    });

    const [projectDeadline, setProjectDeadline] = useState("");
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
                {/* 0. Plataforma */}
                {activeId === 0 && (
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

                {/* 1. Idioma */}
                {activeId === 1 && (
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
                                    maxLength={200}
                                />
                            </div>
                        )}
                    </>
                )}

                {/* 2. Quando quer que o projeto esteja pronto */}
                {activeId === 2 && (
                    <>
                        <MyDatePicker
                            value={projectDeadline}
                            onChange={(e) => setProjectDeadline(e.target.value)}
                        />
                        <p className="mt-4 text-body text-t-secondary">
                            {t("prdDeadlineHint")}
                        </p>
                    </>
                )}

                {/* 3. Framework web */}
                {activeId === 3 && (
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
                {activeId === 3 && webFramework === webFrameworks.length && (
                    <div className="mt-6">
                        <Field
                            label=""
                            value={webFrameworkOther}
                            onChange={(e) => setWebFrameworkOther(e.target.value)}
                            name="web-framework-other"
                            placeholder={t("webFrameworkOtherPlaceholder")}
                            maxLength={200}
                        />
                    </div>
                )}

                {/* 4. Framework mobile */}
                {activeId === 4 && (
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
                {activeId === 4 && mobileFramework === mobileFrameworks.length && (
                    <div className="mt-6">
                        <Field
                            label=""
                            value={mobileFrameworkOther}
                            onChange={(e) => setMobileFrameworkOther(e.target.value)}
                            name="mobile-framework-other"
                            placeholder={t("mobileFrameworkOtherPlaceholder")}
                            maxLength={200}
                        />
                    </div>
                )}

                {/* 5. Backend e autenticação */}
                {activeId === 5 && (
                    <div className="space-y-8">
                        <div>
                            <div className="mb-3 text-body-bold text-t-primary">{t("prdSectionBackend")}</div>
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
                        </div>
                        <div>
                            <div className="mb-3 text-body-bold text-t-primary">{t("prdSectionAuth")}</div>
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
                        </div>
                    </div>
                )}

                {/* 6. Funcionalidades principais */}
                {activeId === 6 && (
                    <>
                        <div className="mb-5 text-body text-t-secondary max-md:mb-4">{t("featuresHint")}</div>
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
                            <div className="min-h-40 w-full rounded-2xl border-[1.5px] border-stroke1 bg-b-surface1 px-4 py-4 focus-within:border-[#A8A8A8]/50">
                                <div className="flex flex-wrap gap-2">
                                    {otherFeaturesTags.map((tag, index) => (
                                        <span
                                            key={`${tag}-${index}`}
                                            className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-stroke1 bg-b-surface2 pl-3 pr-1.5 py-1.5 text-body text-t-primary"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => setOtherFeaturesTags((prev) => prev.filter((_, i) => i !== index))}
                                                className="flex size-6 items-center justify-center rounded-full fill-t-secondary transition-colors hover:bg-b-surface3 hover:fill-t-primary"
                                                aria-label="Remover"
                                            >
                                                <Icon className="size-3.5 fill-inherit" name="close" />
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        value={otherFeaturesInput}
                                        onChange={(e) => setOtherFeaturesInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === ",") {
                                                e.preventDefault();
                                                const parts = otherFeaturesInput.split(",").map((s) => s.trim()).filter(Boolean);
                                                if (parts.length > 0) {
                                                    setOtherFeaturesTags((prev) => [...prev, ...parts]);
                                                    setOtherFeaturesInput("");
                                                }
                                            }
                                        }}
                                        onBlur={() => {
                                            const parts = otherFeaturesInput.split(",").map((s) => s.trim()).filter(Boolean);
                                            if (parts.length > 0) {
                                                setOtherFeaturesTags((prev) => [...prev, ...parts]);
                                                setOtherFeaturesInput("");
                                            }
                                        }}
                                        placeholder={otherFeaturesTags.length === 0 ? t("otherFeaturesPlaceholder") : ""}
                                        className="min-w-48 flex-1 shrink-0 border-0 bg-transparent px-1 py-1 text-body font-medium text-t-primary outline-0 placeholder:text-t-tertiary"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* 7. Integrações */}
                {activeId === 7 && (
                    <>
                        <div className="mb-5 text-body text-t-secondary max-md:mb-4">{t("integrationsHint")}</div>
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
                    <>
                        <p className="mb-4 text-body text-t-secondary">
                            {t("customRulesHint")}
                        </p>
                        <Field
                            label={t("customRules")}
                            value={customRules}
                            onChange={(e) => setCustomRules(e.target.value)}
                            name="custom-rules"
                            placeholder={t("customRulesPlaceholder")}
                            isLarge
                            isTextarea
                            required
                            minLength={100}
                            maxLength={3000}
                        />
                        <p className="mt-1 text-hairline text-t-tertiary">
                            {t("charCountMinMax", { min: 100, max: 3000 })}
                        </p>
                    </>
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
                {activeId === 9 ? (
                    customRules.length >= 100 ? (
                        <Button
                            className="min-w-40 ml-auto max-md:min-w-[calc(50%-0.5rem)] max-md:mx-1"
                            isSecondary
                            as="link"
                            href="/quiz-generating"
                        >
                            {t("continue")}
                        </Button>
                    ) : (
                        <div className="flex flex-col items-end ml-auto max-md:min-w-[calc(50%-0.5rem)] max-md:mx-1">
                            <Button
                                className="min-w-40 max-md:min-w-full"
                                isSecondary
                                disabled
                            >
                                {t("continue")}
                            </Button>
                            <p className="mt-2 text-hairline text-t-tertiary">
                                {t("minCharsToContinue")}
                            </p>
                        </div>
                    )
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
