import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Select from "@/components/Select";

const STEP_KEYS = ["proposalStep0", "proposalStep1", "proposalStep2"] as const;

type SelectOption = {
    id: number;
    name: string;
};

const ProposalForm = () => {
    const t = useTranslations("quiz");
    const [activeId, setActiveId] = useState(0);

    // Step 0: Billing model
    const billingOptions: SelectOption[] = [
        { id: 0, name: t("billingFixedPrice") },
        { id: 1, name: t("billingPerFeature") },
        { id: 2, name: t("billingPerStage") },
    ];
    const [billingModel, setBillingModel] = useState(billingOptions[0]);

    // Step 1: Payment method
    const paymentOptions: SelectOption[] = [
        { id: 0, name: t("payment5050") },
        { id: 1, name: t("paymentPerStage") },
    ];
    const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0]);

    // Step 2: Currency
    const currencyOptions: SelectOption[] = [
        { id: 0, name: "BRL (R$)" },
        { id: 1, name: "USD ($)" },
    ];
    const [currency, setCurrency] = useState(currencyOptions[0]);

    const handleNext = () => {
        if (activeId < 2) {
            setActiveId(activeId + 1);
        }
    };

    const handlePrevious = () => {
        if (activeId > 0) {
            setActiveId(activeId - 1);
        }
    };

    return (
        <div className="flex flex-col w-full max-w-152 max-h-200 h-full max-3xl:max-w-127 max-3xl:max-h-169 max-xl:max-w-136 max-md:max-h-full">
            <div className="flex mb-20 max-3xl:mb-12 max-2xl:mb-10 max-md:flex-col-reverse max-md:mb-8">
                <div className="grow text-h2 max-md:text-h3">
                    {t(STEP_KEYS[activeId])}
                </div>
                <div className="flex justify-center items-center shrink-0 w-16 h-7 mt-3 ml-8 border-[1.5px] border-primary2/15 bg-primary2/5 rounded-full text-button text-primary2 max-md:m-0 max-md:mb-4">
                    {activeId + 1} / 3
                </div>
            </div>
            <div className="">
                {activeId === 0 && (
                    <Select
                        value={billingModel}
                        onChange={setBillingModel}
                        options={billingOptions}
                        aria-label={t("proposalStep0")}
                    />
                )}
                {activeId === 1 && (
                    <Select
                        value={paymentMethod}
                        onChange={setPaymentMethod}
                        options={paymentOptions}
                        aria-label={t("proposalStep1")}
                    />
                )}
                {activeId === 2 && (
                    <Select
                        value={currency}
                        onChange={setCurrency}
                        options={currencyOptions}
                        aria-label={t("proposalStep2")}
                    />
                )}
            </div>
            <div className="flex mt-auto pt-10 max-md:-mx-1 max-md:pt-6">
                {activeId > 0 && (
                    <Button
                        className="min-w-40 max-md:min-w-[calc(50%-0.5rem)] max-md:mx-1"
                        isStroke
                        onClick={handlePrevious}
                    >
                        {t("previous")}
                    </Button>
                )}
                {activeId === 2 ? (
                    <Button
                        className="min-w-40 ml-auto max-md:min-w-[calc(50%-0.5rem)] max-md:mx-1"
                        isSecondary
                        as="link"
                        href="/quiz-generating"
                    >
                        {t("continue")}
                    </Button>
                ) : (
                    <Button
                        className="min-w-40 ml-auto max-md:min-w-[calc(50%-0.5rem)] max-md:mx-1"
                        isSecondary
                        onClick={handleNext}
                    >
                        {t("continue")}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ProposalForm;
