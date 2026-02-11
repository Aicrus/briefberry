import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Image from "@/components/Image";
import Field from "@/components/Field";

type Props = {
    onResetPassword: () => void;
    onSignUp: () => void;
    onLogin: () => void;
};

const SignIn = ({ onResetPassword, onSignUp, onLogin }: Props) => {
    const t = useTranslations("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="">
            <div className="mb-10 text-center text-h3">
                {t("signInTitle")}
            </div>
            <Button className="w-full" isPrimary onClick={onLogin}>
                <Image
                    className="w-6 mr-2 opacity-100"
                    src="/images/google.svg"
                    width={24}
                    height={24}
                    alt="Google"
                />
                {t("signInWithGoogle")}
            </Button>
            <div className="py-6 text-center text-small font-medium text-t-tertiary">
                {t("orSignInWithEmail")}
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
                onResetPassword={onResetPassword}
                required
            />
            <Button className="w-full mb-4" isSecondary onClick={onLogin}>
                {t("signIn")}
            </Button>
            <div className="text-center text-hairline font-medium text-t-secondary">
                {t("needAccount")}{" "}
                <span
                    className="border-b border-t-primary text-t-primary cursor-pointer transition-colors hover:border-transparent"
                    onClick={onSignUp}
                >
                    {t("signUp")}
                </span>
            </div>
        </div>
    );
};

export default SignIn;
