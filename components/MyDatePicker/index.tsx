import { useMemo, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import DatePicker, { registerLocale } from "react-datepicker";
import { enGB } from "date-fns/locale/en-GB";
import { ptBR } from "date-fns/locale/pt-BR";
import { es } from "date-fns/locale/es";
import { useLocale, useTranslations } from "next-intl";
import Field from "@/components/Field";
import "react-datepicker/dist/react-datepicker.css";

const DATE_OPTION_KEYS = ["today", "tomorrow", "1week", "2weeks", "1month", "3months"] as const;

const localeToDateLocale: Record<string, string> = {
    en: "en-GB",
    pt: "pt-BR",
    es: "es",
};

// Registrar locales do date-fns para o calendário exibir meses/dias no idioma correto
registerLocale("en-GB", enGB);
registerLocale("pt-BR", ptBR);
registerLocale("es", es);

type MyDatePickerProps = {
    value: string;
    onChange: (e: { target: { value: string } }) => void;
    label?: string;
    name?: string;
    required?: boolean;
};

const MyDatePicker = ({
    value,
    onChange,
    label,
    name = "date",
    required = true,
}: MyDatePickerProps) => {
    const t = useTranslations("datePicker");
    const locale = useLocale();
    const [activeOption, setActiveOption] = useState<string | null>(null);

    const today = new Date();
    const dateLocale = localeToDateLocale[locale] ?? "en-GB";

    const formatDate = (date: Date | null): string => {
        if (date) {
            return date.toLocaleDateString(dateLocale, {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
        }
        return "";
    };

    const parsedValueDate = useMemo(() => {
        const parsed = new Date(value);
        return isNaN(parsed.getTime()) ? null : parsed;
    }, [value]);

    const handleDateChange = (date: Date | null) => {
        onChange({ target: { value: formatDate(date) } });
        setActiveOption(null);
    };

    const handleInputChange = (e: { target: { value: string } }) => {
        onChange(e);
        setActiveOption(null);
    };

    const handleOptionClick = (optionKey: (typeof DATE_OPTION_KEYS)[number]) => {
        const newDate = new Date();
        switch (optionKey) {
            case "today":
                break;
            case "tomorrow":
                newDate.setDate(newDate.getDate() + 1);
                break;
            case "1week":
                newDate.setDate(newDate.getDate() + 7);
                break;
            case "2weeks":
                newDate.setDate(newDate.getDate() + 14);
                break;
            case "1month":
                newDate.setMonth(newDate.getMonth() + 1);
                break;
            case "3months":
                newDate.setMonth(newDate.getMonth() + 3);
                break;
        }
        onChange({ target: { value: formatDate(newDate) } });
        setActiveOption(optionKey);
    };

    return (
        <>
            <Popover className="relative z-30">
                {({ close }) => (
                    <>
                        <PopoverButton
                            className="group w-full outline-0 cursor-pointer"
                            as="div"
                        >
                            <Field
                                classInput="truncate cursor-pointer group-[[data-open]]:border-[#A8A8A8]/50!"
                                label={label ?? t("label")}
                                value={value}
                                onChange={handleInputChange}
                                name={name}
                                placeholder={t("placeholder")}
                                isLarge
                                required={required}
                            />
                        </PopoverButton>
                        <PopoverPanel
                            anchor="bottom"
                            transition
                            className="z-60 flex [--anchor-gap:0.5rem] w-(--button-width) p-6 shadow-hover bg-b-surface2 rounded-3xl outline-0 origin-top transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0 max-md:justify-center"
                        >
                            <div className="shrink-0">
                                <DatePicker
                                    calendarClassName="datepicker"
                                    selected={parsedValueDate}
                                    onChange={(date) => {
                                        handleDateChange(date);
                                        close();
                                    }}
                                    minDate={today}
                                    inline
                                    locale={dateLocale}
                                />
                            </div>
                            <div className="flex flex-col grow gap-3 -mt-0.5 ml-6 max-md:hidden">
                                {DATE_OPTION_KEYS.map((optionKey) => (
                                    <button
                                        className={`flex justify-center items-center w-full h-8 border-[1.5px] rounded-full text-hairline font-medium transition-all hover:border-stroke-highlight hover:text-t-primary ${
                                            activeOption === optionKey
                                                ? "border-b-primary! text-t-primary!"
                                                : "border-stroke1 text-t-secondary"
                                        }`}
                                        key={optionKey}
                                        onClick={() =>
                                            handleOptionClick(optionKey)
                                        }
                                    >
                                        {t(optionKey)}
                                    </button>
                                ))}
                            </div>
                        </PopoverPanel>
                    </>
                )}
            </Popover>
        </>
    );
};

export default MyDatePicker;
