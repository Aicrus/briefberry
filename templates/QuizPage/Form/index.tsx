import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Field from "@/components/Field";
import MyDatePicker from "@/components/MyDatePicker";
import TypeBrief from "./TypeBrief";
import References from "./References";
import Budget from "./Budget";

const STEP_KEYS = ["step0", "step1", "step2", "step3", "step4", "step5", "step6", "stepPayment"] as const;
const TOTAL_STEPS = 8;

const cardClass = (active: boolean) =>
    `w-[calc(50%-1rem)] mt-4 mx-2 px-6 py-5.5 border-[1.5px] border-stroke1 rounded-[1.25rem] text-heading font-medium! text-t-secondary fill-t-secondary hover:border-transparent hover:bg-b-surface2 hover:shadow-hover hover:text-t-primary hover:fill-t-primary cursor-pointer transition-all max-md:w-[calc(50%-0.75rem)] max-md:mt-3 max-md:mx-1.5 ${
        active ? "border-stroke-focus! text-t-primary! fill-t-primary!" : ""
    }`;

const Form = ({}) => {
    const t = useTranslations("quiz");
    const [activeId, setActiveId] = useState(0);
    const [projectName, setProjectName] = useState("");
    const [projectGoals, setProjectGoals] = useState("");
    const [yourBudget, setYourBudget] = useState("");
    const [date, setDate] = useState("");
    const [billingModel, setBillingModel] = useState<number | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<number | null>(null);
    const [currency, setCurrency] = useState<number | null>(null);

    const handleNext = () => {
        if (activeId < TOTAL_STEPS - 1) {
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
                    {activeId + 1} / {TOTAL_STEPS}
                </div>
            </div>
            <div className="">
                {activeId === 0 && <TypeBrief />}
                {activeId === 1 && (
                    <Field
                        label={t("projectName")}
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        name="project-name"
                        placeholder={t("projectNamePlaceholder")}
                        isLarge
                        required
                        maxLength={200}
                    />
                )}
                {activeId === 2 && (
                    <Field
                        label={t("projectGoals")}
                        value={projectGoals}
                        onChange={(e) => setProjectGoals(e.target.value)}
                        name="project-goals"
                        placeholder={t("projectGoalsPlaceholder")}
                        isLarge
                        isTextarea
                        required
                        maxLength={3000}
                    />
                )}
                {activeId === 3 && (
                    <MyDatePicker
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                )}
                {activeId === 4 && (
                    <Field
                        label={t("yourBudget")}
                        value={yourBudget}
                        onChange={(e) => setYourBudget(e.target.value)}
                        name="your-budget"
                        placeholder="0"
                        currency="$"
                        isLarge
                        required
                        onlyNumeric
                    />
                )}
                {activeId === 5 && <Budget />}
                {activeId === 6 && <References />}
                {activeId === 7 && (
                    <div className="space-y-8">
                        <div>
                            <div className="mb-3 text-body-bold text-t-primary">{t("stepBillingLabel")}</div>
                            <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                                {([0, 2] as const).map((id) => (
                                    <div
                                        key={id}
                                        className={cardClass(billingModel === id)}
                                        onClick={() => setBillingModel(id)}
                                    >
                                        <div className="">{t(id === 0 ? "billingFixedPrice" : "billingPerStage")}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="mb-3 text-body-bold text-t-primary">{t("stepPaymentLabel")}</div>
                            <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                                {[0, 1].map((id) => (
                                    <div
                                        key={id}
                                        className={cardClass(paymentMethod === id)}
                                        onClick={() => setPaymentMethod(id)}
                                    >
                                        <div className="">{t(id === 0 ? "payment5050" : "paymentPerStage")}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="mb-3 text-body-bold text-t-primary">{t("stepCurrencyLabel")}</div>
                            <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                                {[0, 1].map((id) => (
                                    <div
                                        key={id}
                                        className={cardClass(currency === id)}
                                        onClick={() => setCurrency(id)}
                                    >
                                        <div className="">{id === 0 ? "BRL (R$)" : "USD ($)"}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex shrink-0 pt-10 max-md:-mx-1 max-md:pt-6">
                {activeId > 0 && (
                    <Button
                        className="min-w-40 max-md:min-w-[calc(50%-0.5rem)] max-md:mx-1"
                        isStroke
                        onClick={handlePrevious}
                    >
                        {t("previous")}
                    </Button>
                )}
                {activeId === TOTAL_STEPS - 1 ? (
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

export default Form;
