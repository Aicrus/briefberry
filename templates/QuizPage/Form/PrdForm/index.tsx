import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
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
const tagsBoxClass =
    "min-h-40 w-full rounded-2xl border-[1.5px] border-stroke1 bg-b-surface1 px-4 py-4 transition-colors focus-within:border-stroke-highlight";
const tagPillClass =
    "group inline-flex h-8 items-center rounded-full bg-b-surface1 pl-4 pr-2 shadow-[inset_0_0_0_1.5px_var(--color-stroke1)] text-hairline font-medium text-t-secondary transition-all hover:bg-b-surface2 hover:shadow-hover hover:text-t-primary";
const tagRemoveButtonClass =
    "ml-1 inline-flex size-5 items-center justify-center rounded-full fill-t-secondary transition-colors group-hover:fill-t-primary hover:bg-b-surface3 hover:fill-t-primary";

const FEATURE_OPTIONS = [
    { key: "featAuth", labelKey: "featAuth" as const },
    { key: "featPayments", labelKey: "featPayments" as const },
    { key: "featUpload", labelKey: "featUpload" as const },
    { key: "featRealtime", labelKey: "featRealtime" as const },
    { key: "featOffline", labelKey: "featOffline" as const },
    { key: "featExternalApis", labelKey: "featExternalApis" as const },
] as const;
const INTEGRATION_OPTIONS = [
    { key: "payments", labelKey: "integrationPayments" as const },
    { key: "ai", labelKey: "integrationAi" as const },
    { key: "external_api", labelKey: "integrationExternal_api" as const },
    { key: "whatsapp", labelKey: "integrationWhatsapp" as const },
    { key: "analytics", labelKey: "integrationAnalytics" as const },
    { key: "crm", labelKey: "integrationCrm" as const },
    { key: "email", labelKey: "integrationEmail" as const },
    { key: "push", labelKey: "integrationPush" as const },
] as const;

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
    projectName: string;
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
    theme: number | null;
    icons: number | null;
    customRules: string;
};

const DEFAULT_FEATURES: Record<string, boolean> = FEATURE_OPTIONS.reduce(
    (acc, option) => {
        acc[option.key] = false;
        return acc;
    },
    {} as Record<string, boolean>
);

const DEFAULT_INTEGRATIONS: Record<string, boolean> = INTEGRATION_OPTIONS.reduce(
    (acc, option) => {
        acc[option.key] = false;
        return acc;
    },
    {} as Record<string, boolean>
);

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

const normalizeTag = (value: string) => value.trim().toLowerCase();

const splitCommaValues = (value: string) =>
    value
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);

const PrdForm = () => {
    const t = useTranslations("quiz");
    const searchParams = useSearchParams();
    const isEditMode = searchParams.get("edit") === "1";
    const [activeId, setActiveId] = useState(0);
    const [isDraftHydrated, setIsDraftHydrated] = useState(false);

    const [projectName, setProjectName] = useState("");
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
                setActiveId(isEditMode ? 0 : draft.activeId ?? 0);
                setProjectName(draft.projectName ?? "");
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
                const normalizedAuth = normalizeAuthentication(draft.authentication);
                setAuthentication(normalizedAuth);
                setFeatures({
                    ...DEFAULT_FEATURES,
                    ...(draft.features ?? {}),
                    featAuth:
                        draft.features?.featAuth ??
                        (normalizedAuth.emailPassword ||
                            normalizedAuth.socialLogin),
                });
                setOtherFeaturesTags(draft.otherFeaturesTags ?? []);
                setOtherFeaturesInput(draft.otherFeaturesInput ?? "");
                setIntegrations({ ...DEFAULT_INTEGRATIONS, ...(draft.integrations ?? {}) });
                setOtherIntegrationsTags(draft.otherIntegrationsTags ?? []);
                setOtherIntegrationsInput(draft.otherIntegrationsInput ?? "");
                setProjectDeadline(draft.projectDeadline ?? "");
                setTheme(draft.theme ?? null);
                setIcons(draft.icons ?? null);
                setCustomRules(draft.customRules ?? "");
            }
            setIsDraftHydrated(true);
        });
    }, [isEditMode]);

    useEffect(() => {
        if (!isDraftHydrated) return;
        saveDraft(DRAFT_KEYS.prdWizard, {
            activeId: currentStepIndex,
            projectName,
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
            theme,
            icons,
            customRules,
        });
    }, [
        isDraftHydrated,
        currentStepIndex,
        projectName,
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
        theme,
        icons,
        customRules,
    ]);

    const handleNext = () => {
        if (currentStepIndex >= totalSteps - 1) return;
        if (
            currentStep === "backendAndAuth" &&
            (authentication.emailPassword || authentication.socialLogin)
        ) {
            setFeatures((prev) =>
                prev.featAuth ? prev : { ...prev, featAuth: true }
            );
        }
        setActiveId(currentStepIndex + 1);
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) setActiveId(currentStepIndex - 1);
    };

    const setFeatureSelected = (key: string, selected: boolean) => {
        setFeatures((prev) => ({ ...prev, [key]: selected }));
    };

    const setIntegrationSelected = (key: string, selected: boolean) => {
        setIntegrations((prev) => ({ ...prev, [key]: selected }));
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

    const selectedIntegrationOptions = useMemo(
        () => INTEGRATION_OPTIONS.filter((option) => integrations[option.key]),
        [integrations]
    );
    const availableIntegrationOptions = useMemo(
        () => INTEGRATION_OPTIONS.filter((option) => !integrations[option.key]),
        [integrations]
    );
    const filteredIntegrationOptions = useMemo(() => {
        const query = normalizeTag(otherIntegrationsInput);
        if (!query) return availableIntegrationOptions;
        return availableIntegrationOptions.filter((option) =>
            normalizeTag(t(option.labelKey)).includes(query)
        );
    }, [availableIntegrationOptions, otherIntegrationsInput, t]);

    const addCustomIntegrationTag = (value: string) => {
        const trimmed = value.trim();
        if (!trimmed) return;
        setOtherIntegrationsTags((prev) => {
            if (prev.some((tag) => normalizeTag(tag) === normalizeTag(trimmed))) {
                return prev;
            }
            return [...prev, trimmed];
        });
    };

    const addIntegrationFromInputValue = (value: string) => {
        const trimmed = value.trim();
        if (!trimmed) return;

        const exactMatch = INTEGRATION_OPTIONS.find(
            (option) => normalizeTag(t(option.labelKey)) === normalizeTag(trimmed)
        );
        if (exactMatch) {
            setIntegrationSelected(exactMatch.key, true);
            return;
        }

        const partialMatches = INTEGRATION_OPTIONS.filter(
            (option) =>
                !integrations[option.key] &&
                normalizeTag(t(option.labelKey)).includes(normalizeTag(trimmed))
        );
        if (partialMatches.length === 1) {
            setIntegrationSelected(partialMatches[0].key, true);
            return;
        }

        addCustomIntegrationTag(trimmed);
    };

    const commitIntegrationInput = (commitSingle = false) => {
        const hasComma = otherIntegrationsInput.includes(",");
        const values = splitCommaValues(otherIntegrationsInput);
        if (values.length === 0) return;
        if (!commitSingle && !hasComma) return;
        values.forEach(addIntegrationFromInputValue);
        setOtherIntegrationsInput("");
    };

    const selectedFeatureOptions = useMemo(
        () => FEATURE_OPTIONS.filter((option) => features[option.key]),
        [features]
    );
    const availableFeatureOptions = useMemo(
        () => FEATURE_OPTIONS.filter((option) => !features[option.key]),
        [features]
    );
    const filteredFeatureOptions = useMemo(() => {
        const query = normalizeTag(otherFeaturesInput);
        if (!query) return availableFeatureOptions;
        return availableFeatureOptions.filter((option) =>
            normalizeTag(t(option.labelKey)).includes(query)
        );
    }, [availableFeatureOptions, otherFeaturesInput, t]);

    const addCustomFeatureTag = (value: string) => {
        const trimmed = value.trim();
        if (!trimmed) return;
        setOtherFeaturesTags((prev) => {
            if (prev.some((tag) => normalizeTag(tag) === normalizeTag(trimmed))) {
                return prev;
            }
            return [...prev, trimmed];
        });
    };

    const addFeatureFromInputValue = (value: string) => {
        const trimmed = value.trim();
        if (!trimmed) return;

        const exactMatch = FEATURE_OPTIONS.find(
            (option) => normalizeTag(t(option.labelKey)) === normalizeTag(trimmed)
        );
        if (exactMatch) {
            setFeatureSelected(exactMatch.key, true);
            return;
        }

        const partialMatches = FEATURE_OPTIONS.filter(
            (option) =>
                !features[option.key] &&
                normalizeTag(t(option.labelKey)).includes(normalizeTag(trimmed))
        );
        if (partialMatches.length === 1) {
            setFeatureSelected(partialMatches[0].key, true);
            return;
        }

        addCustomFeatureTag(trimmed);
    };

    const commitFeatureInput = () => {
        const values = splitCommaValues(otherFeaturesInput);
        if (values.length === 0) return;
        values.forEach(addFeatureFromInputValue);
        setOtherFeaturesInput("");
    };

    const canSubmitPrd =
        projectName.trim().length >= 3 &&
        customRules.length >= 100;

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
                        <div className="mb-6">
                            {availableFeatureOptions.length > 0 ? (
                                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                                    {availableFeatureOptions.map((option) => (
                                        <button
                                            key={option.key}
                                            type="button"
                                            className="shrink-0 h-8 px-4 bg-b-surface1 shadow-[inset_0_0_0_1.5px_var(--color-stroke1)] rounded-full text-hairline font-medium text-t-secondary transition-all hover:bg-b-surface2 hover:shadow-hover hover:text-t-primary"
                                            onClick={() => {
                                                setFeatureSelected(option.key, true);
                                                setOtherFeaturesInput("");
                                            }}
                                        >
                                            {t(option.labelKey)}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-hairline text-t-tertiary">
                                    {t("featuresSuggestedEmpty")}
                                </p>
                            )}
                        </div>
                        <div>
                            <div className={tagsBoxClass}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={otherFeaturesInput}
                                        onChange={(e) => setOtherFeaturesInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === ",") {
                                                e.preventDefault();
                                                commitFeatureInput();
                                            }
                                        }}
                                        onBlur={commitFeatureInput}
                                        placeholder={t("featureSearchPlaceholder")}
                                        className="w-full border-0 bg-transparent px-1 py-1 text-hairline font-medium text-t-primary outline-0 placeholder:text-t-tertiary"
                                    />
                                    {otherFeaturesInput.trim().length > 0 &&
                                        filteredFeatureOptions.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {filteredFeatureOptions.slice(0, 4).map((option) => (
                                                    <button
                                                        key={`${option.key}-search`}
                                                        type="button"
                                                        className="shrink-0 h-8 px-4 bg-b-surface1 shadow-[inset_0_0_0_1.5px_var(--color-stroke1)] rounded-full text-hairline font-medium text-t-secondary transition-all hover:bg-b-surface2 hover:shadow-hover hover:text-t-primary"
                                                        onMouseDown={(e) => e.preventDefault()}
                                                        onClick={() => {
                                                            setFeatureSelected(option.key, true);
                                                            setOtherFeaturesInput("");
                                                        }}
                                                    >
                                                        {t(option.labelKey)}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedFeatureOptions.map((option) => (
                                        <span
                                            key={`selected-feature-${option.key}`}
                                            className={tagPillClass}
                                        >
                                            {t(option.labelKey)}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFeatureSelected(option.key, false)
                                                }
                                                className={tagRemoveButtonClass}
                                                aria-label="Remover"
                                            >
                                                <Icon className="size-3 fill-inherit" name="close" />
                                            </button>
                                        </span>
                                    ))}
                                    {otherFeaturesTags.map((tag, index) => (
                                        <span
                                            key={`${tag}-${index}`}
                                            className={tagPillClass}
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => setOtherFeaturesTags((prev) => prev.filter((_, i) => i !== index))}
                                                className={tagRemoveButtonClass}
                                                aria-label="Remover"
                                            >
                                                <Icon className="size-3 fill-inherit" name="close" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Integrações */}
                {currentStep === "integrations" && (
                    <>
                        <div className="mb-5 text-body text-t-secondary max-md:mb-4">{t("integrationsHint")}</div>
                        <div className="mb-6">
                            {availableIntegrationOptions.length > 0 ? (
                                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                                    {availableIntegrationOptions.map((option) => (
                                        <button
                                            key={option.key}
                                            type="button"
                                            className="shrink-0 h-8 px-4 bg-b-surface1 shadow-[inset_0_0_0_1.5px_var(--color-stroke1)] rounded-full text-hairline font-medium text-t-secondary transition-all hover:bg-b-surface2 hover:shadow-hover hover:text-t-primary"
                                            onClick={() => {
                                                setIntegrationSelected(option.key, true);
                                                setOtherIntegrationsInput("");
                                            }}
                                        >
                                            {t(option.labelKey)}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-hairline text-t-tertiary">
                                    {t("integrationsSuggestedEmpty")}
                                </p>
                            )}
                        </div>
                        <div>
                            <div className={tagsBoxClass}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={otherIntegrationsInput}
                                        onChange={(e) =>
                                            setOtherIntegrationsInput(e.target.value)
                                        }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === ",") {
                                                e.preventDefault();
                                                commitIntegrationInput(true);
                                            }
                                        }}
                                        onBlur={() => commitIntegrationInput(false)}
                                        placeholder={t("integrationSearchPlaceholder")}
                                        className="w-full border-0 bg-transparent px-1 py-1 text-hairline font-medium text-t-primary outline-0 placeholder:text-t-tertiary"
                                    />
                                    {otherIntegrationsInput.trim().length > 0 &&
                                        filteredIntegrationOptions.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {filteredIntegrationOptions
                                                    .slice(0, 4)
                                                    .map((option) => (
                                                        <button
                                                            key={`${option.key}-search`}
                                                            type="button"
                                                            className="shrink-0 h-8 px-4 bg-b-surface1 shadow-[inset_0_0_0_1.5px_var(--color-stroke1)] rounded-full text-hairline font-medium text-t-secondary transition-all hover:bg-b-surface2 hover:shadow-hover hover:text-t-primary"
                                                            onMouseDown={(e) =>
                                                                e.preventDefault()
                                                            }
                                                            onClick={() => {
                                                                setIntegrationSelected(
                                                                    option.key,
                                                                    true
                                                                );
                                                                setOtherIntegrationsInput("");
                                                            }}
                                                        >
                                                            {t(option.labelKey)}
                                                        </button>
                                                    ))}
                                            </div>
                                        )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedIntegrationOptions.map((option) => (
                                        <span
                                            key={`selected-${option.key}`}
                                            className={tagPillClass}
                                        >
                                            {t(option.labelKey)}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIntegrationSelected(option.key, false)
                                                }
                                                className={tagRemoveButtonClass}
                                                aria-label="Remover"
                                            >
                                                <Icon
                                                    className="size-3 fill-inherit"
                                                    name="close"
                                                />
                                            </button>
                                        </span>
                                    ))}
                                    {otherIntegrationsTags.map((tag, index) => (
                                        <span
                                            key={`${tag}-${index}`}
                                            className={tagPillClass}
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => setOtherIntegrationsTags((prev) => prev.filter((_, i) => i !== index))}
                                                className={tagRemoveButtonClass}
                                                aria-label="Remover"
                                            >
                                                <Icon className="size-3 fill-inherit" name="close" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Design e tema */}
                {currentStep === "design" && (
                    <div className="space-y-8">
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
                        <Field
                            className="mb-6"
                            label={t("projectName")}
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            name="project-name"
                            placeholder={t("projectNamePlaceholder")}
                            isLarge
                            required
                            minLength={3}
                            maxLength={180}
                        />
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
                    canSubmitPrd ? (
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
                                {t("prdDetailsToContinue")}
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
