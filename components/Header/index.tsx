import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Login from "@/components/Login";
import Menu from "./Menu";
import Plan from "./Plan";
import LanguageSwitcher from "./LanguageSwitcher";

type HeaderProps = {
    isFixed?: boolean;
    login?: boolean;
    isVisiblePlan?: boolean;
    onLogin: () => void;
    onLogout: () => void;
};

const Header = ({
    isFixed,
    login,
    isVisiblePlan,
    onLogin,
    onLogout,
}: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations("header");

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
                    {isVisiblePlan && <Plan />}
                    {login ? (
                        <>
                            {pathname !== "/quiz" &&
                                pathname !== "/quiz-generating" && (
                                    <Button
                                        className="max-md:w-12! max-md:gap-0! max-md:p-0! max-md:text-0!"
                                        href="/quiz"
                                        as="link"
                                        isSecondary
                                    >
                                        {t("newBrief")}
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
        </>
    );
};

export default Header;
