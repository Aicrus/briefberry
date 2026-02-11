import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Field from "@/components/Field";

type Props = {
    onSignIn: () => void;
    onCreateAccount: () => void;
};

const CreateAccount = ({ onSignIn, onCreateAccount }: Props) => {
    const t = useTranslations("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="">
            <div className="mb-10 text-center text-h3">{t("createAccountTitle")}</div>
            <Button className="w-full" isPrimary onClick={onCreateAccount}>
                <Image
                    className="w-6 mr-2 opacity-100"
                    src="/images/google.svg"
                    width={24}
                    height={24}
                    alt="Google"
                />
                {t("signUpWithGoogle")}
            </Button>
            <div className="py-6 text-center text-small font-medium text-t-tertiary">
                {t("orUseEmail")}
            </div>
            <Field
                className="mb-4"
                label={t("email")}
                placeholder={t("emailPlaceholder")}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Field
                className="mb-6"
                label={t("password")}
                placeholder={t("passwordPlaceholder")}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button
                className="w-full mb-4"
                isSecondary
                onClick={onCreateAccount}
            >
                {t("createAccount")}
            </Button>
            <div className="text-center text-hairline font-medium text-t-secondary">
                {t("alreadyHaveAccount")}{" "}
                <span
                    className="border-b border-t-primary text-t-primary cursor-pointer transition-colors hover:border-transparent"
                    onClick={onSignIn}
                >
                    {t("signIn")}
                </span>
            </div>
        </div>
    );
};

export default CreateAccount;
