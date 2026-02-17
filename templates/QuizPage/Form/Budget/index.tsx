import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import {
    formatCurrencyFromDigits,
    parseDigitsFromInput,
    type CurrencyId,
} from "@/lib/currency";

const MAX_BUDGET_STAGES = 20;
const SCROLL_THRESHOLD = 3;

type BudgetItem = { id: number; scope: string; budget: string };

const CURRENCY_SYMBOL: Record<number, string> = { 0: "R$", 1: "$", 2: "€" };

const Budget = ({ currency = null }: { currency?: number | null }) => {
    const t = useTranslations("quiz");
    const symbol = currency !== null && CURRENCY_SYMBOL[currency] ? CURRENCY_SYMBOL[currency] : "$";
    const currencyId = (currency ?? 1) as CurrencyId;
    const [items, setItems] = useState<BudgetItem[]>([
        { id: 1, scope: "", budget: "" },
        { id: 2, scope: "", budget: "" },
    ]);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});
    const [lastAddedId, setLastAddedId] = useState<number | null>(null);

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
        const nextId = Math.max(0, ...items.map((i) => i.id)) + 1;
        setItems((prev) => [
            ...prev,
            { id: nextId, scope: "", budget: "" },
        ]);
        setLastAddedId(nextId);
    };

    const canAddMore = items.length < MAX_BUDGET_STAGES;
    const hasInternalScroll = items.length > SCROLL_THRESHOLD;

    useEffect(() => {
        if (!lastAddedId) return;
        const container = scrollContainerRef.current;
        const target = itemRefs.current[lastAddedId];
        if (container && target) {
            target.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        setLastAddedId(null);
    }, [items, lastAddedId]);

    return (
        <div className="">
            <div
                ref={scrollContainerRef}
                className={
                    hasInternalScroll
                        ? "max-h-[18rem] overflow-y-auto overflow-x-hidden p-4 pr-4 [scrollbar-gutter:stable] [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.18)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/35"
                        : ""
                }
            >
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        ref={(el) => {
                            itemRefs.current[item.id] = el;
                        }}
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
                                value={formatCurrencyFromDigits(item.budget, currencyId)}
                                onChange={(e) => updateItem(item.id, "budget", parseDigitsFromInput(e.target.value))}
                                placeholder={currencyId === 1 ? "0.00" : "0,00"}
                                currency={symbol}
                                isLarge
                                required
                                inputMode="decimal"
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
            </div>
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
