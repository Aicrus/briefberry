import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/components/Icon";
import type { FeatureKey } from "@/config/projectFlow";

const features: Array<{
    key: FeatureKey;
    titleKey: string;
    descriptionKey: string;
    icon: string;
}> = [
    {
        key: "create_proposal",
        titleKey: "createProposal",
        descriptionKey: "createProposalDesc",
        icon: "post",
    },
    {
        key: "create_contract",
        titleKey: "createContract",
        descriptionKey: "createContractDesc",
        icon: "copy",
    },
    {
        key: "create_prd",
        titleKey: "createPrd",
        descriptionKey: "createPrdDesc",
        icon: "align-right",
    },
];

type FeatureSelectorProps = {
    onSelect: (feature: FeatureKey) => void;
};

const FeatureSelector = ({ onSelect }: FeatureSelectorProps) => {
    const t = useTranslations("projectFlow");
    const [active, setActive] = useState<FeatureKey | null>(null);

    const handleSelect = (key: FeatureKey) => {
        setActive(key);
        // Pequeno delay para mostrar o estado ativo antes de redirecionar
        setTimeout(() => onSelect(key), 150);
    };

    return (
        <div>
            <div className="mb-8 text-h3">{t("selectFeature")}</div>
            <div className="flex flex-wrap -mt-5 -mx-2 max-md:-mt-4 max-md:-mx-1.5">
                {features.map((feature) => (
                    <div
                        className={`w-[calc(33.333%-1rem)] mt-5 mx-2 min-h-36 px-6 py-5.5 border-[1.5px] border-stroke1 rounded-[1.25rem] fill-t-secondary hover:border-transparent hover:bg-b-surface2 hover:shadow-hover hover:text-t-primary hover:fill-t-primary cursor-pointer transition-all max-md:w-[calc(50%-0.75rem)] max-md:mt-4 max-md:mx-1.5 max-md:min-h-0 max-md:py-5.5 text-t-secondary ${
                            active === feature.key
                                ? "border-stroke-focus! text-t-primary! fill-t-primary!"
                                : ""
                        }`}
                        key={feature.key}
                        onClick={() => handleSelect(feature.key)}
                    >
                        <Icon
                            className="mb-5 fill-inherit max-3xl:mb-4"
                            name={feature.icon}
                        />
                        <div className="text-body-bold leading-snug">
                            {t(feature.titleKey)}
                        </div>
                        <div className="mt-3 text-body text-t-secondary leading-normal">
                            {t(feature.descriptionKey)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureSelector;
