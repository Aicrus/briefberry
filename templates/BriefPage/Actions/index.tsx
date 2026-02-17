import { useState, useRef, RefObject } from "react";
import Link from "next/link";
import { useOnClickOutside } from "usehooks-ts";
import { useTranslations } from "next-intl";
import Icon from "@/components/Icon";

type ActionsProps = {
    featureType: "proposal" | "contract" | "prd";
};

const Actions = ({ featureType }: ActionsProps) => {
    const t = useTranslations("brief");
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(ref as RefObject<HTMLElement>, () => setVisible(false));

    const briefLink = "https://briefberry.vercel.app/brief/wr386e28sn";
    const documentName =
        featureType === "contract"
            ? t("contract")
            : featureType === "prd"
            ? t("prd")
            : t("proposal");

    const actions = [
        {
            titleKey: "createLink" as const,
            icon: "external-link",
            onClick: () => {
                setVisible(!visible);
                console.log("Create link");
            },
        },
        {
            titleKey: "download" as const,
            icon: "download",
            onClick: () => console.log("Download"),
        },
        {
            titleKey: "sendEmail" as const,
            icon: "envelope",
            onClick: () => {
                const subject = `${documentName} from Briefberry`;
                const body = `Hello!\nRead the ${documentName.toLowerCase()}: ${briefLink}`;
                const mailto = `mailto:?subject=${encodeURIComponent(
                    subject
                )}&body=${encodeURIComponent(body)}`;
                window.location.assign(mailto);
            },
        },
        {
            titleKey: "regenerate" as const,
            icon: "refresh",
            onClick: () => console.log("Regenerate"),
        },
    ];
    return (
        <div className="fixed left-1/2 bottom-5 z-5 flex gap-1 p-1.5 -translate-x-1/2 bg-b-surface2 shadow-hover rounded-full">
            {actions.map((action, index) => (
                <div className="" key={index} ref={index === 0 ? ref : null}>
                    <button
                        className={`group flex items-center size-11 px-2.5 rounded-full overflow-hidden text-nowrap text-button text-t-primary fill-t-secondary duration-400 transition-all hover:w-32 hover:justify-center hover:bg-b-surface1 hover:fill-t-primary ${
                            visible && index === 0
                                ? "w-32! justify-center bg-b-dark1! text-t-light! fill-t-light!"
                                : ""
                        }`}
                        onClick={action.onClick}
                    >
                        <Icon
                            className="shrink-0 fill-inherit"
                            name={action.icon}
                        />
                        <div
                            className={`ml-2 opacity-0 duration-400 transition-opacity group-hover:opacity-100 ${
                                visible && index === 0 ? "opacity-100!" : ""
                            }`}
                        >
                            {t(action.titleKey)}
                        </div>
                    </button>
                    {index === 0 && (
                        <div
                            className={`absolute left-1/2 bottom-[calc(100%+0.875rem)] w-109 p-8 -translate-x-1/2 bg-b-surface2 shadow-hover rounded-4xl transition-all max-md:w-[calc(100vw-2rem)] max-md:p-6 max-md:rounded-3xl ${
                                visible
                                    ? "visible opacity-100"
                                    : "invisible opacity-0"
                            }`}
                        >
                            <div className="flex justify-between items-center mb-5">
                                <div className="text-body-lg-bold">
                                    {t("yourCustomLink")}
                                </div>
                                <Link
                                    className="group flex"
                                    href="/brief-linked"
                                    target="_blank"
                                >
                                    <Icon
                                        className="fill-t-secondary transition-colors hover:fill-t-primary"
                                        name="export"
                                    />
                                </Link>
                            </div>
                            <div className="relative flex items-center h-13 pr-13.5 pl-3.5 border-[1.5px] border-stroke2 rounded-full">
                                <div className="truncate text-body text-t-secondary">
                                    {briefLink}
                                </div>
                                <button className="absolute top-1/2 right-1 size-11 -translate-y-1/2 bg-b-surface1 rounded-full text-0 fill-t-secondary transition-colors hover:fill-t-primary">
                                    <Icon
                                        className="fill-inherit"
                                        name="copy"
                                    />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Actions;
