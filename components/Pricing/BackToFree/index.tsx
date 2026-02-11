import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Feature from "../Feature";

import { pricing } from "../pricing";

const BackToFree = ({}) => {
    const t = useTranslations("pricing");
    const premium = pricing.find((item) => item.id === "premium");

    return (
        <>
            <div className="mb-3 text-h3">{t("backToFree")}</div>
            <div className="mb-6 text-body text-t-secondary">
                {t("downgradeMessage")}
            </div>
            <ul className="flex flex-col gap-3 mb-6">
                {premium?.features.slice(1).map((feature, index) => (
                    <Feature item={feature} key={index} cancel />
                ))}
            </ul>
            <div className="mb-10 text-body text-t-secondary">
                {t("sureCancel")}
            </div>
            <Button className="w-full" isSecondary>
                {t("yesCancel")}
            </Button>
        </>
    );
};

export default BackToFree;
