import { useState } from "react";
import { useTranslations } from "next-intl";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

const MAX_BUDGET_STAGES = 20;

type BudgetItem = { id: number; scope: string; budget: string };

const Budget = ({}) => {
    const t = useTranslations("quiz");
    const [items, setItems] = useState<BudgetItem[]>([
        { id: 1, scope: "", budget: "" },
        { id: 2, scope: "", budget: "" },
    ]);

    const updateItem = (id: number, field: "scope" | "budget", value: string) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    const removeItem = (id: number) => {
        if (items.length <= 1) return;
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const addItem = () => {
        if (items.length >= MAX_BUDGET_STAGES) return;
        setItems((prev) => [
            ...prev,
            { id: Math.max(0, ...prev.map((i) => i.id)) + 1, scope: "", budget: "" },
        ]);
    };

    const canAddMore = items.length < MAX_BUDGET_STAGES;

    return (
        <div className="">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className={`relative ${index > 0 ? "mt-5" : ""} ${items.length > 1 ? "group" : ""}`}
                >
                    <div className="flex">
                        <Field
                            className="w-[calc(50%+0.0625rem)] -mr-0.25 max-md:grow"
                            classInput={`relative ${index > 0 ? "rounded-r-none! focus:z-1 group-hover:border-[#A8A8A8]/50" : "rounded-r-none! focus:z-1"}`}
                            label={t("scopeOfWork")}
                            value={item.scope}
                            onChange={(e) => updateItem(item.id, "scope", e.target.value)}
                            placeholder={t("scopePlaceholder")}
                            isLarge
                            required
                            maxLength={500}
                        />
                        <Field
                            className="w-[calc(50%+0.0625rem)] -ml-0.25 max-md:w-30"
                            classInput={`relative ${index > 0 ? "rounded-l-none! focus:z-1 group-hover:border-[#A8A8A8]/50" : "rounded-l-none! focus:z-1"}`}
                            label={t("budget")}
                            value={item.budget}
                            onChange={(e) => updateItem(item.id, "budget", e.target.value)}
                            placeholder="0"
                            currency="$"
                            isLarge
                            required
                            onlyNumeric
                        />
                    </div>
                    {items.length > 1 && (
                        <Button
                            type="button"
                            className="absolute! -top-1.5 -right-4 z-3 size-8! invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 max-md:visible max-md:opacity-100"
                            isPrimary
                            isCircle
                            onClick={() => removeItem(item.id)}
                            aria-label={t("remove")}
                        >
                            <Icon className="size-4!" name="close" />
                        </Button>
                    )}
                </div>
            ))}
            {canAddMore && (
                <Button className="mt-5 px-5.5" isStroke type="button" onClick={addItem}>
                    <Icon className="mr-2" name="plus" />
                    {t("addMore")}
                </Button>
            )}
            {items.length >= MAX_BUDGET_STAGES && (
                <p className="mt-3 text-hairline text-t-tertiary">
                    {t("budgetMaxStagesReached", { max: MAX_BUDGET_STAGES })}
                </p>
            )}
        </div>
    );
};

export default Budget;
