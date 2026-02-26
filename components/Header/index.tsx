import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Login from "@/components/Login";
import FeatureSelector from "@/components/FeatureSelector";
import type { FeatureKey } from "@/config/projectFlow";
import {
    clearFeatureDrafts,
    FEATURE_ROUTES,
    type FeatureType,
} from "@/lib/draftStorage";
import Plan from "./Plan";
import LanguageSwitcher from "./LanguageSwitcher";

const Menu = dynamic(() => import("./Menu"), { ssr: false });

type HeaderProps = {
    isFixed?: boolean;
    login?: boolean;
    isVisiblePlan?: boolean;
    planLabel?: string;
    onLogin: () => void;
    onLogout: () => void;
};

const Header = ({
    isFixed,
    login,
    isVisiblePlan,
    planLabel,
    onLogin,
    onLogout,
}: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations("header");

    const handleFeatureSelect = (feature: FeatureKey) => {
        const featureType: FeatureType =
            feature === "create_contract"
                ? "contract"
                : feature === "create_prd"
                ? "prd"
                : "proposal";

        setIsFeatureModalOpen(false);
        clearFeatureDrafts(featureType);
        router.push(FEATURE_ROUTES[featureType]);
    };

    return (
        <>
            <div
                className={`relative z-50 flex items-center p-5 max-md:p-4 ${
                    isFixed ? "fixed! top-0 left-0 right-0" : ""
                }`}
            >
                <Link className="w-33.75 mr-auto" href="/">
                    <Image
                        className="w-full opacity-100 dark:hidden!"
                        src="/images/logo-dark.svg"
                        width={135}
                        height={36}
                        alt="Logo"
                    />
                    <Image
                        className="hidden! w-full opacity-100 dark:block!"
                        src="/images/logo-light.svg"
                        width={135}
                        height={36}
                        alt="Logo"
                    />
                </Link>
                <div className="flex items-center gap-2 max-md:gap-1.5">
                    <LanguageSwitcher />
                    {isVisiblePlan && <Plan label={planLabel} />}
                    {login ? (
                        <>
                            {pathname !== "/quiz" &&
                                pathname !== "/quiz-generating" && (
                                    <Button
                                        className="max-md:w-12! max-md:gap-0! max-md:p-0! max-md:text-0!"
                                        isSecondary
                                        onClick={() => setIsFeatureModalOpen(true)}
                                    >
                                        {t("newDocument")}
                                        <Icon
                                            className="hidden! ml-2 max-md:ml-0 max-md:inline-block!"
                                            name="plus"
                                        />
                                    </Button>
                                )}
                            <Menu onLogout={onLogout} />
                        </>
                    ) : (
                        <Button
                            isPrimary
                            onClick={() => setIsMenuOpen(true)}
                        >
                            {t("signIn")}
                        </Button>
                    )}
                </div>
            </div>
            <Modal open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                <Login
                    onLogin={() => {
                        onLogin();
                        setIsMenuOpen(false);
                    }}
                />
            </Modal>
            <Modal
                classWrapper="!max-w-5xl max-md:!max-w-full"
                open={isFeatureModalOpen}
                onClose={() => setIsFeatureModalOpen(false)}
            >
                <FeatureSelector onSelect={handleFeatureSelect} />
            </Modal>
        </>
    );
};

export default Header;
