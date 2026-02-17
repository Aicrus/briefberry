export type FeatureType = "proposal" | "contract" | "prd";

export const DRAFT_KEYS = {
    proposalWizard: "briefberry:draft:proposal:wizard",
    proposalTypeBrief: "briefberry:draft:proposal:type-brief",
    proposalBudget: "briefberry:draft:proposal:budget",
    proposalReferences: "briefberry:draft:proposal:references",
    proposalSimple: "briefberry:draft:proposal:simple",
    contractWizard: "briefberry:draft:contract:wizard",
    prdWizard: "briefberry:draft:prd:wizard",
} as const;

export const FEATURE_ROUTES: Record<FeatureType, string> = {
    proposal: "/quiz",
    contract: "/quiz/contract",
    prd: "/quiz/prd",
};

const FEATURE_DRAFTS: Record<FeatureType, string[]> = {
    proposal: [
        DRAFT_KEYS.proposalWizard,
        DRAFT_KEYS.proposalTypeBrief,
        DRAFT_KEYS.proposalBudget,
        DRAFT_KEYS.proposalReferences,
        DRAFT_KEYS.proposalSimple,
    ],
    contract: [DRAFT_KEYS.contractWizard],
    prd: [DRAFT_KEYS.prdWizard],
};

const DOC_EDIT_PREFIX = "briefberry:doc-edit:";

export function loadDraft<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = window.localStorage.getItem(key);
        if (!raw) return null;
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}

export function saveDraft<T>(key: string, value: T) {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // noop
    }
}

export function clearFeatureDrafts(feature: FeatureType) {
    if (typeof window === "undefined") return;
    FEATURE_DRAFTS[feature].forEach((key) => window.localStorage.removeItem(key));
    const featureDocPrefix = `${DOC_EDIT_PREFIX}${feature}:`;
    for (let i = window.localStorage.length - 1; i >= 0; i--) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith(featureDocPrefix)) {
            window.localStorage.removeItem(key);
        }
    }
}

export function clearAllDrafts() {
    if (typeof window === "undefined") return;
    const draftKeys = Object.values(DRAFT_KEYS);
    draftKeys.forEach((key) => window.localStorage.removeItem(key));
    for (let i = window.localStorage.length - 1; i >= 0; i--) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith(DOC_EDIT_PREFIX)) {
            window.localStorage.removeItem(key);
        }
    }
}
