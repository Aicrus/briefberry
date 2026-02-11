export const pricing = [
    {
        id: "free" as const,
        price: 0,
        features: [
            { titleKey: "featureAiBriefs" as const },
            { titleKey: "featureBasicEditing" as const },
            { titleKey: "featureShareableLinks" as const },
            { generations: 5 },
        ],
    },
    {
        id: "premium" as const,
        price: 3,
        features: [
            { titleKey: "featureIncludingFree" as const },
            { titleKey: "featureNoWatermarks" as const },
            { titleKey: "featureRegeneration" as const },
            { titleKey: "featurePdfExport" as const },
            { titleKey: "featureEmailSharing" as const },
            { generations: 25 },
        ],
    },
];
