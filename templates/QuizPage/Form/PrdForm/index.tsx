import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import MyDatePicker from "@/components/MyDatePicker";
import { DRAFT_KEYS, loadDraft, saveDraft } from "@/lib/draftStorage";

type StepId =
    | "platform"
    | "language"
    | "deadline"
    | "webFramework"
    | "webDesignLibrary"
    | "mobileFramework"
    | "mobileDesignLibrary"
    | "backendAndAuth"
    | "features"
    | "integrations"
    | "design"
    | "projectDetails";

const STEP_TITLE_KEYS: Record<StepId, string> = {
    platform: "prdStep0",
    language: "prdStepLang",
    deadline: "prdStepDeadline",
    webFramework: "prdStep1",
    webDesignLibrary: "prdStepWebDesignLibrary",
    mobileFramework: "prdStep2",
    mobileDesignLibrary: "prdStepMobileDesignLibrary",
    backendAndAuth: "prdStepBackendAndAuth",
    features: "prdStep5",
    integrations: "prdStep6",
    design: "prdStep7",
    projectDetails: "prdStep8",
};

const PLATFORM_OPTIONS = [
    { id: 0, titleKey: "platformWeb" as const, icon: "align-right" as const },
    { id: 1, titleKey: "platformMobile" as const, icon: "mobile" as const },
    { id: 2, titleKey: "platformWebAndMobile" as const, icon: "post" as const },
    { id: 3, titleKey: "other" as const, icon: "edit" as const },
] as const;

const cardClass = (active: boolean) =>
    `w-[calc(50%-1rem)] mt-4 mx-2 px-6 py-5.5 border-[1.5px] border-stroke1 rounded-[1.25rem] text-heading font-medium! text-t-secondary fill-t-secondary hover:border-transparent hover:bg-b-surface2 hover:shadow-hover hover:text-t-primary hover:fill-t-primary cursor-pointer transition-all max-md:w-[calc(50%-0.75rem)] max-md:mt-3 max-md:mx-1.5 ${
        active ? "border-stroke-focus! text-t-primary! fill-t-primary!" : ""
    }`;

const FEATURE_KEYS = ["featAuth", "featPayments", "featUpload", "featRealtime", "featOffline", "featExternalApis"] as const;
const INTEGRATION_KEYS = ["payments", "ai", "external_api", "whatsapp"] as const;

const WEB_FRAMEWORK_OPTIONS = [
    { name: "Next.js", descKey: "webFrameworkNextDesc" as const },
    { name: "Nuxt.js", descKey: "webFrameworkNuxtDesc" as const },
    { name: "Remix", descKey: "webFrameworkRemixDesc" as const },
    { name: "Astro", descKey: "webFrameworkAstroDesc" as const },
    { name: "SvelteKit", descKey: "webFrameworkSveltekitDesc" as const },
] as const;

const MOBILE_FRAMEWORK_OPTIONS = [
    { name: "Flutter", descKey: "mobileFrameworkFlutterDesc" as const },
    { name: "React Native", descKey: "mobileFrameworkReactNativeDesc" as const },
    { name: "Expo (React Native)", descKey: "mobileFrameworkExpoDesc" as const },
    { name: "Ionic", descKey: "mobileFrameworkIonicDesc" as const },
    { name: "Nativo (Swift/Kotlin)", descKey: "mobileFrameworkNativeDesc" as const },
] as const;

const WEB_DESIGN_LIBRARY_OPTIONS = [
    { value: "tailwind", titleKey: "webDesignLibTailwind" as const, descKey: "webDesignLibTailwindDesc" as const },
    { value: "mui", titleKey: "webDesignLibMui" as const, descKey: "webDesignLibMuiDesc" as const },
    { value: "chakra", titleKey: "webDesignLibChakra" as const, descKey: "webDesignLibChakraDesc" as const },
    { value: "shadcn", titleKey: "webDesignLibShadcn" as const, descKey: "webDesignLibShadcnDesc" as const },
    { value: "other", titleKey: "other" as const, descKey: "webDesignLibOtherDesc" as const },
] as const;

const FLUTTER_DESIGN_LIBRARY_OPTIONS = [
    { value: "material", titleKey: "mobileDesignLibMaterial" as const, descKey: "mobileDesignLibMaterialDesc" as const },
    { value: "cupertino", titleKey: "mobileDesignLibCupertino" as const, descKey: "mobileDesignLibCupertinoDesc" as const },
    { value: "other", titleKey: "other" as const, descKey: "mobileDesignLibOtherDesc" as const },
] as const;

const REACT_NATIVE_DESIGN_LIBRARY_OPTIONS = [
    { value: "paper", titleKey: "mobileDesignLibPaper" as const, descKey: "mobileDesignLibPaperDesc" as const },
    { value: "nativebase", titleKey: "mobileDesignLibNativebase" as const, descKey: "mobileDesignLibNativebaseDesc" as const },
    { value: "tamagui", titleKey: "mobileDesignLibTamagui" as const, descKey: "mobileDesignLibTamaguiDesc" as const },
    { value: "other", titleKey: "other" as const, descKey: "mobileDesignLibOtherDesc" as const },
] as const;

const IONIC_DESIGN_LIBRARY_OPTIONS = [
    { value: "ionic", titleKey: "mobileDesignLibIonic" as const, descKey: "mobileDesignLibIonicDesc" as const },
    { value: "material", titleKey: "mobileDesignLibMaterial" as const, descKey: "mobileDesignLibMaterialDesc" as const },
    { value: "other", titleKey: "other" as const, descKey: "mobileDesignLibOtherDesc" as const },
] as const;

const NATIVE_DESIGN_LIBRARY_OPTIONS = [
    { value: "material", titleKey: "mobileDesignLibMaterial" as const, descKey: "mobileDesignLibMaterialDesc" as const },
    { value: "cupertino", titleKey: "mobileDesignLibCupertino" as const, descKey: "mobileDesignLibCupertinoDesc" as const },
    { value: "other", titleKey: "other" as const, descKey: "mobileDesignLibOtherDesc" as const },
] as const;
type AuthSelection = {
    emailPassword: boolean;
    socialLogin: boolean;
};
type PrdDraft = {
    activeId: number;
    language: number | null;
    languageOther: string;
    platform: number | null;
    platformOther: string;
    webFramework: number | null;
    webFrameworkOther: string;
    webDesignLibrary: string | null;
    webDesignLibraryOther: string;
    mobileFramework: number | null;
    mobileFrameworkOther: string;
    mobileDesignLibrary: string | null;
    mobileDesignLibraryOther: string;
    backendTech: number | null;
    authentication:
        | number
        | null
        | {
              emailPassword: boolean;
              socialLogin: boolean;
          };
    features: Record<string, boolean>;
    otherFeaturesTags: string[];
    otherFeaturesInput: string;
    integrations: Record<string, boolean>;
    otherIntegrationsTags: string[];
    otherIntegrationsInput: string;
    projectDeadline: string;
    designSystem: number | null;
    theme: number | null;
    icons: number | null;
    customRules: string;
};

const DEFAULT_FEATURES: Record<string, boolean> = {
    featAuth: false,
    featPayments: false,
    featUpload: false,
    featRealtime: false,
    featOffline: false,
    featExternalApis: false,
};

const DEFAULT_INTEGRATIONS: Record<string, boolean> = {
    payments: false,
    ai: false,
    external_api: false,
    whatsapp: false,
};

const normalizeAuthentication = (value: unknown): AuthSelection => {
    if (typeof value === "number") {
        if (value === 1) return { emailPassword: true, socialLogin: false };
        if (value === 2) return { emailPassword: false, socialLogin: true };
        return { emailPassword: false, socialLogin: false };
    }

    if (value && typeof value === "object") {
        const auth = value as Partial<AuthSelection>;
        return {
            emailPassword: Boolean(auth.emailPassword),
            socialLogin: Boolean(auth.socialLogin),
        };
    }

    return { emailPassword: false, socialLogin: false };
};

const PrdForm = () => {
    const t = useTranslations("quiz");
    const [activeId, setActiveId] = useState(0);
    const [isDraftHydrated, setIsDraftHydrated] = useState(false);

    const [language, setLanguage] = useState<number | null>(null);
    const [languageOther, setLanguageOther] = useState("");
    const [platform, setPlatform] = useState<number | null>(null);
    const [platformOther, setPlatformOther] = useState("");
    const [webFramework, setWebFramework] = useState<number | null>(null);
    const [webFrameworkOther, setWebFrameworkOther] = useState("");
    const [webDesignLibrary, setWebDesignLibrary] = useState<string | null>(null);
    const [webDesignLibraryOther, setWebDesignLibraryOther] = useState("");
    const [mobileFramework, setMobileFramework] = useState<number | null>(null);
    const [mobileFrameworkOther, setMobileFrameworkOther] = useState("");
    const [mobileDesignLibrary, setMobileDesignLibrary] = useState<string | null>(null);
    const [mobileDesignLibraryOther, setMobileDesignLibraryOther] = useState("");
    const [backendTech, setBackendTech] = useState<number | null>(null);
    const [authentication, setAuthentication] = useState<AuthSelection>({ emailPassword: false, socialLogin: false });

    const [features, setFeatures] = useState<Record<string, boolean>>(DEFAULT_FEATURES);
    const [otherFeaturesTags, setOtherFeaturesTags] = useState<string[]>([]);
    const [otherFeaturesInput, setOtherFeaturesInput] = useState("");

    const [integrations, setIntegrations] = useState<Record<string, boolean>>(DEFAULT_INTEGRATIONS);
    const [otherIntegrationsTags, setOtherIntegrationsTags] = useState<string[]>([]);
    const [otherIntegrationsInput, setOtherIntegrationsInput] = useState("");

    const [projectDeadline, setProjectDeadline] = useState("");
    const [designSystem, setDesignSystem] = useState<number | null>(null);
    const [theme, setTheme] = useState<number | null>(null);
    const [icons, setIcons] = useState<number | null>(null);
    const [customRules, setCustomRules] = useState("");

    const hasWeb = platform === 0 || platform === 2;
    const hasMobile = platform === 1 || platform === 2;
    const stepIds = useMemo<StepId[]>(() => {
        const ids: StepId[] = ["platform", "language", "deadline"];
        if (hasWeb) {
            ids.push("webFramework", "webDesignLibrary");
        }
        if (hasMobile) {
            ids.push("mobileFramework", "mobileDesignLibrary");
        }
        ids.push("backendAndAuth", "features", "integrations", "design", "projectDetails");
        return ids;
    }, [hasWeb, hasMobile]);
    const totalSteps = stepIds.length;
    const currentStepIndex = Math.max(0, Math.min(activeId, totalSteps - 1));
    const currentStep = stepIds[currentStepIndex];

    const mobileDesignLibraryOptions = useMemo(() => {
        if (mobileFramework === 0) return FLUTTER_DESIGN_LIBRARY_OPTIONS;
        if (mobileFramework === 1 || mobileFramework === 2) return REACT_NATIVE_DESIGN_LIBRARY_OPTIONS;
        if (mobileFramework === 3) return IONIC_DESIGN_LIBRARY_OPTIONS;
        if (mobileFramework === MOBILE_FRAMEWORK_OPTIONS.length) {
            return [{ value: "other", titleKey: "other" as const, descKey: "mobileDesignLibOtherDesc" as const }];
        }
        return NATIVE_DESIGN_LIBRARY_OPTIONS;
    }, [mobileFramework]);

    useEffect(() => {
        const draft = loadDraft<PrdDraft>(DRAFT_KEYS.prdWizard);
        queueMicrotask(() => {
            if (draft) {
                setActiveId(draft.activeId ?? 0);
                setLanguage(draft.language ?? null);
                setLanguageOther(draft.languageOther ?? "");
                setPlatform(draft.platform ?? null);
                setPlatformOther(draft.platformOther ?? "");
                setWebFramework(draft.webFramework ?? null);
                setWebFrameworkOther(draft.webFrameworkOther ?? "");
                setWebDesignLibrary(draft.webDesignLibrary ?? null);
                setWebDesignLibraryOther(draft.webDesignLibraryOther ?? "");
                setMobileFramework(draft.mobileFramework ?? null);
                setMobileFrameworkOther(draft.mobileFrameworkOther ?? "");
                setMobileDesignLibrary(draft.mobileDesignLibrary ?? null);
                setMobileDesignLibraryOther(draft.mobileDesignLibraryOther ?? "");
                setBackendTech(draft.backendTech ?? null);
                setAuthentication(normalizeAuthentication(draft.authentication));
                setFeatures({ ...DEFAULT_FEATURES, ...(draft.features ?? {}) });
                setOtherFeaturesTags(draft.otherFeaturesTags ?? []);
                setOtherFeaturesInput(draft.otherFeaturesInput ?? "");
                setIntegrations({ ...DEFAULT_INTEGRATIONS, ...(draft.integrations ?? {}) });
                setOtherIntegrationsTags(draft.otherIntegrationsTags ?? []);
                setOtherIntegrationsInput(draft.otherIntegrationsInput ?? "");
                setProjectDeadline(draft.projectDeadline ?? "");
                setDesignSystem(draft.designSystem ?? null);
                setTheme(draft.theme ?? null);
                setIcons(draft.icons ?? null);
                setCustomRules(draft.customRules ?? "");
            }
            setIsDraftHydrated(true);
        });
    }, []);

    useEffect(() => {
        if (!isDraftHydrated) return;
        saveDraft(DRAFT_KEYS.prdWizard, {
            activeId: currentStepIndex,
            language,
            languageOther,
            platform,
            platformOther,
            webFramework,
            webFrameworkOther,
            webDesignLibrary,
            webDesignLibraryOther,
            mobileFramework,
            mobileFrameworkOther,
            mobileDesignLibrary,
            mobileDesignLibraryOther,
            backendTech,
            authentication,
            features,
            otherFeaturesTags,
            otherFeaturesInput,
            integrations,
            otherIntegrationsTags,
            otherIntegrationsInput,
            projectDeadline,
            designSystem,
            theme,
            icons,
            customRules,
        });
    }, [
        isDraftHydrated,
        currentStepIndex,
        language,
        languageOther,
        platform,
        platformOther,
        webFramework,
        webFrameworkOther,
        webDesignLibrary,
        webDesignLibraryOther,
        mobileFramework,
        mobileFrameworkOther,
        mobileDesignLibrary,
        mobileDesignLibraryOther,
        backendTech,
        authentication,
        features,
        otherFeaturesTags,
        otherFeaturesInput,
        integrations,
        otherIntegrationsTags,
        otherIntegrationsInput,
        projectDeadline,
        designSystem,
        theme,
        icons,
        customRules,
    ]);

    const handleNext = () => {
        if (currentStepIndex < totalSteps - 1) setActiveId(currentStepIndex + 1);
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) setActiveId(currentStepIndex - 1);
    };

    const toggleFeature = (key: string) => {
        setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleIntegration = (key: string) => {
        setIntegrations((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleAuthentication = (id: number) => {
        if (id === 0) {
            setAuthentication({ emailPassword: false, socialLogin: false });
            return;
        }

        if (id === 1) {
            setAuthentication((prev) => ({ ...prev, emailPassword: !prev.emailPassword }));
            return;
        }

        setAuthentication((prev) => ({ ...prev, socialLogin: !prev.socialLogin }));
    };

    const langOptions = [
        { id: 0, key: "langPtBr" as const },
        { id: 1, key: "langEn" as const },
        { id: 2, key: "langEs" as const },
        { id: 3, key: "langMulti" as const },
        { id: 4, key: "langOther" as const },
    ];

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
                    {t(STEP_TITLE_KEYS[currentStep])}
                </div>
                <div className="flex justify-center items-center shrink-0 w-16 h-7 mt-3 ml-8 border-[1.5px] border-primary2/15 bg-primary2/5 rounded-full text-button text-primary2 max-md:m-0 max-md:mb-4">
                    {currentStepIndex + 1} / {totalSteps}
                </div>
            </div>
            <div className="flex-1 min-h-0 flex flex-col">
                {/* Plataforma */}
                {currentStep === "platform" && (
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {PLATFORM_OPTIONS.map((opt) => (
                            <div
                                key={opt.id}
                                className={cardClass(platform === opt.id)}
                                onClick={() => setPlatform(opt.id)}
                            >
                                <Icon className="mb-8 fill-inherit max-3xl:mb-5" name={opt.icon} />
                                <div className="">{t(opt.titleKey)}</div>
                            </div>
                        ))}
                    </div>
                )}
                {currentStep === "platform" && platform === 3 && (
                    <div className="mt-6">
                        <Field
                            label=""
                            value={platformOther}
                            onChange={(e) => setPlatformOther(e.target.value)}
                            name="platform-other"
                            placeholder={t("platformOtherPlaceholder")}
                            maxLength={200}
                        />
                    </div>
                )}

                {/* Idioma */}
                {currentStep === "language" && (
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

                {/* Prazo */}
                {currentStep === "deadline" && (
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

                {/* Framework web */}
                {currentStep === "webFramework" && (
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {WEB_FRAMEWORK_OPTIONS.map((option, id) => (
                            <div
                                key={id}
                                className={cardClass(webFramework === id)}
                                onClick={() => setWebFramework(id)}
                            >
                                <div className="">{option.name}</div>
                            </div>
                        ))}
                        <div
                            className={cardClass(webFramework === WEB_FRAMEWORK_OPTIONS.length)}
                            onClick={() => setWebFramework(WEB_FRAMEWORK_OPTIONS.length)}
                        >
                            <div className="">{t("other")}</div>
                        </div>
                    </div>
                )}
                {currentStep === "webFramework" && webFramework === WEB_FRAMEWORK_OPTIONS.length && (
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

                {/* Biblioteca web */}
                {currentStep === "webDesignLibrary" && (
                    <>
                        <div className="mb-5 text-body text-t-secondary max-md:mb-4">{t("webDesignLibraryHint")}</div>
                        <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                            {WEB_DESIGN_LIBRARY_OPTIONS.map((option) => (
                                <div
                                    key={option.value}
                                    className={cardClass(webDesignLibrary === option.value)}
                                    onClick={() => setWebDesignLibrary(option.value)}
                                >
                                    <div className="">{t(option.titleKey)}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {currentStep === "webDesignLibrary" && webDesignLibrary === "other" && (
                    <div className="mt-6">
                        <Field
                            label=""
                            value={webDesignLibraryOther}
                            onChange={(e) => setWebDesignLibraryOther(e.target.value)}
                            name="web-design-library-other"
                            placeholder={t("webDesignLibraryOtherPlaceholder")}
                            maxLength={200}
                        />
                    </div>
                )}

                {/* Framework mobile */}
                {currentStep === "mobileFramework" && (
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {MOBILE_FRAMEWORK_OPTIONS.map((option, id) => (
                            <div
                                key={id}
                                className={cardClass(mobileFramework === id)}
                                onClick={() => setMobileFramework(id)}
                            >
                                <div className="">{option.name}</div>
                            </div>
                        ))}
                        <div
                            className={cardClass(mobileFramework === MOBILE_FRAMEWORK_OPTIONS.length)}
                            onClick={() => setMobileFramework(MOBILE_FRAMEWORK_OPTIONS.length)}
                        >
                            <div className="">{t("other")}</div>
                        </div>
                    </div>
                )}
                {currentStep === "mobileFramework" && mobileFramework === MOBILE_FRAMEWORK_OPTIONS.length && (
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

                {/* Biblioteca mobile */}
                {currentStep === "mobileDesignLibrary" && (
                    <>
                        <div className="mb-5 text-body text-t-secondary max-md:mb-4">{t("mobileDesignLibraryHint")}</div>
                        <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                            {mobileDesignLibraryOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className={cardClass(mobileDesignLibrary === option.value)}
                                    onClick={() => setMobileDesignLibrary(option.value)}
                                >
                                    <div className="">{t(option.titleKey)}</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {currentStep === "mobileDesignLibrary" && mobileDesignLibrary === "other" && (
                    <div className="mt-6">
                        <Field
                            label=""
                            value={mobileDesignLibraryOther}
                            onChange={(e) => setMobileDesignLibraryOther(e.target.value)}
                            name="mobile-design-library-other"
                            placeholder={t("mobileDesignLibraryOtherPlaceholder")}
                            maxLength={200}
                        />
                    </div>
                )}

                {/* Backend e autenticação */}
                {currentStep === "backendAndAuth" && (
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
                                        className={cardClass(
                                            id === 0
                                                ? !authentication.emailPassword && !authentication.socialLogin
                                                : id === 1
                                                  ? authentication.emailPassword
                                                  : authentication.socialLogin
                                        )}
                                        onClick={() => toggleAuthentication(id)}
                                    >
                                        <div className="">{t(id === 0 ? "authNone" : id === 1 ? "authEmailPassword" : "authSocialLogin")}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Funcionalidades principais */}
                {currentStep === "features" && (
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

                {/* Integrações */}
                {currentStep === "integrations" && (
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
                        <div className="mt-6">
                            <div className="min-h-40 w-full rounded-2xl border-[1.5px] border-stroke1 bg-b-surface1 px-4 py-4 focus-within:border-[#A8A8A8]/50">
                                <div className="flex flex-wrap gap-2">
                                    {otherIntegrationsTags.map((tag, index) => (
                                        <span
                                            key={`${tag}-${index}`}
                                            className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] border-stroke1 bg-b-surface2 pl-3 pr-1.5 py-1.5 text-body text-t-primary"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => setOtherIntegrationsTags((prev) => prev.filter((_, i) => i !== index))}
                                                className="flex size-6 items-center justify-center rounded-full fill-t-secondary transition-colors hover:bg-b-surface3 hover:fill-t-primary"
                                                aria-label="Remover"
                                            >
                                                <Icon className="size-3.5 fill-inherit" name="close" />
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        value={otherIntegrationsInput}
                                        onChange={(e) => setOtherIntegrationsInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === ",") {
                                                e.preventDefault();
                                                const parts = otherIntegrationsInput.split(",").map((s) => s.trim()).filter(Boolean);
                                                if (parts.length > 0) {
                                                    setOtherIntegrationsTags((prev) => [...prev, ...parts]);
                                                    setOtherIntegrationsInput("");
                                                }
                                            }
                                        }}
                                        onBlur={() => {
                                            const parts = otherIntegrationsInput.split(",").map((s) => s.trim()).filter(Boolean);
                                            if (parts.length > 0) {
                                                setOtherIntegrationsTags((prev) => [...prev, ...parts]);
                                                setOtherIntegrationsInput("");
                                            }
                                        }}
                                        placeholder={otherIntegrationsTags.length === 0 ? t("otherIntegrationsPlaceholder") : ""}
                                        className="min-w-48 flex-1 shrink-0 border-0 bg-transparent px-1 py-1 text-body font-medium text-t-primary outline-0 placeholder:text-t-tertiary"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Design e tema */}
                {currentStep === "design" && (
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

                {/* Projeto */}
                {currentStep === "projectDetails" && (
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
                {currentStepIndex > 0 && (
                    <Button
                        className="min-w-40 max-md:min-w-[calc(50%-0.5rem)] max-md:mx-1"
                        isStroke
                        onClick={handlePrevious}
                    >
                        {t("previous")}
                    </Button>
                )}
                {currentStep === "projectDetails" ? (
                    customRules.length >= 100 ? (
                        <Button
                            className="min-w-40 ml-auto max-md:min-w-[calc(50%-0.5rem)] max-md:mx-1"
                            isSecondary
                            as="link"
                            href="/quiz-generating?feature=prd"
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
