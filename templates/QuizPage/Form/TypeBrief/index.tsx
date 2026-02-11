import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/components/Icon";

const types = [
    { id: 0, titleKey: "typeWebApp" as const, icon: "align-right" },
    { id: 1, titleKey: "typeUiDesign" as const, icon: "post" },
    { id: 2, titleKey: "typeMobileApp" as const, icon: "mobile" },
    { id: 3, titleKey: "typeBranding" as const, icon: "bezier-curves" },
    { id: 4, titleKey: "typeIllustration" as const, icon: "magic-pencil" },
    { id: 5, titleKey: "type3d" as const, icon: "cube" },
];

const TypeBrief = ({}) => {
    const t = useTranslations("quiz");
    const [active, setActive] = useState<number | null>(null);

    return (
        <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
            {types.map((type) => (
                <div
                    className={`w-[calc(50%-1rem)] mt-4 mx-2 px-6 py-5.5 border-[1.5px] border-stroke1 rounded-[1.25rem] text-heading font-medium! text-t-secondary fill-t-secondary hover:border-transparent hover:bg-b-surface2 hover:shadow-hover hover:text-t-primary hover:fill-t-primary cursor-pointer transition-all max-md:w-[calc(50%-0.75rem)] max-md:mt-3 max-md:mx-1.5 ${
                        active === type.id
                            ? "border-stroke-focus! text-t-primary! fill-t-primary!"
                            : ""
                    }`}
                    key={type.titleKey}
                    onClick={() => setActive(type.id)}
                >
                    <Icon
                        className="mb-8 fill-inherit max-3xl:mb-5"
                        name={type.icon}
                    />
                    <div className="">{t(type.titleKey)}</div>
                </div>
            ))}
        </div>
    );
};

export default TypeBrief;
