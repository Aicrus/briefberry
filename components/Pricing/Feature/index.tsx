import { useTranslations } from "next-intl";
import Icon from "@/components/Icon";

type FeatureProps = {
    item: {
        titleKey?: string;
        generations?: number;
    };
    cancel?: boolean;
};

const Feature = ({ item, cancel }: FeatureProps) => {
    const t = useTranslations("pricing");
    return (
        <div
            className={`flex text-body font-medium fill-primary2 ${
                item.generations ? "text-accent2 fill-accent2!" : ""
            } ${cancel ? "fill-primary3!" : ""}`}
        >
            <Icon
                className="size-4! shrink-0 mt-0.75 mr-4 fill-inherit"
                name={
                    cancel
                        ? "close-small"
                        : item.generations
                        ? "text-generation"
                        : "check"
                }
            />
            {item.generations
                ? `${item.generations} ${t("generationsCredits")}`
                : item.titleKey
                ? t(item.titleKey)
                : null}
        </div>
    );
};

export default Feature;
