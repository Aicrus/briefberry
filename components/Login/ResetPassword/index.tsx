import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Field from "@/components/Field";

type Props = {
    onLogin: () => void;
    onResetPassword: () => void;
};

const ResetPassword = ({ onLogin, onResetPassword }: Props) => {
    const t = useTranslations("login");
    const [email, setEmail] = useState("");

    return (
        <div className="">
            <div className="mb-10 text-center text-h3">{t("resetPasswordTitle")}</div>
            <Field
                className="mb-6"
                label={t("email")}
                placeholder={t("emailPlaceholder")}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Button
                className="w-full mb-4"
                isSecondary
                onClick={onResetPassword}
            >
                {t("resetPassword")}
            </Button>
            <div className="text-center text-hairline font-medium text-t-secondary">
                {t("havePassword")}{" "}
                <span
                    className="border-b border-t-primary text-t-primary cursor-pointer transition-colors hover:border-transparent"
                    onClick={onLogin}
                >
                    {t("loginLink")}
                </span>
            </div>
        </div>
    );
};

export default ResetPassword;
