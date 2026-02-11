import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Feature from "../Feature";
import styles from "./UpgradeToPremium.module.sass";

import { pricing } from "../pricing";

const UpgradeToPremium = ({}) => {
    const t = useTranslations("pricing");
    const premium = pricing.find((item) => item.id === "premium");

    return (
        <>
            <div className="mb-3 text-h3">{t("upgradeToPremium")}</div>
            <div className="mb-8 text-body-lg text-t-secondary max-md:max-w-60">
                {t("unlockPremium")}{" "}
                <span className="font-bold text-t-primary">$3/mo:</span>
            </div>
            <ul className="flex flex-col gap-3 mb-10">
                {premium?.features.map((feature, index) => (
                    <Feature item={feature} key={index} />
                ))}
            </ul>
            <Button className="w-full mb-4.5" isSecondary>
                {t("subscribeNow")}
            </Button>
            <div className="mb-1 text-center text-hairline text-t-secondary">
                {t("paymentSecured")}
            </div>
            <div className="flex justify-center gap-1">
                {["/images/stripe.svg", "/images/paypal.svg"].map(
                    (logo, index) => (
                        <div key={index}>
                            <Image
                                className="w-12 opacity-100 dark:opacity-40"
                                src={logo}
                                width={48}
                                height={24}
                                alt=""
                            />
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default UpgradeToPremium;
