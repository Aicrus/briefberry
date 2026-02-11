import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Footer = () => {
    const pathname = usePathname();
    const t = useTranslations("footer");

    return (
        <div className={`${pathname === "/" ? "max-md:h-18" : ""}`}>
            <div
                className={`center flex justify-center items-center h-22 max-md:h-12 ${
                    pathname === "/" ? "max-md:hidden" : ""
                }`}
            >
                <div className="text-small text-t-tertiary">
                    {t("copyright")}
                </div>
                <div className="w-0.25 h-1 mx-4 bg-t-tertiary max-md:mx-auto"></div>
                <Link
                    className="text-small text-t-secondary transition-colors hover:text-t-primary"
                    href="/"
                >
                    {t("termsLicensing")}
                </Link>
            </div>
        </div>
    );
};

export default Footer;
