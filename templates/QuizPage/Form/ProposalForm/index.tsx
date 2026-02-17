import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { DRAFT_KEYS, loadDraft, saveDraft } from "@/lib/draftStorage";

const STEP_KEYS = ["proposalStep0", "proposalStep1", "proposalStep2", "proposalStep3"] as const;

const cardClass = (active: boolean) =>
    `w-[calc(50%-1rem)] mt-4 mx-2 px-6 py-5.5 border-[1.5px] border-stroke1 rounded-[1.25rem] text-heading font-medium! text-t-secondary fill-t-secondary hover:border-transparent hover:bg-b-surface2 hover:shadow-hover hover:text-t-primary hover:fill-t-primary cursor-pointer transition-all max-md:w-[calc(50%-0.75rem)] max-md:mt-3 max-md:mx-1.5 ${
        active ? "border-stroke-focus! text-t-primary! fill-t-primary!" : ""
    }`;

const BILLING_OPTIONS = [
    { id: 0, titleKey: "billingFixedPrice" as const, descKey: "billingFixedPriceDesc" as const },
    { id: 1, titleKey: "billingPerFeature" as const, descKey: "billingPerFeatureDesc" as const },
    { id: 2, titleKey: "billingPerStage" as const, descKey: "billingPerStageDesc" as const },
] as const;

const PAYMENT_OPTIONS = [
    { id: 0, titleKey: "payment5050" as const, descKey: "payment5050Desc" as const },
    { id: 1, titleKey: "paymentPerStage" as const, descKey: "paymentPerStageDesc" as const },
] as const;

const CURRENCY_OPTIONS = [
    { id: 0, label: "BRL (R$)" },
    { id: 1, label: "USD ($)" },
    { id: 2, label: "EUR (€)" },
] as const;

const REVISIONS_OPTIONS = [
    { id: 0, key: "revisions1" as const },
    { id: 1, key: "revisions2" as const },
    { id: 2, key: "revisions3" as const },
    { id: 3, key: "revisionsUnlimited" as const },
] as const;

const ProposalForm = () => {
    const t = useTranslations("quiz");
    const searchParams = useSearchParams();
    const isEditMode = searchParams.get("edit") === "1";
    const initialDraft = useMemo(
        () =>
            loadDraft<{
                activeId: number;
                billingModel: number | null;
                paymentMethod: number | null;
                currency: number | null;
                revisions: number | null;
            }>(DRAFT_KEYS.proposalSimple),
        []
    );
    const [activeId, setActiveId] = useState(
        isEditMode ? 0 : (initialDraft?.activeId ?? 0)
    );

    const [billingModel, setBillingModel] = useState<number | null>(
        initialDraft?.billingModel ?? null
    );
    const [paymentMethod, setPaymentMethod] = useState<number | null>(
        initialDraft?.paymentMethod ?? null
    );
    const [currency, setCurrency] = useState<number | null>(
        initialDraft?.currency ?? null
    );
    const [revisions, setRevisions] = useState<number | null>(
        initialDraft?.revisions ?? null
    );

    useEffect(() => {
        saveDraft(DRAFT_KEYS.proposalSimple, {
            activeId,
            billingModel,
            paymentMethod,
            currency,
            revisions,
        });
    }, [activeId, billingModel, paymentMethod, currency, revisions]);

    const totalSteps = STEP_KEYS.length;

    const handleNext = () => {
        if (activeId < totalSteps - 1) setActiveId(activeId + 1);
    };

    const handlePrevious = () => {
        if (activeId > 0) setActiveId(activeId - 1);
    };

    return (
        <div className="flex flex-col w-full max-w-152 max-h-200 h-full max-3xl:max-w-127 max-3xl:max-h-169 max-xl:max-w-136 max-md:max-h-full">
            <div className="flex mb-20 max-3xl:mb-12 max-2xl:mb-10 max-md:flex-col-reverse max-md:mb-8">
                <div className="grow text-h2 max-md:text-h3">
                    {t(STEP_KEYS[activeId])}
                </div>
                <div className="flex justify-center items-center shrink-0 w-16 h-7 mt-3 ml-8 border-[1.5px] border-primary2/15 bg-primary2/5 rounded-full text-button text-primary2 max-md:m-0 max-md:mb-4">
                    {activeId + 1} / {totalSteps}
                </div>
            </div>
            <div className="flex-1 min-h-0 flex flex-col">
                {activeId === 0 && (
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {BILLING_OPTIONS.map((opt) => (
                            <div
                                key={opt.id}
                                className={cardClass(billingModel === opt.id)}
                                onClick={() => setBillingModel(opt.id)}
                            >
                                <div className="text-body-bold">{t(opt.titleKey)}</div>
                                <div className="mt-2 text-body text-t-secondary leading-snug">{t(opt.descKey)}</div>
                            </div>
                        ))}
                    </div>
                )}
                {activeId === 1 && (
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {PAYMENT_OPTIONS.map((opt) => (
                            <div
                                key={opt.id}
                                className={cardClass(paymentMethod === opt.id)}
                                onClick={() => setPaymentMethod(opt.id)}
                            >
                                <div className="text-body-bold">{t(opt.titleKey)}</div>
                                <div className="mt-2 text-body text-t-secondary leading-snug">{t(opt.descKey)}</div>
                            </div>
                        ))}
                    </div>
                )}
                {activeId === 2 && (
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {CURRENCY_OPTIONS.map((opt) => (
                            <div
                                key={opt.id}
                                className={cardClass(currency === opt.id)}
                                onClick={() => setCurrency(opt.id)}
                            >
                                <div className="">{opt.label}</div>
                            </div>
                        ))}
                    </div>
                )}
                {activeId === 3 && (
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {REVISIONS_OPTIONS.map((opt) => (
                            <div
                                key={opt.id}
                                className={cardClass(revisions === opt.id)}
                                onClick={() => setRevisions(opt.id)}
                            >
                                <div className="">{t(opt.key)}</div>
                            </div>
                        ))}
                    </div>
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
                {activeId === totalSteps - 1 ? (
                    <Button
                        className="min-w-40 ml-auto max-md:min-w-[calc(50%-0.5rem)] max-md:mx-1"
                        isSecondary
                        as="link"
                        href="/quiz-generating?feature=proposal"
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
