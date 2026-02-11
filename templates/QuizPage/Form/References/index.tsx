import { useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import Button from "@/components/Button";

const References = ({}) => {
    const t = useTranslations("quiz");
    const [referenceLink, setReferenceLink] = useState("");

    return (
        <div className="">
            <div className="relative flex flex-col justify-center items-center h-50 mb-5 rounded-3xl bg-b-subtle max-md:h-40">
                <input
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    type="file"
                />
                <Icon className="mb-1.5 fill-t-tertiary" name="camera" />
                <div className="text-button text-t-secondary">
                    {t("dragDrop")}{" "}
                    <span className="text-t-primary">{t("browse")}</span>
                </div>
            </div>
            <Field
                className="mb-4"
                label={t("referenceLink")}
                value={referenceLink}
                onChange={(e) => setReferenceLink(e.target.value)}
                name="reference-link"
                placeholder={t("referenceLinkPlaceholder")}
                isLarge
                required
            />
            <Button className="px-5.5" isStroke>
                <Icon className="mr-2" name="plus" />
                {t("addLink")}
            </Button>
        </div>
    );
};

export default References;
