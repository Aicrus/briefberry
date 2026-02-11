import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Field from "@/components/Field";
import MyDatePicker from "@/components/MyDatePicker";
import TypeBrief from "./TypeBrief";
import References from "./References";
import Budget from "./Budget";

const STEP_KEYS = ["step0", "step1", "step2", "step3", "step4", "step5", "step6"] as const;

const Form = ({}) => {
    const t = useTranslations("quiz");
    const [activeId, setActiveId] = useState(0);
    const [projectName, setProjectName] = useState("");
    const [projectGoals, setProjectGoals] = useState("");
    const [yourBudget, setYourBudget] = useState("");
    const [date, setDate] = useState("");

    const handleNext = () => {
        if (activeId < 6) {
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
                    {activeId + 1} / 7
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
                    />
                )}
                {activeId === 5 && <Budget />}
                {activeId === 6 && <References />}
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
                {activeId === 6 ? (
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
